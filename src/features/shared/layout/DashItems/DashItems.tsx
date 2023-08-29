import { useLocation } from 'solid-start';
import { Component, createSignal, For, Show } from 'solid-js';
import { dashRoutes } from '../../../../config/dashRoutes';
import SideBarItem from '../../../sideBar/molecules/SideBarItem/SideBarItem';
import SideBarSubItem from '../../../sideBar/molecules/SideBarSubItem/SideBarSubItem';
import styles from './DashItems.module.css';

const isEqualPath = ({ locationPath, itemPath }: {locationPath: string; itemPath: string}) =>
{
    return locationPath.replace(/\//g, '') === itemPath.replace(/\//g, '');
};

type DashItemsProps = {
    expanded: boolean;
};

const DashItems: Component<DashItemsProps> = (props) =>
{
    const [getShowSubItems, setShowSubItems] = createSignal(false);
    const [sectionSelected, setSectionSelected] = createSignal('');
    const location = useLocation();

    const onToggled = (path: string) =>
    {
        if (path === sectionSelected())
        {
            setShowSubItems(false);
            setSectionSelected('');
        }
        else
        {
            setShowSubItems(true);
            setSectionSelected(path);
        }
    };

    return (
        <div class={styles.dash_item_container}>
            <For each={dashRoutes}>
                {(dashRoute: any) =>
                        <SideBarItem
                            name={dashRoute.name as string}
                            icon={dashRoute.icon}
                            isLoading={true}
                            onClick={() => (onToggled(dashRoute.path))}
                            getShowSubItems={getShowSubItems()}
                            routes={dashRoute}
                            showItem={dashRoute.showItem as boolean}
                            isLink={!dashRoute.children}
                            path={ dashRoute.path }
                            expanded={props.expanded}
                        >
                            <Show when={getShowSubItems() && sectionSelected() === dashRoute.path}>
                                <For each={dashRoute.children}>
                                    {(childrenDashRoute: any) =>
                                            <SideBarSubItem
                                                name={childrenDashRoute.name}
                                                path={sectionSelected().concat(childrenDashRoute.path)}
                                                icon={childrenDashRoute.icon}
                                                isToggled={true}
                                                showItem={childrenDashRoute.showItem}
                                                expanded={props.expanded}
                                                equalPath={isEqualPath({
                                                    locationPath: location.pathname,
                                                    itemPath: sectionSelected().concat(childrenDashRoute.path)
                                                })}
                                            />
                                    }
                                </For>
                            </Show>
                        </SideBarItem>
                }
            </For>
        </div>
    );
};

export default DashItems;
