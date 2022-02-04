import { createSignal } from 'solid-js';

function useModal<T> ( initialValue: T )
{
    const [ isShowModal, setIsShowModal ] = createSignal( false );
    const [ modalData, setModalData ] = createSignal<T>( initialValue );

    const openModal = (  newModalData: T ) =>  () =>
    {
        setIsShowModal( true );
        setModalData( newModalData );
    };

    const closeModal = () => () =>
    {
        setIsShowModal( false );
    };

    return ( { isShowModal, modalData, setModalData, openModal, closeModal } );
}


export default useModal;
