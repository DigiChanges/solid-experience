import { object, string } from 'yup';

const signUpSchema = object({
    email: string()
        .email('av_email_valid')
        .required('av_required'),
    password: string()
        .min(2, 'av_too_short')
        .max(50, 'av_too_long')
        .required('av_required')
});

export default signUpSchema;
