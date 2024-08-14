import { ChangeEventHandler, ComponentProps } from 'react';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { MdCheck } from 'react-icons/md';

const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
`;

// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    overflow: hidden;
    position: absolute;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
    display: flex;
    align-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid ${(props) => (props.checked ? '#9cd79c' : 'gray')};
    border-radius: 50%;
    font-size: 18px;
`;

export const Checkbox = ({
    className,
    checked,
    onChange,
    ...props
}: {
    className?: string;
    checked: boolean;
    onChange: ChangeEventHandler;
    props?: ComponentProps<'input'>;
}) => (
    <CheckboxContainer className={className}>
        <HiddenCheckbox checked={checked} onChange={onChange} {...props} />
        <StyledCheckbox checked={checked}>
            {checked && (
                <IconContext.Provider
                    value={{
                        color: '#74c474',
                        size: '1.5em',
                    }}
                >
                    <MdCheck aria-label="tick-icon" />
                </IconContext.Provider>
            )}
        </StyledCheckbox>
    </CheckboxContainer>
);
