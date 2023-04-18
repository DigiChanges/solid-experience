import { Component, JSXElement } from 'solid-js';
import styles from './Alert.module.css';
import { Alert as KAlert } from '@kobalte/core';
import { CloseButton } from '@hope-ui/core';

interface AlertProps {
    status: 'danger' | 'success' | 'warning' | 'info';
    icon: JSXElement;
    title: JSXElement;
    description?: JSXElement;
    onClick?: any;
}

const Alert: Component<AlertProps> = ( props ) =>
{
    return (
        <KAlert.Root class={`${styles.alert} ${props.status ? props.status : 'info'}`}>
            <div class={styles.icon}>{props.icon}</div>
            <div class={'flex flex-col'}>
                <span class={styles.title}>{props.title}</span>
                <span>{props.description}</span>
            </div>
            {props.onClick && <CloseButton onClick={props.onClick} position="absolute" right="8px" top="8px" _dark={{ color: `${props.status}.200` }}/>}
        </KAlert.Root>
    );
};

export default Alert;
