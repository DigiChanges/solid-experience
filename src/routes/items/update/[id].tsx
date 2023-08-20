import { useParams } from 'solid-start';
import { Component, createResource } from 'solid-js';
import ItemRepository from '../../../features/item/repositories/ItemRepository';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';
import { updateAction } from './handlers';
import ItemUpdate from '../../../features/item/templates/ItemUpdate';

const IndexPage: Component = () =>
{
    const { id } = useParams<{ id: string }>();
    const itemRepository = new ItemRepository();
    const [item] = createResource({ id }, itemRepository.getOne);

    return (
        <PrivateLayout>
            <ItemUpdate
                itemSelected={item()?.data}
                onUpdate={updateAction({ itemRepository, id })}
                loading={item.loading}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
