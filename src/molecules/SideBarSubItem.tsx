import { Component } from 'solid-js';
import { Link } from 'solid-app-router';

interface SideBarSubItemProps {
    name: string,
    path: string,
    icon?: any,
    isToggled?: boolean,
    equalPath?: any
}

const SideBarSubItem: Component<SideBarSubItemProps> = ( props ) =>
{
    const Icon: any = props.icon;
    const equal = true;

    return (
        <>

            <div class=" flex flex-row">
                <a class=" " >
                    <Link href={props.path}>
                        {/* <a
                class={` border-r-2 border-gray-800 hover:border-blue-500 hover:text-blue-500 flex flex-row items-center justify-start h-8 ${equal
                    ? 'text-blue-700 border-blue-700'
                    : 'text-gray-500 border-gray-800'
                }`}
            > */}
                        <a class="border-r-2 border-gray-800  hover:text-blue-500 flex flex-row items-center justify-start h-8 text-blue-700">
                            {props.icon ? (
                                <span class={`${props.isToggled ? 'hidden' : ''} inline-flex w-6 items-center md:justify-start h-6 text-lg`}>
                                    <Icon />
                                </span>
                            ) : (
                                <span class="inline-flex w-6 items-center justify-center h-6 text-lg " />
                            )}

                            <span class={`${!props.isToggled ? 'px-4' : 'pl-10'} text-sm font-bold justify-start md:justify-center pl-2 `}>
                                {props.name}
                            </span>
                        </a>
                    </Link>
                </a></div>

        </>
    );
};

export default SideBarSubItem;
