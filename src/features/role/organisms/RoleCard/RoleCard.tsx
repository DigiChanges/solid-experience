import { IconButton } from '@hope-ui/solid';
import { Link } from 'solid-app-router';
import { Component } from 'solid-js';
import IconPencilAlt from '../../../../atoms/Icons/Stroke/IconPencilAlt';
import IconTrash from '../../../../atoms/Icons/Stroke/IconTrash';
import Card from '../../../shared/molecules/Card/Card';
import CardContent from '../../../shared/molecules/CardContent/CardContent';
import { RoleApi } from '../../interfaces';
import styles from './RoleCard.module.css';

interface RoleCardProps {
    role: RoleApi;
    onDelete: () => void;
}

const RoleCard: Component<RoleCardProps> = ( props ) => (
    <Card>
        <CardContent class={styles.card_container}>

            <div class={styles.list_media_object_container}>
                <h6 class={styles.list_media_object_container_title} data-parent="rolesShow">
                    <Link class={`${styles.list_media_object_container_link} has-permission `}
                        href={`/roles/${props.role.id}/update`}
                    >
                        {props.role.name}
                    </Link>
                    <span class={`${styles.list_media_object_container_span} fallback `}>
                        {props.role.name}
                    </span>
                </h6>
                {props.role.slug}
            </div>

            <div class={styles.list_third_container}>
                <div data-parent="rolesUpdate">
                    <div class="has-permission">
                        <Link href={`/roles/${props.role.id}/update`}>
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
                <div data-parent="rolesDelete">
                    <IconButton
                        class="has-permission"
                        aria-label="Delete Role"
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

export default RoleCard;
