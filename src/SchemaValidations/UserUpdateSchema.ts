import * as Yup from 'yup';

const UserUpdateSchema = {
    firstName: Yup.string()
        .required( 'Required' )
        .min( 2, 'Too Short!' )
        .max( 50, 'Too Long!' ),
    lastName: Yup.string()
        .required( 'Required' )
        .min( 2, 'Too Short!' )
        .max( 50, 'Too Long!' ),
    email: Yup.string()
        .email( 'Invalid email' )
        .required( 'Required' ),
    gender: Yup.string()
        .oneOf( [ 'male', 'fame', 'other' ], 'Required' )
        .required( 'Required' ),
    country: Yup.object()
        .required( 'Required' ),
    birthday: Yup.string()
        .required( 'Required' ),
    phone: Yup.string()
        .max( 20, 'Too Long!' )
        .required( 'Required' ),
    documentType: Yup.object()
        .required( 'Required' ),
    documentNumber: Yup.string()
        .required( 'Required' ),
    address: Yup.string()
        .required( 'Required' ),
    enable: Yup.object()
        .required( 'Required' ),
    roles: Yup.array()
        .min( 1 )
        .required( 'Required' ),
    permissions: Yup.array()
        .min( 1 ),
    password: Yup.string()
        .min( 2, 'Too Short!' )
        .max( 50, 'Too Long!' )
        .required( 'Required' ),
    passwordConfirmation: Yup.string()
        .oneOf( [ Yup.ref( 'password' ), null ], 'Passwords must match' )
        .required( 'Required' )
};

export default UserUpdateSchema;
