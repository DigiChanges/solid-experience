import { Component, JSX } from 'solid-js';

interface MediaObjectProps
{
    class: string;
    children: JSX.Element;
}

const MediaObject: Component<MediaObjectProps> = ( props ) =>
    <div class={props.class}>
        {props.children}
    </div>;

export default MediaObject;
