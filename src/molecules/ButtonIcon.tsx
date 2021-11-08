import { Link } from 'solid-app-router';
import { Component, splitProps } from 'solid-js';
import Button from '../atoms/Button';

interface ButtonIconProps
{
    icon?: string;
    labelName?: string;
    type?: 'button' | 'submit' | 'reset';
    path: string;
}
const ButtonIcon: Component<ButtonIconProps> = ( props ) =>
{
    const [ local, others ] = splitProps( props, [ 'type', 'icon', 'labelName', 'path' ] );

    return (
        <div class="mt-3 ">
            <Button
                type={props.type}
                class="dg-main-button-w-icon"
                {...others}
            >
                <Link href={props.path}>
                    <span class="hidden md:block font-bold pb-1">{props.labelName}</span>
                </Link>
                <i class="w-5 md:w-8 md:pl-2">
                    {props.icon}
                </i>
            </Button>
        </div>
    );
};

export default ButtonIcon;
