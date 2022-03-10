import * as Yup from 'yup';
import { FilterBy, OrderBy } from '../../types/FilterSortTypes';

type FilterFields = {
    filterBy: FilterBy;
    orderBy: OrderBy;
    search: string;
};

const filterSortValidationSchema = {
    search: Yup.string()
        .test( 'required', 'Required', function ( value )
        {
            const { orderBy } = this.parent as FilterFields;
            return !!orderBy?.value || !!value;
        } ),

    filterBy: Yup.object()
        .nullable()
        .test( 'required', 'Required', function ( value )
        {
            const { search } = this.parent as FilterFields;
            return !search || !!value?.value;
        } ),

    orderBy: Yup.object()
        .nullable()
        .test( 'required', 'Required', function ( orderBy )
        {
            const { filterBy, search } = this.parent as FilterFields;
            return ( !!filterBy?.value || !!search ) || !!orderBy?.value;
        } ),
    sort: Yup.string()
        .optional(),
};

export default filterSortValidationSchema;
