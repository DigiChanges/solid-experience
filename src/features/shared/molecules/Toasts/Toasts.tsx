import { Toast, toaster } from '@kobalte/core';
import IconCross from '../../../../atoms/Icons/Stroke/IconCross';
import styles from './Toasts.module.css';

interface ToastsProps {
    title: string;
    description?: string;
}
let id: number;
export const notificationService = {
    show: ( { title, description }: ToastsProps ) =>
    {
        id = toaster.show( props => (
            <Toast.Root toastId={props.toastId} class={styles.toast}>
                <div class={styles.toast__content}>
                    <div>
                        <Toast.Title class={styles.toast__title}>{title}</Toast.Title>
                        <Toast.Description class={styles.toast__description}>{description}</Toast.Description>
                    </div>
                    <Toast.CloseButton class={styles.toast__close__button}><IconCross/></Toast.CloseButton>
                </div>
                <Toast.ProgressTrack class={styles.toast__progress__track}>
                    <Toast.ProgressFill class={styles.toast__progress__fill}/>
                </Toast.ProgressTrack>
            </Toast.Root>
        ) );
    },
    update: ( { title, description }: ToastsProps ) =>
    {
        toaster.update( id, props => (
            <Toast.Root toastId={props.toastId} class={styles.toast}>
                <div class={styles.toast__content}>
                    <div>
                        <Toast.Title class={styles.toast__title}>{title}</Toast.Title>
                        <Toast.Description class={styles.toast__description}>{description}</Toast.Description>
                    </div>
                    <Toast.CloseButton class={styles.toast__close__button}><IconCross/></Toast.CloseButton>
                </div>
                <Toast.ProgressTrack class={styles.toast__progress__track}>
                    <Toast.ProgressFill class={styles.toast__progress__fill} />
                </Toast.ProgressTrack>
            </Toast.Root>
        ) );
    },
};
