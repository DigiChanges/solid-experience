import { Component, splitProps } from 'solid-js';
import { Image as HImage } from '@hope-ui/solid';

interface ImageProps {
    alt?: string;
    src?: string;
    class?: string;
    width?: string;
    height?: string;
}

const Image: Component<ImageProps> = props =>
{
    const [ local, others ] = splitProps( props, [ 'alt' ] );

    return <HImage
        alt={local.alt ?? ''}
        {...others}
    />;
};

export default Image;
