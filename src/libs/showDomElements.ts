import cash from 'cash-dom';

function showDomElements ( elementDataParents: string[] )
{
    if ( Array.isArray( elementDataParents ) )
    {
        cash( 'document' ).ready(  function ()
        {
            for ( const elementId of elementDataParents )
            {
                cash( `[data-parent="${elementId}"]` )
                    .each( ( idx, elem )  =>
                    {
                        const parent = cash( elem );
                        parent.find( '.fallback' ).hide();
                        parent.find( '.permission' ).show();
                    } );
            }
        } );
    }
}

export default showDomElements;
