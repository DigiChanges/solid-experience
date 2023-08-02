import { Component } from 'solid-js';
import ItemRepository from '../../../features/item/repositories/ItemRepository';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';
import { createAction } from './handlers';
import ItemCreate from '../../../features/item/templates/Create/ItemCreate';

const IndexPage: Component = () =>
{
    const itemRepository = new ItemRepository();

    return (
        <PrivateLayout>
            <ItemCreate onCreate={createAction({ itemRepository })}/>
        </PrivateLayout>
    );
};

export default IndexPage;
