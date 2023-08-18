import { ItemPayload } from '../../../features/item/interfaces';
import ItemRepository from '../../../features/item/repositories/ItemRepository';

type params =
{
    itemRepository: ItemRepository;
};

export const createAction = ({ itemRepository }: params) => async(data: ItemPayload) =>
{
    return itemRepository.createItem({ data });
};
