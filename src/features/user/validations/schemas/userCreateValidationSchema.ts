import { boolean, ref, string } from 'yup';
import userUpdateValidationSchema from './userUpdateValidationSchema';

const userCreateValidationSchema = userUpdateValidationSchema.shape( {
    password: string()
        .min( 2, 'av_too_short' )
        .max( 50, 'av_too_long' )
        .required( 'av_required' ),
    passwordConfirmation: string()
        .oneOf( [ ref( 'password' ), null ], 'av_password_match' )
        .required( 'av_required' ),
    enable: boolean()
        .required( 'av_required' ),
} );

export default userCreateValidationSchema;
