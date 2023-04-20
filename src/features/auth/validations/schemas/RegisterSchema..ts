import { array, ref, string } from 'yup';
import userValidationSchema from '../../../user/validations/schemas/userValidationSchema';

const RegisterSchema = userValidationSchema.shape( {
    password: string()
        .min( 2, 'av_too_short' )
        .max( 50, 'av_too_long' )
        .required( 'av_required' ),
    passwordConfirmation: string()
        .oneOf( [ ref( 'password' ), null ], 'av_password_match' )
        .required( 'av_required' ),
    permissions: array()
        .required( 'av_required' ),
} );

export default RegisterSchema;
