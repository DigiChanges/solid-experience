import { IconButton } from '@hope-ui/core';
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
                variant="plain"
                classList={{
                    [styles.icon_not_expanded]: !props.getExpanded,
                }}
                children={ <IconArrowCircleLeft />}
            />
        </div>
    </div>
);

export default ExpandButton;
