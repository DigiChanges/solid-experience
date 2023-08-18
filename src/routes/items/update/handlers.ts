import { ItemPayload } from '../../../features/item/interfaces';
import ItemRepository from '../../../features/item/repositories/ItemRepository';

type params =
{
    itemRepository: ItemRepository;
    id: string;
};

export const updateAction = ({ itemRepository, id }: params) => async(data: ItemPayload) =>
{
    return itemRepository.updateItem({ id, data });
};
