import { Component } from 'solid-js';


const Logo: Component = (props: any): any => (
  <img src={props.image} alt={props.alt} className={props.className} />
);

export default Logo;
