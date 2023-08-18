import { object, number, string } from 'yup';

const itemSchema = object({
    name: string()
        .min(3, 'av_too_short')
        .max(50, 'av_too_long')
        .required('av_required'),
    type: number()
        .min(3, 'av_too_short')
        .max(50, 'av_too_long')
        .required('av_required')
});

export default itemSchema;
