import { Button, createDisclosure, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@hope-ui/solid';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, For, Show } from 'solid-js';
import IconLockOpen from '../../../../atoms/Icons/Stroke/IconLockOpen';
import IconPencilAlt from '../../../../atoms/Icons/Stroke/IconPencilAlt';
import IconPlus from '../../../../atoms/Icons/Stroke/IconPlus';
import IconTrash from '../../../../atoms/Icons/Stroke/IconTrash';
import Title from '../../../../atoms/Title';
import { permissions } from '../../../../config/permissions';
import Filter from '../../../filterSort/organisms/Filter/Filter';
import useTransformTranslatedOptions from '../../../shared/hooks/useTransformTranslatedOptions';
import ButtonScrollUp from '../../../shared/molecules/ButtonScrollUp/ButtonScrollUp';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import { filterBy } from '../../constants/filterBy';
import { UserApi } from '../../interfaces';
import styles from './UserList.module.css';

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

    const { filterOptions } = useTransformTranslatedOptions( filterBy, ( item ) => t( item.label ) );

    return (
        <section class={styles.list_container}>
            <Modal opened={isOpen()} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader><Text message="a_delete_data"/></ModalHeader>
                    <ModalBody>
                        <p><Text message="u_remove"/></p>
                        <h1>{deleteData?.firstName} {deleteData?.lastName}</h1>
                    </ModalBody>
                    <ModalFooter class={styles.modal_footer}>
                        <Button onClick={onClose}><Text message="a_cancel"/></Button>
                        <Button colorScheme="danger" onClick={handleModalClick()}><Text message="a_delete"/></Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <section class={styles.list_section_title} data-parent={permissions.USERS.SAVE}>
                <h1 class={styles.list_title}>
                    <Text message="u_list" />
                </h1>

                <div class="has-permission">
                    <Link href={'/users/create'}>
                        <Button leftIcon={<Icon ><IconPlus/></Icon>}><Text message="u_create"/></Button>
                    </Link>
                </div>
            </section>

            <Filter filterOptions={filterOptions()} />

            <Show when={props.loading} >
                <GeneralLoader/>
            </Show>
            <div class={styles.list_second_container}>
                <Show when={!props.loading || props.userList?.length}>
                    <For each={props.userList} fallback={<div><Text message="u_no_users" />...</div>}>
                        {( user ) =>
                            <div class={styles.list_media_object}>
                                <div class={styles.list_media_object_container}>
                                    <Title titleType="h6" class={styles.list_media_object_container_title} data-parent="usersShow">
                                        <Link class={`${styles.list_media_object_container_link} has-permission `}
                                            href={`/users/${user.id}/update`}
                                        >
                                            {`${user.firstName} ${user.lastName}`}
                                        </Link>
                                        <span class={styles.list_media_object_container_span}>
                                            {`${user.firstName} ${user.lastName}`}
                                        </span>
                                    </Title>
                                    {user.email}
                                </div>
                                <div class={styles.list_third_container}>
                                    <div class={styles.list_third_container_parent_update} data-parent="usersUpdate">
                                        <div class={`${styles.list_third_container_children_update} has-permission`}>
                                            <Link class={styles.list_third_container_link_update}
                                                href={`/users/${user.id}/update`}
                                            >
                                                <IconPencilAlt />
                                            </Link>
                                        </div>
                                    </div>
                                    <div class={styles.list_third_container_parent_password} data-parent="usersChangeUserPassword">
                                        <Link class={`${styles.list_third_container_link_password} has-permission`}
                                            href={`/users/editPassword/${user.id}`}>
                                            <IconLockOpen />
                                        </Link>
                                    </div>
                                    <div class={styles.list_third_container_parent_delete} data-parent="usersDelete">
                                        <button
                                            class={`${styles.list_third_container_link_delete} has-permission`}
                                            onClick={handleDelete( user )}
                                            type="button"
                                        >
                                            <IconTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                    </For>
                </Show>
            </div>
            <div class={styles.sections_buttons}>
                <Show when={!!props.nextPage}>
                    <Button onClick={props.viewMoreAction()} variant="outline">
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
