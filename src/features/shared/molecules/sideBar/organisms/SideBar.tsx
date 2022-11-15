import { Component, createSignal, JSX } from 'solid-js';
import LogoutSideBarItem from '../../auth/logout/molecules/LogoutSideBarItem';
import DashItems from '../../../layout/DashItems/DashItems';
import Card from '../../Card/Card';
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
            <Card
                class={styles.side_nav}
                classList={{
                    [styles.hidden]: !props.showInMobile,
                    [styles.not_expanded]: !getExpanded(),
                }}
            >
                <ExpandButton getExpanded={getExpanded()} setExpanded={setExpanded}/>
                <DashItems expanded={getExpanded()} authUser={props.authUser}/>
                <div class={styles.logout_container}>
                    <LogoutSideBarItem user={props.authUser} getExpanded={getExpanded()} sectionSelected=""/>
                </div>
            </Card>

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
