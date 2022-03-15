import { createSignal } from 'solid-js';
import notify from './notif';
const [ showNotification, setShowNotification ] = createSignal();
const [ showNotify, setShowNotify ] = createSignal( false );

export const showSuccessNotification = ( message: string ) =>
    setShowNotification( notify( {  msg: message, in: 'row success intro', duration: 2.9, progressbar: 'notif-progress-bar', out: 'outro' } ) );

export const showErrorNotification = ( message: string ) =>
    setShowNotification( notify( { msg: message, in: 'row error intro', duration: 2.9, progressbar: 'notif-progress-bar', out: 'outro' } ) );

export {  showNotification, setShowNotification, showNotify, setShowNotify };
