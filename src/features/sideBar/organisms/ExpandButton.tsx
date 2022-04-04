import { Component, Show } from 'solid-js';
import IconArrowCircleLeft from '../../../atoms/Icons/Stroke/IconArrowCircleLeft';

interface SideBarProps {
    getExpanded: any;
    setExpanded: any;
}

const ExpandButton: Component<SideBarProps> = ( props ) => (
    <div class="hidden md:flex flex-col items-center md:justify-center w-full md:w-auto text-white">
        <Show when={props.getExpanded}
            fallback={
                <div class="flex w-full ml-2 pl-4">
                    <button
                        onClick={() => props.setExpanded( true )}
                        type="button" class=" transform rotate-180 w-5 text-white" >
                        <IconArrowCircleLeft />
                    </button>
                </div>
            }
        >
            <div class="hidden md:flex flex-row-reverse w-full">
                <button
                    onClick={() => props.setExpanded( false )}
                    type="button" class="right-0 w-5 text-main-gray-300 mr-3" >
                    <IconArrowCircleLeft />
                </button>
            </div>

        </Show>
    </div>
);

export default ExpandButton;
