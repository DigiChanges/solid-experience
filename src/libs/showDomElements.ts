import cash from 'cash-dom';

function showDomElements ( elementIds: string[] )
{
    if ( Array.isArray( elementIds ) )
    {
        cash( 'document' ).ready(  function ()
        {
            for ( const elementId of elementIds )
            {
                cash( `#${elementId}` ).find( '.fallback' ).hide();
                cash( `#${elementId}` ).find( '.permission' ).show();
            }
        } );
    }
}

export default showDomElements;
