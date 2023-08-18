import { IconButton } from '@hope-ui/core';
import { Link } from '@solidjs/router';
import { Component } from 'solid-js';
import IconLockOpen from '../../../../atoms/Icons/Stroke/IconLockOpen';
import IconPencilAlt from '../../../../atoms/Icons/Stroke/IconPencilAlt';
import IconTrash from '../../../../atoms/Icons/Stroke/IconTrash';
import Card from '../../../shared/molecules/Card/Card';
import CardContent from '../../../shared/molecules/CardContent/CardContent';
import { UserApi } from '../../interfaces';

interface UserCardProps
{
    user: UserApi;
    onDelete: () => void;
}

const UserCard: Component<UserCardProps> = (props) => (
    <Card>
        <CardContent class="card_container">

            <div class="card_media_object">
                <h6 class="card_media_object_title" data-parent="usersShow">
                    <Link class="card_media_object_link"
                        href={`/users/update/${props.user.id}`}
                    >
                        {`${props.user.firstName} ${props.user.lastName}`}
                    </Link>
                </h6>
                <p class={'text-ellipsis overflow-hidden whitespace-nowrap'}>{props.user.email}</p>
            </div>

            <div class="card_third">
                <div data-parent="usersUpdate">
                    <div>
                        <Link href={`/users/update/${props.user.id}`}>
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
                    <Link
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
                <div>
                    <IconButton
                        _dark={{ color: 'danger.200', cursor: 'pointer' }}
                        size={'xs'}
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
