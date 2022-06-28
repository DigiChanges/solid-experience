import { Icon, IconButton, Menu, MenuContent, MenuItem, MenuTrigger } from '@hope-ui/solid';
import { Link } from 'solid-app-router';
import { Text } from 'solid-i18n';
import { Component } from 'solid-js';
import logoNav from '../../../assets/images/dgc_logo.png';
import IconBell from '../../../atoms/Icons/Stroke/IconBell';
import IconBurger from '../../../atoms/Icons/Stroke/IconBurger';
import IconChevronDown from '../../../atoms/Icons/Stroke/IconChevronDown';
import IconCross from '../../../atoms/Icons/Stroke/IconCross';
import { useApplicationContext } from '../../../context/context';
import LanguageMenu from '../../language/LanguageMenu';
import { logout } from './handlers';
import styles from './Nav.module.css';

interface NavbarTemplateProps {
    email?: string;
    onClick?: ( event: MouseEvent ) => void;
    permissionsList?: string[];
    sideBarIsShown: boolean;
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

                <div class={styles.menu}>
                    <Menu>
                        <MenuTrigger>
                            <span>{props.email ?? ''}</span>
                            <Icon><IconChevronDown /></Icon>
                        </MenuTrigger>
                        <MenuContent>
                            <MenuItem>
                                Item 1
                            </MenuItem>
                            <MenuItem>
                                Item 2
                            </MenuItem>
                            <MenuItem
                                onSelect={logout( { user: user() } )}
                            >
                                <Text message="a_logout" />
                            </MenuItem>
                        </MenuContent>
                    </Menu>
                </div>

                <IconButton
                    class={styles.icon_burger}
                    onClick={props.onClick}
                    aria-label="Open Main Menu"
                    icon={!props.sideBarIsShown ? <IconBurger/> : <IconCross/>}
                    variant="ghost"
                    compact
                />

            </section>
        </nav>
    );
};

export default NavBar;
