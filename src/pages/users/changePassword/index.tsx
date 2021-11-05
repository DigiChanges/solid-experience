import { useParams } from 'solid-app-router';
import { Component } from 'solid-js';
import AuthRepository from '../../../repositories/AuthRepository';
import PublicLayout from '../../../templates/layout/PublicLayout';
import UserChangePassword from '../../../templates/users/UserChangePassword';

// import withAuth from '../../../providers/withAuth';
const IndexPage: Component = ( props ) =>
{

    const { token } = useParams<{ token: string ; }> ();
    const authorzation = new AuthRepository();

    const changePasswordAction = ( body: any ) =>
    {
        authorzation.setChangeForgotPassword( body );

    };

    return <PublicLayout>
        <UserChangePassword
            confirmationToken={token}
            changePasswordAction={changePasswordAction}
        />
    </PublicLayout>;
};

export default IndexPage;
