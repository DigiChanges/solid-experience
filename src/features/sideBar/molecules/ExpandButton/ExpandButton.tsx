import { IconButton } from '@hope-ui/solid';
import { Component } from 'solid-js';
import IconArrowCircleLeft from '../../../../atoms/Icons/Stroke/IconArrowCircleLeft';
import styles from './ExpandButton.module.css';

interface SideBarProps {
    getExpanded: any;
    setExpanded: any;
}

const ExpandButton: Component<SideBarProps> = ( props ) => (
    <div class={styles.container}
        classList={{
            [styles.not_expanded]: !props.getExpanded,
        }}
    >

        <div
            class={styles.button_container}
        >
            <IconButton
                aria-label="Expand Sidebar"
                onClick={() => props.setExpanded( !props.getExpanded )}
                class={styles.icon}
                variant="ghost"
                classList={{
                    [styles.icon_not_expanded]: !props.getExpanded,
                }}
                icon={ <IconArrowCircleLeft />}
                compact
            />
        </div>
    </div>
);

export default ExpandButton;
