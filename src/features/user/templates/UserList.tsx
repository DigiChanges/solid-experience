import { Button, createDisclosure, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@hope-ui/solid';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, For, Show } from 'solid-js';
import IconLockOpen from '../../../atoms/Icons/Stroke/IconLockOpen';
import IconPencilAlt from '../../../atoms/Icons/Stroke/IconPencilAlt';
import IconPlus from '../../../atoms/Icons/Stroke/IconPlus';
import IconTrash from '../../../atoms/Icons/Stroke/IconTrash';
import Title from '../../../atoms/Title';
import { permissions } from '../../../config/permissions';
import ButtonIcon from '../../../molecules/ButtonIcon';
import ButtonScrollUp from '../../../molecules/ButtonScrollUp';
import MediaObject from '../../../molecules/MediaObject';
import FilterSort from '../../filterSort/organisms/FilterSort';
import GeneralLoader from '../../shared/templates/GeneralLoader';
import { filterBy } from '../constants/filterBy';
import { orderBy } from '../constants/orderBy';
import { UserApi } from '../interfaces';

interface UserListTemplateProps
{
    userList: UserApi[] | undefined;
    removeAction: any;
    loading: boolean;
    viewMoreAction: any;
    nextPage: string | undefined;
}

const UserList: Component<UserListTemplateProps> = ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;

    const { isOpen, onOpen, onClose } = createDisclosure();
    let deleteData: UserApi | undefined;

    const handleModalClick = () => () =>
    {
        props.removeAction( deleteData?.id );
        onClose();
    };

    const handleDelete = ( role: UserApi ) => () =>
    {
        deleteData = role;
        onOpen();
    };

    return (
        <section class="mx-8">
            <Modal opened={isOpen()} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader><Text message="a_delete_data"/></ModalHeader>
                    <ModalBody>
                        <p><Text message="u_remove"/></p>
                        <h1>{deleteData?.firstName} {deleteData?.lastName}</h1>
                    </ModalBody>
                    <ModalFooter class="flex gap-5">
                        <Button onClick={onClose}><Text message="a_cancel"/></Button>
                        <Button colorScheme="danger" onClick={handleModalClick()}><Text message="a_delete"/></Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <section class="flex justify-between items-center my-6" data-parent={permissions.USERS.SAVE}>
                <h1 class="dg-section-title">
                    <Text message="u_list" />
                </h1>

                <div class="has-permission">
                    <Link href={'/users/create'}>
                        <Button leftIcon={<Icon ><IconPlus/></Icon>}><Text message="u_create"/></Button>
                    </Link>
                </div>
            </section>

            <FilterSort searchPlaceholder={`${t( 'u_search', { count: 1 } )}...`} filterBy={filterBy} orderBy={orderBy}/>

            <Show when={props.loading} >
                <GeneralLoader/>
            </Show>
            <div class="dg-grid-3x3 justify-center">
                <Show when={!props.loading || props.userList?.length}>
                    <For each={props.userList} fallback={<div><Text message="u_no_users" />...</div>}>
                        {( user ) =>
                            <MediaObject class="dg-media-object" >
                                <div class="flex-col justify-center content-center ml-3 text-gray-400">
                                    <Title titleType="h6" class="hover:transform hover:scale-125" data-parent="usersShow">
                                        <Link class="w-6 hover:text-white mr-1 focus:outline-none has-permission"
                                            href={`/users/${user.id}/update`}
                                        >
                                            {`${user.firstName} ${user.lastName}`}
                                        </Link>
                                        <span class="w-6 hover:text-white mr-1 focus:outline-none fallback">
                                            {`${user.firstName} ${user.lastName}`}
                                        </span>
                                    </Title>
                                    {user.email}
                                </div>
                                <div class="flex flex-col ml-auto">
                                    <div class="h-6 w-6 my-1" data-parent="usersUpdate">
                                        <div class="h-6 w-6 my-1 has-permission">
                                            <Link class="w-6 hover:text-white mr-1 focus:outline-none"
                                                href={`/users/${user.id}/update`}
                                            >
                                                <IconPencilAlt />
                                            </Link>
                                        </div>
                                    </div>
                                    <div class="h-6 w-6 my-1" data-parent="usersChangeUserPassword">
                                        <Link class="w-6 hover:text-white mr-1 focus:outline-none has-permission"
                                            href={`/users/editPassword/${user.id}`}>
                                            <IconLockOpen />
                                        </Link>
                                    </div>
                                    <div class="h-6 w-6 my-1" data-parent="usersDelete">
                                        <button
                                            class="w-6 hover:text-white mr-1 focus:outline-none has-permission"
                                            onClick={handleDelete( user )}
                                            type="button"
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
                        <Show when={!props.loading} fallback={() => <span><Text message="a_loading" />...</span>}>
                            <Text message="a_view_more"/>
                        </Show>
                    </Button>
                </Show>

                <ButtonScrollUp />
            </div>
        </section>
    );
};

export default UserList;
