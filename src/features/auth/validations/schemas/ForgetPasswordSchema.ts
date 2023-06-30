import * as Yup from 'yup';
import { object } from 'yup';

const ForgetPasswordSchema = object({
    email: Yup.string()
        .email('Invalid email')
        .required('Required')
});

export default ForgetPasswordSchema;
