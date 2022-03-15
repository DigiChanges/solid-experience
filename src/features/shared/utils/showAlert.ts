import { createSignal } from 'solid-js';
import notify from './notif';
const [ showAlert, setShowAlert ] = createSignal();

export const showSuccessAlert = ( message: string ) =>
    setShowAlert( notify( {  msg: message, in: 'row success intro', duration: 2.9, progressbar: 'notif-progress-bar', out: 'outro' } ) );

export const showErrorAlert = ( message: string ) =>
    setShowAlert( notify( { msg: message, in: 'row error intro', duration: 2.9, progressbar: 'notif-progress-bar', out: 'outro' } ) );

export {  showAlert, setShowAlert  };
