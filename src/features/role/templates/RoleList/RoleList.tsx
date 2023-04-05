import { Button, createDisclosure, HStack, Icon, Modal } from '@hope-ui/core';
import { Link } from 'solid-app-router';
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

    const { isOpen, open, close } = createDisclosure();
    let deleteData: RoleApi | undefined;

    const handleModalClick = () => () =>
    {
        props.removeAction( deleteData?.id );
        close();
    };

    const handleDelete = ( role: RoleApi ) => () =>
    {
        deleteData = role;
        open();
    };

    const { filterOptions } = useTransformTranslatedOptions( filterBy, ( item ) => t( item.label ) );

    const filterOptionsWithMemo = createMemo( () => SelectTransform.getOptionsObjectArray<SelectValueOption>(
        filterBy,
        ( item ) => <Text message={item.label} /> as string,
        ( item ) => item.value
    ) );

    const orderOptionsWithMemo = createMemo( () => SelectTransform.getOptionsObjectArray<SelectValueOption>(
        orderBy,
        ( item ) => <Text message={item.label} /> as string,
        ( item ) => item.value
    ) );

    return (
        <section class="section_container">
            <Modal isOpen={isOpen()} onClose={close}>
                <Modal.Overlay />
                <Modal.Content>
                    <Modal.CloseButton />
                    <HStack>
                        <Modal.Heading><Text message="a_delete_data"/></Modal.Heading>
                    </HStack>
                    <p><Text message="r_remove"/></p>
                    <h1>{deleteData?.name}</h1>
                    <HStack class="modal_footer">
                        <Button onClick={close}><Text message="a_cancel"/></Button>
                        <Button colorScheme="danger" onClick={handleModalClick()}><Text message="a_delete"/></Button>
                    </HStack>
                </Modal.Content>
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

            <Show when={props.loading} keyed>
                <GeneralLoader/>
            </Show>

            <div class="grid_cards_container">
                <Show when={!props.loading || props.roleList?.length} keyed>
                    <For each={props.roleList} fallback={<div><Text message="r_no_roles" /></div>}>
                        {( role ) =>
                            <RoleCard role={role} onDelete={handleDelete( role )} />
                        }
                    </For>
                </Show>
            </div>

            <div class="section_bottom_buttons_container">
                <Show when={!!props.nextPage}>
                    <Button onClick={props.viewMoreAction()} variant="outlined">
                        <Show when={!props.loading} fallback={() => <span><Text message="a_loading" />...</span>} keyed>
                            <Text message="a_view_more"/>
                        </Show>
                    </Button>
                </Show>

                <ButtonScrollUp dependencies={props.roleList}/>
            </div>
        </section>
    );
};

export default RoleList;
