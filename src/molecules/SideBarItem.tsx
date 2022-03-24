import { NavLink } from 'solid-app-router';
import { Text } from 'solid-i18n';
import { Component, Show } from 'solid-js';
import Button from '../atoms/Button';

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
    getExpanded: any;
}

const SideBarItemContent: Component<SideBarItemProps> = ( props ) =>
{
    const Icon: any = props.icon;

    return (
        <>
            <Show when={props.icon}
                fallback={() => <span class=" mr-1 inline-flex items-center justify-center h-8 w-6 text-lg " />} >
                <span class={'text-main-gray-100  mr-1 inline-flex items-center justify-center h-8 w-6 text-lg '}>
                    <Icon />
                </span>
            </Show>
            <Show when={props.getExpanded}
                fallback={() =>  <Text class="text-main-gray-100 text-sm font-bold md:block" message=''/>} >
                <Text class="text-main-gray-100 text-sm font-bold md:block pr-2 pl-4" message={props.name} />
            </Show>
        </>
    );
};


const SideBarItem: Component<SideBarItemProps> = ( props ) => (
    <div class="w-full">
        <Show when={props.showItem}>
            <Show when={props.isLink}
                fallback={() =>
                    <Button
                        class="flex text-white text-sm font-bold md:flex pr-3 pl-4 items-center"
                        onClick={props.onClick}
                    >
                        <SideBarItemContent {...props} />
                    </Button>
                }
            >
                <NavLink
                    class="flex text-white text-sm font-bold md:flex pr-3 pl-4 items-center w-full"
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
