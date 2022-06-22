import { array, string } from 'yup';
import userValidationSchema from './userValidationSchema';

const userUpdateValidationSchema = userValidationSchema.shape( {
    permissions: array().of( string() ).min( 1, 'av_one_item' ).required( 'av_required' ),
    roles: array().of( string() ).min( 1, 'av_one_item' ).required( 'av_required' ),
} );

export default userUpdateValidationSchema;
