import * as Yup from 'yup';

const RoleSchema = {
    name: Yup.string()
        .required('Required' )
        .min( 2, 'Too Short!' )
        .max( 50, 'Too Long!' ),
    slug: Yup.string()
        .required('Required' )
        .min( 2, 'Too Short!' )
        .max( 50, 'Too Long!' ),
    permissions: Yup.array()
        .required( 'Required' )
};

export default RoleSchema;
