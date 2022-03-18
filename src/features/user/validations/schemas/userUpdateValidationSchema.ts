import * as Yup from 'yup';

const userUpdateValidationSchema = ( t: any ) => ( {
    firstName: Yup.string()
        .min( 2, t( 'av_too_short' ) )
        .max( 50, t( 'av_too_long' ) )
        .required(  t( 'av_required' ) ),
    lastName: Yup.string()
        .min( 2, t( 'av_too_short' ) )
        .max( 50, t( 'av_too_long' ) )
        .required(  t( 'av_required' ) ),
    email: Yup.string()
        .email( 'Invalid email' )
        .required(  t( 'av_required' ) ),
    gender: Yup.string()
        .oneOf( [ 'male', 'fame', 'other' ], t( 'av_required' ) )
        .required(  t( 'av_required' ) ),
    country: Yup.object()
        .required(  t( 'av_required' ) ),
    birthday: Yup.string()
        .required(  t( 'av_required' ) ),
    phone: Yup.string()
        .max( 20,  t( 'av_too_long' ) )
        .required(  t( 'av_required' )  ),
    documentType: Yup.object()
        .required(  t( 'av_required' ) ),
    documentNumber: Yup.string()
        .required(  t( 'av_required' ) ),
    address: Yup.string()
        .required(  t( 'av_required' ) ),
    enable: Yup.object()
        .required(  t( 'av_required' ) ),
    roles: Yup.array()
        .min( 1, t( 'av_one_item' )  )
        .required(  t( 'av_required' ) ),
    permissions: Yup.array()
        .min( 1, t( 'av_one_item' )  ),
} );

export default userUpdateValidationSchema;
