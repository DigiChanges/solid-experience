import * as Yup from 'yup';
import userValidationSchema from './userValidationSchema';

const userCreateValidationSchema = ( t: any ) => ( {
    ...userValidationSchema( t ),
    password: Yup.string()
        .min( 2, t( 'av_too_short' ) )
        .max( 50, t( 'av_too_long' ) )
        .required( t( 'av_required' ) ),
    passwordConfirmation: Yup.string()
        .oneOf( [ Yup.ref( 'password' ), null ], t( 'av_password_match' ) )
        .required( t( 'av_required' ) ),
} );

export default userCreateValidationSchema;
