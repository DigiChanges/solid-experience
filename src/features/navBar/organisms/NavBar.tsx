import { Icon, IconButton, Menu, MenuContent, MenuItem, MenuTrigger } from '@hope-ui/solid';
import { Link } from 'solid-app-router';
import { Text } from 'solid-i18n';
import { Component } from 'solid-js';
import logoNav from '../../../assets/images/dgc_logo.png';
import IconBell from '../../../atoms/Icons/Stroke/IconBell';
import IconBurger from '../../../atoms/Icons/Stroke/IconBurger';
import IconChevronDown from '../../../atoms/Icons/Stroke/IconChevronDown';
import { useApplicationContext } from '../../../context/context';
import LanguageMenu from '../../language/LanguageMenu';
import { logout } from './handlers';
import styles from './Nav.module.css';

interface NavbarTemplateProps {
    email?: string;
    onClick?: ( event: MouseEvent ) => void;
    permissionsList?: string[];
    sideBarIsShown: boolean;
    isOpen?: boolean;
}

const NavBar: Component<NavbarTemplateProps> = props =>
{
    const [ user ] = useApplicationContext();

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
                    class={styles.icon_bell}
                    aria-label="View notifications"
                    icon={<IconBell/>}
                    variant="ghost"
                    compact
                />

                <IconButton
                    class={styles.icon_burger}
                    onClick={ props.onClick }
                    aria-label="Open Main Menu"
                    icon={ <IconBurger isOpened={!props.isOpen()}/> }
                    variant="ghost"
                    compact
                />

            </section>
        </nav>
    );
};

export default NavBar;
