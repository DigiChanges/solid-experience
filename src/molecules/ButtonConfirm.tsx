import { Component, JSX } from 'solid-js';
import Button from '../atoms/Button';

interface ButtonConfirmProps
{
    icon?: string;
    labelName?: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: ( e: MouseEvent ) => void;
    children: JSX.Element;
}

const ButtonConfirm: Component<ButtonConfirmProps> = ( props ) =>
{
    return (
        <Button
            class="dg-main-button"
            type="submit"
            {...props}
        >
            {props.children}
        </Button>
    );
};

export default ButtonConfirm;
