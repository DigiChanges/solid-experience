import { useParams } from 'solid-app-router';
import { Component } from 'solid-js';
import AuthRepository from '../../../repositories/AuthRepository';
import PublicLayout from '../../../templates/layout/PublicLayout';
import UserChangePassword from '../../../templates/users/UserChangePassword';
// import withAuth from '../../../providers/withAuth';

const IndexPage: Component = () =>
{

    const { token } = useParams<{ token: string ; }> ();
    const repository = new AuthRepository();

    const changePasswordAction = async ( body: any ) =>
    {
        void await repository.setChangeForgotPassword( body );

    };

    return <PublicLayout>
        <UserChangePassword
            confirmationToken={token}
            changePasswordAction={changePasswordAction}
        />
    </PublicLayout>;
};

export default IndexPage;
