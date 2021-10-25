import { Component } from 'solid-js';

interface TitleProps
{
    titleType: 'h6' | 'h5' | 'h4'| 'h3'| 'h2'| 'h1',
    class: string,
    children: any
}

const Title: Component<TitleProps> = ( props: any ) =>

    props.titleType === 'h6' ? ( <h6 class={props.class}>{props.children}</h6> ) :
        props.titleType === 'h5' ? ( <h5 class={props.class}>{props.children}</h5> ) :
            props.titleType === 'h4' ? ( <h4 class={props.class}>{props.children}</h4> ) :
                props.titleType === 'h3' ? ( <h3 class={props.class}>{props.children}</h3> ) :
                    props.titleType === 'h2' ? ( <h2 class={props.class}>{props.children}</h2> ) :
                        props.titleType === 'h1' ? ( <h1 class={props.class}>{props.children}</h1> ) :
                            ( <h1 class={props.class}>{props.children}</h1> );

export default Title;
