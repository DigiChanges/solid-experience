import { Component } from 'solid-js';

const Description: Component = ( props: any ) =>
    <div class={props.class}>
        {props.children}
    </div>;

export default Description;
