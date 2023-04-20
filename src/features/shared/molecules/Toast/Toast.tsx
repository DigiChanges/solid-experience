import { Toast, toaster } from '@kobalte/core';
import styles from './Toast.module.css';
import { IoClose } from 'solid-icons/io';
import { Show } from 'solid-js';
import { IoInformationCircleSharp, IoAlertCircle } from 'solid-icons/io';
import { RiSystemAlertFill } from 'solid-icons/ri';
import { HiSolidCheckCircle } from 'solid-icons/hi';

interface ToastsProps {
    title: string;
    description?: string;
    status?: string;
}
let id: number;
export const notificationService = {
    show: ( { title, description, status = 'info' }: ToastsProps ) =>
    {
        id = toaster.show( props => (
            <Toast.Root toastId={props.toastId} class={styles.toast}>
                <div class={styles.toast__content}>
                    <Show when={status === 'info'} keyed><IoInformationCircleSharp color={'var(--hope-colors-info-200)'} class={'w-[30px] h-[30px]'}/></Show>
                    <Show when={status === 'danger'} keyed><IoAlertCircle color={'var(--hope-colors-danger-200)'} class={'w-[30px] h-[30px]'}/></Show>
                    <Show when={status === 'success'} keyed><HiSolidCheckCircle color={'var(--hope-colors-success-200)'} class={'w-[30px] h-[30px]'}/></Show>
                    <Show when={status === 'warning'} keyed><RiSystemAlertFill color={'var(--hope-colors-warning-200)'} class={'w-[30px] h-[30px]'}/></Show>
                    <div>
                        <Toast.Title class={styles.toast__title}>{title}</Toast.Title>
                        <Toast.Description class={styles.toast__description}>{description}</Toast.Description>
                    </div>
                    <Toast.CloseButton class={styles.toast__close__button}><IoClose /></Toast.CloseButton>
                </div>
                <Toast.ProgressTrack class={styles.toast__progress__track}>
                    <Toast.ProgressFill class={styles.toast__progress__fill} style={{ 'background-color': `var(--hope-colors-${status}-200)` }}/>
                </Toast.ProgressTrack>
            </Toast.Root>
        ) );
    },
    update: ( { title, description, status = 'info' }: ToastsProps ) =>
    {
        toaster.update( id, props => (
            <Toast.Root toastId={props.toastId} class={styles.toast}>
                <div class={styles.toast__content}>
                    <Show when={status === 'info'} keyed><IoInformationCircleSharp color={'var(--hope-colors-info-200)'} class={'w-[30px] h-[30px]'}/></Show>
                    <Show when={status === 'danger'} keyed><IoAlertCircle color={'var(--hope-colors-danger-200)'} class={'w-[30px] h-[30px]'}/></Show>
                    <Show when={status === 'success'} keyed><HiSolidCheckCircle color={'var(--hope-colors-success-200)'} class={'w-[30px] h-[30px]'}/></Show>
                    <Show when={status === 'warning'} keyed><RiSystemAlertFill color={'var(--hope-colors-warning-200)'} class={'w-[30px] h-[30px]'}/></Show>
                    <div>
                        <Toast.Title class={styles.toast__title}>{title}</Toast.Title>
                        <Toast.Description class={styles.toast__description}>{description}</Toast.Description>
                    </div>
                    <Toast.CloseButton class={styles.toast__close__button}><IoClose /></Toast.CloseButton>
                </div>
                <Toast.ProgressTrack class={styles.toast__progress__track}>
                    <Toast.ProgressFill class={styles.toast__progress__fill} style={{ 'background-color': `var(--hope-colors-${status}-200)` }}/>
                </Toast.ProgressTrack>
            </Toast.Root>
        ) );
    },
};
