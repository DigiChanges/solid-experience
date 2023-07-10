import { Component } from 'solid-js';

interface IconButtonProps
{ isActive: boolean;
    iconEnable: any;
    iconDisable: any;
    classNameOnActive: string;
    onClick?: (e: MouseEvent) => void;
}

const IconButtonActive: Component<IconButtonProps> = (data): any =>
{
    const _iconEnable = () => data.iconEnable;
    const _iconDisable = () => data.iconDisable;

    const getIcon = () =>
    {
        return <>{data.isActive ?
            <_iconEnable/> :
            <_iconDisable/>}</>;
    };

    return (
        <div onClick={() => data.onClick} class={data.isActive ? '' : data.classNameOnActive} role="presentation">
            {getIcon()}
        </div>
    );
};

export default IconButtonActive;
