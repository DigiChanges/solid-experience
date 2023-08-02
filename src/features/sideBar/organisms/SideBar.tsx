import { Component, createEffect, createSignal, JSX, Show } from 'solid-js';
import LogoutSideBarItem from '../../auth/logout/molecules/LogoutSideBarItem';
import DashItems from '../../shared/layout/DashItems/DashItems';
import styles from './SideBar.module.css';
import useTranslation from '../../shared/hooks/useTranslation';
import { Drawer } from '@hope-ui/core';
import DropdownMenu from '../../shared/molecules/DropdownMenu/DropdownMenu';
import { FaSolidAngleDown } from 'solid-icons/fa';
import { LoginApi } from '../../auth/interfaces/login';

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
    const { translate: t } = useTranslation();
    const [authUser, setAuthUser] = createSignal<LoginApi>();

    createEffect(() =>
    {
        const data = sessionStorage.getItem('userData');
        if (data)
        {
            setAuthUser(JSON.parse(data));
        }
    });

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
                        <div class={'w-auto h-[35px] mx-[1rem] mb-2'}>
                            <DropdownMenu
                                items={[]}
                                icon={<FaSolidAngleDown />}
                                title={<span class={'text-white font-bold'}>alexis</span>}
                                class={'w-[256px]'}
                            />
                        </div>
                        <DashItems expanded={true}/>
                    </div>
                    <div class="justify-self-end">
                        <LogoutSideBarItem user={authUser()} getExpanded={true} sectionSelected=""/>
                    </div>
                </Drawer.Content>
            </Drawer>
        </></Show>
    );
};

export default SideBar;
