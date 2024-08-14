import { changeFilter, FilterType } from '../redux/reducer';
import { useMemo } from 'react';
import { Radio } from 'antd';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';

export const Filter = () => {
    const dispatch = useAppDispatch();
    const currentFilter = useAppSelector((state) => state.filter);

    const handleFilter = (filter: FilterType) => {
        dispatch(changeFilter(filter));
    };

    const filterOptions = useMemo(
        () => [
            {
                filter: FilterType.ALL,
                text: 'All',
                selected: currentFilter === FilterType.ALL,
            },
            {
                filter: FilterType.ACTIVE,
                text: 'Active',
                selected: currentFilter === FilterType.ACTIVE,
            },
            {
                filter: FilterType.COMPLETED,
                text: 'Completed',
                selected: currentFilter === FilterType.COMPLETED,
            },
        ],
        [currentFilter],
    );

    return (
        <div className="flex flex-row gap-8">
            <Radio.Group defaultValue={currentFilter} size="large">
                {filterOptions.map((filter) => (
                    <Radio.Button
                        key={filter.filter}
                        value={filter.filter}
                        onClick={() => handleFilter(filter.filter)}
                    >
                        {filter.text}
                    </Radio.Button>
                ))}
            </Radio.Group>
        </div>
    );
};
