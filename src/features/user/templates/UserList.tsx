import { Link } from 'solid-app-router';
import { Component, For, Show } from 'solid-js';
import Button from '../../../atoms/Button';
import IconLockOpen from '../../../atoms/Icons/Stroke/IconLockOpen';
import IconPencilAlt from '../../../atoms/Icons/Stroke/IconPencilAlt';
import IconPlus from '../../../atoms/Icons/Stroke/IconPlus';
import IconTrash from '../../../atoms/Icons/Stroke/IconTrash';
import Title from '../../../atoms/Title';
import { IUserApi } from '../interfaces';
import ButtonScrollUp from '../../../molecules/ButtonScrollUp';
import MediaObject from '../../../molecules/MediaObject';
import TitleWithButton from '../../../molecules/TitleWithButton';
import FilterSort from '../../filterSort/organisms/FilterSort';
import AuthRepository from '../../auth/repositories/AuthRepository';
import ConfirmDelete from '../../../templates/modal/ConfirmDelete';
import useModal from '../../shared/hooks/useModal';
import RemoveModalContent from '../../shared/modals/RemoveModalContent';
import { BasicConfirmationModalData } from '../../shared/types/Modal';
import { filterBy } from '../constants/filterBy';
import { orderBy } from '../constants/orderBy';

interface UserListTemplateProps
{
    userList: IUserApi[] | undefined;
    removeAction: any;
    loading: boolean;
    viewMoreAction: any;
    nextPage: string | undefined;
}

const refresh = () => async () =>
{
    const authRepository = new AuthRepository();
    const refreshToken = authRepository.refreshToken();
    await refreshToken();
};

const UserList: Component<UserListTemplateProps> = ( props ) =>
{
    const { isShowModal, modalData, openModal, closeModal } = useModal<BasicConfirmationModalData>( { id: undefined, text: '' } );

    const actionCreateButton = () =>
    {
        // return router.push( '/users/create' );
        return true;
    };

    return (
        <section class="mx-8">
            <button onClick={refresh()}>
                TEST REFRESH TOKEN
            </button>

            <Show when={isShowModal()}>
                <ConfirmDelete
                    cbAction={() => props.removeAction( modalData()?.id )}
                    onClose={closeModal()}
                >
                    <RemoveModalContent
                        title="Are you sure delete user:"
                        content={modalData().text}
                    />
                </ConfirmDelete>
            </Show>

            <TitleWithButton
                class="dg-section-title"
                title={props.loading ? 'Users List ...' : 'Users List'}
                labelButtonName="Create User"
                icon={IconPlus}
                buttonAction={actionCreateButton()}
                path="/users/create"
            />

            <FilterSort placeholder="Search users..." filterBy={filterBy} orderBy={orderBy}/>

            <div class="dg-grid-3x3">
                <Show when={!props.loading || props.userList?.length} fallback={() => <div>Loading...</div>}>
                    <For each={props.userList} fallback={<div>No users...</div>}>
                        {( user ) =>
                            <MediaObject class="dg-media-object" >
                                <div class="flex-col justify-center content-center ml-3 text-gray-400">
                                    <Title titleType="h6" class="hover:transform hover:scale-125">
                                        <Link href={`/users/${user.id}/update`}
                                            class="w-6 hover:text-white mr-1 focus:outline-none"
                                        >
                                            {`${user.firstName} ${user.lastName}`}
                                        </Link>
                                    </Title>
                                    {user.email}
                                </div>
                                <div class="flex flex-col ml-auto">
                                    <div class="h-6 w-6 my-1">
                                        <Link
                                            class="w-6 hover:text-white mr-1 focus:outline-none"
                                            href={`/users/${user.id}/update`}>
                                            <IconPencilAlt />
                                        </Link>
                                    </div>
                                    <div class="h-6 w-6 my-1">
                                        <Link
                                            class="w-6 hover:text-white mr-1 focus:outline-none"
                                            href={`/users/editPassword/${user.id}`}>
                                            <IconLockOpen />
                                        </Link>
                                    </div>
                                    <div class="h-6 w-6 my-1">
                                        <button
                                            class="w-6 hover:text-white mr-1 focus:outline-none"
                                            onClick={ openModal( {
                                                id: user.id,
                                                text: `${user.firstName} ${user.lastName}`,
                                            } )}
                                            type='button'
                                        >
                                            <IconTrash />
                                        </button>
                                    </div>
                                </div>
                            </MediaObject>
                        }
                    </For>
                </Show>
            </div>

            <div class="dg-full-center-flex mt-8">
                <Show when={!!props.nextPage}>
                    <Button onClick={props.viewMoreAction()} class="dg-secondary-button">
                        <Show when={!props.loading} fallback="Loading">
                            View More
                        </Show>
                    </Button>
                </Show>

                <ButtonScrollUp />
            </div>
        </section>
    );
};

export default UserList;
