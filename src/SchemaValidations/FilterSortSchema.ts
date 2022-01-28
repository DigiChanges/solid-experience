import * as Yup from 'yup';

const FilterSortSchema = {
    search: Yup.string()
        .required( 'Required' ),
    filterBy: Yup.object().when( 'search', {
        is: true,
        then: Yup.string().required( 'Required' )
    } ),
    orderBy: Yup.object()
        .optional(),
    sort: Yup.string()
        .optional()
};

export default FilterSortSchema;
