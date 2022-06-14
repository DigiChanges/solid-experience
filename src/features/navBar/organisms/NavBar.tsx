import { Component, createSignal, Show } from 'solid-js';
import { Text } from 'solid-i18n';
import { Box, Flex, Heading } from '@hope-ui/solid';
import logoNav from '../../../assets/images/logo-nav.png';
import IconBell from '../../../atoms/Icons/Stroke/IconBell';
import IconBurger from '../../../atoms/Icons/Stroke/IconBurger';
import IconChevronDown from '../../../atoms/Icons/Stroke/IconChevronDown';
import IconCross from '../../../atoms/Icons/Stroke/IconCross';
import { useApplicationContext } from '../../../context/context';
import LanguageMenu from '../../language/LanguageMenu';
import { logout } from './handlers';
import { Image } from '@hope-ui/solid';

interface NavbarTemplateProps {
    email?: string;
    onClick?: ( event: MouseEvent ) => void;
    permissionsList?: string[];
    sideBarIsShown: boolean;
}

const NavBar: Component<NavbarTemplateProps> = props =>
{
    const [ user ] = useApplicationContext();
    const [ getToggledDrop, setToggleDrop ] = createSignal( false );

    return (
        <>
            <Box as="nav" boxShadow="$md">
                <Flex margin="auto" height="$16" justifyContent="space-around">
                    <Flex alignItems="start" flexGrow="1" flexShrink="1" flexBasis="0" justifyContent="start" class="sm:items-stretch sm:justify-start">
                        <Flex cursor="pointer" flexShrink="0" alignItems="center" class="cursor-pointer">
                            <Box as="a" href="/" marginRight="$5">
                                <Image width="auto" height="$8" src={logoNav} alt="digichanges-logo" />
                            </Box>
                            <Heading level="1" class="text-gray-400">DIGICHANGES</Heading>
                        </Flex>
                    </Flex>

                    <LanguageMenu />

                    <Box class="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button class="p-1 rounded-full text-gray-400 hover:text-white h-8 w-8 hidden md:block lg:block">
                            <span class="sr-only">View notifications</span>
                            <span>
                                <span class="ml-1 animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-600 opacity-75 " />
                                <span class="ml-1 absolute inline-flex rounded-full h-2 w-2 bg-blue-500" />
                                <span class=""><IconBell /></span>
                            </span>
                        </button>
                    </Box>

                    {/* email and open-close dropdown button */}
                    <Box class="hidden md:block lg:block ml-3 text-main-gray-200 font-bold">
                        <div>
                            <Show when={getToggledDrop()} fallback={
                                <button
                                    type="button"
                                    class="inline-flex bg-gray-800 font-bold"
                                    id="user-menu"
                                    aria-expanded="false"
                                    onClick={() => setToggleDrop( true )}>
                                    <span class="sr-only">Open user menu</span>
                                    <span>{props.email ?? ''}</span><span class="text-gray  w-6"><IconChevronDown /></span>
                                </button>
                            }>
                                <button
                                    type="button"
                                    class="inline-flex bg-gray-800 font-bold"
                                    id="user-menu"
                                    aria-expanded="false"
                                    onClick={() => setToggleDrop( false )}>
                                    <span class="sr-only">Open user menu</span>
                                    <span>{props.email ?? ''}</span><span class=" w-6"><IconChevronDown /></span>
                                </button>
                            </Show>
                        </div>


                        <div class="origin-top-right absolute right-0 w-48 py-1 mt-5 shadow-md bg-main-gray-500 text-white z-10"
                            classList={{ hidden: !getToggledDrop() }}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="user-menu">
                            <div role="none">
                                <a href="/" class="block px-4 py-2 text-sm" role="menuitem">Item 1</a>
                                <a href="/" class="block px-4 py-2 text-sm active" role="menuitem">Item 1 active</a>
                                <button type="button"
                                    class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem"
                                    onClick={logout( { user: user() } )}
                                >
                                    <Text message="a_logout" />
                                </button>
                            </div>
                        </div>
                    </Box>

                    <Box class="inset-y-0 p-3 right-0 flex items-center md:hidden">
                        <button
                            onClick={props.onClick}
                            type="button"
                            class="items-center justify-center rounded-md text-gray-400 hover:text-white w-6 h-6"
                        >
                            <span class="sr-only">Open Main Menu</span>
                            <Show when={!props.sideBarIsShown} fallback={ <IconCross /> }>
                                <IconBurger/>
                            </Show>
                        </button>
                    </Box>
                </Flex>
            </Box>
            <Box as="nav" boxShadow="$md">
                <Box class="px-2 sm:px-6 lg:px-8">
                    <Box class="dg-full-center-flex h-16">

                        <Box class="flex-1 flex items-start justify-start sm:items-stretch sm:justify-start">
                            <Box class="flex-shrink-0 flex items-center  cursor-pointer">
                                <a href="/" class="mr-5">
                                    <Image src={logoNav} alt="digichanges logo" class="block h-8 w-auto"/>
                                </a>
                                <h2 class="text-gray-400">DIGICHANGES</h2>
                            </Box>
                        </Box>

                        <LanguageMenu />

                        <div class="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button class="p-1 rounded-full text-gray-400 hover:text-white h-8 w-8 hidden md:block lg:block">
                                <span class="sr-only">View notifications</span>
                                <span>
                                    <span class="ml-1 animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-600 opacity-75 " />
                                    <span class="ml-1 absolute inline-flex rounded-full h-2 w-2 bg-blue-500" />
                                    <span class=""><IconBell /></span>
                                </span>
                            </button>
                        </div>

                        {/* email and open-close dropdown button */}
                        <div class="hidden md:block lg:block ml-3 text-main-gray-200 font-bold">
                            <div>
                                <Show when={getToggledDrop()} fallback={
                                    <button
                                        type="button"
                                        class="inline-flex bg-gray-800 font-bold"
                                        id="user-menu"
                                        aria-expanded="false"
                                        onClick={() => setToggleDrop( true )}>
                                        <span class="sr-only">Open user menu</span>
                                        <span>{props.email ?? ''}</span><span class="text-gray  w-6"><IconChevronDown /></span>
                                    </button>
                                }>
                                    <button
                                        type="button"
                                        class="inline-flex bg-gray-800 font-bold"
                                        id="user-menu"
                                        aria-expanded="false"
                                        onClick={() => setToggleDrop( false )}>
                                        <span class="sr-only">Open user menu</span>
                                        <span>{props.email ?? ''}</span><span class=" w-6"><IconChevronDown /></span>
                                    </button>
                                </Show>
                            </div>


                            <div class="origin-top-right absolute right-0 w-48 py-1 mt-5 shadow-md bg-main-gray-500 text-white z-10"
                                classList={{ hidden: !getToggledDrop() }}
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="user-menu">
                                <div role="none">
                                    <a href="/" class="block px-4 py-2 text-sm" role="menuitem">Item 1</a>
                                    <a href="/" class="block px-4 py-2 text-sm active" role="menuitem">Item 1 active</a>
                                    <button type="button"
                                        class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                                        role="menuitem"
                                        onClick={logout( { user: user() } )}
                                    >
                                        <Text message="a_logout" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="inset-y-0 p-3 right-0 flex items-center md:hidden">
                            <button
                                onClick={props.onClick}
                                type="button"
                                class="items-center justify-center rounded-md text-gray-400 hover:text-white w-6 h-6"
                            >
                                <span class="sr-only">Open Main Menu</span>
                                <Show when={!props.sideBarIsShown} fallback={ <IconCross /> }>
                                    <IconBurger/>
                                </Show>
                            </button>
                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default NavBar;
