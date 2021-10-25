import Image from '../atoms/Image';
import { Component } from 'solid-js';

const AvatarImage: Component = ( props: any ): any =>
{
    const url = props.image ? props.image : props.avatar;

    return (
        <Image src={url} alt={props.alt} class={props.class}/>
    );
};

export default AvatarImage;
