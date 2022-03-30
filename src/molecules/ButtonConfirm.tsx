import { Component, JSX, splitProps } from 'solid-js';
import Button from '../atoms/Button';

interface ButtonConfirmProps
{
    icon?: string;
    labelName?: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: ( e: MouseEvent ) => void;
    class?: string;
    children: JSX.Element;
}

const ButtonConfirm: Component<ButtonConfirmProps> = ( props ) =>
{
    const [ local, others ] = splitProps( props, [ 'class', 'children' ] );
    return (
        <Button
            class={`dg-main-button ${local.class}`}
            type="submit"
            {...others}
        >
            {local.children}
        </Button>
    );
};

export default ButtonConfirm;
