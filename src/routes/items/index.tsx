import { notificationService } from '../../features/shared/molecules/Toast/Toast';
import { Component, createEffect, createResource } from 'solid-js';
import { ItemApi, ItemListResponse } from '../../features/item/interfaces';
import ItemRepository from '../../features/item/repositories/ItemRepository';
import ItemList from '../../features/item/templates/ItemList';
import { INIT_STATE } from '../../features/shared/constants';
import createAlert from '../../features/shared/hooks/createAlert';
import usePaginatedState from '../../features/shared/hooks/usePaginatedState';
import useQuery from '../../features/shared/hooks/useQuery';
import PrivateLayout from '../../features/shared/layout/PrivateLayout/PrivateLayout';
import AlertErrors from '../../features/shared/molecules/AlertErrors/AlertErrors';
import useTranslation from '../../features/shared/hooks/useTranslation';
import { createRouteData } from 'solid-start';
import useList from '../../features/shared/hooks/useList';

const IndexPage: Component = () =>
{
    const { translate: t } = useTranslation();
    const { errorData, setError } = createAlert();

    const itemRepository = new ItemRepository();
    const { data, goToPage } = useList(itemRepository.getItems);

    // const { page, goToPage, goFirstPage, getURLSearchParams } = useQuery(INIT_STATE.nextPaginationParams);
    // const [items, { refetch }] = createResource(() => ({ queryParams: { data: 'nada' } }), ({ queryParams }) => itemRepository.getItems({ queryParams }));
    // const items = createRouteData(itemRepository.getItems);
    // const { resourceList: itemList, setViewMore, paginationData } = usePaginatedState<ItemApi, ItemListResponse>(items);

    createEffect(() =>
    {
        // console.log('page, goToPage, goFirstPage, getURLSearchParams');
        // console.log(page(), goToPage(), goFirstPage(), getURLSearchParams());
    });

    const viewMoreAction = () => () =>
    {
        // goToPage(data()?.pagination?.nextUrl);
        // setViewMore();
    };

    // createEffect(() => data.error && setError(data.error));

    const removeAction = async(id: string) =>
    {
        try
        {
            void await itemRepository.removeItem({ id });
            notificationService.show({
                status: 'success',
                title: t('i_removed') as string
            });
        }
        catch (error)
        {
            const errorMessage = setError(error);
            notificationService.show({
                status: 'danger',
                title: t('err_remove_item') as string,
                description: t(errorMessage) as string
            });
        }
    };

    return (
        <PrivateLayout>
            <AlertErrors
                errorData={errorData()}
                title="err"
                description="err_process_item"
            />
             <ItemList
                itemList={data()}
                removeAction={removeAction}
                loading={data.loading}
                viewMoreAction={viewMoreAction}
                nextPage={'paginationData()?.nextUrl'}
             />
        </PrivateLayout>
    );
};

export default IndexPage;
