import * as Yup from 'yup';
import { SelectValueOption } from '../../../shared/types/Selects';

type FilterFields = {
    filterBy: SelectValueOption;
    orderBy: SelectValueOption;
    search: string;
};

const filterSortValidationSchema = ( t: any ) => ( {
    search: Yup.string()
        .test( 'required', t( 'av_required' ) as string, function ( value )
        {
            const { orderBy } = this.parent as FilterFields;
            return !!orderBy?.value || !!value;
        } ),

    filterBy: Yup.object()
        .nullable()
        .test( 'required', t( 'av_required' ), function ( value )
        {
            const { search } = this.parent as FilterFields;
            return !search || !!value?.value;
        } ),

    orderBy: Yup.object()
        .nullable()
        .test( 'required', t( 'av_required' ), function ( orderBy )
        {
            const { filterBy, search } = this.parent as FilterFields;
            return ( !!filterBy?.value || !!search ) || !!orderBy?.value;
        } ),
    sort: Yup.string()
        .optional(),
} );

export default filterSortValidationSchema;
