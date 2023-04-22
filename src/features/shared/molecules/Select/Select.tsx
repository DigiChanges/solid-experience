import { Component, JSX, For } from 'solid-js';
import styles from './Select.module.css';
import { Select as KSelect, MultiSelect as KMultiSelect, As } from '@kobalte/core';
import { Text } from 'solid-i18n';
import { HiSolidSelector } from 'solid-icons/hi';
import { FiCheck } from 'solid-icons/fi';
import { IoClose } from 'solid-icons/io';


interface SelectBase extends JSX.HTMLAttributes<HTMLDivElement> {
    name?: string;
    options: any;
    placeholder: string;
    onChange: any;
    valueProperty: string;
    labelProperty: string;
    groupSelector?: string;
    class?: string;
}

interface SelectProps extends SelectBase {
    value: string | undefined;
}

interface MultiSelectProps extends SelectBase {
    value: any;
}

export const Select: Component<SelectProps> = ( props ) =>
{
    return (

        <KSelect.Root
            name={props.name}
            class={props.class}
            placeholder={<Text message={props.placeholder}/>}
            value={props.value}
            options={props.options}
            optionValue={props.valueProperty}
            optionTextValue={props.labelProperty}
            optionGroupChildren={props.groupSelector}
            onValueChange={( value ) => props.onChange( value )}
            valueComponent={props => props.item.textValue}
            itemComponent={props => (
                <KSelect.Item item={props.item} class={styles.select__item}>
                    <KSelect.ItemLabel>{props.item.textValue}</KSelect.ItemLabel>
                    <KSelect.ItemIndicator class={styles.select__item__indicator}><FiCheck /></KSelect.ItemIndicator>
                </KSelect.Item>
            )}
            sectionComponent={props =>
                <KSelect.Section class={styles.select__section}>{props.section.rawValue.group}</KSelect.Section>
            }
        >
            <KSelect.Trigger class={styles.select__trigger}>
                <KSelect.Value class={styles.select__value} />
                <KSelect.Icon class={styles.select__icon}><HiSolidSelector /></KSelect.Icon>
            </KSelect.Trigger>

            <KSelect.Content class={styles.select__content}>
                <KSelect.Listbox class={styles.select__listbox} />
            </KSelect.Content>

        </KSelect.Root>

    );
};

export const MultiSelect: Component<MultiSelectProps> = ( props ) =>
{
    return (

        <KMultiSelect.Root
            name={props.name}
            class={props.class}
            placeholder={<Text message={props.placeholder}/>}
            value={props.value}
            options={props.options}
            optionValue={props.valueProperty}
            optionTextValue={props.labelProperty}
            optionGroupChildren={props.groupSelector}
            onValueChange={( value ) => props.onChange( value )}
            valueComponent={props =>
                <For each={props.items}>
                    {item =>
                        <span class={styles.select__value__multiple}>
                            {item.textValue}
                            <button onPointerDown={e => e.stopPropagation()}
                                onClick={() => props.remove( item )}>
                                <IoClose
                                />
                            </button>

                        </span>
                    }
                </For>
            }
            itemComponent={props =>
                <KMultiSelect.Item item={props.item} class={styles.select__item}>
                    <KMultiSelect.ItemLabel>{props.item.textValue}</KMultiSelect.ItemLabel>
                    <KSelect.ItemIndicator class={styles.select__item__indicator}><FiCheck /></KSelect.ItemIndicator>
                </KMultiSelect.Item>
            }
            sectionComponent={props =>
                <KMultiSelect.Section class={styles.select__section}>{props.section.rawValue.group}</KMultiSelect.Section>
            }
        >
            <KMultiSelect.Trigger class={`${styles.select__trigger} w-full`} asChild>
                <As component={'div'}>
                    <KMultiSelect.Value class={styles.select__value}/>
                    <KSelect.Icon class={styles.select__icon}><HiSolidSelector /></KSelect.Icon>
                </As>
            </KMultiSelect.Trigger>

            <KMultiSelect.Content class={styles.select__content}>
                <KMultiSelect.Listbox class={styles.select__listbox}/>
            </KMultiSelect.Content>

        </KMultiSelect.Root>

    );
};

