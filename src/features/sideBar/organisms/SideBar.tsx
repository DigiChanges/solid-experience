import { Component, JSX } from 'solid-js';
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
            >
                <Drawer.Overlay />
                <Drawer.Content class={styles.drawer_content}>
                    <Drawer.CloseButton/>
                    <Drawer.Description>
                        <div class={styles.menu}>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger class="dropdown-menu__trigger">
                                    <span>{props.authUser.user.email ?? ''}</span>
                                    <DropdownMenu.Icon class="dropdown-menu__trigger-icon"><IconChevronDown /></DropdownMenu.Icon>
                                </DropdownMenu.Trigger>

                                    <DropdownMenu.Content class="dropdown-menu__content">
                                        <DropdownMenu.Item class="dropdown-menu__item">Item 1</DropdownMenu.Item>
                                        <DropdownMenu.Item class="dropdown-menu__item">Item 2</DropdownMenu.Item>
                                        <DropdownMenu.Item class="dropdown-menu__item" onSelect={logout( { user: props.authUser } )}>
                                            <Text message="a_logout" />
                                        </DropdownMenu.Item>
                                    </DropdownMenu.Content>

                            </DropdownMenu.Root>
                        </div>
                        <DashItems expanded={true} authUser={props.authUser}/>
                        <LogoutSideBarItem user={props.authUser} getExpanded={true} sectionSelected=""/>
                    </Drawer.Description>
                </Drawer.Content>
            </Drawer>
        </>
    );
};

export default SideBar;
