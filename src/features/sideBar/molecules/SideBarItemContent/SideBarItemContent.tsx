import { Component, Show } from 'solid-js';
import { Icon } from '@hope-ui/core';
import useTranslation from '../../../shared/hooks/useTranslation';
import styles from './SideBarItemContent.module.css';

interface SideBarItemProps
{
    name: string;
    icon?: any;
    isLoading?: boolean;
    onClick: (event: MouseEvent) => void;
    getShowSubItems: any;
    routes: any;
    showItem: boolean;
    isLink: boolean;
    path: string;
    expanded?: boolean;
    sectionSelected?: string;
}

const SideBarItemContent: Component<SideBarItemProps> = (props) =>
{
    const IconProps: any = () => props.icon;
    const { translate: t } = useTranslation();

    return (
        <>
            <Show when={props.icon}
                fallback={<span class={`${styles.side_bar_item_content_span}`} />} >
                <Icon class={`${styles.side_bar_item_content_icon}`} >
                    <IconProps />
                </Icon>
            </Show>
            <div class={`${styles.side_bar_item_content_container}`} classList={{
                [styles.side_bar_item_content_container_expanded]: !props.expanded
            }}>
                {t(props.name)}
            </div>
        </>
    );
};

export default SideBarItemContent;
