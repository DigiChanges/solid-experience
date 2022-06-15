import { Component, createSignal, JSX } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import Footer from '../../footer/organisms/Footer';
import NavBar from '../../navBar/organisms/NavBar';
import SideBar from '../../sideBar/organisms/SideBar';

interface privateTemplateProps {
    children: JSX.Element | JSX.Element[];
}

const PrivateLayout: Component<privateTemplateProps> = ( props ) =>
{
    const [ showSidebar, setShowSideBar ] = createSignal( false );
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

                <div class="absolute md:relative mt-6 z-10 w-max">
                    <SideBar class="dg-rounded py-5" showInMobile={showSidebar()} authUser={authUser()}/>
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
