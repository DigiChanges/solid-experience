import { Component, createSignal, JSX } from 'solid-js';
import LogoutSideBarItem from '../../auth/logout/molecules/LogoutSideBarItem';
import DashItems from '../../shared/layout/DashItems';
import ExpandButton from './ExpandButton';
import styles from './SideBar.module.css';

interface SideBarProps {
    authUser: any;
    showInMobile?: boolean;
    class?: string;
    children?: JSX.Element;
}

const SideBar: Component<SideBarProps> = ( props ) =>
{
    const [ getExpanded, setExpanded ] = createSignal( true );

    return (
        <nav
            class={`${styles.side_nav} md:block ${props.class} md:flex md:flex-col transition-all`}
            classList={{
                'hidden': !props.showInMobile,
                'md:relative md:w-56': getExpanded(),
            }}
        >
            <ExpandButton getExpanded={getExpanded()} setExpanded={setExpanded} />
            <div class="flex flex-col h-full pb-5">
                <DashItems expanded={getExpanded()} authUser={props.authUser} />
                <div class="flex">
                    <LogoutSideBarItem user={props.authUser} getExpanded={getExpanded()} sectionSelected=""/>
                </div>
            </div>
        </nav>
    );
};

export default SideBar;
