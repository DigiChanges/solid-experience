import MultiSelect from '@digichanges/solid-multiselect';
import { Component, createSignal, For, onMount } from 'solid-js';
import { SelectValueOption } from '../../shared/types/Selects';
import './filter.css';


interface FilterProps{
    // searchPlaceholder: string;
    filterOptions: SelectValueOption[];
    // orderBy: OrderBy[];
}

const Filter: Component<FilterProps> = ( props ) =>
{
    const [ selectedMenu, setSelectedMenu ] = createSignal( { value: 'enable', label: 'Enable' } );
    const [ filterText, setFilterText ] = createSignal( '' );
    const [ filters, setFilters ] = createSignal<any[]>( [] );

    onMount( () =>
    {
        window.onclick = function ( event )
        {
            if ( !( event?.target as HTMLElement )?.matches( '.dropdown-option' ) )
            {
                const dropdowns = document.getElementsByClassName( 'dropdown-content' );
                let i;
                for ( i = 0; i < dropdowns.length; i++ )
                {
                    const openDropdown = dropdowns[i];
                    if ( openDropdown.classList.contains( 'show' ) )
                    {
                        openDropdown.classList.remove( 'show' );
                    }
                }
            }
        };
    } );


    const toggleDropdown = ( targetId: string ) => ( e: any ) =>
    {
        const dropdownMenu = document.getElementById( targetId );
        if ( dropdownMenu )
        {
            dropdownMenu.classList.toggle( 'show' );
            if ( e.currentTarget.name )
            {
                setSelectedMenu( { value: e.target.name, label: e.currentTarget.innerText } );
            }
        }
    };

    const handleAddFilter = () => () =>
    {
        setFilters( [ ...filters(), { filter: selectedMenu().value, value: filterText() } ] );
    };

    return (
        <div class={'dropdown'}>
            <button onClick={toggleDropdown( 'filterDropdown' )} class="dropbtn dropdown-option">Filter</button>
            <div
                id="filterDropdown"
                class="dropdown-content"
            >
                {/* <a href="#home">Home</a> */}
                <div class={'dropdown'}>
                    <button
                        onClick={toggleDropdown( 'propertyDropdown' )}
                        class="dropbtn dropdown-option"
                    >
                        {selectedMenu().label}
                    </button>
                    <div
                        id="propertyDropdown"
                        class="dropdown-content"
                    >
                        <For each={props.filterOptions}>
                            {( filterBy ) => (
                                <>
                                    <button class="dropdown-option opt" name={filterBy.value as string} onClick={toggleDropdown( 'propertyDropdown' )}>{( filterBy.label as any )?.innerText}</button>
                                    {filterBy.label}
                                </>
                            )}
                        </For>
                        {/* <button class="dropdown-option opt" name="email" onClick={toggleDropdown( 'propertyDropdown' )}>Email</button> */}
                    </div>
                    <MultiSelect
                        id="filterBy"
                        // name="filterBy"
                        options={props.filterOptions}
                        isObject
                        displayValue="label"
                        onSelect={() => {}}
                        // style={singleSelectRoundedStyle}
                        // placeholder={`${t( 'a_filter_field' )}...`}
                        // errorClass="ml-1"
                    />
                    <p>Es igual o contiene:</p>
                    <input class="dropdown-option" type="text" value={filterText()} onInput={( e ) => setFilterText( e.currentTarget.value )} />
                    <button class="opt" onClick={handleAddFilter()}>+ Add filter</button>
                </div>
            </div>
            <For each={filters()}>
                {( filter ) => (
                    <div>
                        {filter.filter} is {filter.value} x
                    </div> )}
            </For>
        </div>

    );
};

export default Filter;
