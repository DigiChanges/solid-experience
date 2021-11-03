
// import TitleWithButton from "../../molecules/TitleWithButton";
// import FilterSort from "../../organisms/FilterSort";
// import FilterFactory from "../../helpers/FilterFactory";
// import MediaObject from "../../molecules/MediaObject";
// import { removeUser, resetUsers } from "../../redux/users/actions";
// import { openModal, resetQueryPagination } from "../../redux/general/actions";
// import UserRemove from "./UserRemove";
import { Component, createSignal } from 'solid-js';
import { IUserApi } from '../../interfaces/user';
import Title from '../../atoms/Title';
import IconPlus from '../../atoms/Icons/Stroke/IconPlus';
import IconPencilAlt from '../../atoms/Icons/Stroke/IconPlus';
import IconArrowCircleLeft from '../../atoms/Icons/Stroke/IconPlus';
import IconTrash from '../../atoms/Icons/Stroke/IconPlus';
import IconViewMediaObject from '../../atoms/Icons/Stroke/IconViewMediaObject';
import Button from '../../atoms/Button';
import MediaObject from '../../molecules/MediaObject';
import TitleWithButton from '../../molecules/TitleWithButton';
import { For } from 'solid-js';

// import UserRemove from '../users/UserRemove';
interface userListTemplateProps {
    usersList: IUserApi[];
    query?: never;
    viewMore?: never;
}
const UserList: Component<userListTemplateProps> = ( props ) =>
{


    // const router = useRouter();
    // const dispatch = useDispatch();
    const [ getshowScroll, setShowScroll ] = createSignal( false );

    const openConfirmDelete = (id: string, lastName: string, firstName: string): void => {
        // const modalData = {
        //     idSelected: id,
        //     open: true,
        // text: <UserRemove lastName={lastName} firstName={firstName} />,
        //     action: removeUser
        // };

        // dispatch( openModal( modalData ) );
    };

    const actionCreateButton = () => {
        // return router.push( '/users/create' );
        return true;
    };
    const onClickFilter = (search: string, filterBy: string, orderBy: string, sort: 'asc' | 'desc') => {
        // dispatch(resetUsers() );
        // dispatch(resetQueryPagination() );

        // const uriParam = FilterFactory.getUriParam({ search, filterBy, orderBy, sort } );

        // router.push(`/users/list?${uriParam}`, undefined, { shallow: false } );
        return true;
    };

    const checkScrollTop = () => {
        if (!getshowScroll() && window.pageYOffset > 300) {
            setShowScroll(true);
        }
        else if (getshowScroll() && window.pageYOffset <= 300) {
            setShowScroll(false);
        }
    };

    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', checkScrollTop);
    }

    const scrollTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <section class="mx-8">
            <TitleWithButton
                class="dg-section-title"
                title="Users List"
                labelButtonName="Create User"
                icon={IconPlus}
                buttonAction={actionCreateButton()}
            />
            {/* <FilterSort actionFilter={onClickFilter} filterQuery={props.query} placeholder="Search roles..." /> */}
            <div class="dg-grid-3x3">

                <For each={props.usersList} fallback={<div>Loading...</div>}>
                    {(item) =>
                        <MediaObject class="dg-media-object" >
                            <div class="flex-col w-10 h-10 bg-white text-black justify-center content-center rounded-full">{' '}</div>
                            <div class="flex-col justify-center content-center ml-3">
                                <Title titleType="h6" class="hover:transform hover:scale-125"><a href={`/users/view/${item.id}`}>{item.firstName}{' '}{item.lastName}</a></Title>
                                {item.email}
                            </div>
                            <div class="flex flex-col ml-auto">
                                <div class="h-6 w-6 my-1">
                                    <button
                                        class="w-6 hover:text-gray-700 mr-1 focus:outline-none"
                                        onClick={() => window.open(`/users/update/${item.id}`)}
                                    // onClick={() => true}
                                    >
                                        <IconPencilAlt />
                                    </button>
                                </div>
                                <div class="h-6 w-6 my-1">
                                    <button
                                        class="w-6 hover:text-gray-700 mr-1 focus:outline-none"
                                        // onClick={() => router.push(`/users/changePassword/${user.id}`)}
                                        onClick={() => true}
                                    >
                                        <IconViewMediaObject />
                                    </button>
                                </div>
                                <div class="h-6 w-6 my-1">
                                    <button
                                        class="w-6 hover:text-gray-700 mr-1 focus:outline-none"
                                        onClick={() => openConfirmDelete(item.id, item.lastName, item.firstName)}
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
                <Button onClick={props.viewMore} class="dg-secondary-button">
                    View More
                </Button>
                <Button onClick={scrollTop} class={`h-10 w-10 transform rotate-90 text-main-gray-250 ${getshowScroll() ? 'flex' : 'hidden'}`} >
                    <IconArrowCircleLeft />
                </Button>
            </div>
        </section>
    );
};

export default UserList;
