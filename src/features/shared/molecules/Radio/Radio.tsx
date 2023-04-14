import { Component, For, JSX } from 'solid-js';
import styles from './Radio.module.css';
import { RadioGroup as KRadioGroup } from '@kobalte/core';
import { Text } from 'solid-i18n';

interface RadioGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
    name: string;
    options: any;
    value: string;
    defaultValue?: string | undefined;
    onChange: any;
}

const Radio: Component<RadioGroupProps> = ( props ) =>
{
    return (
        <KRadioGroup.Root
            name={props.name}
            class={styles.radio__group}
            defaultValue={props.defaultValue}
            value={props.value}
            onValueChange={( value ) => props.onChange( value )}
        >
            <div class={styles.radio__group__items}>
                <For each={props.options}>
                    {option =>
                        <KRadioGroup.Item value={option.value} class={styles.radio}>
                            <KRadioGroup.ItemInput class={styles.radio__input}/>
                            <KRadioGroup.ItemControl class={styles.radio__control}>
                                <KRadioGroup.ItemIndicator class={styles.radio__indicator}/>
                            </KRadioGroup.ItemControl>
                            <KRadioGroup.ItemLabel class={styles.radio__label}><Text message={option.label}/></KRadioGroup.ItemLabel>
                        </KRadioGroup.Item>
                    }
                </For>
            </div>
        </KRadioGroup.Root>
    );
};

export default Radio;
