import { createForm } from '@felte/solid';
import { Badge, Button, CloseButton, Icon, Input, Menu, MenuContent, MenuItem, MenuTrigger } from '@hope-ui/solid';
import { useSearchParams } from 'solid-app-router';
import { Text } from 'solid-i18n';
import { Component, createMemo, createSignal, For } from 'solid-js';
import IconFilter from '../../../../atoms/Icons/Stroke/IconFilter';
import IconPlus from '../../../../atoms/Icons/Stroke/IconPlus';
import { SelectValueOption } from '../../../shared/types/Selects';
import './Filter.css';


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
        isValid,
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
        <div class={'dropdown'}>

            <Button class="mr-5" leftIcon={<Icon><IconFilter/></Icon>} onClick={() => setShowFilter( !showFilter() )} ><Text message="filter"/></Button>

            <div
                id="filterDropdown"
                class="dropdown-content"
                classList={{
                    show: showFilter(),
                }}
            >
                <div class={'dropdown show'}>
                    <form ref={form}>
                        <Menu>
                            <MenuTrigger
                                as="button"
                                variant="subtle"
                                colorScheme="danger"
                                class="w-full p-4"
                            >
                                {selectedMenu().label}
                            </MenuTrigger>
                            <MenuContent>
                                <For each={props.filterOptions}>
                                    {( filterBy ) => (
                                        <MenuItem name={filterBy.value as string} onSelect={handleSelect( filterBy )}>
                                            {( filterBy.label as any )}
                                        </MenuItem>
                                    )}
                                </For>
                            </MenuContent>
                        </Menu>
                        <p class="p-4"><Text message="a_contains"/>:</p>
                        <Input type="text" name="valor" />
                        <Button disabled={!errors()} type="submit" class="w-full" leftIcon={<Icon><IconPlus/></Icon>}><Text message="a_add_filter"/></Button>
                    </form>
                </div>
            </div>

            <div class="inline-flex gap-3 flex-wrap">
                <For each={getSearchParams()}>
                    {( filter ) => (
                        <Badge colorScheme="primary">
                            <div class="flex items-center">
                                <span><Text message={filter.field}/> <Text message="a_contains"/>{filter.value}</span>
                                <CloseButton aria-label="remove filter" size="sm" onClick={handleRemoveFilter( filter )} />
                            </div>
                        </Badge>
                    )}
                </For>
            </div>

        </div>
    );
};

export default Filter;
