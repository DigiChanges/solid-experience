import * as Yup from 'yup';

const RoleSchema = ( t: any ) => ( {
    name: Yup.string()
        .min( 2, t( 'av_too_short' ) )
        .max( 50, t( 'av_too_long' ) )
        .required( t( 'av_required' ) ),
    slug: Yup.string()
        .min( 2, t( 'av_too_short' ) )
        .max( 50, t( 'av_too_long' ) )
        .required( t( 'av_required' ) ),
    permissions: Yup.array()
        .min( 1, t( 'av_one_item' ) ),
} );

export default RoleSchema;
