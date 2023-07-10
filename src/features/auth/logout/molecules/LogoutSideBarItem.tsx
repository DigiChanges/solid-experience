import { Component } from 'solid-js';
import IconLogout from '../../../../atoms/Icons/Stroke/IconLogout';
import SideBarItem from '../../../sideBar/molecules/SideBarItem/SideBarItem';
import { logout } from './handlers';

type LogoutSideBarItemProps = {
    user: any;
    getExpanded: any;
    sectionSelected: string;
};

const LogoutSideBarItem: Component<LogoutSideBarItemProps> = (props) => (
    <SideBarItem
        name="a_logout"
        icon={IconLogout}
        isLoading={false}
        onClick={logout({ user: props.user })}
        getShowSubItems={false}
        routes=""
        showItem={true}
        isLink={false}
        path="/logout"
        expanded={props.getExpanded}
        sectionSelected={props.sectionSelected}
        hideChevron
    />
);

export default LogoutSideBarItem;
