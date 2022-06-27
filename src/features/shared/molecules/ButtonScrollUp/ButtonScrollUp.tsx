import { IconButton } from '@hope-ui/solid';
import { Component, createSignal, onCleanup } from 'solid-js';
import IconArrowCircleLeft from '../../../../atoms/Icons/Stroke/IconArrowCircleLeft';
import styles from './ButtonScrollUp.module.css';

interface ButtonGoUpProps {
    onGoUp?: ( e: MouseEvent ) => void;
}

const handleClick = ( { scrollTop }: { scrollTop: () => void } ) => () => scrollTop();

const ButtonScrollUp: Component<ButtonGoUpProps> = ( props ) =>
{
    const [ getShowScroll, setShowScroll ] = createSignal( false );

    function checkScrollTop ()
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
        <IconButton
            aria-label="Go top"
            onClick={handleClick( { scrollTop } )}
            class={styles.button_scroll_up}
            classList={{
                flex: getShowScroll(),
                hidden: !getShowScroll(),
            }}
            variant="ghost"
            icon={<IconArrowCircleLeft />}
        />
    );
};

export default ButtonScrollUp;
