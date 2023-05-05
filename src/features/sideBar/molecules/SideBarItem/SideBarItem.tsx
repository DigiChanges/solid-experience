import { Icon } from '@hope-ui/core';
import { NavLink } from '@solidjs/router';
import { Component, JSX, Show } from 'solid-js';
import IconChevronDown from '../../../../atoms/Icons/Stroke/IconChevronDown';
import IconChevronRight from '../../../../atoms/Icons/Stroke/IconChevronRight';
import SideBarItemContent from '../SideBarItemContent/SideBarItemContent';
import styles from './SideBarItem.module.css';

interface SideBarItemProps {
    name: string;
    icon?: any;
    isLoading?: boolean;
    onClick: ( event: MouseEvent ) => void;
    getShowSubItems: any;
    routes: any;
    showItem: boolean;
    isLink: boolean;
    path: string;
    expanded?: boolean;
    sectionSelected?: string;
    hideChevron?: boolean;
    children?: JSX.Element;
}

const SideBarItem: Component<SideBarItemProps> = ( props ) => (
    <div class={`${styles.side_bar_item_container}`}>
        <Show when={props.showItem}>
            <Show when={props.isLink}
                fallback={
                    <span
                        class={`${styles.side_bar_item_span}`}
                        onClick={props.onClick}
                    >
                        <SideBarItemContent {...props} />
                        <Show when={!props.hideChevron}>
                            <Icon class={styles.side_bar_item_icon}>
                                <Show when={props.getShowSubItems}
                                    fallback={<IconChevronRight />}
                                >
                                    <IconChevronDown />
                                </Show>
                            </Icon>
                        </Show>
                    </span>
                }
            >
                <NavLink
                    class={`${styles.side_bar_item_nav_link}`}
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
