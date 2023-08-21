import { notificationService } from '../../features/shared/molecules/Toast/Toast';
import { Component, createEffect } from 'solid-js';
import { ItemApi, ItemListResponse } from '../../features/item/interfaces';
import ItemRepository from '../../features/item/repositories/ItemRepository';
import ItemList from '../../features/item/templates/ItemList';
import createAlert from '../../features/shared/hooks/createAlert';
import usePaginatedState from '../../features/shared/hooks/usePaginatedState';
import PrivateLayout from '../../features/shared/layout/PrivateLayout/PrivateLayout';
import useTranslation from '../../features/shared/hooks/useTranslation';
import useList from '../../features/shared/hooks/useList';

const IndexPage: Component = () =>
{
    const { translate: t } = useTranslation();
    const { setError } = createAlert();

    const itemRepository = new ItemRepository();
    const { data, goToPage, refetch } = useList(itemRepository.getItems);
    const { resourceList: itemList, setViewMore } = usePaginatedState<ItemApi, ItemListResponse>(data);

    createEffect(() => data.error && setError(data.error));

    const viewMoreAction = () => () =>
    {
        goToPage(data()?.pagination?.nextUrl);
        setViewMore();
    };

    const removeAction = async(id: string) =>
    {
        try
        {
            void await itemRepository.removeItem({ id });
            refetch();
            notificationService.show({
                status: 'success',
                title: t('i_removed')
            });
        }
        catch (error)
        {
            const errorMessage = setError(error);
            notificationService.show({
                status: 'danger',
                title: t('err_remove_item'),
                description: t(errorMessage)
            });
        }
    };

    return (
        <PrivateLayout>
             <ItemList
                itemList={itemList()}
                removeAction={removeAction}
                loading={data.loading}
                viewMoreAction={viewMoreAction}
             />
        </PrivateLayout>
    );
};

export default IndexPage;
