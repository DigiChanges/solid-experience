import { Button, createDisclosure, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@hope-ui/solid';
import { Link } from 'solid-start';
import { Text, useI18n } from 'solid-i18n';
import { Component, createMemo, For, Show } from 'solid-js';
import IconPlus from '../../../../atoms/Icons/Stroke/IconPlus';
import { permissions } from '../../../../config/permissions';
import Filter from '../../../filterSort/organisms/Filter/Filter';
import useTransformTranslatedOptions from '../../../shared/hooks/useTransformTranslatedOptions';
import ButtonScrollUp from '../../../shared/molecules/ButtonScrollUp/ButtonScrollUp';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import { SelectValueOption } from '../../../shared/types/Selects';
import { SelectTransform } from '../../../shared/utils/SelectTransform';
import { filterBy } from '../../constants/filterBy';
import { orderBy } from '../../constants/orderBy';
import { RoleApi } from '../../interfaces';
import RoleCard from '../../organisms/RoleCard/RoleCard';

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
        <section class="section_container">
            <Modal opened={isOpen()} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader><Text message="a_delete_data"/></ModalHeader>
                    <ModalBody>
                        <p><Text message="r_remove"/></p>
                        <h1>{deleteData?.name}</h1>
                    </ModalBody>
                    <ModalFooter class="modal_footer">
                        <Button onClick={onClose}><Text message="a_cancel"/></Button>
                        <Button colorScheme="danger" onClick={handleModalClick()}><Text message="a_delete"/></Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <header class="section_header_container" data-parent={permissions.ROLES.SAVE}>
                <h1 class="section_title">
                    <Text message="r_list" />
                </h1>

                <div class="has-permission">
                    <Link href={'/roles/create'}>
                        <Button leftIcon={<Icon ><IconPlus/></Icon>}><Text message="r_create"/></Button>
                    </Link>
                </div>
            </header>

            <Filter filterOptions={filterOptions()} />

            <Show when={props.loading} >
                <GeneralLoader/>
            </Show>

            <div class="grid_cards_container">
                <Show when={!props.loading || props.roleList?.length}>
                    <For each={props.roleList} fallback={<div><Text message="r_no_roles" /></div>}>
                        {( role ) =>
                            <RoleCard role={role} onDelete={handleDelete( role )} />
                        }
                    </For>
                </Show>
            </div>

            <div class="section_bottom_buttons_container">
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
