import { Button, createDisclosure, HStack, Icon, Modal } from '@hope-ui/core';
import useTranslation from '../../shared/hooks/useTranslation';
import { Component, For, Show } from 'solid-js';
import { A } from 'solid-start';
import IconPlus from '../../shared/atoms/Icons/Stroke/IconPlus';
import Filter from '../../filterSort/organisms/Filter/Filter';
import useTransformTranslatedOptions from '../../shared/hooks/useTransformTranslatedOptions';
import GeneralLoader from '../../shared/templates/GeneralLoader';
import { filterBy } from '../constants/filterBy';
import { ItemApi } from '../interfaces';
import ItemCard from '../organisms/ItemCard/ItemCard';
import styles from '../../user/templates/UserList/UserList.module.css';
import { darkDangerButton, darkPrimaryButton } from '../../shared/constants/hopeAdapter';
import layoutStyles from '../../../styles/layout.module.css';
import itemListStyles from './itemList.module.css';
import modalStyles from '../../../styles/modal.module.css';
import typoStyles from '../../../styles/typography.module.css';

interface ItemListTemplateProps
{
    itemList: ItemApi[] | undefined;
    removeAction: any;
    loading: boolean;
    viewMoreAction: any;
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
        <section class={layoutStyles.section_container}>
            <Modal isOpen={isOpen()} onClose={close}>
                <Modal.Overlay _dark={{ bgColor: 'rgba(0, 0, 0, 0.65)' }}/>
                <Modal.Content class={styles.modal_content} _dark={{ bgColor: 'neutral.800' }}>
                    <Modal.CloseButton class={styles.close_button}/>
                    <HStack>
                        <Modal.Heading class={itemListStyles.modal_heading}>
                            {t('a_delete_data')}
                        </Modal.Heading>
                    </HStack>
                    <p class={itemListStyles.text}>{t('i_remove')}</p>
                    <h1 class={itemListStyles.text}>{deleteData?.name}</h1>
                    <HStack class={`${modalStyles.modal_footer} ${itemListStyles.h_stack}`}>
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
                    {t('i_list')}
                </h1>
                <div class={itemListStyles.width_md}>
                    <A href={'/items/create'}>
                        <Button
                            leftIcon={<Icon><IconPlus/></Icon>}
                            _dark={darkPrimaryButton}
                            class={itemListStyles.width_sm}
                        >
                            {t('i_create')}
                        </Button>
                    </A>
                </div>
            </header>

            <Filter initialFilterOptions={filterOptions()} />

            <Show when={props.loading} keyed>
                <GeneralLoader/>
            </Show>

            <div class={layoutStyles.grid_cards_container}>
                <Show when={!props.loading || props.itemList?.length} keyed>
                    <For each={props.itemList} fallback={<span class={itemListStyles.text}>{t('r_no_items')}</span>}>
                        {(item) =>
                            <ItemCard item={item} onDelete={handleDelete(item)}/>
                        }
                    </For>
                </Show>
            </div>

            <div class={layoutStyles.section_bottom_buttons_container}>
                <Button onClick={props.viewMoreAction()} variant="outlined">
                    <Show when={!props.loading} fallback={<span class={itemListStyles.text}>{t('a_loading')}...</span>} keyed>
                        {t('a_view_more')}
                    </Show>
                </Button>
            </div>
        </section>
    );
};

export default ItemList;
