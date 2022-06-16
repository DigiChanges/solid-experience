import { array, bool, object, string } from 'yup';

const roleSchema = object( {
    name: string()
        .min( 3, 'av_too_short' )
        .max( 50, 'av_too_long' )
        .required( 'av_required' ),
    slug: string()
        .min( 3, 'av_too_short' )
        .max( 50, 'av_too_long' )
        .required( 'av_required' ),
    permissions: array().min( 1, 'av_one_item' ).required( 'av_required' ),
    enable: bool().required(),
} );

export default roleSchema;
