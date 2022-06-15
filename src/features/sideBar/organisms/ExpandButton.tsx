import { IconButton } from '@hope-ui/solid';
import { Component } from 'solid-js';
import IconArrowCircleLeft from '../../../atoms/Icons/Stroke/IconArrowCircleLeft';

interface SideBarProps {
    getExpanded: any;
    setExpanded: any;
}

const ExpandButton: Component<SideBarProps> = ( props ) => (
    <div class="hidden md:flex flex-col md:justify-center w-full md:w-auto text-white px-8 mb-4"
        classList={{
            'mb-8': !props.getExpanded,
        }}
    >

        <div
            class="hidden md:flex w-full"
            classList={{
                'flex-row-reverse': props.getExpanded,
            }}
        >
            <IconButton
                aria-label="Expand Sidebar"
                onClick={() => props.setExpanded( !props.getExpanded )}
                class="transition-transform"
                classList={{
                    'transform rotate-180': !props.getExpanded,
                }}
                icon={ <IconArrowCircleLeft />}
                compact
            />
        </div>
    </div>
);

export default ExpandButton;
