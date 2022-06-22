import { array, ref, string } from 'yup';
import userValidationSchema from './userValidationSchema';

const userCreateValidationSchema = userValidationSchema.shape( {
    password: string()
        .min( 2, 'av_too_short' )
        .max( 50, 'av_too_long' )
        .required( 'av_required' ),
    passwordConfirmation: string()
        .oneOf( [ ref( 'password' ), null ], 'av_password_match' )
        .required( 'av_required' ),
    permissions: array().of( string() ).min( 1, 'av_one_item' ).required( 'av_required' ),
    roles: array().of( string() ).min( 1, 'av_one_item' ).required( 'av_required' ),

} );

export default userCreateValidationSchema;
