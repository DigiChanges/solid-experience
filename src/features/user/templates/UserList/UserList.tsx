import { Button, createDisclosure, HStack, Icon, Modal } from '@hope-ui/core';
import { Link } from '@solidjs/router';
import { useI18n } from '@solid-primitives/i18n';
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
import { darkDangerButton, darkPrimaryButton, darkTransparentButton } from '../../../shared/constants/hopeAdapter';

interface UserListTemplateProps
{
    userList: UserApi[] | undefined;
    removeAction: any;
    loading: boolean;
    viewMoreAction: any;
    nextPage: string | undefined;
}

const UserList: Component<UserListTemplateProps> = (props) =>
{
    const i18n = useI18n();
    const { t } = i18n;

    const { isOpen, open, close } = createDisclosure();
    let deleteData: UserApi | undefined;

    const handleModalClick = () =>
    {
        props.removeAction(deleteData?.id);
        close();
    };

    const handleDelete = (role: UserApi) => () =>
    {
        deleteData = role;
        open();
    };

    const { filterOptions } = useTransformTranslatedOptions(filterBy, (item) => t(item.label));

    return (
        <section class="section_container">
            <Modal isOpen={isOpen()} onClose={close}>
                <Modal.Overlay _dark={{ bgColor: 'rgba(0, 0, 0, 0.65)' }}/>
                <Modal.Content class={styles.modal_content} _dark={{ bgColor: 'neutral.800' }}>
                    <Modal.CloseButton class={styles.close_button}/>
                    <HStack>
                        <Modal.Heading class={'text-neutral-50 text-lg font-bold pb-3'}>
                            {t('a_delete_data')}
                        </Modal.Heading>
                    </HStack>
                    <p class={'text-neutral-50'}>{t('u_remove')}</p>
                    <h1 class={'text-neutral-50'}>{deleteData?.firstName} {deleteData?.lastName}</h1>
                    <HStack class="modal_footer pt-4 justify-end">
                        <Button
                            onClick={close}
                            _dark={darkPrimaryButton}
                        >
                            {t('a_cancel')}
                        </Button>
                        <Button
                            _dark={darkDangerButton}
                            colorScheme="danger"
                            onClick={() => handleModalClick()}
                        >
                            {t('a_delete')}
                        </Button>
                    </HStack>
                </Modal.Content>
            </Modal>

            <header class="section_header_container" data-parent={permissions.USERS.SAVE}>
                <h1 class="section_title">
                    {t('u_list')}
                </h1>

                <div class="has-permission w-[100%] md:w-auto">
                    <Link href={'/users/create'}>
                        <Button
                            leftIcon={<Icon><IconPlus/></Icon>}
                            _dark={darkPrimaryButton}
                            class={'w-[100%] md:w-auto'}
                        >
                            {t('u_create')}
                        </Button>
                    </Link>
                </div>
            </header>

            <Filter initialFilterOptions={filterOptions()} />

            <Show when={props.loading} keyed>
                <GeneralLoader/>
            </Show>

            <div class="grid_cards_container">
                <Show when={!props.loading || props.userList?.length} keyed>
                    <For each={props.userList} fallback={<span class={'text-neutral-50'}>{t('u_no_users')}</span>}>
                        {(user) =>
                            <UserCard user={user} onDelete={handleDelete(user)}/>}
                    </For>
                </Show>
            </div>

            <div class="section_bottom_buttons_container">
                <Show when={!!props.nextPage} keyed>
                    <Button onClick={props.viewMoreAction()} variant="outlined" _dark={darkTransparentButton} >
                        <Show when={!props.loading} keyed fallback={<span class={'text-neutral-50'}>{t('a_loading')}...</span>}>
                            {t('a_view_more')}
                        </Show>
                    </Button>
                </Show>

                <ButtonScrollUp dependencies={props.userList}/>
            </div>
        </section>
    );
};

export default UserList;
