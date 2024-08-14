import { createSlice } from '@reduxjs/toolkit';

export interface Todo {
    text: string;
    completed: boolean;
}

interface IState {
    todos: Todo[];
    filter: 'ALL' | 'COMPLETED' | 'ACTIVE';
}

export enum FilterType {
    ALL = 'ALL',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
}

const initialState: IState = {
    todos: [],
    filter: FilterType.ALL,
};

const todosSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {
        addTodo(state, action) {
            state.todos.push({
                text: action.payload,
                completed: false,
            });
        },
        toggleTodo(state, action) {
            const todo = state.todos.find(
                (_todo, idx) => idx === action.payload,
            );
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        removeTodos(state, action) {
            state.todos = state.todos.filter(
                (_todo, index) => !action.payload.includes(index),
            );
        },
        changeFilter(state, action) {
            state.filter = action.payload;
        },
    },
});

export const { addTodo, toggleTodo, removeTodos, changeFilter } =
    todosSlice.actions;
export default todosSlice.reducer;
