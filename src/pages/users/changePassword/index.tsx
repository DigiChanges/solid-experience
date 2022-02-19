import { useParams } from 'solid-app-router';
import { Component } from 'solid-js';
import { showErrorNotification, showSuccessNotification } from '../../../features/shared/utils/showNotification';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import GeneralLayout from '../../../features/shared/layout/GeneralLayout';
import UserChangePassword from '../../../features/user/templates/UserChangePassword';

const IndexPage: Component = () =>
{
    const { token } = useParams<{ token: string  }> ();
    const repository = new AuthRepository();

    const changePasswordAction = async ( body: any ) =>
    {
        const change = repository.setChangeForgotPassword( body );
        const res = await change().then( () =>
        {
            showSuccessNotification( 'Contraseña actualizada' );
        } )
            .catch( () =>
            {
                showErrorNotification( 'Error interno del servidor' );
            } );
    };

    return ( <GeneralLayout>
        <UserChangePassword
            confirmationToken={token}
            changePasswordAction={changePasswordAction}
        />
    </GeneralLayout>
    );
};

export default IndexPage;
