import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Filter } from './Filter';
import configureStore from 'redux-mock-store';
import { FilterType } from '../redux/reducer';

describe('Filter', () => {
    it('renders correctly when filter is All', async () => {
        const mockState = {
            todos: [],
            filter: FilterType.ALL,
        };

        const mockStore = configureStore();
        const store = mockStore(mockState);

        render(
            <Provider store={store}>
                <Filter />
            </Provider>,
        );

        expect(
            await screen.findByRole('radio', { name: /all/i }),
        ).toBeChecked();
        expect(
            await screen.findByRole('radio', { name: /active/i }),
        ).not.toBeChecked();
        expect(
            await screen.findByRole('radio', { name: /completed/i }),
        ).not.toBeChecked();
    });

    it('renders correctly when filter is Active', async () => {
        const mockState = {
            todos: [],
            filter: FilterType.ACTIVE,
        };

        const mockStore = configureStore();
        const store = mockStore(mockState);

        render(
            <Provider store={store}>
                <Filter />
            </Provider>,
        );
        expect(
            await screen.findByRole('radio', { name: /all/i }),
        ).not.toBeChecked();
        expect(
            await screen.findByRole('radio', { name: /active/i }),
        ).toBeChecked();
        expect(
            await screen.findByRole('radio', { name: /completed/i }),
        ).not.toBeChecked();
    });

    it('renders correctly when filter is Completed', async () => {
        const mockState = {
            todos: [],
            filter: FilterType.COMPLETED,
        };

        const mockStore = configureStore();
        const store = mockStore(mockState);

        render(
            <Provider store={store}>
                <Filter />
            </Provider>,
        );
        expect(
            await screen.findByRole('radio', { name: /all/i }),
        ).not.toBeChecked();
        expect(
            await screen.findByRole('radio', { name: /active/i }),
        ).not.toBeChecked();
        expect(
            await screen.findByRole('radio', { name: /completed/i }),
        ).toBeChecked();
    });
});
