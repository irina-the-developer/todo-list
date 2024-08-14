import classnames from 'classnames';
import { List } from 'antd';
import { Footer } from './Footer';
import { LoadingOutlined } from '@ant-design/icons';
import { Checkbox } from '../common/Checkbox';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { FC, useMemo } from 'react';
import { toggleTodo, FilterType, Todo } from '../redux/reducer';

interface Props {
    todos: Todo[];
}

export const TodoList: FC<Props> = ({ todos }) => {
    const dispatch = useAppDispatch();
    const stateFilter = useAppSelector((state) => {
        return state.filter;
    });

    const filteredTodos = useMemo(() => {
        return todos.filter((todo: Todo) => {
            return (
                (stateFilter === FilterType.COMPLETED && todo.completed) ||
                (stateFilter === 'ACTIVE' && !todo.completed) ||
                stateFilter === 'ALL'
            );
        });
    }, [todos, stateFilter]);

    const toggleTodoStatus = (idx: number) => {
        dispatch(toggleTodo(idx));
    };

    return (
        <List
            className="w-full"
            footer={<Footer />}
            bordered
            dataSource={filteredTodos}
            locale={{
                emptyText:
                    stateFilter === FilterType.COMPLETED ? (
                        <div>No completed tasks</div>
                    ) : (
                        <div>
                            Start your plans <LoadingOutlined />
                        </div>
                    ),
            }}
            renderItem={(todo, idx) => (
                <List.Item className="bg-white">
                    <label className="flex content-center cursor-pointer space-x-3 w-full font-extralight">
                        <Checkbox
                            checked={todo.completed}
                            onChange={() => {
                                toggleTodoStatus(idx);
                            }}
                        />
                        <span
                            className={classnames({
                                'text-xl': true,
                                'text-neutral-600': true,
                                'line-through': todo.completed,
                                'text-neutral-300': todo.completed,
                            })}
                        >
                            {todo.text}
                        </span>
                    </label>
                </List.Item>
            )}
        />
    );
};
