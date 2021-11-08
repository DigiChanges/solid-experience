import IconBurger from '../atoms/Icons/Stroke/IconBurger';
import IconCross from '../atoms/Icons/Stroke/IconCross';
import IconBell from '../atoms/Icons/Stroke/IconCross';
import IconChevronDown from '../atoms/Icons/Stroke/IconCross';

// import Image from "../atoms/Image";

import { Component, createSignal } from 'solid-js';
interface NavbarTemplatePRops {
    email?: string,
    onClick?: ( event: MouseEvent ) => void;
    permissionsList?: string[];
    showSidebar:boolean;
}
const NavBar: Component<NavbarTemplatePRops> = props =>
{

    const [ getToggledDrop, setToggleDrop ] = createSignal( false );

    return (
        <nav class=" shadow-md text-white " >
            <div class="mx-auto px-2 sm:px-6 lg:px-8">
                <div class="relative dg-full-center-flex h-16">
                    <div class="flex-1 flex items-start justify-start sm:items-stretch sm:justify-start">

                        <div class="flex-shrink-0 flex items-center  cursor-pointer">
                            {/* <a href="/"> <Image image={"/logonav.png"} alt="" class="block h-8 w-auto" /></a> */}
                        </div>
                        <a href="/"> <div class="block ml-4 mt-1 text-main-gray-300 font-extrabold">DIGICHANGES</div></a>
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

                    <div class="hidden md:block lg:block ml-3 text-main-gray-200 font-bold">
                        <div>
                            {
                                getToggledDrop() ? (
                                    <button
                                        type="button"
                                        class="inline-flex bg-gray-800 flex rounded-full font-bold"
                                        id="user-menu"
                                        aria-expanded="false"
                                        arias-haspopup="true"
                                        onClick={() => setToggleDrop(false)}>
                                        <span class="sr-only">Open user menu</span>
                                        <span>{props.email ?? ''}</span><span class="flex flex-row justify-end w-6"><IconChevronDown /></span>
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        class="inline-flex bg-gray-800 flex rounded-full font-bold"
                                        id="user-menu"
                                        aria-expanded="false"
                                        arias-haspopup="true"
                                        onClick={() => setToggleDrop( true )}>
                                        <span class="sr-only">Open user menu</span>
                                        {/* <span>{email ?? ''}</span><span class="text-gray flex flex-row justify-end w-6"><IconChevronDown /></span> */}
                                    </button>
                                )
                            }
                        </div>


                        {/* TODO: corregir dropdown, atomizar, etc */}
                        <div class={`${getToggledDrop() ? null : ('hidden')} origin-top-right absolute right-0 w-48 py-1 mt-5 shadow-md bg-main-gray-500 text-white`}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="user-menu">
                            <div role="none">
                                <a href="/" class="block px-4 py-2 text-sm" role="menuitem">Item 1</a>
                                <a href="/" class="block px-4 py-2 text-sm active" role="menuitem">Item 1 active</a>
                                {/* <form method="POST" action="/" role="none"> */}
                                <form  action="/" role="none">
                                    <button type="submit" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                        Sign out?
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>


                    <div class="absolute inset-y-0 p-3 right-0 flex items-center md:hidden">
                        <button
                            onClick={props.onClick}
                            type="button" class="inline-flex items-center justify-center rounded-md text-gray-400 hover:text-white w-6 h-6" >
                            <span class="sr-only">Open Main Menu</span>
                            {/* {showSidebar ? ( */}
                            <IconBurger/>
                            {/* ) : ( */}
                            {/* <IconCross /> */}
                            {/* )} */}
                        </button>
                    </div>
                </div>
            </div>
        </nav >
    );
};

export default NavBar;
