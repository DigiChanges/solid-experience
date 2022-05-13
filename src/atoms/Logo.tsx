import { Component } from 'solid-js';

interface LogoProps
{
    image: string;
    alt: string;
    class?: string;
}

const Logo: Component<LogoProps> = props =>
    <img src={props.image} alt={props.alt} class={props.class} />;

export default Logo;
