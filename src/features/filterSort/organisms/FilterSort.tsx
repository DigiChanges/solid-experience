import { Icon, StrokeIcons } from '@digichanges/solid-components';
import { Component } from 'solid-js';
import { Form } from 'solid-js-form';
import Button from '../../../atoms/Button';
import IconSortAscending from '../../../atoms/Icons/Stroke/IconSortAscending';
import IconSortDescending from '../../../atoms/Icons/Stroke/IconSortDescending';
import Input from '../../../atoms/Input';
import Label from '../../../atoms/Label';
import IconButtonActive from '../../../molecules/IconButtonActive';
import useFilter from '../../shared/hooks/useFilter';
import SingleSelect from '../../shared/molecules/SingleSelect';
import { FilterBy, OrderBy } from '../types/FilterSortTypes';
import filterSortValidationSchema from '../validations/schemas/filterSortValidationSchema';

const singleSelectRoundedStyle = {
    multiselectContainer: { 'max-width': '100px' },
    searchBox: {
        'max-height': '40px',
        'min-width': '80px',
        'border-radius': '20px',
    },
};

interface FilterSortProps{
    searchPlaceholder: string;
    filterBy: FilterBy[];
    orderBy: OrderBy[];

}

const FilterSort: Component<FilterSortProps> = ( props ) =>
{
    const { filter, setFilter, toggleSort } = useFilter();

    return (
        <Form
            initialValues={{
                search: filter.search || '',
                filterBy: filter?.filterBy ? { ...props.filterBy.find( filterOption => filterOption.value === filter.filterBy ) } : null,
                orderBy: filter?.filterBy ? { ...props.orderBy.find( orderByOption => orderByOption.value === filter.orderBy ) } : null,
            }}
            validation={filterSortValidationSchema}
            onSubmit={async ( form ) =>
            {
                const { search, filterBy, orderBy } = form.values;
                setFilter( { search, filterBy: filterBy?.value, orderBy: orderBy?.value } );
            }}
        >

            <div class="w-full mb-5">
                <Input
                    style={{ display: 'block' }}
                    name="search"
                    type="search"
                    id="search"
                    class="dg-form-field-full"
                    placeholder={props.searchPlaceholder}
                    labelName=""
                    errorClass="ml-1"
                    addon={{
                        prepend: <Icon render={StrokeIcons.IconSearch} />,
                    }}
                />
            </div>

            <div class="flex flex-wrap md:flex-nowrap w-full content-center items-center md:mb-5">
                <div class="md:flex md:items-center w-full">
                    <Label for="filterBy" class="dg-form-label whitespace-nowrap md:mr-5">Filter By</Label>
                    <SingleSelect
                        id="filterBy"
                        name="filterBy"
                        options={props.filterBy}
                        isObject
                        displayValue="label"
                        style={singleSelectRoundedStyle}
                        placeholder="Filter field..."
                        errorClass="ml-1"
                    />
                </div>

                <div class="flex w-full content-center items-center">
                    <div class="md:flex md:items-center w-full">
                        <Label for="orderBy" class="dg-form-label whitespace-nowrap md:mr-5">Sort By</Label>
                        <SingleSelect
                            id="orderBy"
                            name="orderBy"
                            options={props.orderBy}
                            isObject
                            displayValue="label"
                            style={singleSelectRoundedStyle}
                            placeholder="Order field..."
                            errorClass="ml-1"
                        />
                    </div>
                </div>

                <div class="mb-5 md:mb-0 mx-auto">
                    <div class="w-6 h-6">
                        <IconButtonActive
                            classNameOnActive="text-white"
                            onClick={toggleSort}
                            isActive={filter.sort === 'desc'}
                            iconEnable={IconSortAscending}
                            iconDisable={IconSortDescending}
                        />
                    </div>
                </div>
            </div>

            <div class="flex mb-5 mx-auto">
                <Button
                    class="w-full md:w-32 dg-main-button"
                    type="submit"
                >
                        Filter
                </Button>
            </div>
        </Form>
    );
};

export default FilterSort;
