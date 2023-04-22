import { useParams } from '@solidjs/router';
import { Component } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import UserEditPassword from '../../../features/user/templates/UserEditPassword/UserEditPassword';
import UserRepository from '../../../features/user/repositories/UserRepository';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';

const IndexPage: Component = () =>
{
    const { id } = useParams<{ id: string }> ();
    const [ user ] = useApplicationContext();
    const userRepository = new UserRepository();

    const editPassword = async ( data: any ) =>
    {
        void await userRepository.editPassword( { id, data, user: user() } );
    };

    return <PrivateLayout>
        <UserEditPassword
            editPasswordAction={editPassword}
        />
    </PrivateLayout>;
};

export default IndexPage;
