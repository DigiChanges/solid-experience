import { Component, JSX, Show } from 'solid-js';
import LogoutSideBarItem from '../../auth/logout/molecules/LogoutSideBarItem';
import DashItems from '../../shared/layout/DashItems/DashItems';
import styles from './SideBar.module.css';
import { Drawer } from '@hope-ui/core';
import DropdownMenu from '../../shared/molecules/DropdownMenu/DropdownMenu';
import { FaSolidAngleDown } from 'solid-icons/fa';
import { useContext } from '../../../context';

interface SideBarProps
{
    showInMobile?: boolean;
    children?: JSX.Element;
    close: () => void;
    isOpen: () => boolean;
    open: () => void;
}

const SideBar: Component<SideBarProps> = (props) =>
{
    const context = useContext();

    return (
        <Show when={true}><>
            <Drawer
                isOpen={ props.isOpen() }
                placement={'left'}
                onClose={ props.close }
                size="xs"
            >
                <Drawer.Overlay _dark={{ bgColor: 'rgba(0, 0, 0, 0.65)' }}/>
                <Drawer.Content class={styles.drawer_content} _dark={{ bgColor: 'neutral.800' }}>
                    <Drawer.CloseButton class={styles.close_button}/>
                    <div>
                        <div class={styles.menu_container}>
                            <DropdownMenu
                                items={[]}
                                icon={<FaSolidAngleDown />}
                                title={<span class={styles.menu_text}>{ context?.userData.email ?? 'user@node.com' }</span>}
                                class={styles.dropdown_menu}
                            />
                        </div>
                        <DashItems expanded={true}/>
                    </div>
                    <div class={styles.logout_container}>
                        <LogoutSideBarItem getExpanded={true} sectionSelected=""/>
                    </div>
                </Drawer.Content>
            </Drawer>
        </></Show>
    );
};

export default SideBar;
