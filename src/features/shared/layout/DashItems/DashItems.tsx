import { useLocation } from 'solid-app-router';
import { Component, createSignal, For, Show } from 'solid-js';
import HasPermission from '../../../../atoms/HasPermission';
import { dashRoutes } from '../../../../config/dashRoutes';
import SideBarItem from '../../../sideBar/molecules/SideBarItem/SideBarItem';
import SideBarSubItem from '../../../sideBar/molecules/SideBarSubItem/SideBarSubItem';
import styles from './DashItems.module.css';

const isEqualPath = ( { locationPath, itemPath }: {locationPath: string; itemPath: string} ) =>
{
    return locationPath.replace( /\//g, '' ) === itemPath.replace( /\//g, '' );
};

type DashItemsProps = {
    authUser: any;
    expanded: boolean;
};

const DashItems: Component<DashItemsProps> = ( props ) =>
{
    const [ getShowSubitems, setShowSubitems ] = createSignal( false );
    const [ sectionSelected, setSectionSelected ] = createSignal( '' );
    const location = useLocation();

    const onToggled = ( path: string ) =>
    {
        setShowSubitems( true );
        setSectionSelected( path );
    };

    return (
        <div class={styles.dash_item_container}>
            <For each={dashRoutes}>
                {( dashRoute: any ) =>
                    <HasPermission
                        permission={dashRoute.permission as string}
                        user={props.authUser}
                        userPermissions={props.authUser.user.permissions}
                    >
                        <SideBarItem
                            name={dashRoute.name as string}
                            icon={dashRoute.icon}
                            isLoading={true}
                            onClick={() => ( onToggled( dashRoute.path ) )}
                            getShowSubitems={getShowSubitems()}
                            routes={dashRoute}
                            showItem={dashRoute.showItem as boolean}
                            isLink={!dashRoute.children}
                            path={ dashRoute.path }
                            expanded={props.expanded}
                            sectionSelected={sectionSelected()}
                        >
                            <Show when={getShowSubitems() && sectionSelected() === dashRoute.path}>
                                <For each={dashRoute.children}>
                                    {( childrenDashRoute: any ) =>
                                        <HasPermission
                                            permission={childrenDashRoute.permission}
                                            user={props.authUser}
                                            userPermissions={props.authUser.user.permissions}
                                        >
                                            <SideBarSubItem
                                                name={childrenDashRoute.name}
                                                path={sectionSelected().concat( childrenDashRoute.path )}
                                                icon={childrenDashRoute.icon}
                                                isToggled={true}
                                                showItem={childrenDashRoute.showItem}
                                                expanded={props.expanded}
                                                equalPath={isEqualPath( {
                                                    locationPath: location.pathname,
                                                    itemPath: sectionSelected().concat( childrenDashRoute.path ),
                                                } )}
                                            />
                                        </HasPermission>
                                    }
                                </For>
                            </Show>
                        </SideBarItem>
                    </HasPermission>
                }
            </For>
        </div>
    );
};

export default DashItems;
