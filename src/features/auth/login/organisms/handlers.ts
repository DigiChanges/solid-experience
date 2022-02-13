import { FormType } from 'solid-js-form';
import { Store } from 'solid-js/store';
import { ILoginPayload } from '../../../../interfaces/auth';
import AuthRepository from '../../../../repositories/AuthRepository';

type FormSubmit = Store<FormType.Context<{
    email: string;
    password: string;
}>>;

export const handleSubmit = ( { addUser, navigate }: any ) => async ( form: FormSubmit ) =>
{
    const authRepository = new AuthRepository();
    const signIn = authRepository.signIn( form.values as ILoginPayload );
    const response = await signIn();
    addUser( response.data );
    navigate( '/dashboard', { replace: true } );
};
