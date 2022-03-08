import { useNavigate } from 'solid-app-router';
import { Component } from 'solid-js';
import IconLogout from '../../../../atoms/Icons/Stroke/IconLogout';
import SideBarItem from '../../../../molecules/SideBarItem';
import { logout } from './handlers';

type LogoutSideBarItemProps = {
    user: any;
};

const LogoutSideBarItem: Component<LogoutSideBarItemProps> = ( props ) =>
{
    const navigate = useNavigate();
    return (
        <SideBarItem
            name="Logout"
            icon={IconLogout}
            isLoading={false}
            onClick={logout( { navigate, user: props.user } )}
            getShowSubitems={false}
            routes=""
            showItem={true}
            isLink={false}
            path=""
        />
    );
};

export default LogoutSideBarItem;
