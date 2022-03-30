import { Link } from 'solid-app-router';
import { Component, splitProps } from 'solid-js';
import Button from '../atoms/Button';

interface ButtonIconProps
{
    icon?: any;
    labelName?: string | HTMLElement | ( string | HTMLElement )[];
    type?: 'button' | 'submit' | 'reset';
    path: string;
}

const ButtonIcon: Component<ButtonIconProps> = ( props ) =>
{
    const [ local, others ] = splitProps( props, [ 'type', 'icon', 'labelName', 'path' ] );

    return (
        <Link href={local.path}>
            <Button
                type={local.type}
                class="dg-main-button-w-icon"
                {...others}
            >

                <span class="hidden md:block font-bold pb-1">{local.labelName}</span>

                <i class="w-5 md:w-8 md:pl-2">
                    {local.icon}
                </i>
            </Button>
        </Link>
    );
};

export default ButtonIcon;
