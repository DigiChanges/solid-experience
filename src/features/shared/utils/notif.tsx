/* eslint-disable no-unused-expressions */
// @ts-nocheck
const container = document.createElement( 'div' );
container.id = 'container';
export default function notify ( o = {} )
{
    let position = 'bottomright';// but you can choose bottomleft or topright or bottomright
    switch ( position )
    {
        case 'topright':
            position = 'top:0;right:0';
            break;
        case 'bottomleft':
            position = 'bottom:0';
            break;
        case 'bottomright':
            position = 'bottom:0;right:0';
            break;
        default:
            position = 'bottomright';
    }
    // container.style = position;
    if ( !container.children[0] )
    {
        const body = document.getElementsByClassName( 'containerNotification' )[0];
        body.append( container );
    }
    const d = o.duration * 1000 || 0;
    const a = ( o.in || '' ).match( /[^ ,]+/g );
    const b = ( o.out || '' ).match( /[^ ,]+/g );
    const p = ( o.progressbar || '' ).match( /[^ ,]+/g );
    const m = ( o.msg || '' );
    const r = document.createElement( 'div' );

    const close = e =>
    {
        b && r.classList.add( ...b );
        setTimeout( () =>
        {
            e.remove(); !container.children[0] && container.remove();
        }, b ? parseFloat( getComputedStyle( r ).getPropertyValue( 'animation-duration' ) ) * 1000 : 0 );
    };

    const progressbar = d && p ? `<div class='${  p.join( ' ' )  }'></div>` : '';
    r.innerHTML = o.block || `${m}</br>${progressbar}`;

    a && r.classList.add( ...a );
    if ( position.match( /top/i ) )
    {
        container.append( r );
        container.scrollTo( 0, container.scrollHeight );
    }
    else
    {
        container.prepend( r );
        container.scrollTo( container.scrollHeight, 0 );
    }
    // if (container.children.length == 2 && container.children.length < 3) { container.append(clear) }
    // container.scrollHeight > window.,innerHeight;

    let s = 0; const t = setInterval( () =>
    {
        if ( p && d )
        {
            r.querySelector( `.${  p[0]}` ).style.width = `${( d - s ) / d * 100  }%`;
        }
        if ( s >= d )
        {
            clearInterval( t ); d && close( r );
        }
        s += 4;
    } );
}
