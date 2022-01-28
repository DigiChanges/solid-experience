
// import TitleWithButton from "../../molecules/TitleWithButton";
// import FilterSort from "../../organisms/FilterSort";
// import FilterFactory from "../../helpers/FilterFactory";
// import MediaObject from "../../molecules/MediaObject";
// import { removeUser, resetUsers } from "../../redux/users/actions";
// import { openModal, resetQueryPagination } from "../../redux/general/actions";
// import UserRemove from "./UserRemove";
import { Component, createSignal, Show } from 'solid-js';
import { IUserApi } from '../../interfaces/user';
import Title from '../../atoms/Title';
import IconPlus from '../../atoms/Icons/Stroke/IconPlus';
import IconPencilAlt from '../../atoms/Icons/Stroke/IconPencilAlt';
import IconArrowCircleLeft from '../../atoms/Icons/Stroke/IconArrowCircleLeft';
import IconTrash from '../../atoms/Icons/Stroke/IconTrash';
import IconViewMediaObject from '../../atoms/Icons/Stroke/IconViewMediaObject';
import Button from '../../atoms/Button';
import MediaObject from '../../molecules/MediaObject';
import TitleWithButton from '../../molecules/TitleWithButton';
import { For } from 'solid-js';
import { Link, Navigate, useNavigate, useSearchParams } from 'solid-app-router';
import UserRemove from '../users/UserRemove';
import ConfirmDelete from '../modal/ConfirmDelete';
import IconLockOpen from '../../atoms/Icons/Stroke/IconLockOpen';
import FilterFactory from '../../helpers/FilterFactory';
import FilterSort from '../../organisms/FilterSort';
import { filterBy } from '../../entities/filterBy';
import { orderBy } from '../../organisms/orderBy';

interface userListTemplateProps
{
    usersList: IUserApi[];
    removeAction: any;
    loading: boolean;
}

const UserList: Component<userListTemplateProps> = ( props ) =>
{
    const [ showModal, setShowModal ] = createSignal( false );
    const [ idSelected, setIdSelected ] = createSignal( '' );
    const [ text, setText ] = createSignal();
    const [ getShowScroll, setShowScroll ] = createSignal( false );

    const openConfirmDelete = ( id: string, lastName: string, firstName: string ): void =>
    {
        setShowModal( !showModal() );
        setIdSelected( id );
        setText( <UserRemove lastName={lastName}  firstName={firstName}  /> );
        // const modalData = {
        //     idSelected: id,
        //     open: true,
        // text: <UserRemove lastName={lastName} firstName={firstName} />,
        //     action: removeUser
        // };

        // dispatch( openModal( modalData ) );
    };

    const actionCreateButton = () =>
    {
        // return router.push( '/users/create' );
        return true;
    };


    const checkScrollTop = () =>
    {
        if ( !getShowScroll() && window.pageYOffset > 300 )
        {
            setShowScroll( true );
        }
        else if ( getShowScroll() && window.pageYOffset <= 300 )
        {
            setShowScroll( false );
        }
    };

    if ( typeof window !== 'undefined' )
    {
        window.addEventListener( 'scroll', checkScrollTop );
    }

    const scrollTop = () =>
    {
        if ( typeof window !== 'undefined' )
        {
            window.scrollTo( { top: 0, behavior: 'smooth' } );
        }
    };

    return (
        <section class="mx-8">
            {showModal() &&
                <ConfirmDelete
                    open={true}
                    idSelected={idSelected()}
                    text={text()}
                    action={props.removeAction}
                    setShowModal={setShowModal}
                />
            }
            <TitleWithButton
                class="dg-section-title"
                title="Users List"
                labelButtonName="Create User"
                icon={IconPlus}
                buttonAction={actionCreateButton()}
                path="/users/create"
            />

            <FilterSort placeholder="Search users..." filterBy={filterBy} orderBy={orderBy}/>

            <Show when={!props.loading} fallback={() => <div>Loading users...</div>}>
                <div class="dg-grid-3x3">

                    <For each={props.usersList} fallback={<div>No users...</div>}>
                        {( item ) =>
                            <MediaObject class="dg-media-object" >
                                <div class="flex-col w-10 h-10 bg-white text-black justify-center content-center rounded-full">{' '}</div>
                                <div class="flex-col justify-center content-center ml-3">
                                    <Title titleType="h6" class="hover:transform hover:scale-125"><a href={`/users/view/${item.id}`}>{item.firstName}{' '}{item.lastName}</a></Title>
                                    {item.email}
                                </div>
                                <div class="flex flex-col ml-auto">
                                    <div class="h-6 w-6 my-1">
                                        <Link
                                            class="w-6 hover:text-gray-700 mr-1 focus:outline-none"
                                            href={`/users/${item.id}/update`}>
                                            <IconPencilAlt />
                                        </Link>
                                    </div>
                                    <div class="h-6 w-6 my-1">
                                        <Link
                                            class="w-6 hover:text-gray-700 mr-1 focus:outline-none"
                                            href={`/users/editPassword/${item.id}`}>
                                            <IconLockOpen />
                                        </Link>
                                    </div>
                                    <div class="h-6 w-6 my-1">
                                        <button
                                            class="w-6 hover:text-gray-700 mr-1 focus:outline-none"
                                            onClick={() => openConfirmDelete( item.id, item.lastName, item.firstName )}
                                            type='button'
                                        >
                                            <IconTrash />
                                        </button>
                                    </div>
                                </div>
                            </MediaObject>
                        }
                    </For>


                </div>

                <div class="dg-full-center-flex mt-8">
                    <Button onClick={() =>
                    {}} class="dg-secondary-button">
                        View More
                    </Button>
                    <Button onClick={scrollTop} class={`h-10 w-10 transform rotate-90 text-main-gray-250 ${getShowScroll() ? 'flex' : 'hidden'}`} >
                        <IconArrowCircleLeft />
                    </Button>
                </div>
            </Show>
        </section>
    );
};

export default UserList;
