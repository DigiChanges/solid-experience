import { Component, JSX, For, createSignal } from 'solid-js';
import styles from './Select.module.css';
import { Select as KSelect, As } from '@kobalte/core';
import useTranslation from '../../../shared/hooks/useTranslation';
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
export const Select: Component<SelectProps> = (props) =>
{
    const [value, setValue] = createSignal<string>('');

    const { translate: t } = useTranslation();
    return (
        <KSelect.Root<any>
            name={props.name}
            class={props.class}
            placeholder={t(props.placeholder)}
            value={props.value}
            options={props.options}
            optionValue={props.valueProperty}
            optionTextValue={props.labelProperty}
            optionGroupChildren={props.groupSelector}
            onChange={(value) =>
            {
                setValue(value.label);
                props.onChange(value.value);
            }}
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
                <KSelect.Value<string> class={styles.select__value}>
                    {value}
                </KSelect.Value>
                <KSelect.Icon class={styles.select__icon} />
            </KSelect.Trigger>

            <KSelect.Content class={styles.select__content}>
                <KSelect.Listbox class={styles.select__listbox} />
            </KSelect.Content>

        </KSelect.Root>

    );
};

export const MultiSelect: Component<MultiSelectProps> = (props) =>
{
    return (

        <KSelect.Root
            name={props.name}
            class={props.class}
            placeholder={props.placeholder}
            value={props.value}
            options={props.options}
            optionValue={props.valueProperty}
            optionTextValue={props.labelProperty}
            optionGroupChildren={props.groupSelector}
            onChange={(value) => props.onChange(value)}
            valueComponent={props =>
                <For each={props.items}>
                    {item =>
                        <span class={styles.select__value__multiple}>
                            {item.textValue}
                            <button onPointerDown={e => e.stopPropagation()}
                                onClick={() => props.remove(item)}>
                                <IoClose
                                />
                            </button>

                        </span>
                    }
                </For>
            }
            itemComponent={props =>
                <KSelect.Item item={props.item} class={styles.select__item}>
                    <KSelect.ItemLabel>{props.item.textValue}</KSelect.ItemLabel>
                    <KSelect.ItemIndicator class={styles.select__item__indicator}><FiCheck /></KSelect.ItemIndicator>
                </KSelect.Item>
            }
            sectionComponent={props =>
                <KSelect.Section class={styles.select__section}>{props.section.rawValue.group}</KSelect.Section>
            }
        >
            <KSelect.Trigger class={`${styles.select__trigger} ${styles.full_w}`} asChild>
                <As component={'div'}>
                    <KSelect.Value class={styles.select__value}/>
                    <KSelect.Icon class={styles.select__icon} />
                </As>
            </KSelect.Trigger>

            <KSelect.Content class={styles.select__content}>
                <KSelect.Listbox class={styles.select__listbox}/>
            </KSelect.Content>

        </KSelect.Root>

    );
};

