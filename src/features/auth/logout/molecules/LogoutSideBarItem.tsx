import { Component } from 'solid-js';
import IconLogout from '../../../shared/atoms/Icons/Stroke/IconLogout';
import SideBarItem from '../../../sideBar/molecules/SideBarItem/SideBarItem';
import { logout } from './handlers';
import { useNavigate } from 'solid-start';

type LogoutSideBarItemProps = {
    getExpanded: any;
    sectionSelected: string;
};

const LogoutSideBarItem: Component<LogoutSideBarItemProps> = (props) =>
{
	const navigate = useNavigate();

	return (<SideBarItem
		name="a_logout"
		icon={IconLogout}
		isLoading={false}
		onClick={() => logout(navigate)}
		getShowSubItems={false}
		routes=""
		showItem={true}
		isLink={false}
		path="/logout"
		expanded={props.getExpanded}
		sectionSelected={props.sectionSelected}
		hideChevron
	/>);
};

export default LogoutSideBarItem;
