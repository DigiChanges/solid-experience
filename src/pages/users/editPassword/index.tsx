import { useNavigate, useParams } from 'solid-app-router';
import { Component } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import UserEditPassword from '../../../features/user/templates/UserEditPassword';
import UserRepository from '../../../features/user/repositories/UserRepository';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout';

const IndexPage: Component = () =>
{
    const navigate = useNavigate();
    const { id } = useParams<{ id: string  }> ();
    const [ user ]: any = useApplicationContext();
    const userRepository = new UserRepository( user() );

    const editPassword = async ( data: any ) =>
    {
        const remove = userRepository.editPassword( id, data );
        void await remove();
        navigate( '/users', { replace: true } );
    };
    return <PrivateLayout>
        <UserEditPassword
            confirmationToken={id}
            editPasswordAction={editPassword}
        />
    </PrivateLayout>;
};

export default IndexPage;
