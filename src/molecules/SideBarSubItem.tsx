import { Component, Show } from 'solid-js';
import { NavLink } from 'solid-app-router';
import { Text } from 'solid-i18n';
import { Icon } from '@hope-ui/solid';

interface SideBarSubItemProps {
    name: string;
    path: string;
    icon?: any;
    isToggled?: boolean;
    equalPath?: any;
    showItem: boolean;
    expanded: boolean;
}

const SideBarSubItem: Component<SideBarSubItemProps> = ( props ) =>
{
    const IconProps: any = props.icon;

    return (
        <Show when={props.showItem} >
            <div class="flex">
                <NavLink href={props.path} class="pl-9 h-8 w-full">
                    <div
                        class="border-r-2 flex flex-row items-center justify-start h-8"
                        classList={{ 'border-blue-700': props.equalPath }}
                    >
                        <Show when={props.icon}
                            fallback={() => <span class="inline-flex w-6 items-center justify-center h-6" />}>
                            <Icon class="inline-flex w-6 items-center md:justify-start h-6">
                                <IconProps />
                            </Icon>
                        </Show>
                        <div class="block" classList={{
                            'md:hidden': !props.expanded,
                        }}>
                            <span
                                class="justify-start md:justify-center pl-2 px-4"
                                classList={{ 'pl-1': props.isToggled } }
                            >
                                <Text message={props.name} />
                            </span>
                        </div>
                    </div>
                </NavLink>
            </div>
        </Show>
    );
};

export default SideBarSubItem;
