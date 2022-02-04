import { Link } from 'solid-app-router';
import { Component, createSignal, For, Show } from 'solid-js';
import Button from '../../atoms/Button';
import IconLockOpen from '../../atoms/Icons/Stroke/IconLockOpen';
import IconPencilAlt from '../../atoms/Icons/Stroke/IconPencilAlt';
import IconPlus from '../../atoms/Icons/Stroke/IconPlus';
import IconTrash from '../../atoms/Icons/Stroke/IconTrash';
import Title from '../../atoms/Title';
import { filterBy } from '../../features/user/constants/filterBy';
import { orderBy } from '../../features/user/constants/orderBy';
import { IUserApi } from '../../interfaces/user';
import ButtonScrollUp from '../../molecules/ButtonScrollUp';
import MediaObject from '../../molecules/MediaObject';
import TitleWithButton from '../../molecules/TitleWithButton';
import FilterSort from '../../organisms/FilterSort';
import ConfirmDelete from '../modal/ConfirmDelete';
import UserRemove from '../users/UserRemove';

interface UserListTemplateProps
{
    userList: IUserApi[] | undefined;
    removeAction: any;
    loading: boolean;
    viewMoreAction: any;
    nextPage: string | undefined;
}

const UserList: Component<UserListTemplateProps> = ( props ) =>
{
    const [ showModal, setShowModal ] = createSignal( false );
    const [ idSelected, setIdSelected ] = createSignal( '' );
    const [ text, setText ] = createSignal( { firstName: '', lastName: '' } );

    const openConfirmDelete = ( id: string, lastName: string, firstName: string ): void =>
    {
        setShowModal( !showModal() );
        setIdSelected( id );
        setText( { firstName, lastName } );
    };

    const actionCreateButton = () =>
    {
        // return router.push( '/users/create' );
        return true;
    };

    return (
        <section class="mx-8">
            {showModal() &&
                <ConfirmDelete
                    open={true}
                    idSelected={idSelected()}
                    action={props.removeAction}
                    setShowModal={setShowModal}
                >
                    <UserRemove lastName={text().lastName}  firstName={text().firstName}  />
                </ConfirmDelete>
            }
            <TitleWithButton
                class="dg-section-title"
                title={props.loading ? 'Users List ...' : 'Users List'}
                labelButtonName="Create User"
                icon={IconPlus}
                buttonAction={actionCreateButton()}
                path="/users/create"
            />

            <FilterSort placeholder="Search users..." filterBy={filterBy} orderBy={orderBy}/>

            <div class="dg-grid-3x3">
                <Show when={props.userList?.length}>
                    <For each={props.userList} fallback={<div>No users...</div>}>
                        {( user ) =>
                            <MediaObject class="dg-media-object" >
                                <div class="flex-col w-10 h-10 bg-white text-black justify-center content-center rounded-full">{' '}</div>
                                <div class="flex-col justify-center content-center ml-3">
                                    <Title titleType="h6" class="hover:transform hover:scale-125">
                                        <Link href={`/users/${user.id}/update`}>
                                            {`${user.firstName} ${user.lastName}`}
                                        </Link>
                                    </Title>
                                    {user.email}
                                </div>
                                <div class="flex flex-col ml-auto">
                                    <div class="h-6 w-6 my-1">
                                        <Link
                                            class="w-6 hover:text-gray-700 mr-1 focus:outline-none"
                                            href={`/users/${user.id}/update`}>
                                            <IconPencilAlt />
                                        </Link>
                                    </div>
                                    <div class="h-6 w-6 my-1">
                                        <Link
                                            class="w-6 hover:text-gray-700 mr-1 focus:outline-none"
                                            href={`/users/editPassword/${user.id}`}>
                                            <IconLockOpen />
                                        </Link>
                                    </div>
                                    <div class="h-6 w-6 my-1">
                                        <button
                                            class="w-6 hover:text-gray-700 mr-1 focus:outline-none"
                                            onClick={() => openConfirmDelete( user.id, user.lastName, user.firstName )}
                                            type='button'
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
                        <Show when={!props.loading} fallback="Loading">
                            View More
                        </Show>
                    </Button>
                </Show>

                <ButtonScrollUp />
            </div>
        </section>
    );
};

export default UserList;
