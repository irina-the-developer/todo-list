import { displayUnitWithValue } from '../common/utils';
import { Filter } from './Filter';
import { useCallback } from 'react';
import { removeTodos } from '../redux/reducer';
import { Button } from 'antd';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';

export const Footer = () => {
    const dispatch = useAppDispatch();
    const allTodos = useAppSelector((state) => {
        return state.todos;
    });
    const incompleteTodos = allTodos.filter((todo) => !todo.completed);

    const clearCompletedTodos = useCallback(() => {
        const idxToRemove = allTodos.reduce((res, todo, idx) => {
            if (todo.completed) {
                res.push(idx);
            }
            return res;
        }, [] as number[]);

        if (idxToRemove.length) {
            dispatch(removeTodos(idxToRemove));
        }
    }, [allTodos, dispatch]);

    return (
        <footer className="flex content-center items-center flex-row justify-between text-neutral-400">
            <div>
                {displayUnitWithValue('item', incompleteTodos.length)} left
            </div>
            <Filter />
            <Button type="link" onClick={clearCompletedTodos}>
                Clear completed
            </Button>
        </footer>
    );
};
