import { Component, createSignal } from "solid-js";
import Button from "../../atoms/Button";
import IconCross from "../../atoms/Icons/Stroke/IconCross";
import IconExclamation from "../../atoms/Icons/Stroke/IconExclamation";
import Modal from "../../molecules/Modal";
import ButtonClose from "../../molecules/ButtonClose";
import ButtonConfirm from "../../molecules/ButtonConfirm";

interface ConfirmDeleteTemplateProps {
	open: boolean;
	text: string;
	action: any;
	idSelected: string;
}
const ConfirmDelete: Component<ConfirmDeleteTemplateProps> = (props) => 
{

	const [ openModal, setOpenModal ] = createSignal(true);

	const closeModal = () => {
		setOpenModal( !openModal() )
	};
	const onHandleCloseModal = () => {
		closeModal()
	}

	const onHandleDeleteUser = () => {
		( props.action( props.idSelected ));
		closeModal()
	}

	return (
		<>
			{ openModal() &&
				<Modal open={ openModal() }>
					<div class=" dg-full-center-flex">
						<div class="dg-rounded-small-box flex flex-col justify-between">
							<div class="w-full flex justify-end">
								<Button
									class="dg-link w-6"
									type="button"
									onClick={onHandleCloseModal}
								>
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
								<ButtonClose
								 onClick={onHandleCloseModal}
								>
									Cancel
								</ButtonClose>
								<ButtonConfirm
									onClick={onHandleDeleteUser}
								>
									Save
								</ButtonConfirm>
							</div>
						</div>
					</div>
				</Modal>

			}
		</>
	);
};

export default ConfirmDelete;
