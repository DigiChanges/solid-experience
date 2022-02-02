import { Component } from 'solid-js';
import { Form } from 'solid-js-form';
import Button from '../atoms/Button';
import IconSortAscending from '../atoms/Icons/Stroke/IconSortAscending';
import IconSortDescending from '../atoms/Icons/Stroke/IconSortDescending';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import IconButtonActive from '../molecules/IconButtonActive';
import SingleSelect from '../molecules/SingleSelect';
import FilterSortSchema from '../SchemaValidations/FilterSortSchema';
import useFilter from './useFilter';

const singleSelectStyle = {
    // eslint-disable-next-line solid/style-prop
    searchBox: { 'max-height': '40px' },
    // eslint-disable-next-line solid/style-prop
    inputField: { 'max-height': '40px', 'padding': '0 10px' }
};
interface IFilterByProp
{
    value: string;
    label: string
}
interface IOrderByByProp
{
    value: string;
    label: string
}
interface FilterSortProps{
    placeholder:string;
    filterBy: IFilterByProp[];
    orderBy: IOrderByByProp[];

}
// const FilterSort = ( { actionFilter, filterButtonName = 'Filter', filterQuery = null, placeholder } ): any =>
const FilterSort:Component<FilterSortProps> = ( props ) =>
{
    const { filter, setFilter, toggleSort } = useFilter();

    return (
        <Form
            initialValues={{
                search: filter.search,
                filterBy: { ...props.filterBy.find( filterOption => filterOption.value === filter.filterBy ) },
                orderBy: { ...props.orderBy.find( orderByOption => orderByOption.value === filter.orderBy ) },
                sort: 'asc'
            }}
            validation={FilterSortSchema}
            onSubmit={async ( form ) =>
            {
                const { search, filterBy, orderBy } = form.values;
                setFilter( { search, filterBy: filterBy.value, orderBy: orderBy.value } );
            }}
        >
            <div class="w-full mb-5 pr-3">
                <Input
                    style={{ display: 'block' }}
                    name="search"
                    type="text"
                    id="search"
                    class="dg-form-field-full"
                    placeholder={props.placeholder}
                    labelClass="dg-form-label"
                    labelName=""
                    errorClass="ml-1"
                />
            </div>
            <div class="flex flex-wrap justify-between my-6 md:items-center ">
                <Label for="filterBy" class="font-bold text-gray-400 block md:pb-5  mr-2 w-16">
                        Filter By
                </Label>
                <div class="flex-col w-full md:w-2/6 md:mr-5 md:ml-5  self-center md:my-3 ">

                    <SingleSelect
                        id="filterBy"
                        name="filterBy"
                        options={props.filterBy}
                        isObject
                        displayValue="label"
                        style={singleSelectStyle}
                        placeholder="Type"
                        labelClass="dg-form-label"
                        errorClass="ml-1"
                    />
                </div>
                <Label for="orderBy" class="font-bold text-gray-400 block  md:pb-5 mr-2 w-16">
                        Sort By
                </Label>
                <div class="flex-col w-full md:w-2/6 md:mr-5 md:ml-5  self-center md:my-3 ">

                    <SingleSelect
                        // class={`dg-form-field-quarter md:min-w-max ${errors.orderBy && touched.orderBy ? 'border-red-500' : ''}`}
                        id="orderBy"
                        name="orderBy"
                        options={props.orderBy}
                        isObject
                        displayValue="label"
                        style={singleSelectStyle}
                        placeholder="Sort by..."
                        labelClass="dg-form-label"
                        errorClass="ml-1"
                    />
                </div>

                <div class="flex-col self-center w-6 h-6  md:mb-5 xs:ml-15 md:mx-auto   ">
                    <IconButtonActive
                        classNameOnActive="text-white"
                        onClick={toggleSort}
                        isActive={filter.sort === 'desc'}
                        iconEnable={IconSortAscending}
                        iconDisable={IconSortDescending}
                    />
                </div>
                <div class="md:flex-col self-center 3 md:mb-5 mx-auto  ">
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
