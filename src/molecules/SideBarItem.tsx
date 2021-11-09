// import Link from "next/link";
// import IconChevronDown from "../atoms/Icons/Stroke/IconChevronDown";
// import IconChevronRight from "../../atoms/Icons/Stroke/IconChevronRight";

import { Link } from 'solid-app-router';
import { Component, createSignal, JSX, PropsWithChildren } from 'solid-js';
import IconChevronDown from '../atoms/Icons/Stroke/IconChevronDown';
import IconChevronRight from '../atoms/Icons/Stroke/IconChevronRight';

interface SideBarItemProps {
    name: string,
    path: string,
    icon?: any,
    isToggled?: boolean,
    isLoading?: boolean
    children: JSX.Element;
}
const SideBarItem: Component<SideBarItemProps> = (props) => {
    const [open, setOpen] = createSignal(false);

    //   const levels = React.Children.toArray(children)
    // const levels = (props.children);
    // const multi = levels && levels.length > 0;

    const Icon: any = props.icon;
    // const isLogoutClass = path === "/logout" ? "mt-auto pb-8" : " ";

    // const toggleMenu = () => 
    // {
    //     levels && levels.length > 0 ? setOpen(!open()) : false;
    // };

    const getLabelOrItem = (path, name, equalPath) =>
    {

        // if (path) {
        return (
            <Link class=" text-white text-sm font-bold md:block pr-3 pl-4" href={path}>
                {/* <a
                    class={` flex flex-row items-center w-full text-gray-500
              hover:text-blue-500 hover:border-blue-500 border-r-2 border-gray-800
              h-8 ${equalPath.equal
                ? "text-blue-700 border-blue-700"
                : "text-gray-500 border-gray-800"
            } cursor-pointer`} 
                > */}
                {/* {Icon ? (
                            <span class={`${!isToggled ? "ml-3" : ""} inline-flex items-center justify-center h-8 w-6 text-lg `}>
                                <Icon />
                            </span>
                        ) : (
                            <span class="inline-flex items-center justify-center h-8 w-6 text-lg " />
                        )} */}
                {/* {isToggled
                            ? ( */}

                {name}

                {/* )     : null}  */}
                {/* </a>  */}
            </Link>)
        // }
        // else {
        //     // 'menu'
        //     return (<div class={`${isToggled? "block" : "hidden"} ml-1 text-sm font-bold text-main-gray-100 text-start mb-2 mr-2`}>
        //         {name}
        //     </div>)
        // }

    }

    // const getDropDownItems = () =>
    //     levels
    //         ? React.Children.map(children, (child : React.ReactElement) => {
    //             props.isLoading() && open ? setOpen(!open()) : "";
    //             return (
    //                 React.cloneElement(child, {isToggled})
    //             )
    //         })
    //         : "";

    return (
        // <div class={`${isToggled ? "" : "pl-4 mx-1"}  w-full ${isLogoutClass}`}>
        //     {multi ? (
        //         <>
        //             <button
        //                 onClick={toggleMenu}
        //                 class={`
        //       w-full focus:outline-none hover:text-blue-500 hover:border-blue-500 border-r-2 border-gray-800 flex flex-row items-center h-8
        //       ${open() ? "text-blue-500 hover:text-blue-500 hover:border-blue-500" : "text-main-gray-100"}`}
        //             >
        //                 {Icon ? (
        //                     <span class={`${!isToggled ? "ml-3" : ""} inline-flex items-center h-8 w-6 text-lg`}>
        //                         <Icon />
        //                     </span>
        //                 ) : (
        //                     <span class=" inline-flex items-center justify-center h-8 w-6 text-lg" />
        //                 )}
        //                 {isToggled
        //                     ? (<span class="text-sm font-bold md:block pr-2 pl-4">
        //                         {props.name}
        //                     </span>)
        //                     : null}

        //                 {open() && multi ? (
        //                     // si esta compactado esto no se ve
        //                     <span class={`${isToggled ? "" : "hidden"} inline-flex ml-auto mr-3 pl-1 w-6`}> <IconChevronDown /> </span>
        //                 ) : !open && multi ? (
        //                     <span class={`${isToggled ? "" : "hidden"} inline-flex ml-auto mr-3 pl-1 w-6`}> <IconChevronRight /></span>
        //                 ) : (
        //                     ""
        //                 )}
        //                 {multi && open() && !isToggled ? (<div class="bg-gray-800 absolute ml-15 mt-8 pl-2">{getDropDownItems()}</div>) : null}
        //             </button>

        //             <div
        //                 class={`
        //       ${open() ? `text-main-gray-100` : `hidden w-full`}
        //       ${open() && isToggled ? `w-full flex flex-col ` : `ml-10`}
        //       `}
        //             >
        //                 {multi && isToggled ? getDropDownItems() : ""}
        //             </div>
        //         </>
        //     ) : (getLabelOrItem(path, name, false /* equalPath */))}
        // </div>
        <div class="pl-4 mx-1"  w-full >
            {getLabelOrItem(props.path, props.name, false)}
        </div>
    );
};

export default SideBarItem;
