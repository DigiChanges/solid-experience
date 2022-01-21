import { Component } from 'solid-js';
import Button from '../atoms/Button';
interface SideBarItemProps {
    name: string,
    icon?: any,
    isLoading?: boolean
    onClick: ( event: MouseEvent ) => void;
    getShowSubitems: any;
    routes: any;
    showItem:boolean;
}


const SideBarItem: Component<SideBarItemProps> = ( props ) =>
{

    const Icon: any = props.icon;


    const getLabelOrItem = ( name: string ) =>
    {

        return (
            props.showItem &&
            <Button class=" text-white text-sm font-bold md:block pr-3 pl-4" onClick={props.onClick}>

                {props.icon ? (
                    <span class={'mr-1 inline-flex items-center justify-center h-8 w-6 text-lg '}>
                        <Icon />
                    </span>
                ) : (
                    <span class="mr-1 inline-flex items-center justify-center h-8 w-6 text-lg " />
                )}

                {name}

            </Button>

        );


    };

    return (

        <div class=" mx-1 w-full">
            {getLabelOrItem( props.name )}

            {props.children}
        </div>

    );
};

export default SideBarItem;
