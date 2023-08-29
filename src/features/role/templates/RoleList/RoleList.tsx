import { Button, createDisclosure, HStack, Icon, Modal } from '@hope-ui/core';
import { Link } from '@solidjs/router';
import useTranslation from '../../../shared/hooks/useTranslation';
import { Component, For, Show } from 'solid-js';
import IconPlus from '../../../../atoms/Icons/Stroke/IconPlus';
import { permissions } from '../../../../config/permissions';
import Filter from '../../../filterSort/organisms/Filter/Filter';
import useTransformTranslatedOptions from '../../../shared/hooks/useTransformTranslatedOptions';
import ButtonScrollUp from '../../../shared/molecules/ButtonScrollUp/ButtonScrollUp';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import { filterBy } from '../../constants/filterBy';
import { RoleApi } from '../../interfaces';
import RoleCard from '../../organisms/RoleCard/RoleCard';
import styles from '../../../user/templates/UserList/UserList.module.css';
import { darkDangerButton, darkPrimaryButton } from '../../../shared/constants/hopeAdapter';
import layoutStyles from '../../../../styles/layout.module.css';
import roleListStyles from './roleList.module.css';
import modalStyles from '../../../../styles/modal.module.css';
import typoStyles from '../../../../styles/typography.module.css';
import indexStyles from '../../../../styles/index.module.css';

interface RoleListTemplateProps
{
    roleList: RoleApi[] | undefined;
    removeAction: any;
    loading: boolean;
    viewMoreAction: any;
    nextPage: string | undefined;
}

const RoleList: Component<RoleListTemplateProps> = (props) =>
{
    const { translate: t } = useTranslation();

    const { isOpen, open, close } = createDisclosure();
    let deleteData: RoleApi | undefined;

    const handleModalClick = () =>
    {
        props.removeAction(deleteData?.id);
        close();
    };

    const handleDelete = (role: RoleApi) => () =>
    {
        deleteData = role;
        open();
    };

    const { filterOptions } = useTransformTranslatedOptions(filterBy, (item) => t(item.label));

    return (
        <section class={layoutStyles.section_container}>
            <Modal isOpen={isOpen()} onClose={close}>
                <Modal.Overlay _dark={{ bgColor: 'rgba(0, 0, 0, 0.65)' }}/>
                <Modal.Content class={styles.modal_content} _dark={{ bgColor: 'neutral.800' }}>
                    <Modal.CloseButton class={styles.close_button}/>
                    <HStack>
                        <Modal.Heading class={roleListStyles.modalHeading}>
                            {t('a_delete_data')}
                        </Modal.Heading>
                    </HStack>
                    <p class={roleListStyles.neutralText}>{t('r_remove')}</p>
                    <h1 class={roleListStyles.neutralText}>{deleteData?.name}</h1>
                    <HStack class={`${modalStyles.modal_footer} ${roleListStyles.hStack}`}>
                        <Button
                            onClick={close}
                            _dark={darkPrimaryButton}
                        >
                            {t('a_cancel')}
                        </Button>
                        <Button
                            _dark={darkDangerButton}
                            colorScheme="danger"
                            onClick={() => handleModalClick}
                        >
                            {t('a_delete')}
                        </Button>
                    </HStack>
                </Modal.Content>
            </Modal>

            <header class={layoutStyles.section_header_container} data-parent={permissions.ROLES.SAVE}>
                <h1 class={typoStyles.section_title}>
                    {t('r_list')}
                </h1>

                <div class={`${indexStyles.hasPermission} ${roleListStyles.mdWidth}`}>
                    <Link href={'/roles/create'}>
                        <Button
                            leftIcon={<Icon><IconPlus/></Icon>}
                            _dark={darkPrimaryButton}
                            class={roleListStyles.smWidth}
                        >
                            {t('r_create')}
                        </Button>
                    </Link>
                </div>
            </header>

            <Filter initialFilterOptions={filterOptions()} />

            <Show when={props.loading} keyed>
                <GeneralLoader/>
            </Show>

            <div class={layoutStyles.grid_cards_container}>
                <Show when={!props.loading || props.roleList?.length} keyed>
                    <For each={props.roleList} fallback={<span class={roleListStyles.neutralText}>{t('r_no_roles')}</span>}>
                        {(role) =>
                            <RoleCard role={role} onDelete={handleDelete(role)} />
                        }
                    </For>
                </Show>
            </div>

            <div class={layoutStyles.section_bottom_buttons_container}>
                <Show when={!!props.nextPage} keyed>
                    <Button onClick={props.viewMoreAction()} variant="outlined">
                        <Show when={!props.loading} fallback={<span class={roleListStyles.neutralText}>{t('a_loading')}...</span>} keyed>
                            {t('a_view_more')}
                        </Show>
                    </Button>
                </Show>

                <ButtonScrollUp dependencies={props.roleList}/>
            </div>
        </section>
    );
};

export default RoleList;
