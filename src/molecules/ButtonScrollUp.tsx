import { Component, createSignal, onCleanup } from 'solid-js';
import Button from '../atoms/Button';
import IconArrowCircleLeft from '../atoms/Icons/Stroke/IconArrowCircleLeft';

interface ButtonGoUpProps {
    onGoUp?: ( e: MouseEvent ) => void;
    class?: string
}

const handleClick = ( { scrollTop }: { scrollTop: () => void } ) =>  () => scrollTop();

const ButtonScrollUp: Component<ButtonGoUpProps> = ( props ) =>
{
    const [ getShowScroll, setShowScroll ] = createSignal( false );

    function checkScrollTop  ()
    {
        if ( !getShowScroll() && window.pageYOffset > 300 )
        {
            setShowScroll( true );
        }
        else if ( getShowScroll() && window.pageYOffset <= 300 )
        {
            setShowScroll( false );
        }
    }

    if ( typeof window !== 'undefined' )
    {
        window.addEventListener( 'scroll', checkScrollTop );
    }

    const scrollTop = () =>
    {
        if ( typeof window !== 'undefined' )
        {
            window.scrollTo( { top: 0, behavior: 'smooth' } );
        }
    };

    onCleanup( () =>
    {
        if ( typeof window !== 'undefined' )
        {
            window.removeEventListener( 'scroll', checkScrollTop );
        }
    } );

    return (
        <Button
            onClick={handleClick( { scrollTop } )}
            class={`h-10 w-10 transform rotate-90 text-main-gray-250 ${props.class} ${getShowScroll() ? 'flex' : 'hidden'}`}
        >
            <IconArrowCircleLeft />
        </Button>
    );
};

export default ButtonScrollUp;
