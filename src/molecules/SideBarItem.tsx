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
    getExpanded: boolean;
    sectionSelected: string;
}

const SideBarItemContent: Component<SideBarItemProps> = ( props ) =>
{
    const Icon: any = props.icon;

    return (
        <>
            <Show when={props.icon}
                fallback={() => <span class=" mr-1 inline-flex items-center justify-center h-8 w-6 text-lg " />} >
                <span class={' mr-1 inline-flex items-center justify-center h-8 w-6 text-lg '} >
                    <Icon />
                </span>
            </Show>
            <Show when={props.getExpanded}
                fallback={() =>  <Text class="hover:text-blue-500 text-sm font-bold md:block" message=""/>} >
                <Text class=" hover:text-blue-500 text-sm font-bold md:block pr-2 pl-4" message={props.name} />
            </Show>
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

                        {props.sectionSelected === props.path ?
                            <span class={'inline-flex ml-auto  pl-1 w-6'}
                                classList={{ hidden: props.path === '/logout'  }}
                            > <IconChevronDown /></span>

                            :
                            <span class={' inline-flex ml-auto  pl-1 w-6'}
                                classList={{ hidden: props.path === '/logout'  }}
                            > <IconChevronRight /></span>
                        }

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
