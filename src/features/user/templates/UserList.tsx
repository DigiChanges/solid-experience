import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, For, Show } from 'solid-js';
import Button from '../../../atoms/Button';
import IconLockOpen from '../../../atoms/Icons/Stroke/IconLockOpen';
import IconPencilAlt from '../../../atoms/Icons/Stroke/IconPencilAlt';
import IconPlus from '../../../atoms/Icons/Stroke/IconPlus';
import IconTrash from '../../../atoms/Icons/Stroke/IconTrash';
import Title from '../../../atoms/Title';
import ButtonIcon from '../../../molecules/ButtonIcon';
import ButtonScrollUp from '../../../molecules/ButtonScrollUp';
import MediaObject from '../../../molecules/MediaObject';
import FilterSort from '../../filterSort/organisms/FilterSort';
import useModal from '../../shared/hooks/useModal';
import ConfirmDelete from '../../shared/modals/ConfirmDelete';
import RemoveModalContent from '../../shared/modals/RemoveModalContent';
import GeneralLoader from '../../shared/templates/GeneralLoader';
import { BasicConfirmationModalData } from '../../shared/types/Modal';
import { filterBy } from '../constants/filterBy';
import { orderBy } from '../constants/orderBy';
import { UserApi } from '../interfaces';

interface UserListTemplateProps
{
    userList: UserApi[] | undefined;
    removeAction: any;
    loading: boolean;
    viewMoreAction: any;
    nextPage: string | undefined;
}

const UserList: Component<UserListTemplateProps> = ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;

    const { isShowModal, modalData, openModal, closeModal } = useModal<BasicConfirmationModalData>( { id: undefined, text: '' } );

    return (
        <section class="mx-8">
            <Show when={isShowModal()}>
                <ConfirmDelete
                    cbAction={() => props.removeAction( modalData()?.id )}
                    onClose={closeModal()}
                >
                    <RemoveModalContent
                        title={t( 'u_remove' ) as string}
                        content={modalData().text}
                    />
                </ConfirmDelete>
            </Show>

            <section class="flex flex-row justify-between items-center my-6" data-parent="usersSave">
                <Title class="dg-section-title" titleType="h4">
                    <Text message="u_list" />
                </Title>

                <div class="has-permission">
                    <ButtonIcon
                        icon={IconPlus}
                        labelName={t( 'u_create' )}
                        path="/users/create"
                    />
                </div>
            </section>

            <FilterSort searchPlaceholder={`${t( 'u_search', { count: 1 } )}...`} filterBy={filterBy} orderBy={orderBy}/>

            <Show when={props.loading} >
                <GeneralLoader/>
            </Show>
            <div class="dg-grid-3x3 justify-center">
                <Show when={!props.loading || props.userList?.length}>
                    <For each={props.userList} fallback={<div><Text message="u_no_users" />...</div>}>
                        {( user ) =>
                            <MediaObject class="dg-media-object" >
                                <div class="flex-col justify-center content-center ml-3 text-gray-400">
                                    <Title titleType="h6" class="hover:transform hover:scale-125" data-parent="usersShow">
                                        <Link class="w-6 hover:text-white mr-1 focus:outline-none has-permission"
                                            href={`/users/${user.id}/update`}
                                        >
                                            {`${user.firstName} ${user.lastName}`}
                                        </Link>
                                        <span class="w-6 hover:text-white mr-1 focus:outline-none fallback">
                                            {`${user.firstName} ${user.lastName}`}
                                        </span>
                                    </Title>
                                    {user.email}
                                </div>
                                <div class="flex flex-col ml-auto">
                                    <div class="h-6 w-6 my-1" data-parent="usersUpdate">
                                        <div class="h-6 w-6 my-1 has-permission">
                                            <Link class="w-6 hover:text-white mr-1 focus:outline-none"
                                                href={`/users/${user.id}/update`}
                                            >
                                                <IconPencilAlt />
                                            </Link>
                                        </div>
                                    </div>
                                    <div class="h-6 w-6 my-1" data-parent="usersChangeUserPassword">
                                        <Link class="w-6 hover:text-white mr-1 focus:outline-none has-permission"
                                            href={`/users/editPassword/${user.id}`}>
                                            <IconLockOpen />
                                        </Link>
                                    </div>
                                    <div class="h-6 w-6 my-1" data-parent="usersDelete">
                                        <button class="w-6 hover:text-white mr-1 focus:outline-none has-permission"
                                            onClick={ openModal( {
                                                id: user.id,
                                                text: `${user.firstName} ${user.lastName}`,
                                            } )}
                                            type="button"
                                        >
                                            <IconTrash />
                                        </button>
                                    </div>
                                </div>
                            </MediaObject>
                        }
                    </For>
                </Show>
            </div>

            <div class="dg-full-center-flex mt-8">
                <Show when={!!props.nextPage}>
                    <Button onClick={props.viewMoreAction()} class="dg-secondary-button">
                        <Show when={!props.loading} fallback={() => <span><Text message="a_loading" />...</span>}>
                            <Text message="a_view_more"/>
                        </Show>
                    </Button>
                </Show>

                <ButtonScrollUp />
            </div>
        </section>
    );
};

export default UserList;
