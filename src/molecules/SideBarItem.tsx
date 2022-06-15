import { Icon } from '@hope-ui/solid';
import { NavLink } from 'solid-app-router';
import { Text } from 'solid-i18n';
import { Component, Show } from 'solid-js';
import IconChevronDown from '../atoms/Icons/Stroke/IconChevronDown';
import IconChevronRight from '../atoms/Icons/Stroke/IconChevronRight';

interface SideBarItemProps {
    name: string;
    icon?: any;
    isLoading?: boolean;
    onClick: ( event: MouseEvent ) => void;
    getShowSubitems: any;
    routes: any;
    showItem: boolean;
    isLink: boolean;
    path: string;
    expanded: boolean;
    sectionSelected: string;
}

const SideBarItemContent: Component<SideBarItemProps> = ( props ) =>
{
    const IconProps: any = props.icon;

    return (
        <>
            <Show when={props.icon}
                fallback={() => <span class=" mr-1 inline-flex items-center justify-center h-8 w-6 text-lg " />} >
                <Icon class={' mr-1 inline-flex items-center justify-center h-8 w-6 text-lg '} >
                    <IconProps />
                </Icon>
            </Show>
            <div class="block" classList={{
                'md:hidden': !props.expanded,
            }}>
                <span
                    class="hover:text-blue-500 text-sm font-bold md:block"
                    classList={{
                        'pr-2 pl-4': props.expanded,
                    }}
                >
                    <Text message={props.name} />
                </span>
            </div>
        </>
    );
};


const SideBarItem: Component<SideBarItemProps> = ( props ) => (
    <div class="w-full">
        <Show when={props.showItem}>
            <Show when={props.isLink}
                fallback={() =>
                    <button
                        class="flex text-main-gray-100 text-sm hover:text-blue-500 font-bold md:flex pr-3 pl-4 items-center w-full active"
                        onClick={props.onClick}
                        classList={{ selectedBlue: props.sectionSelected === props.path }}
                    >
                        <SideBarItemContent {...props} />
                        <Icon class="inline-flex ml-auto pl-1 w-6" classList={{ hidden: props.path === '/logout' }} >
                            <Show when={props.sectionSelected === props.path}
                                fallback={<IconChevronRight />}
                            >
                                <IconChevronDown />
                            </Show>
                        </Icon>
                    </button>
                }
            >
                <NavLink
                    class="flex text-main-gray-100 text-sm hover:text-blue-500 font-bold md:flex pr-3 pl-4 items-center w-full"
                    href={props.path}
                >
                    <SideBarItemContent {...props} />
                </NavLink>
            </Show>
        </Show>
        {props.children}
    </div>
);

export default SideBarItem;
