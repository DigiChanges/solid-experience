import Image from "../atoms/Image";
import { Component } from 'solid-js';

const AvatarImage: Component = (props: any): any =>
{
	const url = props.image ? props.image : props.avatar;

	return (
		<Image image={url} alt={props.alt} className={props.className}/>
	)
}

export default AvatarImage;
