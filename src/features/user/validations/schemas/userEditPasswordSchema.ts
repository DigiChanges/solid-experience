import * as Yup from 'yup';

const userEditPasswordSchema = ( t: any ) => ( {
    password: Yup.string()
        .min( 2, t( 'av_too_short' ) )
        .max( 50, t( 'av_too_long' ) )
        .required( t( 'av_required' ) ),
    passwordConfirmation: Yup.string()
        .oneOf( [ Yup.ref( 'password' ), null ], t( 'av_password_match' ) as string )
        .required( t( 'av_required' ) ),
} );

export default userEditPasswordSchema;
