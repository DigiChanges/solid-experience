import { Button, createDisclosure, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@hope-ui/solid';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, For, Show } from 'solid-js';
import IconPencilAlt from '../../../atoms/Icons/Stroke/IconPencilAlt';
import IconPlus from '../../../atoms/Icons/Stroke/IconPlus';
import IconTrash from '../../../atoms/Icons/Stroke/IconTrash';
import Title from '../../../atoms/Title';
import { permissions } from '../../../config/permissions';
import ButtonScrollUp from '../../../molecules/ButtonScrollUp';
import MediaObject from '../../../molecules/MediaObject';
import FilterSort from '../../filterSort/organisms/FilterSort';
import GeneralLoader from '../../shared/templates/GeneralLoader';
import { filterBy } from '../constants/filterBy';
import { orderBy } from '../constants/orderBy';
import { RoleApi } from '../interfaces';

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

    return (
        <section class="mx-8">
            <Modal opened={isOpen()} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader><Text message="a_delete_data"/></ModalHeader>
                    <ModalBody>
                        <p><Text message="r_remove"/></p>
                        <h1>{deleteData?.name}</h1>
                    </ModalBody>
                    <ModalFooter class="flex gap-5">
                        <Button onClick={onClose}><Text message="a_cancel"/></Button>
                        <Button colorScheme="danger" onClick={handleModalClick()}><Text message="a_delete"/></Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <section class="flex justify-between items-center my-6" data-parent={permissions.ROLES.SAVE}>
                <h1 class="dg-section-title">
                    <Text message="r_list" />
                </h1>

                <div class="has-permission">
                    <Link href={'/roles/create'}>
                        <Button leftIcon={<Icon ><IconPlus/></Icon>}><Text message="r_create"/></Button>
                    </Link>
                </div>
            </section>

            <FilterSort searchPlaceholder={`${t( 'r_search', { count: 1 } )}...`} filterBy={filterBy} orderBy={orderBy}/>

            <Show when={props.loading} >
                <GeneralLoader/>
            </Show>

            <div class="dg-grid-3x3">
                <Show when={!props.loading || props.roleList?.length}>
                    <For each={props.roleList} fallback={<div><Text message="r_no_roles" /></div>}>
                        {( role ) =>
                            <MediaObject class="dg-media-object" >
                                <div class="flex-col justify-center content-center ml-3 text-gray-400">
                                    <Title titleType="h6" class="hover:transform hover:scale-125" data-parent="rolesShow">
                                        <Link
                                            class="w-6 text-gray-300 hover:text-white mr-1 focus:outline-none has-permission"
                                            href={`/roles/${role.id}/update`}>
                                            {role.name}
                                        </Link>
                                        <span class="w-6 text-gray-300 hover:text-white mr-1 focus:outline-none fallback" >
                                            {role.name}
                                        </span>
                                    </Title>
                                    { role.slug }
                                </div>
                                <div class="flex flex-col ml-auto">
                                    <div class="h-6 w-6 my-1" data-parent="rolesUpdate">
                                        <Link
                                            class="w-6 hover:text-white mr-1 focus:outline-none has-permission"
                                            href={`/roles/${role.id}/update`}>
                                            <IconPencilAlt />
                                        </Link>
                                    </div>
                                    <div class="h-6 w-6 my-1" data-parent="rolesDelete">
                                        <button
                                            class="w-6 hover:text-white mr-1 focus:outline-none has-permission"
                                            onClick={handleDelete( role )}
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

export default RoleList;
