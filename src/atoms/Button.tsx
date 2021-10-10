import { Component, splitProps } from 'solid-js';

interface ButtonProps {
  type?: "button" | "submit" | "reset",
  props?: any,
  onClick?: any,
  className?: string
}

const Button: Component<ButtonProps> = (props: any) =>
{
    const [local, others] = splitProps(props, ["children", "type"]);

    return (
		<button
			type={local.type ?? "button"}
			{...others}
		>
			{local.children}
		</button>
	)
}

export default Button
