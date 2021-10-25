import { Component } from 'solid-js';

interface ImageProps {
    src: string;
    class: string;
    alt?: string;
}

const Image: Component<ImageProps> = props =>
    <img src={props.src} alt={props.alt ?? ''} class={props.class} />;


export default Image;
