import { IconButton } from '@hope-ui/core';
import { Link } from '@solidjs/router';
import { Component } from 'solid-js';
import IconPencilAlt from '../../../../atoms/Icons/Stroke/IconPencilAlt';
import IconTrash from '../../../../atoms/Icons/Stroke/IconTrash';
import Card from '../../../shared/molecules/Card/Card';
import CardContent from '../../../shared/molecules/CardContent/CardContent';
import { RoleApi } from '../../interfaces';

interface RoleCardProps {
    role: RoleApi;
    onDelete: () => void;
}

const RoleCard: Component<RoleCardProps> = (props) => (
    <Card>
        <CardContent class="card_container">

            <div class="card_media_object">
                <h6 class="card_media_object_title" data-parent="rolesShow">
                    <Link class="card_media_object_link has-permission"
                        href={`/roles/${props.role.id}/update`}
                    >
                        {props.role.name}
                    </Link>
                    <span class="card_media_object_span fallback">
                        {props.role.name}
                    </span>
                </h6>
                {props.role.slug}
            </div>

            <div class="card_third">
                <div data-parent="rolesUpdate">
                    <div class="has-permission">
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
                        class="has-permission"
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
