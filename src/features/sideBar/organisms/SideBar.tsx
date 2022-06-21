import { Component, createSignal, JSX } from 'solid-js';
import LogoutSideBarItem from '../../auth/logout/molecules/LogoutSideBarItem';
import DashItems from '../../shared/layout/DashItems/DashItems';
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
            class={`${styles.side_nav} dg-rounded`}
            classList={{
                [styles.hidden]: !props.showInMobile,
                [styles.expanded]: getExpanded(),
            }}
        >
            <ExpandButton getExpanded={getExpanded()} setExpanded={setExpanded} />
            <DashItems expanded={getExpanded()} authUser={props.authUser} />
            <div class={styles.logout_container}>
                <LogoutSideBarItem user={props.authUser} getExpanded={getExpanded()} sectionSelected=""/>
            </div>
        </nav>
    );
};

export default SideBar;
