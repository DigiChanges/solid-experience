import { Component, JSXElement } from 'solid-js';
import styles from './Alert.module.css';
import { Alert as KAlert } from '@kobalte/core';
import { CloseButton } from '@hope-ui/core';

interface AlertProps {
    status: 'danger' | 'success' | 'warning' | 'info';
    variant: 'solid' | 'subtle' | 'left-accent' | 'top-accent';
    icon: JSXElement;
    title: JSXElement;
    description?: JSXElement;
    onClick?: any;
    class?: string;
}

const Alert: Component<AlertProps> = ( props ) =>
{
    return (
        <KAlert.Root class={`${styles.alert} ${props.class} ${props.variant === 'solid' ? `${props.variant}-${props.status}` : `${props.variant} ${props.status}`}`}>
            <div class={styles.icon}>{props.icon}</div>
            <div class={'flex flex-col'}>
                <span class={styles.title}>{props.title}</span>
                <span>{props.description}</span>
            </div>
            {props.onClick && <CloseButton onClick={props.onClick} position="absolute" right="8px" top="8px" _dark={{ color: `${props.status}.200`, cursor: 'pointer' }}/>}
        </KAlert.Root>
    );
};

export default Alert;
