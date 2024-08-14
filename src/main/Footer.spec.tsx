import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Footer } from './Footer';
import configureStore from 'redux-mock-store';
import { FilterType } from '../redux/reducer';

describe('Footer', () => {
    it('renders correctly when list is empty', async () => {
        const mockState = {
            todos: [],
            filter: FilterType.ALL,
        };

        const mockStore = configureStore();
        const store = mockStore(mockState);

        render(
            <Provider store={store}>
                <Footer />
            </Provider>,
        );
        expect(await screen.findByText(/0 items left/i)).toBeInTheDocument();
    });

    it('renders correctly when list contains only active items', async () => {
        const mockState = {
            todos: [
                { text: 'Read a book', completed: false },
                { text: 'Make a salad', completed: false },
            ],
            filter: FilterType.ALL,
        };

        const mockStore = configureStore();
        const store = mockStore(mockState);

        render(
            <Provider store={store}>
                <Footer />
            </Provider>,
        );
        expect(await screen.findByText(/2 items left/i)).toBeInTheDocument();
    });

    it('renders correctly when list contains mixed active items', async () => {
        const mockState = {
            todos: [
                { text: 'Read a book', completed: false },
                { text: 'Make a salad', completed: true },
            ],
            filter: FilterType.ALL,
        };

        const mockStore = configureStore();
        const store = mockStore(mockState);

        render(
            <Provider store={store}>
                <Footer />
            </Provider>,
        );
        expect(await screen.findByText(/1 item left/i)).toBeInTheDocument();
    });
});
