import { expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
    it('renders correctly when checked', async () => {
        render(<Checkbox checked onChange={vi.fn()} />);

        expect(await screen.findByRole('checkbox')).toBeChecked();
        expect(await screen.findByLabelText('tick-icon')).toBeInTheDocument();
    });

    it('renders correctly when unchecked', async () => {
        render(<Checkbox checked={false} onChange={vi.fn()} />);

        expect(await screen.findByRole('checkbox')).not.toBeChecked();
        expect(screen.queryByLabelText('tick-icon')).not.toBeInTheDocument();
    });
});
