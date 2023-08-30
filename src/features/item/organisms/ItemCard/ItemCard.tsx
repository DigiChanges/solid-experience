import { IconButton } from '@hope-ui/core';
import { Component } from 'solid-js';
import { A } from 'solid-start';

import IconPencilAlt from '../../../shared/atoms/Icons/Stroke/IconPencilAlt';
import IconTrash from '../../../shared/atoms/Icons/Stroke/IconTrash';
import Card from '../../../shared/molecules/Card/Card';
import CardContent from '../../../shared/molecules/CardContent/CardContent';
import { ItemApi } from '../../interfaces';
import cardStyles from '../../../../styles/card.module.css';

interface ItemCardProps
{
    item: ItemApi;
    onDelete: () => void;
}

const ItemCard: Component<ItemCardProps> = (props) => (
    <Card>
        <CardContent class={cardStyles.card_container}>

            <div class={cardStyles.card_media_object}>
                <h6 class={cardStyles.card_media_object_title}>
                    <A class={cardStyles.card_media_object_link}
                        href={`/items/update/${props.item.id}`}
                    >
                        {props.item.name}
                    </A>
                </h6>
                {props.item.type}
            </div>

            <div class={cardStyles.card_third}>
                <div>
                    <div>
                        <A href={`/items/update/${props.item.id}`}>
                            <IconButton
                                aria-label="Edit"
                                variant="plain"
                                children={<IconPencilAlt />}
                                colorScheme="success"
                                _dark={{ color: 'success.300', cursor: 'pointer' }}
                                size={'xs'}
                            />
                        </A>
                    </div>
                </div>
                <div>
                    <IconButton
                        aria-label="Delete item"
                        variant="plain"
                        children={<IconTrash />}
                        colorScheme="danger"
                        onClick={props.onDelete}
                        _dark={{ color: 'danger.200', cursor: 'pointer' }}
                        size={'xs'}
                    />
                </div>
            </div>

        </CardContent>
    </Card>
);

export default ItemCard;
