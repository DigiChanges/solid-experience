import { Button, createDisclosure, HStack, Icon, Modal } from '@hope-ui/core';
import { Link } from '@solidjs/router';
import useTranslation from '../../shared/hooks/useTranslation';
import { Component, createEffect, For, Show } from 'solid-js';
import IconPlus from '../../../atoms/Icons/Stroke/IconPlus';
import { permissions } from '../../../config/permissions';
import Filter from '../../filterSort/organisms/Filter/Filter';
import useTransformTranslatedOptions from '../../shared/hooks/useTransformTranslatedOptions';
import ButtonScrollUp from '../../shared/molecules/ButtonScrollUp/ButtonScrollUp';
import GeneralLoader from '../../shared/templates/GeneralLoader';
import { filterBy } from '../constants/filterBy';
import { ItemApi, ItemListResponse } from '../interfaces';
import ItemCard from '../organisms/ItemCard/ItemCard';
import styles from '../../user/templates/UserList/UserList.module.css';
import { darkDangerButton, darkPrimaryButton } from '../../shared/constants/hopeAdapter';

interface ItemListTemplateProps
{
    itemList: ItemApi[] | undefined;
    removeAction: any;
    loading: boolean;
    viewMoreAction: any;
    nextPage: string | undefined;
}

const ItemList: Component<ItemListTemplateProps> = (props) =>
{
    const { translate: t } = useTranslation();

    const { isOpen, open, close } = createDisclosure();
    let deleteData: ItemApi | undefined;

    const handleModalClick = () =>
    {
        props.removeAction(deleteData?.id);
        close();
    };

    const handleDelete = (item: ItemApi) => () =>
    {
        deleteData = item;
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
                    <p class={'text-neutral-50'}>{t('i_remove')}</p>
                    <h1 class={'text-neutral-50'}>{deleteData?.name}</h1>
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
                            onClick={() => handleModalClick}
                        >
                            {t('a_delete')}
                        </Button>
                    </HStack>
                </Modal.Content>
            </Modal>

            <header class="section_header_container" data-parent={permissions.ROLES.SAVE}>
                <h1 class="section_title">
                    {t('i_list')}
                </h1>

                <div class="w-[100%] md:w-auto">
                    <Link href={'/items/create'}>
                        <Button
                            leftIcon={<Icon><IconPlus/></Icon>}
                            _dark={darkPrimaryButton}
                            class={'w-[100%] sm:w-[100%]'}
                        >
                            {t('i_create')}
                        </Button>
                    </Link>
                </div>
            </header>

            <Filter initialFilterOptions={filterOptions()} />

            <Show when={props.loading} keyed>
                <GeneralLoader/>
            </Show>

            <div class="grid_cards_container">
                <Show when={!props.loading || props.itemList?.length} keyed>
                    <For each={props.itemList} fallback={<span class={'text-neutral-50'}>{t('r_no_items')}</span>}>
                        {(item) =>
                            <ItemCard item={item} onDelete={handleDelete(item)} />
                        }
                    </For>
                </Show>
            </div>

            <div class="section_bottom_buttons_container">
                <Show when={!!props.nextPage} keyed>
                    <Button onClick={props.viewMoreAction()} variant="outlined">
                        <Show when={!props.loading} fallback={<span class={'text-neutral-50'}>{t('a_loading')}...</span>} keyed>
                            {t('a_view_more')}
                        </Show>
                    </Button>
                </Show>

                {/*<ButtonScrollUp dependencies={props.itemList}/>*/}
            </div>
        </section>
    );
};

export default ItemList;
