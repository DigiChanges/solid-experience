import { Component, JSX } from 'solid-js';

interface ErrorFormProps
{
    class?: string,
    children: JSX.Element;
}

const ErrorForm: Component<ErrorFormProps> = props => (
    <span
        class={props.class ? `${props.class} text-red-500 p-2 ml-1` : 'text-red-500 ml-1'}
    >
        {props.children}
    </span>
);

export default ErrorForm;
