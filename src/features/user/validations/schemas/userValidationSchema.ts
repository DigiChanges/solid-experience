import { object, string } from 'yup';
import { IsValidBirthday } from '../../utils/validationCustom';

const userValidationSchema = object({
    firstName: string()
        .min(2, 'av_too_short')
        .max(50, 'av_too_long')
        .required('av_required'),
    lastName: string()
        .min(2, 'av_too_short')
        .max(50, 'av_too_long')
        .required('av_required'),
    email: string()
        .email('Invalid email')
        .required('av_required'),
    genre: string()
        .oneOf(['M', 'F', 'O'], 'av_required')
        .required('av_required'),
    country: string()
        .required('av_required'),
    birthdate: string()
        .test(
            'is-valid-format',
            'Invalid format',
            (value: any) => IsValidBirthday(value)
        )
        .required('av_required'),
    phone: string()
        .max(20, 'av_too_long')
        .required('av_required')
});

export default userValidationSchema;
