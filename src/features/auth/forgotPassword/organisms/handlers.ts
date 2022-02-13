import { FormType } from 'solid-js-form';
import { Store } from 'solid-js/store';
import AuthRepository from '../../../../repositories/AuthRepository';

export const handleSubmit = () => async ( form: Store<FormType.Context<{ email: string }>> ) =>
{
    const authRepository = new AuthRepository();
    authRepository.getForgotPassword( form.values.email );
};
