import { Component, JSX } from 'solid-js';

interface ModalTemplateProps
{
    open: any;
    children: JSX.Element;
}

const Modal: Component<ModalTemplateProps> = ( props ) =>
{
    if ( props.open )
    {
        return (
            <div class="fixed h-screen w-screen items-center z-20 bg-transparent-black" >
                {props.children}
            </div>
        );
    }
};

export default Modal;
