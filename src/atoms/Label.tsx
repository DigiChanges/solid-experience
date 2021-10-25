import { Component, JSX } from 'solid-js';

interface LabelProps
{
    for?: string;
    class?: string;
    children?: JSX.Element;
}

const Label: Component<LabelProps> = props => (
    <label for={props.for} class={props.class}>
        {props.children}
    </label>
);

export default Label;
