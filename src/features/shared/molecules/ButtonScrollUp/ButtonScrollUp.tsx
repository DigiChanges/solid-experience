import { IconButton } from '@hope-ui/core';
import { Component, createEffect, createSignal } from 'solid-js';
import IconArrowCircleLeft from '../../../../atoms/Icons/Stroke/IconArrowCircleLeft';
import styles from './ButtonScrollUp.module.css';
import { RoleApi } from '../../../role/interfaces';
import { UserApi } from '../../../user/interfaces';

interface ButtonGoUpProps {
    onGoUp?: ( e: MouseEvent ) => void;
    dependencies: RoleApi[] | UserApi[] | undefined;
}

const handleClick = ( { scrollTop }: { scrollTop: () => void } ) => () => scrollTop();

const ButtonScrollUp: Component<ButtonGoUpProps> = ( props ) =>
{
    const [ hideButton, setHideButton ] = createSignal( true );

    const calculateDocumentHeight = (): boolean =>
    {
        const root = document.getElementById( 'root' );
        if ( props.dependencies )
        {
            if ( root )
            {
                return root.clientHeight < window.innerHeight;
            }
        }
        else
        {
            setHideButton( true );
        }
    };

    createEffect( () =>
    {
        setHideButton( calculateDocumentHeight() );
    } ) ;

    window.onresize = () =>
    {
        setHideButton( calculateDocumentHeight() );
    };
    const scrollTop = () =>
    {
        if ( typeof window !== 'undefined' )
        {
            window.scrollTo( { top: 0, behavior: 'smooth' } );
        }
    };

    return (
        <IconButton
            aria-label="Go top"
            onClick={handleClick( { scrollTop } )}
            class={`${styles.button_scroll_up} ${hideButton() && 'hidden'}`}
            variant="plain"
            children={<IconArrowCircleLeft />}
        />
    );
};

export default ButtonScrollUp;
