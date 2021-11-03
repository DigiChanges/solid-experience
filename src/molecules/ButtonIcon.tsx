import { Component } from 'solid-js';
import Button from '../atoms/Button';

interface ButtonIconobjectProps
{
    icon?: string;
    labelName?: string;
    buttonType?: string;
}
const MediaObject: Component<ButtonIconobjectProps> = ( props ) =>

//   return (
    <div class="mt-3 ">
        <Button
            buttonType={props.buttonType}
            class="dg-main-button-w-icon"
            {...props}
        >
            <span class="hidden md:block font-bold pb-1">{props.labelName}</span>
            <i class="w-5 md:w-8 md:pl-2">
                {props.icon}
            </i>
        </Button>
    </div>;
//   );
// };

export default MediaObject;
