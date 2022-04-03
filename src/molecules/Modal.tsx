import { Component, JSX } from 'solid-js';
import { Portal } from 'solid-js/web';

interface ModalTemplateProps
{
    children: JSX.Element;
}

const Modal: Component<ModalTemplateProps> = ( props ) => (
    <Portal>
        <div class="fixed top-0 h-screen w-full items-center z-20 bg-transparent-black" >
            {props.children}
        </div>
    </Portal>
);

export default Modal;
