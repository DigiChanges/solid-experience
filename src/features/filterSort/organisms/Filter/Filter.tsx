import { createForm } from '@felte/solid';
import { Button, Icon, Input, CloseButton } from '@hope-ui/core';
import { useSearchParams } from 'solid-app-router';
import { Text } from 'solid-i18n';
import { Component, createEffect, createMemo, createSignal, For } from 'solid-js';
import IconFilter from '../../../../atoms/Icons/Stroke/IconFilter';
import IconPlus from '../../../../atoms/Icons/Stroke/IconPlus';
import Card from '../../../shared/molecules/Card/Card';
import CardContent from '../../../shared/molecules/CardContent/CardContent';
import { SelectValueOption } from '../../../shared/types/Selects';
import styles from './Filter.module.css';
import { Select } from '../../../shared/molecules/Select/Select';
import { InferType } from 'yup';
import DropdownMenu from '../../../shared/molecules/DropdownMenu/DropdownMenu';
import { changeLanguage } from '../../../language/handlers';

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
    const [ selectedMenu, setSelectedMenu ] = createSignal( props.filterOptions[0].value );
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

    const handleSelect = ( filterBy: string ) =>
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
            setSearchParams( { [`filter[${selectedMenu()}]`]: values.valor } );
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
                                    <Select
                                        options={props.filterOptions}
                                        placeholder={'type_id'}
                                        value={selectedMenu()}
                                        onChange={( value: string ) => handleSelect( value )}
                                        valueProperty={'value'}
                                        labelProperty={'label'}
                                    />
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
