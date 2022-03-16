import { createSignal } from 'solid-js';
import alert from './alert';
const [ showAlert, setShowAlert ] = createSignal();

export const showSuccessAlert = ( message: string ) =>
    setShowAlert( alert( {  msg: message, in: 'row success intro', duration: 2.9,  out: 'outro' } ) );

export const showErrorAlert = ( message: string ) =>
    setShowAlert( alert( { msg: message, in: 'row error intro', duration: 2.9,  out: 'outro' } ) );

export {  showAlert, setShowAlert };
