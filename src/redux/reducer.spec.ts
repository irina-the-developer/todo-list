import reducer, {
    FilterType,
    addTodo,
    removeTodos,
    toggleTodo,
    changeFilter,
} from './reducer';

describe('todos reducer', () => {
    it('should add an item', () => {
        const initialState = {
            todos: [],
            filter: FilterType.ALL,
        };
        const nextState = reducer(initialState, addTodo('write tests'));

        expect(nextState).toEqual({
            todos: [
                expect.objectContaining({
                    text: 'write tests',
                    completed: false,
                }),
            ],
            filter: 'ALL',
        });
    });

    it('should remove items', () => {
        const initialState = {
            todos: [
                { text: 'first', completed: true },
                { text: 'second', completed: false },
            ],
            filter: FilterType.ALL,
        };
        const nextState = reducer(initialState, removeTodos([0]));

        expect(nextState).toEqual({
            todos: [
                expect.objectContaining({
                    text: 'second',
                    completed: false,
                }),
            ],
            filter: 'ALL',
        });
    });

    it("should toggle item's status", () => {
        const initialState = {
            todos: [
                { text: 'first', completed: true },
                { text: 'second', completed: false },
            ],
            filter: FilterType.ALL,
        };
        const nextState = reducer(initialState, toggleTodo(0));

        expect(nextState).toEqual({
            todos: expect.arrayContaining([
                expect.objectContaining({
                    text: 'first',
                    completed: false,
                }),
            ]),
            filter: 'ALL',
        });
    });

    it('should change filter', () => {
        const initialState = {
            todos: [
                { text: 'first', completed: true },
                { text: 'second', completed: false },
            ],
            filter: FilterType.ALL,
        };
        const nextState = reducer(
            initialState,
            changeFilter(FilterType.COMPLETED),
        );

        expect(nextState).toEqual(
            expect.objectContaining({
                filter: FilterType.COMPLETED,
            }),
        );
    });
});
