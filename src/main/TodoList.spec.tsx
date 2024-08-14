import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { TodoList } from './TodoList';
import configureStore from 'redux-mock-store';
import { FilterType } from '../redux/reducer';

describe('TodoList', () => {
    it('renders correct message when list is empty', async () => {
        const mockState = {
            todos: [],
            filter: FilterType.ALL,
        };

        const mockStore = configureStore();
        const store = mockStore(mockState);

        render(
            <Provider store={store}>
                <TodoList todos={mockState.todos} />
            </Provider>,
        );
        expect(
            await screen.findByText(/start your plans/i),
        ).toBeInTheDocument();
    });

    it('renders correct message when filtered list is empty', async () => {
        const mockState = {
            todos: [{ text: 'Read a book', completed: false }],
            filter: FilterType.COMPLETED,
        };

        const mockStore = configureStore();
        const store = mockStore(mockState);

        render(
            <Provider store={store}>
                <TodoList todos={mockState.todos} />
            </Provider>,
        );
        expect(
            await screen.findByText(/no completed tasks/i),
        ).toBeInTheDocument();
    });

    it("renders correctly when list isn't empty", async () => {
        const mockState = {
            todos: [{ text: 'Read a book', completed: false }],
            filter: FilterType.ALL,
        };

        const mockStore = configureStore();
        const store = mockStore(mockState);

        render(
            <Provider store={store}>
                <TodoList todos={mockState.todos} />
            </Provider>,
        );
        expect(await screen.findByText(/read a book/i)).toBeInTheDocument();
    });

    it('renders correctly when filter is Active', async () => {
        const mockState = {
            todos: [
                { text: 'Read a book', completed: false },
                { text: 'Make a salad', completed: true },
            ],
            filter: FilterType.ACTIVE,
        };

        const mockStore = configureStore();
        const store = mockStore(mockState);

        render(
            <Provider store={store}>
                <TodoList todos={mockState.todos} />
            </Provider>,
        );
        expect(await screen.findByText(/read a book/i)).toBeInTheDocument();
        expect(screen.queryByText(/make a salad/i)).not.toBeInTheDocument();
    });

    it('renders correctly when filter is Completed', async () => {
        const mockState = {
            todos: [
                { text: 'Read a book', completed: false },
                { text: 'Make a salad', completed: true },
            ],
            filter: FilterType.COMPLETED,
        };

        const mockStore = configureStore();
        const store = mockStore(mockState);

        render(
            <Provider store={store}>
                <TodoList todos={mockState.todos} />
            </Provider>,
        );
        expect(await screen.findByText(/make a salad/i)).toBeInTheDocument();
        expect(screen.queryByText(/read a book/i)).not.toBeInTheDocument();
    });
});
