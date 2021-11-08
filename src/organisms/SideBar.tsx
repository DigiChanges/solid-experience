import { Component, createSignal, JSX } from 'solid-js';
import IconArrowCircleLeft from '../atoms/Icons/Stroke/IconArrowCircleLeft';

interface SideBarProps {
    class?: string
    children?: JSX.Element;
}

const SideBar: Component<SideBarProps> = ( props) =>
{
    const [ getExpanded, setExpanded ] = createSignal( true );

    let classUl = 'flex flex-col items-center h-full md:items-start md:justify-center  w-full md:w-auto  pl-4 ml-1 ';

    classUl = getExpanded() ? classUl : 'flex flex-col items-center h-full md:items-center md:justify-center w-max';

    // const getChildren = () =>
    //     React.Children.map( props.children, ( child: React.ReactElement) =>
    //         React.cloneElement( child, { isToggled: getExpanded() } )
    //     );
    return (
        <div class={`${props.class} ${getExpanded() ? 'md:relative md:w-56' : ''}`}>
            <div class={'flex flex-row md:flex-col h-full text-white'}>
                {/* {props.children} */}
                {/* TODO: Change image logic*/}
                {/* <div class={classUl}>
                    {
                        getExpanded() ? (
                            <div class="hidden md:flex flex-row-reverse w-full">
                                <button
                                    onClick={() => setExpanded( false)}
                                    type="button" class="right-0 w-5 text-main-gray-300 mr-3" >
                                   <IconArrowCircleLeft />
                                </button>
                            </div>
                        )
                            : <div class="flex w-full ml-14 mb-8">
                                <button
                                    onClick={() => setExpanded(true)}
                                    type="button" class="transform rotate-180 w-5 text-white" >
                                    <IconArrowCircleLeft />
                                </button>
                            </div>
                    }
                    {getChildren()}
                </div> */}

                {props.children}
            </div>
        </div >
    );
};

export default SideBar;
