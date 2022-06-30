import { Component } from 'solid-js';

interface FooterProps
{
    class: string;
    children: any;
}

const Footer: Component<FooterProps> = ( props ) =>
{
    return (
        <footer class={props.class}>{props.children}</footer>
    );
};

export default Footer;
