import { Component, Show } from 'solid-js';
import { NavLink } from 'solid-app-router';
import { Text } from 'solid-i18n';

interface SideBarSubItemProps {
    name: string;
    path: string;
    icon?: any;
    isToggled?: boolean;
    equalPath?: any;
    showItem: boolean;
}

const SideBarSubItem: Component<SideBarSubItemProps> = ( props ) =>
{
    const Icon: any = props.icon;

    return (
        props.showItem && (
            <div class="flex flex-row">
                <NavLink href={props.path} class="pl-9  h-8 ">
                    <div
                        class="border-r-2 border-gray-800  hover:text-blue-500 flex flex-row items-center justify-start h-8 text-blue-700"
                        classList={{ 'text-blue-700 border-blue-700': props.equalPath }}
                    >
                        <Show when={props.icon}
                            fallback={() => <span class="inline-flex w-6 items-center justify-center h-6 text-lg" />}>
                            <span class="inline-flex w-6 items-center md:justify-start h-6 text-lg">
                                <Icon />
                            </span>
                        </Show>
                        <span
                            class="text-sm font-bold justify-start md:justify-center pl-2 px-4"
                            classList={{ 'pl-1': props.isToggled } }
                        >
                            <Text message={props.name} />
                        </span>
                    </div>
                </NavLink>
            </div>
        )
    );
};

export default SideBarSubItem;
