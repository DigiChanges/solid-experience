import { useNavigate } from 'solid-app-router';
import { Component } from 'solid-js';
import Button from '../../atoms/Button';
import IconCross from '../../atoms/Icons/Stroke/IconCross';
import IconExclamation from '../../atoms/Icons/Stroke/IconExclamation';
import ButtonClose from '../../molecules/ButtonClose';
import ButtonConfirm from '../../molecules/ButtonConfirm';
import Modal from '../../molecules/Modal';

interface ConfirmDeleteTemplateProps
{
    open: boolean;
    text: any;
    action: any;
    idSelected: string;
    setShowModal:any
}

const ConfirmDelete: Component<ConfirmDeleteTemplateProps> = ( props ) =>
{
    const navigate = useNavigate();
    const closeModal = () =>
    {
        props.setShowModal( false );
    };

    const onHandleCloseModal = () =>
    {
        closeModal();
    };

    const onHandleDeleteUser = () =>
    {
        ( props.action( props.idSelected ) );
        closeModal();
        // navigate( '/users', { replace : false } );
    };

    return (
        <Modal open={props.open }>
            <div class=" dg-full-center-flex">
                <div class="dg-rounded-small-box flex flex-col justify-between">
                    <div class="w-full flex justify-end">
                        <Button class="dg-link w-6" type="button" onClick={onHandleCloseModal}>
                            <IconCross />
                        </Button>
                    </div>
                    <div class="flex w-full justify-center">
                        <span class="text-red-500 w-12">
                            <IconExclamation />
                        </span>
                    </div>
                    <div class="flex w-full justify-center align-middle">
                        {props.text}
                    </div>
                    <div class="flex justify-around ">
                        <ButtonClose onClick={onHandleCloseModal}>
                                Cancel
                        </ButtonClose>
                        <ButtonConfirm onClick={onHandleDeleteUser}>
                                Save
                        </ButtonConfirm>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmDelete;
