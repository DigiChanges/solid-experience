import * as Yup from 'yup';

const SignUpSchema = {
    email: Yup.string()
        .email( 'Invalid email' )
        .required( 'Required' ),
    password: Yup.string()
        .min( 2, 'Too Short!' )
        .max( 50, 'Too Long!' )
        .required( 'Required' )
};

export default SignUpSchema;
