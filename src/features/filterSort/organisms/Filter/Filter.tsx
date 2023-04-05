import { createForm } from '@felte/solid';
import { Button, Icon, Input, CloseButton } from '@hope-ui/core';
import { useSearchParams } from 'solid-app-router';
import { Text } from 'solid-i18n';
import { Component, createMemo, createSignal, For } from 'solid-js';
import IconFilter from '../../../../atoms/Icons/Stroke/IconFilter';
import IconPlus from '../../../../atoms/Icons/Stroke/IconPlus';
import Card from '../../../shared/molecules/Card/Card';
import CardContent from '../../../shared/molecules/CardContent/CardContent';
import { SelectValueOption } from '../../../shared/types/Selects';
import styles from './Filter.module.css';
import { Select } from '@kobalte/core';

type FilterType = {
    field: string;
    value: string;
};

interface FilterProps{
    filterOptions: SelectValueOption[];
}

const getFieldWithoutFilterArrayText = ( field: string ) => field.replace( 'filter[', '' ).replace( ']', '' );

const Filter: Component<FilterProps> = ( props ) =>
{
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ selectedMenu, setSelectedMenu ] = createSignal( props.filterOptions[0] );
    const [ showFilter, setShowFilter ] = createSignal( false );

    const getSearchParams = createMemo( () =>
    {
        if ( searchParams )
        {
            return Object.entries( searchParams ).map( ( [ field, value ] ) => ( {
                field: getFieldWithoutFilterArrayText( field ),
                value,
            } ) );
        }
        return [];
    } );

    const handleSelect = ( filterBy: SelectValueOption ) => () =>
    {
        setSelectedMenu( filterBy );
    };

    const handleRemoveFilter = ( filter: FilterType ) => () =>
    {
        setSearchParams( { [`filter[${filter.field}]`]: null } );
    };

    const {
        errors,
        form,
        reset,
        // @ts-ignore
    } = createForm<InferType<typeof roleSchema>>( {
        onSubmit: ( values ) =>
        {
            setSearchParams( { [`filter[${selectedMenu().value}]`]: values.valor } );
            setShowFilter( false );
            reset();
        },
    } );
    return (
        <>
            <div class={styles.dropdown}>

                <div>
                    <Button
                        leftIcon={<Icon><IconFilter/></Icon>}
                        onClick={() => setShowFilter( !showFilter() )}
                    >
                        <Text message="a_filter"/>
                    </Button>

                    <Card
                        class={styles.dropdown_content}
                        classList={{
                            [styles.show]: showFilter(),
                        }}
                    >
                        <div class={styles.show}>
                            <CardContent>
                                <form ref={form} class={styles.form}>
                                    <Select.Root
                                        class={'w-full z-20'}
                                        defaultValue={selectedMenu().value as string}
                                        options={props.filterOptions}
                                        optionValue="value"
                                        optionTextValue="label"
                                        valueComponent={props => props.item.rawValue.label}
                                        itemComponent={props =>
                                            <Select.Item item={props.item} class={styles.select__item} onSelect={handleSelect( props.item.rawValue)}>
                                                <Select.ItemLabel>{props.item.rawValue.label}</Select.ItemLabel>
                                            </Select.Item>
                                        }
                                    >
                                        <Select.Trigger class={styles.select__trigger}>
                                            <Select.Value class={styles.select__value} />
                                            <Select.Icon class={styles.select__icon}>
                                                +
                                            </Select.Icon>
                                        </Select.Trigger>
                                        <Select.Content class={styles.select__content}>
                                            <Select.Listbox class={styles.select__listbox}/>
                                        </Select.Content>
                                    </Select.Root>
                                    <p><Text message="a_contains"/>:</p>
                                    <Input type="text" name="valor" autofocus />
                                    <Button disabled={!errors()} type="submit" leftIcon={<Icon><IconPlus/></Icon>}><Text message="a_add_filter"/></Button>
                                </form>
                            </CardContent>
                        </div>
                    </Card>
                </div>

                <For each={getSearchParams()}>
                    {( filter ) => (
                        <div class={styles.badge}>
                            <p><Text message={filter.field}/> <Text message="a_contains"/> {filter.value}</p>
                            <CloseButton aria-label="remove filter" size="sm" onClick={handleRemoveFilter( filter )} />
                        </div>
                    )}
                </For>
            </div>
        </>
    );
};

export default Filter;
