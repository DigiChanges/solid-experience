import { Component, createSignal, For, Show } from 'solid-js';
import HasPermission from '../../../atoms/HasPermission';
import SideBarItem from '../../../molecules/SideBarItem';
import SideBarSubItem from '../../../molecules/SideBarSubItem';
import { dashRoutes } from '../../../config/dashRoutes';
import { useLocation } from 'solid-app-router';

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
        <div class="flex flex-col justify-start h-full">

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
                                <div class="flex flex-row">
                                    <div class="w-full">
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
                                    </div>
                                </div>
                            </Show>
                        </SideBarItem>
                    </HasPermission>
                }
            </For>
        </div>
    );
};

export default DashItems;
