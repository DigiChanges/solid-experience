import { Component, JSX } from 'solid-js';


interface LabelProps
{
  for?: string,
  className?: string,
  children?: any,
}

const Label: Component<LabelProps> = (props: any) => (
	<label for={props.for} className={props.className}>
		{props.children}
	</label>
)

export default Label
