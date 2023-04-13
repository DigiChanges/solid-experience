import { Component, JSX } from 'solid-js';
import LogoutSideBarItem from '../../auth/logout/molecules/LogoutSideBarItem';
import DashItems from '../../shared/layout/DashItems/DashItems';
import styles from './SideBar.module.css';
import { Text } from 'solid-i18n';
import { Drawer, Icon } from '@hope-ui/core';
import { logout } from '../../navBar/organisms/handlers';
import IconChevronDown from '../../../atoms/Icons/Stroke/IconChevronDown';
import DropdownMenu from '../../shared/molecules/DropdownMenu/DropdownMenu';

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
    const items = [
        {
            children: <Text message="Item 1" />,
            onSelect: {},
        },
        {
            children: <Text message="Item 2" />,
            onSelect: {},
        },
        {
            children: <Text message="a_logout" />,
            onSelect: logout( { user: props.authUser } ),
        },
    ];

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
                        <div class={'w-fit h-[35px] min-w-[250px] pl-[1rem] mb-2'}>
                            <DropdownMenu
                                items={items}
                                icon={<Icon><IconChevronDown /></Icon>}
                                title={<span>{props.authUser.user.email}</span>}
                            />
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
