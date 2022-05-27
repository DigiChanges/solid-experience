import { Component, createSignal, For, onMount } from 'solid-js';
import './filter.css';

const Filter: Component = () =>
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
                        <button class="dropdown-option opt" name="enable" onClick={toggleDropdown( 'propertyDropdown' )}>Enable</button>
                        <button class="dropdown-option opt" name="email" onClick={toggleDropdown( 'propertyDropdown' )}>Email</button>
                    </div>
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
