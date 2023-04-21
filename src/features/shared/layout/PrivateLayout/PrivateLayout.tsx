import { Component, createSignal, JSX } from 'solid-js';
import { useApplicationContext } from '../../../../context/context';
import Footer from '../../../footer/organisms/Footer';
import NavBar from '../../../navBar/organisms/NavBar';
import SideBar from '../../../sideBar/organisms/SideBar';
import styles from './PrivateLayout.module.css';
import { createDisclosure } from '@hope-ui/core';
import { Link } from 'solid-app-router';

interface privateTemplateProps {
    children: JSX.Element | JSX.Element[];
}

const PrivateLayout: Component<privateTemplateProps> = ( props ) =>
{
    const [ showSidebar ] = createSignal( false );
    const { isOpen, open, close } = createDisclosure();
    const [ authUser ] = useApplicationContext();

    return (
        <div class={styles.container}>
            <header class={styles.header}>
                <NavBar sideBarIsShown={showSidebar()} isOpen={isOpen} onClick={open} email={'example@mail.com'} />
            </header>

            <div class={styles.main_container}>

                <div class={styles.sidebar_container}>
                    <SideBar showInMobile={showSidebar()} authUser={authUser()} isOpen={ isOpen } open={ open } close={ close }/>
                </div>

                <main class={styles.main}>
                    {props.children}
                </main>
                <Footer class={styles.footer}>
                    {new Date().getFullYear()}{' © '}{<Link target={'_blank'} href={'https://digichanges.com'}>DigiChanges</Link>}
                </Footer>
            </div>
        </div>
    );
};

export default PrivateLayout;
