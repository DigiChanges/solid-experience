import { Component, createSignal, JSX } from 'solid-js';
import { useApplicationContext } from '../../../../context/context';
import Footer from '../../../footer/organisms/Footer';
import NavBar from '../../../navBar/organisms/NavBar';
import SideBar from '../../../sideBar/organisms/SideBar';
import styles from './PrivateLayout.module.css';

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
        <div class={styles.container}>
            <header class={styles.header}>
                <NavBar sideBarIsShown={showSidebar()} onClick={toggleShowSideBar} email={'example@mail.com'} />
            </header>

            <div class={styles.main_container}>

                <div class={styles.sidebar_container}>
                    <SideBar showInMobile={showSidebar()} authUser={authUser()}/>
                </div>

                <main class={styles.main}>
                    {props.children}
                </main>
                <Footer class={styles.footer}>
                    {new Date().getFullYear()} © DigiChanges
                </Footer>
            </div>
        </div>
    );
};

export default PrivateLayout;
