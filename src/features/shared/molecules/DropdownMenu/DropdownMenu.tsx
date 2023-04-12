import { Component, For, JSX } from 'solid-js';
import styles from './DropdownMenu.module.css';
import { DropdownMenu as KDropdownMenu } from '@kobalte/core';

interface RadioGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
    items: any;
    icon?: any;
    title?: any;
}

const DropdownMenu: Component<RadioGroupProps> = ( props ) =>
{
    return (
        <KDropdownMenu.Root>
            <KDropdownMenu.Trigger class={styles.dropdown__menu__trigger}>
                {props.title}
                <KDropdownMenu.Icon
                    class={styles.dropdown__menu__trigger__icon}
                    children={props.icon}
                />
            </KDropdownMenu.Trigger>
            <KDropdownMenu.Content class={styles.dropdown__menu__content}>
                <For each={props.items}>
                    {item =>
                        <KDropdownMenu.Item
                            class={styles.dropdown__menu__item}
                            onSelect={item.onSelect}
                        >
                            {item.children}
                        </KDropdownMenu.Item>
                    }
                </For>
            </KDropdownMenu.Content>
        </KDropdownMenu.Root>
    );
};

export default DropdownMenu;
