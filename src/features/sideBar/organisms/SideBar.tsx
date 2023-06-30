import { Component, JSX } from 'solid-js';
import LogoutSideBarItem from '../../auth/logout/molecules/LogoutSideBarItem';
import DashItems from '../../shared/layout/DashItems/DashItems';
import styles from './SideBar.module.css';
import { useI18n } from '@solid-primitives/i18n';
import { Drawer } from '@hope-ui/core';
import { logout } from '../../navBar/organisms/handlers';
import DropdownMenu from '../../shared/molecules/DropdownMenu/DropdownMenu';
import { FaSolidAngleDown } from 'solid-icons/fa';

interface SideBarProps {
    authUser: any;
    showInMobile?: boolean;
    children?: JSX.Element;
    close: () => void;
    isOpen: () => boolean;
    open: () => void;
}

const SideBar: Component<SideBarProps> = (props) =>
{
    const [t] = useI18n();

    const items: never[] = [
        // {
        //     children: {t('Item 1')},
        //     onSelect: {},
        // },
        // {
        //     children: {t('Item 2')},
        //     onSelect: {},
        // },
        // {
        //     children: {t('a_logout') as string},
        //     onSelect: logout( { user: props.authUser } )
        // },
    ];

    return (
        <>
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
                        <div class={'w-auto h-[35px] mx-[1rem] mb-2'}>
                            <DropdownMenu
                                items={items}
                                icon={<FaSolidAngleDown />}
                                title={<span class={'text-white font-bold'}>{props.authUser.user.email}</span>}
                                class={'w-[256px]'}
                            />
                        </div>
                        <DashItems expanded={true} authUser={props.authUser}/>
                    </div>
                    <div class="justify-self-end">
                        <LogoutSideBarItem user={props.authUser} getExpanded={true} sectionSelected=""/>
                    </div>
                </Drawer.Content>
            </Drawer>
        </>
    );
};

export default SideBar;
