import { Component } from 'solid-js';
interface IconButtonProps
{   isActive: boolean;
    iconEnable: any;
    iconDisable: any;
    classNameOnActive: string;
    onClick?: ( e: MouseEvent ) => void;
}
const IconButtonActive: Component<IconButtonProps> = ( props ): any =>
{
    const _iconEnable = props.iconEnable;
    const _iconDisable = props.iconDisable;

    const getIcon = () =>
    {
        return props.isActive ?
            <_iconEnable/> :
            <_iconDisable/>;
    };

    return (
        <div onClick={props.onClick} class={props.isActive ? '' : props.classNameOnActive} role="presentation">
            {getIcon()}
        </div>
    );
};

export default IconButtonActive;
