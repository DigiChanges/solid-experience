import { Button, createDisclosure, HStack, Icon, Modal } from '@hope-ui/core';
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

    const { isOpen, open, close } = createDisclosure();
    let deleteData: UserApi | undefined;

    const handleModalClick = () => () =>
    {
        props.removeAction( deleteData?.id );
        close();
    };

    const handleDelete = ( role: UserApi ) => () =>
    {
        deleteData = role;
        open();
    };

    const { filterOptions } = useTransformTranslatedOptions( filterBy, ( item ) => t( item.label ) );

    return (
        <section class="section_container">
            <Modal isOpen={isOpen()} onClose={close}>
                <Modal.Overlay />
                <Modal.Content>
                    <Modal.CloseButton />
                    <HStack>
                        <Modal.Heading><Text message="a_delete_data"/></Modal.Heading>
                    </HStack>
                    <p><Text message="u_remove"/></p>
                    <h1>{deleteData?.firstName} {deleteData?.lastName}</h1>
                    <HStack class="modal_footer">
                        <Button onClick={close}><Text message="a_cancel"/></Button>
                        <Button colorScheme="danger" onClick={handleModalClick()}><Text message="a_delete"/></Button>
                    </HStack>
                </Modal.Content>
            </Modal>

            <header class="section_header_container" data-parent={permissions.USERS.SAVE}>
                <h1 class="section_title">
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
            <div class="grid_cards_container">
                <Show when={!props.loading || props.userList?.length}>
                    <For each={props.userList} fallback={<div><Text message="u_no_users" />...</div>}>
                        {( user ) =>
                            <UserCard user={user} onDelete={handleDelete( user )}/>}
                    </For>
                </Show>
            </div>
            <div class="section_bottom_buttons_container">
                <Show when={!!props.nextPage}>
                    <Button onClick={props.viewMoreAction()} variant="outlined">
                        <Show when={!props.loading} fallback={() => <span><Text message="a_loading" />...</span>}>
                            <Text message="a_view_more"/>
                        </Show>
                    </Button>
                </Show>

                <ButtonScrollUp dependencies={props.userList}/>
            </div>
        </section>
    );
};

export default UserList;
