import { notificationService } from '../../features/shared/molecules/Toasts/Toasts';
import { useI18n } from 'solid-i18n';
import { Component, createEffect, createResource } from 'solid-js';
import { useApplicationContext } from '../../context/context';
import { RoleApi, RoleListResponse } from '../../features/role/interfaces';
import RoleRepository from '../../features/role/repositories/RoleRepository';
import RoleList from '../../features/role/templates/RoleList/RoleList';
import { INIT_STATE } from '../../features/shared/constants';
import createAlert from '../../features/shared/hooks/createAlert';
import usePaginatedState from '../../features/shared/hooks/usePaginatedState';
import usePermission from '../../features/shared/hooks/usePermission';
import useQuery from '../../features/shared/hooks/useQuery';
import PrivateLayout from '../../features/shared/layout/PrivateLayout/PrivateLayout';
import AlertErrors from '../../features/shared/molecules/AlertErrors/AlertErrors';

const IndexPage: Component = () =>
{
    const { t } = useI18n();
    const { errorData, setError } = createAlert();

    const [ user ]: any = useApplicationContext();
    const roleRepository = new RoleRepository();

    const { page, goToPage, goFirstPage, getURLSearchParams } = useQuery( INIT_STATE.nextPaginationParams );

    const [ roles, { refetch } ] = createResource( { user: user(), queryParams: getURLSearchParams() }, roleRepository.getRoles );
    const { resourceList: roleList, setViewMore, paginationData } = usePaginatedState<RoleApi, RoleListResponse>( roles );

    usePermission( user, [ roles ] );

    const viewMoreAction = () => () =>
    {
        goToPage( roles()?.pagination?.nextUrl );
        setViewMore();
    };

    createEffect( () => roles.error && setError( roles.error ) );

    const removeAction = async ( id: string ) =>
    {
        try
        {
            void await roleRepository.removeRole( { id, user: user() } );

            notificationService.show( {
                /* status: 'success', */
                title: t( 'r_removed' ) as string,
            } );

            if ( page()?.offset === INIT_STATE.nextPaginationParams.offset )
            {
                return refetch();
            }

            goFirstPage();
        }
        catch ( error )
        {
            const errorMessage = setError( error );
            notificationService.show( {
                /* status: 'danger', */
                title: t( 'err_remove_role' ) as string,
                description: t( errorMessage ) as string,
            } );
        }
    };

    return (
        <PrivateLayout>
            <AlertErrors errorData={errorData()} title="err" description="err_process_role"/>
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
