import { IconButton } from '@hope-ui/core';
import { Link } from '@solidjs/router';
import { Component } from 'solid-js';
import logoNav from '../../../assets/images/dgc_logo.png';
import IconBell from '../../../atoms/Icons/Stroke/IconBell';
import IconBurger from '../../../atoms/Icons/Stroke/IconBurger';
import LanguageMenu from '../../language/LanguageMenu';
import styles from './Nav.module.css';

interface NavbarTemplateProps
{
    email?: string;
    onClick?: (event: MouseEvent) => void;
    permissionsList?: string[];
    sideBarIsShown: boolean;
    isOpen: () => boolean;
}

const NavBar: Component<NavbarTemplateProps> = props =>
{
    return (
        <nav class={styles.nav}>
            <section class={styles.logo_container}>
                <Link href="/">
                    <img class={styles.logo} src={logoNav} alt="digichanges logo"/>
                </Link>
                <Link href="/">DIGICHANGES</Link>
            </section>
            <section class={styles.nav_container}>
                <LanguageMenu />
                <IconButton
                    size={'md'}
                    class={styles.icon_bell}
                    aria-label="View notifications"
                    children={<IconBell/>}
                    borderRadius={'4px'}
                    _dark={{ border: 'none', bgColor: 'transparent', color: 'primary.200' }}
                    _hover={{ cursor: 'pointer' }}
                />
                <IconBurger isOpened={!props.isOpen()} onClick={ props.onClick }/>
            </section>
        </nav>
    );
};

export default NavBar;
