import { Component, JSX } from 'solid-js';
import LogoutSideBarItem from '../../auth/logout/molecules/LogoutSideBarItem';
import DashItems from '../../shared/layout/DashItems/DashItems';
import { Icon, Menu, MenuContent, MenuItem, MenuTrigger } from '@hope-ui/solid';
import styles from './SideBar.module.css';
import { Text } from 'solid-i18n';
import {
    Drawer,
    DrawerOverlay,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader
} from '@hope-ui/solid';
import { logout } from '../../navBar/organisms/handlers';
import IconChevronDown from '../../../atoms/Icons/Stroke/IconChevronDown';

interface SideBarProps {
    authUser: any;
    showInMobile?: boolean;
    children?: JSX.Element;
    onClose: () => void;
    isOpen: () => boolean;
    onOpen: () => void;
}

const SideBar: Component<SideBarProps> = ( props ) =>
{
    return (
        <>


            <Drawer
                opened={ props.isOpen() }
                placement={'left'}
                onClose={ props.onClose }
            >

                <DrawerOverlay />
                <DrawerContent class={styles.drawer_content}>
                    <DrawerCloseButton/>
                    <DrawerHeader />
                    <DrawerBody>
                        <div class={styles.menu}>
                            <Menu>
                                <MenuTrigger>
                                    <span>{props.authUser.user.email ?? ''}</span>
                                    <Icon><IconChevronDown /></Icon>
                                </MenuTrigger>
                                <MenuContent>
                                    <MenuItem>
                                Item 1
                                    </MenuItem>
                                    <MenuItem>
                                Item 2
                                    </MenuItem>
                                    <MenuItem
                                        onSelect={logout( { user: props.authUser } )}
                                    >
                                        <Text message="a_logout" />
                                    </MenuItem>
                                </MenuContent>
                            </Menu>
                        </div>
                        <DashItems expanded={true} authUser={props.authUser}/>
                    </DrawerBody>
                    <DrawerFooter>
                        <LogoutSideBarItem user={props.authUser} getExpanded={true} sectionSelected=""/>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default SideBar;
