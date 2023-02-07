import { Component, createSignal, JSX } from 'solid-js';
import LogoutSideBarItem from '../../auth/logout/molecules/LogoutSideBarItem';
import DashItems from '../../shared/layout/DashItems/DashItems';
import Card from '../../shared/molecules/Card/Card';
import ExpandButton from '../molecules/ExpandButton/ExpandButton';
import styles from './SideBar.module.css';
import {
    Drawer,
    DrawerOverlay,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader
} from '@hope-ui/solid';

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
    const [ getExpanded, setExpanded ] = createSignal( true );

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
