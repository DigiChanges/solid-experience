import { IconButton } from '@hope-ui/solid';
import { Link } from 'solid-start';
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
                                aria-label="Edit"
                                variant="ghost"
                                icon={<IconPencilAlt />}
                                compact
                                colorScheme="success"
                            />
                        </Link>
                    </div>
                </div>
                <div data-parent="usersChangeUserPassword">
                    <Link class="has-permission"
                        href={`/users/editPassword/${props.user.id}`}
                    >
                        <IconButton
                            aria-label="Change Password"
                            variant="ghost"
                            icon={<IconLockOpen />}
                            compact
                            colorScheme="warning"
                        />
                    </Link>
                </div>
                <div data-parent="usersDelete">
                    <IconButton
                        class="has-permission"
                        aria-label="Delete User"
                        variant="ghost"
                        icon={<IconTrash />}
                        compact
                        colorScheme="danger"
                        onClick={props.onDelete}
                    />
                </div>
            </div>

        </CardContent>
    </Card>
);

export default UserCard;
