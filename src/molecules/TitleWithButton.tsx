import { Component } from 'solid-js';
import Title from '../atoms/Title';
import ButtonIcon from '../molecules/ButtonIcon';
interface TitleobjectProps
{
    title?: string;
    icon: any;
    labelButtonName?: string;
    buttonAction?: boolean;
    class: string;
}
const TitleWithButton: Component<TitleobjectProps> = ( props ) =>

//   return (
    <section class="flex flex-row justify-between">
        <Title class={props.class} titleType="h4">
            {props.title}
        </Title>
        <ButtonIcon
            icon={props.icon}
            // onClick={props.buttonAction}
            labelName={props.labelButtonName}
        />
    </section>
//   );
// };

export default TitleWithButton;
