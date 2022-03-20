import { Component, createResource } from 'solid-js';
import { useApplicationContext } from '../../context/context';
import { IRoleApi, RoleListResponse } from '../../features/role/interfaces';
import RoleRepository from '../../features/role/repositories/RoleRepository';
import RoleList from '../../features/role/templates/RoleList';
import { INIT_STATE } from '../../features/shared/constants';
import usePaginatedState from '../../features/shared/hooks/usePaginatedState';
import useQuery from '../../features/shared/hooks/useQuery';
import PrivateLayout from '../../features/shared/layout/PrivateLayout';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const roleRepository = new RoleRepository( user() );

    const { page, goToPage, uriParams, goFirstPage } = useQuery( INIT_STATE.nextQueryParamsPagination );

    const [ roles, { refetch } ] = createResource( uriParams, roleRepository.getRoles() );
    const { resourceList: roleList, setViewMore, paginationData } = usePaginatedState<IRoleApi, RoleListResponse>( roles );

    const viewMoreAction = () => () =>
    {
        goToPage( roles()?.pagination?.nextUrl );
        setViewMore();
    };

    const removeAction = async ( id: string  ) =>
    {
        const remove = roleRepository.removeRole( id );
        void await remove();
        if ( page() === INIT_STATE.nextQueryParamsPagination )
        {
            return refetch();
        }

        goFirstPage();
    };

    return (
        <PrivateLayout>
            {roles.error && <h1>Error: {roles?.error?.message}</h1>}
            <RoleList
                roleList={roleList()}
                removeAction={removeAction}
                loading={roles.loading}
                viewMoreAction={viewMoreAction}
                nextPage={paginationData()?.nextUrl}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
