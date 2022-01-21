import { useNavigate, useParams } from 'solid-app-router';
import { Component } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import UserRepository from '../../../repositories/UserRepository';
import PrivateLayout from '../../../templates/layout/PrivateLayout';
import UserEditPassword from '../../../templates/users/UserEditPassword';

const IndexPage: Component = () =>
{
    const navigate = useNavigate();
    const { id } = useParams<{ id: string ; }> ();
    const [ user ]: any = useApplicationContext();
    const userRepository = new UserRepository( user() );

    const editPassword = async ( data:any ) =>
    {
        const remove = userRepository.editPassword( id, data );
        void await remove();
        navigate( '/users', { replace : true } );
    };
    return <PrivateLayout>
        <UserEditPassword
            confirmationToken={id}
            editPasswordAction={editPassword}
        />
    </PrivateLayout>;
};

export default IndexPage;
