// import { Field, Form, Formik } from 'formik';
// import React, {  useState } from 'react';
// import Button from '../atoms/Button';
import Label from '../atoms/Label';
import SearchInput from '../atoms/SearchInput';
// import IconButtonActive from '../molecules/IconButtonActive';
// import IconSortAscending from '../atoms/Icons/Stroke/IconSortAscending';
// import IconSortDescending from '../atoms/Icons/Stroke/IconSortDescending';
// import FilterSortSchema from '../SchemaValidations/FilterSortSchema';
import { Form } from 'solid-js-form';
import { Component, createSignal } from 'solid-js';
import Input from '../atoms/Input';
import SingleSelect from '../molecules/SingleSelect';
import { states } from '../entities';
import { filterBy } from '../entities/filterBy';
import { orderBy } from './orderBy';

// import _ from 'lodash';
const singleSelectStyle = {
    // eslint-disable-next-line solid/style-prop
    searchBox: { 'max-height': '40px' },
    // eslint-disable-next-line solid/style-prop
    inputField: { 'max-height': '40px', 'padding': '0 10px' }
};
interface FilterSortProps{
    actionFilter:any;
    // filterQuery:any;
}
// const FilterSort = ( { actionFilter, filterButtonName = 'Filter', filterQuery = null, placeholder } ): any =>
const FilterSort:Component<FilterSortProps> = ( props ) =>
{
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


    const getSort = ( isSortAsc: boolean ) => ( isSortAsc ? 'asc' : 'desc' );

    return (
        <Form

            initialValues={{
                search: '',
                filterBy: '',
                orderBy: ''
            }}
            // validation={FilterSortSchema}

            // onSubmit={async ( form ) =>
            // {
            //     props.actionFilter( form.values.search, form.values.filterBy.value, form.values.orderBy.value, 'asc' );
            // }}
            // initialValues={{
            // search: filterFields.search,
            // filterBy: filterFields.filterBy,
            // orderBy: sortFields.orderBy,
            // sort: sortFields.sort
            // }}
            // enableReinitialize={true}
            // validationSchema={FilterSortSchema}
            onSubmit={async ( form ) =>
            {
                const { search, filterBy, orderBy } = form.values;
                props.actionFilter( search, filterBy.value, orderBy.value, 'asc' );

            }}
        // onSubmit={async ( form.values ) =>
        // {
        //     const { search, filterBy, orderBy } = values;
        //     actionFilter( search, filterBy, orderBy, getSort( sortFields.isSort ) );
        // }}
        >
            {/* {( { errors, touched } ) => ( */}
            {/* <Form class="flex flex-col justify-between w-full text-main-gray-300 my-2"> */}
            <div class="dg-form-full-field-wrapper">
                <Input
                    style={{ display: 'block' }}
                    name="search"
                    type="text"
                    id="search"
                    class="dg-form-field-full"
                    placeholder="search"
                    labelClass="dg-form-label"
                    labelName="First name"
                />
            </div>
            {/* <Field
                name="search"
                type="search"
                id="search"
                placeholder={placeholder}
                component={SearchInput}
                 class={`dg-form-field-full ${errors.search && touched.search ? 'border-red-500' : ''}`}
            /> */}
            {/* todo add DROPDOWN to filter/sort opts */}
            <div class="flex flex-wrap justify-between my-6">
                <div class="flex-col w-full md:w-5/12">
                    <Label for="roles" class="font-bold text-gray-400 block md:inline-block mr-2 w-16">
                Filter By
                    </Label>
                    {/* <Field
                        name="filterBy"
                        type="text"
                        id="filterBy"
                        placeholder={'Filter by... '}
                         class={`dg-form-field-quarter md:min-w-max  ${errors.filterBy && touched.filterBy ? 'border-red-500' : ''}`}
                    /> */}
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
                    <Label for="roles" class="font-bold text-gray-400 block md:inline-block mr-2 w-16">
                Sort By
                    </Label>
                    <SingleSelect
                        id="orderBy"
                        name="orderBy"
                        options={orderBy}
                        isObject
                        displayValue="label"
                        style={singleSelectStyle}
                        placeholder="Type"
                        labelClass="dg-form-label"
                        errorClass="ml-1"
                    />
                    {/* <Field
                        name="orderBy"
                        type="text"
                        id="orderBy"
                        placeholder={'Sort by... '}
                         class={`dg-form-field-quarter md:min-w-max ${errors.orderBy && touched.orderBy ? 'border-red-500' : ''}`}
                    /> */}
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
                    {/* <Button
                                class="dg-main-button"
                                buttonType="submit"
                            >
                                {filterButtonName}
                            </Button> */}
                    <button type="submit">Filter</button>
                </div>
            </div>
        </Form>


    );
};

export default FilterSort;
