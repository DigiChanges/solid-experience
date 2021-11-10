// import Breadcrumb from "../../molecules/Breadcrumb";
// import HasPermission from "../../atoms/HasPermission";

import { Component, createSignal, For } from 'solid-js';
import IconHome from '../../atoms/Icons/Stroke/IconHome';
import { dashRoutes } from '../../config/dashRoutes';
import SideBarItem from '../../molecules/SideBarItem';
import Footer from '../../organisms/Footer';
import NavBar from '../../organisms/NavBar';
import SideBar from '../../organisms/SideBar';

const PrivateLayout: Component = (props) => {    // const dispatch = useDispatch()
    // const { user, userPermissions } = useSelector((state : any) => state.Auth);
    // const { showSidebar } = useSelector((state : any) => state.Menu);
    // const { modalData, isLoading } = useSelector((state : any) => state.General);
    const [showSidebar, setShowSideBar] = createSignal(false);
    const onClick = () =>
    {
        setShowSideBar(!showSidebar());
    };
    const getDashItems = () =>
        <For each={dashRoutes} fallback={<div>Loading...</div>}>
            {(item) =>
            // <HasPermission
            //   key={rKey}
            //   permission={route.permission}
            //   user={user}
            //   userPermissions={userPermissions}
            // >

                <SideBarItem
                    name={item.name}
                    path={item.path}
                    icon={item.icon}
                    isToggled={false}
                    isLoading={true}
                >
                </SideBarItem>


            }
        </For>;
    return (
        <div class="grid grid-areas-mobile-layout md:grid-areas-tablet-layout lg:grid-areas-desktop-layout grid-cols-desktop-layout
        h-full dg-main-bg">
            <header class="grid-in-header dg-element-bg">
                <NavBar showSidebar={showSidebar()} onClick={onClick} email={user?.email} />
            </header>
            <div class="hidden md:block mt-6 ml-4 z-10 w-max grid-in-sidebar text-white">
                <SideBar class="dg-rounded ml-1 h-89 py-5">
                    {getDashItems()}

                </SideBar>
            </div>
            {showSidebar() && (
                <div class="absolute md:hidden mt-20 md:m-4 z-50 ">
                    <SideBar class="relative ml-5 dg-rounded min-h-80vh  py-5 w-48 pb-20">
                        {getDashItems()}

                    </SideBar>
                </div>
            )}
            {/* {showSidebar() ? (

                <SideBar class="hidden text-white"/>

            ) : (
                <div class="absolute md:block mt-20 md:m-4 z-10 text-white ">
                    <SideBar class="ml-5 dg-rounded h-89 py-5 w-48" />
                    <SideBar class="ml-5 dg-rounded h-89 py-5 w-48">
                        {getDashItems()}
                    </SideBar>
                </div>
            )} */}
            {/* <main class="grid-in-main min-h-screen w-full">
      <Breadcrumb class="pt-5 text-gray-500 lg:text-base ml-2 md:ml-4" />
      {children}
    </main> */}
            <Footer class="flex grid-in-footer border m-4 w-auto p-4 text-sm text-gray-200 rounded justify-center">
        2021 © DigiChanges
            </Footer>
            {/* <ConfirmDelete
      open={modalData?.open}
      idSelected={modalData?.idSelected}
      text={modalData?.text}
      action={modalData?.action} 
    />*/}
        </div>
    );
};

export default PrivateLayout;
