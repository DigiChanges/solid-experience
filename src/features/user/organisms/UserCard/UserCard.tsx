import { IconButton } from '@hope-ui/core';
import { Link } from 'solid-app-router';
import { Component } from 'solid-js';
import IconLockOpen from '../../../../atoms/Icons/Stroke/IconLockOpen';
import IconPencilAlt from '../../../../atoms/Icons/Stroke/IconPencilAlt';
import IconTrash from '../../../../atoms/Icons/Stroke/IconTrash';
import Card from '../../../shared/molecules/Card/Card';
import CardContent from '../../../shared/molecules/CardContent/CardContent';
import { UserApi } from '../../interfaces';

interface UserCardProps {
    user: UserApi;
    onDelete: () => void;
}

const UserCard: Component<UserCardProps> = ( props ) => (
    <Card>
        <CardContent class="card_container">

            <div class="card_media_object">
                <h6 class="card_media_object_title" data-parent="usersShow">
                    <Link class="card_media_object_link has-permission"
                        href={`/users/${props.user.id}/update`}
                    >
                        {`${props.user.firstName} ${props.user.lastName}`}
                    </Link>
                </h6>
                {props.user.email}
            </div>

            <div class="card_third">
                <div data-parent="usersUpdate">
                    <div class="has-permission">
                        <Link href={`/users/${props.user.id}/update`}>
                            <IconButton
                                _dark={{ color: 'success.300', cursor: 'pointer' }}
                                size={'xs'}
                                aria-label="Edit"
                                variant="plain"
                                colorScheme="success"
                                children={<IconPencilAlt />}
                            />
                        </Link>
                    </div>
                </div>
                <div data-parent="usersChangeUserPassword">
                    <Link class="has-permission"
                        href={`/users/editPassword/${props.user.id}`}
                    >
                        <IconButton
                            _dark={{ color: 'warning.300', cursor: 'pointer' }}
                            size={'xs'}
                            aria-label="Change Password"
                            variant="plain"
                            colorScheme="warning"
                            children={<IconLockOpen />}
                        />
                    </Link>
                </div>
                <div data-parent="usersDelete">
                    <IconButton
                        _dark={{ color: 'danger.300', cursor: 'pointer' }}
                        size={'xs'}
                        class="has-permission"
                        aria-label="Delete User"
                        variant="plain"
                        colorScheme="danger"
                        onClick={props.onDelete}
                        children={<IconTrash />}
                    />
                </div>
            </div>

        </CardContent>
    </Card>
);

export default UserCard;
