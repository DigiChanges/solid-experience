import * as Yup from 'yup';

const FilterSortSchema = {
    search: Yup.string().when( 'filterBy', {
        is: true,
        then: Yup.string().required( 'Required' )
    } ),
    filterBy: Yup.object(),
    orderBy: Yup.object()
        .optional(),
    sort: Yup.string()
        .optional()
};

export default FilterSortSchema;
