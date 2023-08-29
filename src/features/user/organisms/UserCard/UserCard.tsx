import { IconButton } from '@hope-ui/core';
import { A } from 'solid-start';
import { Component } from 'solid-js';
import IconLockOpen from '../../../shared/atoms/Icons/Stroke/IconLockOpen';
import IconPencilAlt from '../../../shared/atoms/Icons/Stroke/IconPencilAlt';
import IconTrash from '../../../shared/atoms/Icons/Stroke/IconTrash';
import Card from '../../../shared/molecules/Card/Card';
import CardContent from '../../../shared/molecules/CardContent/CardContent';
import { UserApi } from '../../interfaces';
import cardStyles from '../../../../styles/card.module.css';
import userCardStyles from './userCard.module.css';

interface UserCardProps
{
    user: UserApi;
    onDelete: () => void;
}

const UserCard: Component<UserCardProps> = (props) => (
    <Card>
        <CardContent class={cardStyles.card_container}>

            <div class={cardStyles.card_media_object}>
                <h6 class={cardStyles.card_media_object_title}>
                    <A class={cardStyles.card_media_object_link}
                        href={`/users/update/${props.user.id}`}
                    >
                        {`${props.user.firstName} ${props.user.lastName}`}
                    </A>
                </h6>
                <p class={userCardStyles.user_email}>{props.user.email}</p>
            </div>

            <div class={cardStyles.card_third}>
                <div>
                    <div>
                        <A href={`/users/update/${props.user.id}`}>
                            <IconButton
                                _dark={{ color: 'success.300', cursor: 'pointer' }}
                                size={'xs'}
                                aria-label="Edit"
                                variant="plain"
                                colorScheme="success"
                                children={<IconPencilAlt />}
                            />
                        </A>
                    </div>
                </div>
                <div data-parent="usersChangeUserPassword">
                    <A
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
                    </A>
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
