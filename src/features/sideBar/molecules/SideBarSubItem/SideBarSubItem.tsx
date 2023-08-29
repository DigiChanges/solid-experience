import { Component, Show } from 'solid-js';
import { A } from 'solid-start';
import { Icon } from '@hope-ui/core';

import useTranslation from '../../../shared/hooks/useTranslation';
import styles from './SideBarItemSubItem.module.css';

interface SideBarSubItemProps
{
    name: string;
    path: string;
    icon?: any;
    isToggled?: boolean;
    equalPath?: any;
    showItem: boolean;
    expanded: boolean;
}

const SideBarSubItem: Component<SideBarSubItemProps> = (props) =>
{
    const IconProps: any = () => props.icon;
    const { translate: t } = useTranslation();

    return (
        <Show when={props.showItem} >
            <div class={styles.side_bar_item_sub_item_container}>
                <A href={props.path} class={styles.side_bar_item_sub_item_nav_link}>
                    <div
                        class={styles.side_bar_item_sub_item_nav_link_container}
                        classList={{ [styles.side_bar_item_sub_item_nav_link_container]: props.equalPath }}
                    >
                        <Show when={props.icon}
                            fallback={<span class={styles.side_bar_item_sub_item_nav_link_container_fallback_span} />}>
                            <Icon>
                                <IconProps />
                            </Icon>
                        </Show>

                        <div class={styles.__block} classList={{
                            'md:hidden': !props.expanded
                        }}>
                            <span
                                class={styles.side_bar_item_sub_item_nav_link_container_span}
                                classList={{ 'pl-1': props.isToggled } }
                            >
                                <p>{t(props.name)}</p>
                            </span>
                        </div>
                    </div>
                </A>
            </div>
        </Show>
    );
};

export default SideBarSubItem;
