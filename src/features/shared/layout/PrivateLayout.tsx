import { Component, createSignal, JSX, Show } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import LogoutSideBarItem from '../../auth/logout/molecules/LogoutSideBarItem';
import Footer from '../../footer/organisms/Footer';
import NavBar from '../../navBar/organisms/NavBar';
import ExpandButton from '../../sideBar/organisms/ExpandButton';
import SideBar from '../../sideBar/organisms/SideBar';
import DashItems from './DashItems';

interface privateTemplateProps {
    children: JSX.Element | JSX.Element[];
}

const PrivateLayout: Component<privateTemplateProps> = ( props ) =>
{
    const [ showSidebar, setShowSideBar ] = createSignal( false );
    const [ getExpanded, setExpanded ] = createSignal( true );
    const [ authUser ] = useApplicationContext();

    const toggleShowSideBar = () =>
    {
        setShowSideBar( !showSidebar() );
    };

    return (
        <div class="grid grid-flow-row">
            <header>
                <div class="lg:max-w-screen-xxl lg:w-full lg:mx-auto xl:px-6">
                    <NavBar sideBarIsShown={showSidebar()} onClick={toggleShowSideBar} email={'example@mail.com'} />
                </div>
            </header>

            <div class="grid grid-areas-mobile-layout md:grid-areas-tablet-layout lg:grid-areas-desktop-layout grid-cols-desktop-layout
        h-full dg-main-bg lg:max-w-screen-xl lg:w-full lg:mx-auto">

                <div class="grid-in-sidebar hidden md:block mt-6 z-10 w-max">
                    <SideBar class="dg-rounded h-89 py-5" getExpanded={getExpanded()}>
                        <ExpandButton getExpanded={getExpanded()} setExpanded={setExpanded} />
                        <div class="flex flex-col h-full justify-between pb-5">
                            <div classList={{ 'mt-8': !getExpanded() }}>
                                <DashItems expanded={getExpanded()} authUser={authUser} />
                            </div>
                            <LogoutSideBarItem user={authUser()} getExpanded={getExpanded()} sectionSelected=""/>
                        </div>
                    </SideBar>
                </div>

                <div class="grid-in-sidebar absolute md:hidden mt-20 md:m-4 z-50 ">
                    <Show when={showSidebar()} >
                        <SideBar class="relative ml-5 dg-rounded min-h-80vh py-5 w-48" getExpanded={true}>
                            <DashItems expanded={true} authUser={authUser} />
                            <LogoutSideBarItem user={authUser()} getExpanded={true} sectionSelected=""/>
                        </SideBar>
                    </Show>
                </div>
                <main class="grid-in-main w-full">
                    {props.children}
                </main>
                <Footer class="flex grid-in-footer border m-4 w-auto p-4 text-sm text-gray-200 items-end justify-center">
                    {new Date().getFullYear()} © DigiChanges
                </Footer>
            </div>
        </div>
    );
};

export default PrivateLayout;
