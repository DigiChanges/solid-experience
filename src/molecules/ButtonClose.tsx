import { Component, JSX } from 'solid-js';
import Button from '../atoms/Button'
interface ButtonCloseProps
{
    icon?: string;
    labelName?: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: ( e: MouseEvent ) => void;
    children: JSX.Element;
}
const ButtonClose: Component<ButtonCloseProps> = ( props ) =>
{
  return (
    <Button
      class="dg-secondary-button"
      type="button"
			{...props}
		>
      {props.children}
    </Button>
  )
}

export default ButtonClose;