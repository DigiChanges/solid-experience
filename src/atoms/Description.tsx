import { Component } from 'solid-js';


const Description: Component = (props: any) =>

(<div className={props.className}>
  {props.children}
</div>)

export default Description;
