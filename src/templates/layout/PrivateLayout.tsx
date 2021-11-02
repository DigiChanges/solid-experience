import React from "react";
import Breadcrumb from "../../molecules/Breadcrumb";
import SideBar from "../../organisms/SideBar";
import Footer from "../../organisms/Footer";
import NavBar from "../../organisms/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { setShowSidebar } from '../../redux/menu/actions';
import ConfirmDelete from "../modal/ConfirmDelete";
import SideBarItem from "../../molecules/SideBarItem";
import { dashRoutes } from "../../config/dashRoutes";
import SideBarSubItem from "../../atoms/SideBarSubItem";
import HasPermission from "../../atoms/HasPermission";

const PrivateLayout: React.FC<any> = ({ children }) =>
{
  const dispatch = useDispatch()
  const { user, userPermissions } = useSelector((state : any) => state.Auth);
  const { showSidebar } = useSelector((state : any) => state.Menu);
  const { modalData, isLoading } = useSelector((state : any) => state.General);

  const onClick = () => {
    dispatch(setShowSidebar())
  }

  const getDashItems = () =>
    dashRoutes.map((route, rKey) =>
      <HasPermission
        key={rKey}
        permission={route.permission}
        user={user}
        userPermissions={userPermissions}
      >
        <SideBarItem
          name={route.name}
          path={route.path}
          icon={route.icon}
          isLoading={isLoading}
          >
          {
            route.levels?.map((level, lKey) =>
              <HasPermission
                key={lKey}
                permission={level.permission}
                user={user}
                userPermissions={userPermissions}
              >
                <SideBarSubItem
                  name={level.name}
                  path={level.path}
                  icon={level.icon}
                />
              </HasPermission>
            )
          }
        </SideBarItem>
      </HasPermission>
    )

  return (
      <div className="grid grid-areas-mobile-layout md:grid-areas-tablet-layout lg:grid-areas-desktop-layout grid-cols-desktop-layout
      h-full dg-main-bg">
        <header className="grid-in-header dg-element-bg">
          <NavBar showSidebar={showSidebar} onClick={onClick} email={user?.email} />
        </header>
        <div className="hidden md:block mt-6 ml-4 z-10 w-max grid-in-sidebar">
          <SideBar className="dg-rounded ml-1 h-89 py-5">
            {getDashItems()}
          </SideBar>
        </div>
        {showSidebar ? (

          <SideBar className="hidden" />

        ) : (
          <div className="absolute md:block mt-20 md:m-4 z-10 ">
            <SideBar className="ml-5 dg-rounded h-89 py-5 w-48" />
						<SideBar className="ml-5 dg-rounded h-89 py-5 w-48">
              {getDashItems()}
            </SideBar>
          </div>
        )}
        <main className="grid-in-main min-h-screen w-full">
          <Breadcrumb className="pt-5 text-gray-500 lg:text-base ml-2 md:ml-4" />
          {children}
        </main>
        <Footer className="flex grid-in-footer border m-4 w-auto p-4 text-sm text-gray-200 rounded justify-center">
          2021 © DigiChanges
        </Footer>
				<ConfirmDelete
					open={modalData?.open}
					idSelected={modalData?.idSelected}
					text={modalData?.text}
					action={modalData?.action}
				/>
      </div>
  );
};

export default PrivateLayout;
