import { useNavigate } from 'solid-app-router';
import { Component } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import RoleRepository from '../../../repositories/RoleRepository';
import PrivateLayout from '../../../templates/layout/PrivateLayout';
import RoleCreate from '../../../templates/roles/RoleCreate';

const IndexPage: Component = ( props ) =>
{
    const [ user ]: any = useApplicationContext();
    const roleRepository = new RoleRepository( user() );
    const navigate = useNavigate();

    const createAction = async ( body: any ) =>
    {
        const create = roleRepository.createRole ( body );
        void await create();
        navigate( '/roles', { replace : true } );
    };

    return <PrivateLayout>
        <RoleCreate
            createAction={createAction}
        />
    </PrivateLayout>;
};

export default IndexPage;
