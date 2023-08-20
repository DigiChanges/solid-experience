import { IconButton } from '@hope-ui/core';
import { Link } from '@solidjs/router';
import { Component } from 'solid-js';
import IconPencilAlt from '../../../../atoms/Icons/Stroke/IconPencilAlt';
import IconTrash from '../../../../atoms/Icons/Stroke/IconTrash';
import Card from '../../../shared/molecules/Card/Card';
import CardContent from '../../../shared/molecules/CardContent/CardContent';
import { ItemApi } from '../../interfaces';

interface ItemCardProps
{
    item: ItemApi;
    onDelete: () => void;
}

const ItemCard: Component<ItemCardProps> = (props) => (
    <Card>
        <CardContent class="card_container">

            <div class="card_media_object">
                <h6 class="card_media_object_title" data-parent="itemsShow">
                    <Link class="card_media_object_link"
                        href={`/items/${props.item.id}/update`}
                    >
                        {props.item.name}
                    </Link>
                    <span class="card_media_object_span fallback">
                        {props.item.name}
                    </span>
                </h6>
                {props.item.type}
            </div>

            <div class="card_third">
                <div data-parent="itemsUpdate">
                    <div>
                        <Link href={`/items/${props.item.id}/update`}>
                            <IconButton
                                aria-label="Edit"
                                variant="plain"
                                children={<IconPencilAlt />}
                                colorScheme="success"
                                _dark={{ color: 'success.300', cursor: 'pointer' }}
                                size={'xs'}
                            />
                        </Link>
                    </div>
                </div>
                <div data-parent="itemsDelete">
                    <IconButton
                        class="has-permission"
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
