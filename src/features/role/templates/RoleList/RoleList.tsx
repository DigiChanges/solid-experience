import { Button, createDisclosure, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@hope-ui/solid';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, createMemo, For, Show } from 'solid-js';
import IconPencilAlt from '../../../../atoms/Icons/Stroke/IconPencilAlt';
import IconPlus from '../../../../atoms/Icons/Stroke/IconPlus';
import IconTrash from '../../../../atoms/Icons/Stroke/IconTrash';
import Title from '../../../../atoms/Title';
import { permissions } from '../../../../config/permissions';
import ButtonScrollUp from '../../../shared/molecules/ButtonScrollUp/ButtonScrollUp';
import Filter from '../../../filterSort/organisms/Filter/Filter';
import useTransformTranslatedOptions from '../../../shared/hooks/useTransformTranslatedOptions';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import { SelectValueOption } from '../../../shared/types/Selects';
import { SelectTransform } from '../../../shared/utils/SelectTransform';
import { filterBy } from '../../constants/filterBy';
import { orderBy } from '../../constants/orderBy';
import { RoleApi } from '../../interfaces';
import styles from './RoleList.module.css';

interface RoleListTemplateProps
{
    roleList: RoleApi[] | undefined;
    removeAction: any;
    loading: boolean;
    viewMoreAction: any;
    nextPage: string | undefined;
}

const RoleList: Component<RoleListTemplateProps> = ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;

    const { isOpen, onOpen, onClose } = createDisclosure();
    let deleteData: RoleApi | undefined;

    const handleModalClick = () => () =>
    {
        props.removeAction( deleteData?.id );
        onClose();
    };

    const handleDelete = ( role: RoleApi ) => () =>
    {
        deleteData = role;
        onOpen();
    };

    const { filterOptions } = useTransformTranslatedOptions( filterBy, ( item ) => t( item.label ) );

    // const filterOptions = createMemo( () => SelectTransform.getOptionsObjectArray<SelectValueOption>(
    //     filterBy,
    //     ( item ) => <Text message={item.label} /> as string,
    //     ( item ) => item.value
    // ) );

    const orderOptions = createMemo( () => SelectTransform.getOptionsObjectArray<SelectValueOption>(
        orderBy,
        ( item ) => <Text message={item.label} /> as string,
        ( item ) => item.value
    ) );

    return (
        <section class={styles.list_container}>
            <Modal opened={isOpen()} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader><Text message="a_delete_data"/></ModalHeader>
                    <ModalBody>
                        <p><Text message="r_remove"/></p>
                        <h1>{deleteData?.name}</h1>
                    </ModalBody>
                    <ModalFooter class={styles.modal_footer}>
                        <Button onClick={onClose}><Text message="a_cancel"/></Button>
                        <Button colorScheme="danger" onClick={handleModalClick()}><Text message="a_delete"/></Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <section class={styles.list_section_title} data-parent={permissions.ROLES.SAVE}>
                <h1 class={styles.list_title}>
                    <Text message="r_list" />
                </h1>

                <div class="has-permission">
                    <Link href={'/roles/create'}>
                        <Button leftIcon={<Icon ><IconPlus/></Icon>}><Text message="r_create"/></Button>
                    </Link>
                </div>
            </section>

            <Filter filterOptions={filterOptions()} />

            <Show when={props.loading} >
                <GeneralLoader/>
            </Show>

            <div class={styles.list_second_container}>
                <Show when={!props.loading || props.roleList?.length}>
                    <For each={props.roleList} fallback={<div><Text message="r_no_roles" /></div>}>
                        {( role ) =>
                            <div class={styles.list_media_object} >
                                <div class={styles.list_media_object_container}>
                                    <Title titleType="h6" class={styles.list_media_object_container_title} data-parent="rolesShow">
                                        <Link
                                            class={`${styles.list_media_object_container_link} has-permission `}
                                            href={`/roles/${role.id}/update`}>
                                            {role.name}
                                        </Link>
                                        <span class={`${styles.list_media_object_container_span} fallback `}>
                                            {role.name}
                                        </span>
                                    </Title>
                                    { role.slug }
                                </div>
                                <div class={styles.list_third_container}>
                                    <div class={styles.list_third_container_parent_update} data-parent="rolesUpdate">
                                        <div class={`${styles.list_third_container_children_update} has-permission`}>
                                            <Link class={styles.list_third_container_link_update}
                                                href={`/roles/${role.id}/update`}
                                            >
                                                <IconPencilAlt />
                                            </Link>
                                        </div>
                                    </div>

                                    <div class={styles.list_third_container_parent_delete} data-parent="rolesDelete">
                                        <button
                                            class={`${styles.list_third_container_link_delete} has-permission`}
                                            onClick={handleDelete( role )}
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

export default RoleList;
