import { Component, For, Show } from 'solid-js';
import { A } from 'solid-start';
import { Button, createDisclosure, HStack, Modal } from '@hope-ui/core';

import useTranslation from '../../../shared/hooks/useTranslation';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import { UserApi, UserListResponse } from '../../interfaces';
import UserCard from '../../organisms/UserCard/UserCard';
import styles from './UserList.module.css';
import { darkDangerButton, darkPrimaryButton, darkTransparentButton } from '../../../shared/constants/hopeAdapter';
import layoutStyles from '../../../../styles/layout.module.css';
import typoStyles from '../../../../styles/typography.module.css';

interface UserListTemplateProps
{
    userList: UserListResponse | undefined;
    removeAction?: any;
    loading: boolean;
    nextPage?: string | undefined;
}

const UserList: Component<UserListTemplateProps> = (props) =>
{
    const { translate: t } = useTranslation();

    const { isOpen, open, close } = createDisclosure();
    let deleteData: UserApi | undefined;

    const handleModalClick = () =>
    {
        props.removeAction(deleteData?.id);
        close();
    };

    const handleDelete = (user: UserApi) =>
    {
        deleteData = user;
        open();
    };

    return (
        <section class={layoutStyles.section_container}>
             <Modal isOpen={isOpen()} onClose={close}>
                <Modal.Overlay _dark={{ bgColor: 'rgba(0, 0, 0, 0.65)' }}/>
                <Modal.Content class={styles.modal_content} _dark={{ bgColor: 'neutral.800' }}>
                    <Modal.CloseButton class={styles.close_button}/>
                    <HStack>
                        <Modal.Heading class={styles.modal_heading}>
                            {t('a_delete_data')}
                         </Modal.Heading>
                     </HStack>
                    <p class={styles.text_50}>{t('u_remove')}</p>
                    <h1 class={styles.text_50}>{deleteData?.firstName} {deleteData?.lastName}</h1>
                    <HStack class={styles.h_stack}>
                        <Button
                            onClick={close}
                            _dark={darkPrimaryButton}
                        >
                            {t('a_cancel')}
                         </Button>
                         <Button
                             _dark={darkDangerButton}
                            colorScheme="danger"
                            onClick={handleModalClick}
                        >
                            {t('a_delete')}
                        </Button>
                    </HStack>
                </Modal.Content>
             </Modal>
              <header class={layoutStyles.section_header_container}>
                <h1 class={typoStyles.section_title}>
                     {t('u_list')}
                 </h1>

                  <div class={styles.w_full_auto}>
                     <A href={'/users/create'}>
                        <button class={styles.w_full_auto}>
                             {t('u_create')}
                         </button>
                    </A>
                </div>
              </header>

              <Show when={props.loading} keyed>
                 <GeneralLoader/>
              </Show>

              <div class={layoutStyles.grid_cards_container}>
                 <Show when={!props.loading || props.userList?.data.length} keyed>
                     <For each={props?.userList?.data} fallback={<span class={styles.fallback_span}>{t('u_no_users')}</span>}>
                         {(user) =>
                             <UserCard user={user} onDelete={() => handleDelete(user)}/>}
                     </For>
                 </Show>
              </div>

        </section>
    );
};

export default UserList;
