import { Component, JSX } from 'solid-js';
interface MediaobjectProps
{
    class: string;
    children: JSX.Element;
}
const MediaObject: Component<MediaobjectProps> = ( props ) =>

//   return (
    <div class={props.class}>
        {props.children}
    </div>;
//   );
// };

export default MediaObject;

