import { Component, JSX } from 'solid-js';

interface DescriptionProps {
    class?: string;
    children: JSX.Element | JSX.Element[];
}

const Description: Component<DescriptionProps> = ( props ) =>
    <div class={props.class}>
        {props.children}
    </div>;

export default Description;
