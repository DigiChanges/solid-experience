import { Component, JSX, Show } from 'solid-js';
import LogoutSideBarItem from '../../auth/logout/molecules/LogoutSideBarItem';
import DashItems from '../../shared/layout/DashItems/DashItems';
import styles from './SideBar.module.css';
import { Text } from 'solid-i18n';
import { Drawer } from '@hope-ui/core';
import { logout } from '../../navBar/organisms/handlers';
import IconChevronDown from '../../../atoms/Icons/Stroke/IconChevronDown';
import { DropdownMenu } from '@kobalte/core';

interface SideBarProps {
    authUser: any;
    showInMobile?: boolean;
    children?: JSX.Element;
    close: () => void;
    isOpen: () => boolean;
    open: () => void;
}

const SideBar: Component<SideBarProps> = ( props ) =>
{
    return (
        <>
            <Drawer
                isOpen={ props.isOpen() }
                placement={'left'}
                onClose={ props.close }
                size={'sm'}
            >
                <Drawer.Overlay />
                <Drawer.Content class={styles.drawer_content}>
                    <Drawer.CloseButton/>
                    <Drawer.Description>

                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger class={styles.dropdown__menu__trigger}>
                                    <Show when={props.authUser.user.email} keyed>
                                        <span>{props.authUser.user.email}</span>
                                    </Show>
                                    <DropdownMenu.Icon class={styles.dropdown__menu__trigger__icon}><IconChevronDown /></DropdownMenu.Icon>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content class={styles.dropdown__menu__content}>
                                    <DropdownMenu.Item class={styles.dropdown__menu__item}>Item 1</DropdownMenu.Item>
                                    <DropdownMenu.Item class={styles.dropdown__menu__item}>Item 2</DropdownMenu.Item>
                                    <DropdownMenu.Item class={styles.dropdown__menu__item} onSelect={logout( { user: props.authUser } )}>
                                        <Text message="a_logout" />
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>

                        <DashItems expanded={true} authUser={props.authUser}/>
                        <LogoutSideBarItem user={props.authUser} getExpanded={true} sectionSelected=""/>
                    </Drawer.Description>
                </Drawer.Content>
            </Drawer>
        </>
    );
};

export default SideBar;
