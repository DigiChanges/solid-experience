import userValidationSchema from './userValidationSchema';

const userUpdateValidationSchema = ( t: any ) => ( {
    ...userValidationSchema( t ),
} );

export default userUpdateValidationSchema;
