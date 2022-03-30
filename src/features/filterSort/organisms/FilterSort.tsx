import { Icon, StrokeIcons } from '@digichanges/solid-components';
import { useI18n } from 'solid-i18n';
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
import { FilterBy, OrderBy } from '../types/filterSortTypes';
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

const reload = ( { setFilter, reset }: any ) => () =>
{
    setFilter( { search: '', filterBy: null, orderBy: null } );
    // reset();
};

const FilterSort: Component<FilterSortProps> = ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;
    const { filter, setFilter, toggleSort } = useFilter();

    return (
        <Form
            initialValues={{
                search: filter.search || '',
                filterBy: filter?.filterBy ? { ...props.filterBy.find( filterOption => filterOption.value === filter.filterBy ) } : null,
                orderBy: filter?.filterBy ? { ...props.orderBy.find( orderByOption => orderByOption.value === filter.orderBy ) } : null,
            }}
            validation={filterSortValidationSchema( t )}
            onSubmit={async ( form ) =>
            {
                const { search, filterBy, orderBy } = form.values;
                setFilter( { search, filterBy: filterBy?.value, orderBy: orderBy?.value } );
            }}
        >
            {( form ) =>
            {
                const reset = () => () =>
                {
                    form.setValues( { search: '', filterBy: null, orderBy: null } );
                };

                return (
                    <>
                        <div class="w-full mb-5">
                            <Input
                                style={{ display: 'block' }}
                                name="search"
                                type="search"
                                id="search"
                                class="dg-form-field-full"
                                placeholder={props.searchPlaceholder || t( 'a_search' )}
                                labelName=""
                                errorClass="ml-1"
                                addon={{
                                    prepend: <Icon render={StrokeIcons.IconSearch} />,
                                }}
                            />
                        </div>

                        <div class="flex flex-wrap lg:flex-nowrap w-full content-center items-center lg:mb-5">
                            <div class="lg:flex lg:items-center w-full">
                                <Label for="filterBy" class="dg-form-label whitespace-nowrap lg:mr-5">{ t( 'a_filter_by' )}</Label>
                                <SingleSelect
                                    id="filterBy"
                                    name="filterBy"
                                    options={props.filterBy}
                                    isObject
                                    displayValue="label"
                                    style={singleSelectRoundedStyle}
                                    placeholder={`${t( 'a_filter_field' )}...`}
                                    errorClass="ml-1"
                                />
                            </div>

                            <div class="flex w-full content-center items-center">
                                <div class="lg:flex lg:items-center w-full">
                                    <Label for="orderBy" class="dg-form-label whitespace-nowrap lg:mr-5">{t( 'a_order_by' )}</Label>
                                    <SingleSelect
                                        id="orderBy"
                                        name="orderBy"
                                        options={props.orderBy}
                                        isObject
                                        displayValue="label"
                                        style={singleSelectRoundedStyle}
                                        placeholder={`${t( 'a_order_field' )}...`}
                                        errorClass="ml-1"
                                    />
                                </div>
                            </div>

                            <div class="mb-5 lg:mb-0 mx-auto">
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

                        <div class="flex flex-col gap-4 mb-5 mx-auto lg:justify-end lg:flex-row lg:my-8">
                            <Button
                                class="w-full lg:w-32 dg-secondary-button"
                                type="button"
                                onClick={reset()}
                            >
                                {t( 'a_clear' )}
                            </Button>
                            <Button
                                class="w-full lg:w-32 dg-secondary-button"
                                type="button"
                                onClick={reload( { setFilter, reset: reset() } )}
                            >
                                {t( 'a_reload' )}
                            </Button>
                            <Button
                                class="w-full lg:w-32 dg-main-button"
                                type="submit"
                            >
                                {t( 'a_filter' )}
                            </Button>
                        </div>
                    </> );
            }}
        </Form>
    );
};

export default FilterSort;
