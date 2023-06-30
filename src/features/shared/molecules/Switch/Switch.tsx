import { Component, JSX } from 'solid-js';
import styles from './Switch.module.css';
import { Switch as KSwitch } from '@kobalte/core';

interface RadioGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
    name: string;
    onChange: any;
    value: boolean;
}

const Switch: Component<RadioGroupProps> = (props) =>
{
    return (
        <KSwitch.Root
            name={props.name}
            class={styles.switch}
            isChecked={props.value}
            onCheckedChange={props.onChange}>
            <KSwitch.Input class={styles.switch__input} />
            <KSwitch.Control class={styles.switch__control}>
                <KSwitch.Thumb class={styles.switch__thumb}/>
            </KSwitch.Control>
        </KSwitch.Root>
    );
};

export default Switch;
