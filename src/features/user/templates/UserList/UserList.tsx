import { Button, createDisclosure, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@hope-ui/solid';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, For, Show } from 'solid-js';
import IconPlus from '../../../../atoms/Icons/Stroke/IconPlus';
import { permissions } from '../../../../config/permissions';
import Filter from '../../../filterSort/organisms/Filter/Filter';
import useTransformTranslatedOptions from '../../../shared/hooks/useTransformTranslatedOptions';
import ButtonScrollUp from '../../../shared/molecules/ButtonScrollUp/ButtonScrollUp';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import { filterBy } from '../../constants/filterBy';
import { UserApi } from '../../interfaces';
import UserCard from '../../organisms/UserCard/UserCard';
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

            <header class="section_header_container" data-parent={permissions.USERS.SAVE}>
                <h1 class={styles.list_title}>
                    <Text message="u_list" />
                </h1>

                <div class="has-permission">
                    <Link href={'/users/create'}>
                        <Button leftIcon={<Icon ><IconPlus/></Icon>}><Text message="u_create"/></Button>
                    </Link>
                </div>
            </header>

            <Filter filterOptions={filterOptions()} />

            <Show when={props.loading} >
                <GeneralLoader/>
            </Show>
            <div class={styles.list_second_container}>
                <Show when={!props.loading || props.userList?.length}>
                    <For each={props.userList} fallback={<div><Text message="u_no_users" />...</div>}>
                        {( user ) =>
                            <UserCard user={user} onDelete={handleDelete( user )}/>}
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
