import { Link } from 'solid-app-router';
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
}

const SideBarItemContent: Component<SideBarItemProps> = ( props ) =>
{
    const Icon: any = props.icon;

    return (
        <>
            <Show when={props.icon}
                fallback={() => <span class="mr-1 inline-flex items-center justify-center h-8 w-6 text-lg " />} >
                <span class={'mr-1 inline-flex items-center justify-center h-8 w-6 text-lg '}>
                    <Icon />
                </span>
            </Show>
            {props.name}
        </>
    );
};


const SideBarItem: Component<SideBarItemProps> = ( props ) => (
    <div class="mx-1 w-full">

        <Show when={props.showItem }>

            <Show when={props.isLink}
                fallback={() =>
                    <Button class="text-white text-sm font-bold md:flex pr-3 pl-4 items-center" onClick={props.onClick}>
                        <SideBarItemContent {...props} />
                    </Button>
                }
            >
                <Link class="text-white text-sm font-bold md:flex pr-3 pl-4 items-center" href={props.path}>
                    <SideBarItemContent {...props} />
                </Link>
            </Show>

        </Show>

        {props.children}

    </div>
);

export default SideBarItem;
