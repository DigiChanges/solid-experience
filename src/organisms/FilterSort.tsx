import { useSearchParams } from 'solid-app-router';
import { Component } from 'solid-js';
import { Form } from 'solid-js-form';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import { filterBy } from '../entities/filterBy';
import SingleSelect from '../molecules/SingleSelect';
import { orderBy } from './orderBy';

const singleSelectStyle = {
    // eslint-disable-next-line solid/style-prop
    searchBox: { 'max-height': '40px' },
    // eslint-disable-next-line solid/style-prop
    inputField: { 'max-height': '40px', 'padding': '0 10px' }
};
interface FilterSortProps{
    placeholder:string;
}
// const FilterSort = ( { actionFilter, filterButtonName = 'Filter', filterQuery = null, placeholder } ): any =>
const FilterSort:Component<FilterSortProps> = ( props ) =>
{

    const [ searchParams, setSearchParams ] = useSearchParams();
    // const [ filterFields, setFilterField ] = useState( { search: '', filterBy: '' } );
    // const [ sortFields, setSortField ] = useState( { orderBy: '', sort: 'asc', isSort: true } );

    // const onClickIsSortAsc = () =>
    // {
    //     setSortField( { ...sortFields, isSort: !sortFields.isSort } );
    // };

    // useEffect( () =>
    // {
    //     for ( const key in filterQuery )
    //     {
    //         if ( Object.prototype.hasOwnProperty.call( filterQuery, key ) )
    //         {
    //             const re = /(?<=\[).+?(?=\])/;
    //             const value = key.match( re );

    //             if ( key.includes( 'filter' ) )
    //             {
    //                 setFilterField( {
    //                     ...filterFields,
    //                     search: filterQuery[key],
    //                     filterBy: _.last( value )
    //                 } );
    //             }
    //             else if ( key.includes( 'sort' ) )
    //             {
    //                 setSortField( {
    //                     ...sortFields,
    //                     orderBy: _.last( value ),
    //                     sort: filterQuery[key],
    //                     isSort: filterQuery[key] === 'asc'
    //                 } );
    //             }
    //         }
    //     }
    // }, [ filterQuery ] );


    // const getSort = ( isSortAsc: boolean ) => ( isSortAsc ? 'asc' : 'desc' );

    return (
        <Form
            initialValues={{
                search: searchParams.search,
                filterBy: { ...filterBy.find( filterOption => filterOption.value === searchParams.filterBy ) },
                orderBy: { ...orderBy.find( orderByOption => orderByOption.value === searchParams.orderBy ) },
                sort: 'asc'
            }}
            onSubmit={async ( form ) =>
            {
                const { search, filterBy, orderBy, sort } = form.values;

                setSearchParams( { search, filterBy: filterBy.value, orderBy: orderBy.value, sort } );
            }}
        >
            <div class="dg-form-full-field-wrapper">
                <Input
                    style={{ display: 'block' }}
                    name="search"
                    type="text"
                    id="search"
                    class="dg-form-field-full"
                    placeholder={props.placeholder}
                    labelClass="dg-form-label"
                    labelName="First name"
                />
            </div>
            <div class="flex flex-wrap justify-between my-6">
                <div class="flex-col w-full md:w-5/12">
                    <Label for="filterBy" class="font-bold text-gray-400 block md:inline-block mr-2 w-16">
                        Filter By
                    </Label>
                    <SingleSelect
                        id="filterBy"
                        name="filterBy"
                        options={filterBy}
                        isObject
                        displayValue="label"
                        style={singleSelectStyle}
                        placeholder="Type"
                        labelClass="dg-form-label"
                        errorClass="ml-1"
                    />
                </div>
                <div class="flex-col w-full md:w-5/12">
                    <Label for="orderBy" class="font-bold text-gray-400 block md:inline-block mr-2 w-16">
                        Sort By
                    </Label>
                    <SingleSelect
                        // class={`dg-form-field-quarter md:min-w-max ${errors.orderBy && touched.orderBy ? 'border-red-500' : ''}`}
                        id="orderBy"
                        name="orderBy"
                        options={orderBy}
                        isObject
                        displayValue="label"
                        style={singleSelectStyle}
                        placeholder="Sort by..."
                        labelClass="dg-form-label"
                        errorClass="ml-1"
                    />
                </div>

                <div class="flex-col self-end md:self-center w-6 h-6 my-3 md:my-2 lg:my-0">
                    {/* <IconButtonActive
                                classNameOnActive="text-white"
                                onClick={onClickIsSortAsc}
                                isActive={sortFields.isSort}
                                iconEnable={IconSortAscending}
                                iconDisable={IconSortDescending}
                            /> */}
                </div>
                <div class="flex-col self-center my-3 lg:my-0 mx-auto">
                    <Button
                        class="dg-main-button"
                        type="submit"
                    >
                        Filter
                    </Button>
                </div>
            </div>
        </Form>
    );
};

export default FilterSort;
