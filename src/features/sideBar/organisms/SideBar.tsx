import { Component, JSX } from 'solid-js';

interface SideBarProps {
    class?: string;
    children?: JSX.Element;
    getExpanded: any;
}

const SideBar: Component<SideBarProps> = ( props ) =>
{
    return (
        <div
            class={props.class}
            classList={{ 'md:relative md:w-56': props.getExpanded }}
        >
            {props.children}
        </div>
    );
};

export default SideBar;
