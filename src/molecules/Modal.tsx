import { Component, JSX } from 'solid-js';

interface ModalTemplateProps
{
    children: JSX.Element;
}

const Modal: Component<ModalTemplateProps> = ( props ) => (
    <div class="fixed h-screen w-screen items-center z-20 bg-transparent-black" >
        {props.children}
    </div>
);

export default Modal;
