import { Component, splitProps } from 'solid-js';
import { Button as HButton } from '@hope-ui/solid';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    name?: string;
    onClick?: ( e: MouseEvent ) => void;
    class?: string;
}

const Button: Component<ButtonProps> = ( props ) =>
{
    const [ local, others ] = splitProps( props, [ 'children', 'type' ] );

    return (
        <HButton
            type={local.type ?? 'button'}
            {...others}
        >
            {local.children}
        </HButton>
    );
};

export default Button;
