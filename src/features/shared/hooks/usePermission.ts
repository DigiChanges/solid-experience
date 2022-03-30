import { createEffect, Resource } from 'solid-js';
import showDomElements from '../../../libs/showDomElements';

function usePermission ( user: any, resourceWithLoading?: Resource<any>[] )
{
    void showDomElements( user().user.permissions );
    createEffect( () =>
    {
        if ( Array.isArray( resourceWithLoading ) )
        {
            let isLoaded = true;
            for ( const resource of resourceWithLoading )
            {
                if ( resource?.loading )
                {
                    isLoaded = false;
                }
            }
            if ( isLoaded )
            {
                showDomElements( user().user.permissions );
            }
        }
    } );
}

export default usePermission;
