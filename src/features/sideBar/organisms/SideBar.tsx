import { Component, JSX } from 'solid-js';
import IconArrowCircleLeft from '../../../atoms/Icons/Stroke/IconArrowCircleLeft';

interface SideBarProps {
    class?: string;
    children?: JSX.Element;
    getExpanded: any;
    setExpanded: any;
}

const SideBar: Component<SideBarProps> = ( props ) =>
{
    // showArrow
    let classUl = 'flex flex-col items-center h-full  md:justify-center  w-full md:w-auto  pl-4 ml-1 ';

    classUl = props.getExpanded ? classUl : 'flex flex-col items-center h-full md:items-center md:justify-center w-max';

    // const getChildren = () =>
    //     React.Children.map( props.children, ( child: React.ReactElement ) =>
    //         React.cloneElement( child, { isToggled: getExpanded() } )
    //     );
    return (
        <div
            class={props.class}
            classList={{ 'md:relative md:w-56': props.getExpanded }}
        >
            <div class={'text-white'}>
                <div class={classUl}>
                    {
                        props.getExpanded ? (
                            <div class="hidden md:flex  flex-row-reverse w-full">
                                <button
                                    onClick={() => props.setExpanded( false )}
                                    type="button" class="right-0 w-5 text-main-gray-300 mr-3" >
                                    <IconArrowCircleLeft />
                                </button>
                            </div>
                        )
                            : <div class="flex w-full ml-1 mb-8">
                                <button
                                    onClick={() => props.setExpanded( true )}
                                    type="button" class=" transform rotate-180 w-5 text-white" >
                                    <IconArrowCircleLeft />
                                </button>
                            </div>
                    }
                    {/* {getChildren()} */}

                </div>
                {props.children}
            </div>
        </div >
    );
};

export default SideBar;
