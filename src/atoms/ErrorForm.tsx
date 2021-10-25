import { Component } from 'solid-js';

interface ErrorFormProps
{
    class?: string,
    children: any
}

const ErrorForm: Component<ErrorFormProps> = ( props: any ) => (
    <span
        class={props.class ? `${props.class} text-red-500 p-2` : 'text-red-500'}
    >
        {props.children}
    </span>
);

export default ErrorForm;
