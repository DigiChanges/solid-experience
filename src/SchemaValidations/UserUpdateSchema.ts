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
        .oneOf( [ 'male', 'female', 'other' ], 'Gender there is not be empty' )
        .required(),
    country: Yup.string()
        .required(),
    birthday: Yup.string()
        .required(),
    phone: Yup.string()
        .required(),
    documentType: Yup.string()
        .required(),
    documentNumber: Yup.string()
        .required(),
    address: Yup.string()
        .required(),
    enable: Yup.boolean()
        .required(),
    roles: Yup.array()
        .min( 1 )
        .required(),
    permissions: Yup.array()
        .min( 0 )
};

export default UserUpdateSchema;
