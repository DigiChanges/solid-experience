import { useParams } from 'solid-app-router';
import { Component } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import UserEditPassword from '../../../features/user/templates/UserEditPassword/UserEditPassword';
import UserRepository from '../../../features/user/repositories/UserRepository';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';

const IndexPage: Component = () =>
{
    const { id } = useParams<{ id: string }> ();
    const [ user ]: any = useApplicationContext();
    const userRepository = new UserRepository( user() );

    const editPassword = async ( data: any ) =>
    {
        const remove = userRepository.editPassword( id, data );
        void await remove();
    };
    return <PrivateLayout>
        <UserEditPassword
            editPasswordAction={editPassword}
        />
    </PrivateLayout>;
};

export default IndexPage;
