import * as Yup from 'yup';
import { FilterBy, OrderBy } from '../../types/FilterSortTypes';

const filterSortValidationSchema = {
    search: Yup.string()
        .when( [ 'orderBy' ], {
            is: ( orderBy: OrderBy ) => !orderBy?.value,
            then: Yup.string().required( 'Required' ),
            otherwise: Yup.string(),
        } ),


    // filterBy: Yup.object()
    //     .nullable()
    //     .when( [ 'search', 'orderBy' ], {
    //         is: ( search: string, orderBy: OrderBy ) =>
    //         {
    //             return !!search && !orderBy?.value;
    //         },
    //         then: Yup.object( {
    //             value: Yup.string().required( 'Required' ),
    //         } )
    //             .nullable()
    //             .required( 'Required' ),
    //     } ),

    orderBy: Yup.object()
        .nullable()
        .when( [ 'filterBy' ], {
            is: ( filterBy: FilterBy ) =>
            {
                return !filterBy?.value;
            },
            then: Yup.object()
                .nullable()
                .required( 'Required' ),
            otherwise: Yup.object().nullable(),
        } ),
    sort: Yup.string()
        .optional(),
};

export default filterSortValidationSchema;
