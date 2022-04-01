import { Component, JSX } from 'solid-js';
import IconArrowCircleLeft from '../../../atoms/Icons/Stroke/IconArrowCircleLeft';

interface SideBarProps {
    class?: string;
    children?: JSX.Element;
    getExpanded: any;
    setExpanded: any;
}

const SideBar: Component<SideBarProps> = ( props ) =>
{
    return (
        <div
            class={props.class}
            classList={{ 'md:relative md:w-56': props.getExpanded }}
        >
            <div class={'text-white'}>
                <div class="flex flex-col items-center h-full md:justify-center w-full md:w-auto">
                    {
                        props.getExpanded ? (
                            <div class="hidden md:flex  flex-row-reverse w-full">
                                <button
                                    onClick={() => props.setExpanded( false )}
                                    type="button" class="right-0 w-5 text-main-gray-300 mr-3" >
                                    <IconArrowCircleLeft />
                                </button>
                            </div>
                        )
                            : <div class="flex w-full ml-2 mb-8 pl-4">
                                <button
                                    onClick={() => props.setExpanded( true )}
                                    type="button" class=" transform rotate-180 w-5 text-white" >
                                    <IconArrowCircleLeft />
                                </button>
                            </div>
                    }
                </div>
                {props.children}
            </div>
        </div >
    );
};

export default SideBar;
