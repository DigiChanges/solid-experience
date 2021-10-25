import { Component } from 'solid-js';


interface LabelProps
{
    for?: string,
    class?: string,
    children?: any,
}

const Label: Component<LabelProps> = ( props: any ) => (
    <label for={props.for} class={props.class}>
        {props.children}
    </label>
);

export default Label;
