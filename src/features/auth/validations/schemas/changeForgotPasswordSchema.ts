import { object, ref, string } from 'yup';

const changeForgotPasswordSchema = object( {
    password: string()
        .min( 2, 'av_too_short' )
        .max( 50, 'av_too_long' )
        .required( 'av_required' ),
    passwordConfirmation: string()
        .oneOf( [ ref( 'password' ), null ], 'av_password_match' )
        .required( 'av_required' ),
} );

export default changeForgotPasswordSchema;
