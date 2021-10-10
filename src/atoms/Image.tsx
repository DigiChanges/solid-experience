import { Component } from 'solid-js';

interface ImageProps {
  src: string;
  className: string;
  alt?: string;
}

const Image: Component<ImageProps> = (props: any): any => (
  <img src={props.src} alt={props.alt ?? ''} className={props.className} />
);

export default Image;
