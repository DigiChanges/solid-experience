import { Component, splitProps } from 'solid-js';

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
        <button
            type={local.type ?? 'button'}
            {...others}
        >
            {local.children}
        </button>
    );
};

export default Button;
