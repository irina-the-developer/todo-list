import { useCallback, useEffect, useState } from 'react';
import { addTodo } from '../redux/reducer';
import { TodoList } from './TodoList';
import { ConfigProvider } from 'antd';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';

export const Todos = () => {
    const [newTodoText, setNewTodoText] = useState('');
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => {
        return state;
    });
    const [allTodos, setAllTodos] = useState(state.todos);

    useEffect(() => {
        setAllTodos(state.todos);
    }, [state]);

    const addNewTodo = useCallback(() => {
        const trimmedValue = newTodoText.trim();
        if (trimmedValue) {
            dispatch(addTodo(trimmedValue));
            setNewTodoText('');
        }
    }, [dispatch, newTodoText]);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#757575',
                    colorLink: '#f87171',
                },
            }}
        >
            <div className="h-screen max-w-4xl mx-auto p-4 bg-gray-100 rounded">
                <h2 className="mt-3 mb-6 text-center lowercase text-red-400 font-thin text-9xl">
                    todos.
                </h2>
                <div className="flex flex-col items-center shadow-xl rounded-xl">
                    <input
                        value={newTodoText}
                        onChange={(e) => setNewTodoText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') addNewTodo();
                        }}
                        className="w-full h-12 flex-grow p-2 placeholder:italic placeholder:text-xl placeholder:font-thin focus:outline-none"
                        type="text"
                        placeholder="What needs to be done?"
                    />
                    <TodoList todos={allTodos} />
                </div>
            </div>
        </ConfigProvider>
    );
};
