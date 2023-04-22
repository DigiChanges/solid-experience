import { createEffect, createMemo, Resource } from 'solid-js';
import showDomElements from '../../../libs/showDomElements';

function usePermission ( user: any, resourceWithLoading?: Resource<any>[] )
{
    void showDomElements( user()?.user.permissions );
    const resourcesLoaded = createMemo( () =>
    {
        if ( Array.isArray( resourceWithLoading ) && user()?.user.permissions )
        {
            return resourceWithLoading.every( resource => !resource.loading );
        }
        else
        {
            return Array.isArray( user()?.user.permissions );
        }
    } );

    createEffect( () =>
    {
        if ( resourcesLoaded() )
        {
            showDomElements( user()?.user.permissions );
        }
    } );
}

export default usePermission;
