import { Text } from 'solid-i18n';
import { Component, createSignal, Show } from 'solid-js';
import logoNav from '../../../assets/images/logo-nav.png';
import IconBell from '../../../atoms/Icons/Stroke/IconBell';
import IconBurger from '../../../atoms/Icons/Stroke/IconBurger';
import IconChevronDown from '../../../atoms/Icons/Stroke/IconChevronDown';
import IconCross from '../../../atoms/Icons/Stroke/IconCross';
import Image from '../../../atoms/Image';
import { useApplicationContext } from '../../../context/context';
import { logout } from './handlers';

interface NavbarTemplatePRops {
    email?: string;
    onClick?: ( event: MouseEvent ) => void;
    permissionsList?: string[];
    showSidebar: boolean;
}

const NavBar: Component<NavbarTemplatePRops> = props =>
{
    const [ user ] = useApplicationContext();
    const [ getToggledDrop, setToggleDrop ] = createSignal( false );

    return (
        <nav class=" shadow-md text-white " >
            <div class="mx-auto px-2 sm:px-6 lg:px-8">
                <div class="relative dg-full-center-flex h-16">

                    <div class="flex-1 flex items-start justify-start sm:items-stretch sm:justify-start">
                        <div class="flex-shrink-0 flex items-center  cursor-pointer">
                            <a href="/">
                                <Image src={logoNav} alt="digichanges logo" class="block h-8 w-auto"/>
                            </a>
                        </div>
                    </div>

                    <div class="absolute flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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

                    <div class="absolute inset-y-0 p-3 right-0 flex items-center md:hidden">
                        <button
                            onClick={props.onClick}
                            type="button"
                            class="items-center justify-center rounded-md text-gray-400 hover:text-white w-6 h-6"
                        >
                            <span class="sr-only">Open Main Menu</span>
                            <Show when={!props.showSidebar} fallback={ <IconCross /> }>
                                <IconBurger/>
                            </Show>
                        </button>
                    </div>
                </div>
            </div>
        </nav >
    );
};

export default NavBar;
