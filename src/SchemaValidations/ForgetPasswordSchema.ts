import * as Yup from 'yup';

const ForgetPasswordSchema = {
    email: Yup.string()
        .email( 'Invalid email' )
        .required( 'Required' )
};

export default ForgetPasswordSchema;
