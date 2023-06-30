import { array, string } from 'yup';
import userValidationSchema from './userValidationSchema';

const userUpdateValidationSchema = userValidationSchema.shape({
    permissions: array().of(string()),
    roles: array().of(string())
});

export default userUpdateValidationSchema;
