import { object, string, addMethod, mixed } from 'yup';
import { IsValidBirthday } from '../../utils/validationCustom';

const userValidationSchema = object( {
    firstName: string()
        .min( 3, 'av_too_short' )
        .max( 50, 'av_too_long' )
        .test('formato de texto no válido', 'av_invalid_format', value => value?.match(/^[a-zA-ZáÁéÉíÍóÓúÚüÜñÑ\s']+$/))
        .required( 'av_required' ),
    lastName: string()
        .min( 3, 'av_too_short' )
        .max( 50, 'av_too_long' )
        .test('formato de texto no válido', 'av_invalid_format', value => value?.match(/^[a-zA-ZáÁéÉíÍóÓúÚüÜñÑ\s']+$/))
        .required( 'av_required' ),
    email: string()
        .email( 'Invalid email' )
        .required( 'av_required' ),
    gender: string()
        .oneOf( [ 'M', 'F', 'O' ], 'av_required' )
        .required( 'av_required' ),
    country: string()
        .required( 'av_required' ),
    birthday: string()
        .test(
            'is-valid-format',
            'Invalid format',
            ( value: any ) => IsValidBirthday( value )
        )
        .required( 'av_required' ),
    phone: string()
        .min( 3, 'av_too_short' )
        .max( 16, 'av_too_long' )
        .test('formato de texto no válido', 'av_invalid_format', value => value?.match(/^[0-9]+$/))
        .required( 'av_required' ),
    documentType: string()
        .oneOf( [ 'dni', 'cuil' ], 'av_required' )
        .required( 'av_required' ),
    documentNumber: string()
        .min( 3, 'av_too_short' )
        .max( 16, 'av_too_long' )
        .required( 'av_required' ),
    address: string()
        .test('formato de texto no válido', 'av_invalid_format', value => value?.match(/^[a-zA-ZáÁéÉíÍóÓúÚüÜñÑ\s',.]+$/))
        .required( 'av_required' ),

} );

export default userValidationSchema;
