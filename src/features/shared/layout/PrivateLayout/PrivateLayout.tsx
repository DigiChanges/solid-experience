import { Component, createSignal, JSX } from 'solid-js';
import { A } from 'solid-start';
import Footer from '../../../footer/organisms/Footer';
import NavBar from '../../../navBar/organisms/NavBar';
import SideBar from '../../../sideBar/organisms/SideBar';
import styles from './PrivateLayout.module.css';
import { createDisclosure } from '@hope-ui/core';
import { ErrorBoundary } from 'solid-start/error-boundary';
import AlertErrors from '../../molecules/AlertErrors/AlertErrors';

interface privateTemplateProps
{
    children: JSX.Element | JSX.Element[];
}

const PrivateLayout: Component<privateTemplateProps> = (props) =>
{
    const [showSidebar] = createSignal(false);
    const { isOpen, open, close } = createDisclosure();

    return (
        <ErrorBoundary fallback={(e: Error) => (
            <>
                <AlertErrors
                    errorData={e.message}
                    title="err"
                    description="err_process_user"
                />
            </>
        )}>
            <div class={styles.container}>
                <header class={styles.header}>
                    <NavBar sideBarIsShown={showSidebar()} isOpen={isOpen} onClick={open} email={'example@mail.com'} />
                </header>

                <div class={styles.main_container}>

                    <div class={styles.sidebar_container}>
                        <SideBar showInMobile={showSidebar()} isOpen={ isOpen } open={ open } close={ close }/>
                    </div>

                    <main class={styles.main}>
                        {props.children}
                    </main>

                    <Footer class={styles.footer}>
                        {new Date().getFullYear()}{' © '}{<A target={'_blank'} href={'https://digichanges.com'}>DigiChanges</A>}
                    </Footer>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default PrivateLayout;
