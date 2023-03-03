import { Component, For } from 'solid-js';
import styles from './stepBar.module.css';

interface stepBarProps {
    stepsQuantity: number;
    lineStartColor?: string;
    lineEndColor?: string;
    lineHeight?: string;
    numbersHeight?: string;
    numbersWidth?: string;
    numbersContainerStartColor?: string;
    numbersContainerEndColor?: string;
    numberStartColor?: string;
    numberEndColor?: string;
    effectTotalTime?: string;
    actualStep: number;
}
const StepBar: Component<stepBarProps> = ( props ) =>
{
    const numbers = Array( props.stepsQuantity ).fill( 'element' );

    return (
        <div class={'w-full bg-transparent flex text-gray-900 items-center'}>
            <For each={numbers}>{
                ( number, index ) =>
                    <>
                        <div style={{ 'background-color': props.actualStep >= index() + 1 ? `${props.numbersContainerEndColor || '#00c2d7'}` : `${props.numbersContainerStartColor || '#f5f5f5'}`, 'transition': 'background-color .5s, color .5s', 'transition-delay': props.effectTotalTime || '.5s', 'width': props.numbersWidth || '26px', 'height': props.numbersHeight || '26px', 'color': props.actualStep >= index() + 1 ? props.numberEndColor || 'white' : props.numberStartColor || 'black' }} class={`rounded-[50%] z-1 flex justify-center items-center ${styles.notGrow}`}>
                            {index() + 1}
                        </div>
                        {index() < props.stepsQuantity - 1 &&
                        <div style={{ 'background': `linear-gradient(to right, ${props.lineEndColor || '#00c2d7'} 50%, ${props.lineStartColor || '#f5f5f5'} 50% ) 0px center/200%`, 'background-size': '200%', 'background-position': props.actualStep > index() + 1 ? '0' : '-100%', 'transition': `background-position ${props.effectTotalTime || '.5s'}`, 'transform': 'rotate(180deg)', 'height': props.lineHeight || '6px' }} class={`ml-[-1px] z-0 ${styles.grow}`} />
                        }
                    </>
            }
            </For>
        </div >
    );
};

export default StepBar;
