import { IconButton } from '@hope-ui/core';
import { Link } from '@solidjs/router';
import { Component } from 'solid-js';
import IconPencilAlt from '../../../../atoms/Icons/Stroke/IconPencilAlt';
import IconTrash from '../../../../atoms/Icons/Stroke/IconTrash';
import Card from '../../../shared/molecules/Card/Card';
import CardContent from '../../../shared/molecules/CardContent/CardContent';
import { RoleApi } from '../../interfaces';
import cardStyles from '../../../../styles/card.module.css';
import indexStyles from '../../../../styles/index.module.css';

interface RoleCardProps {
    role: RoleApi;
    onDelete: () => void;
}

const RoleCard: Component<RoleCardProps> = (props) => (
    <Card>
        <CardContent class={cardStyles.card_container}>

            <div class={cardStyles.card_media_object}>
                <h6 class={cardStyles.card_media_object_title} data-parent="rolesShow">
                    <Link class={`${cardStyles.card_media_object_link} ${indexStyles.hasPermission}`}
                        href={`/roles/${props.role.id}/update`}
                    >
                        {props.role.name}
                    </Link>
                    <span>
                        {props.role.name}
                    </span>
                </h6>
                {props.role.slug}
            </div>

            <div class={cardStyles.card_third}>
                <div data-parent="rolesUpdate">
                    <div class={indexStyles.hasPermission}>
                        <Link href={`/roles/${props.role.id}/update`}>
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
                <div data-parent="rolesDelete">
                    <IconButton
                        class={indexStyles.hasPermission}
                        aria-label="Delete Role"
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

export default RoleCard;
