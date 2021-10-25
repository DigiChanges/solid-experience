import Image from '../atoms/Image';
import { Component } from 'solid-js';

interface AvatarImageProps {
    image?: string;
    avatar?: string; // FIXME: image or avatar mast be defined. URL cant be empty
    alt?: string;
    class: string;
}

const AvatarImage: Component<AvatarImageProps> = ( props ) =>
{
    return (
        <Image
            src={props.image ?? props.avatar}
            alt={props.alt} class={props.class}
        />
    );
};

export default AvatarImage;
