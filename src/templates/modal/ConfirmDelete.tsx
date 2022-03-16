import { Text } from 'solid-i18n';
import { Component, splitProps } from 'solid-js';
import Button from '../../atoms/Button';
import IconCross from '../../atoms/Icons/Stroke/IconCross';
import IconExclamation from '../../atoms/Icons/Stroke/IconExclamation';
import ButtonClose from '../../molecules/ButtonClose';
import ButtonConfirm from '../../molecules/ButtonConfirm';
import Modal from '../../molecules/Modal';

interface ConfirmDeleteTemplateProps
{
    cbAction: () => void;
    onClose: () => void;
    children?: any;
}

const onHandleCloseModal = ( { onClose }: {onClose: () => void} ) => () =>
{
    onClose();
};

const handleDeleteUser = ( { onClose, cbAction = () => {} }: {onClose: () => void; cbAction: () => void} ) => () =>
{
    cbAction();
    onClose();
};

const ConfirmDelete: Component<ConfirmDeleteTemplateProps> = ( props ) =>
{
    const [ { children, onClose, cbAction }, others ] = splitProps( props, [ 'children', 'onClose', 'cbAction'  ] );
    return (
        <Modal {...others}>
            <div class="dg-full-center-flex">
                <div class="dg-rounded-small-box flex flex-col justify-between">
                    <div class="w-full flex justify-end">
                        <Button class="dg-link w-6" type="button" onClick={onHandleCloseModal( { onClose } )}>
                            <IconCross />
                        </Button>
                    </div>
                    <div class="flex w-full justify-center">
                        <span class="text-red-500 w-12">
                            <IconExclamation />
                        </span>
                    </div>
                    <div class="flex w-full justify-center align-middle">
                        {children}
                    </div>
                    <div class="flex justify-around ">
                        <ButtonClose onClick={onHandleCloseModal( { onClose } )}>
                            <Text message='a_cancel'/>
                        </ButtonClose>

                        <ButtonConfirm onClick={handleDeleteUser( { onClose, cbAction } )}>
                            <Text message='a_delete'/>
                        </ButtonConfirm>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmDelete;
