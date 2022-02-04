import { Link } from 'solid-app-router';
import { Component, createSignal, For, Show } from 'solid-js';
import Button from '../../atoms/Button';
import IconPencilAlt from '../../atoms/Icons/Stroke/IconPencilAlt';
import IconPlus from '../../atoms/Icons/Stroke/IconPlus';
import IconTrash from '../../atoms/Icons/Stroke/IconTrash';
import IconArrowCircleLeft from '../../atoms/Icons/Stroke/IconViewMediaObject';
import Title from '../../atoms/Title';
import { filterBy } from '../../features/role/constants/filterBy';
import { orderBy } from '../../features/role/constants/orderBy';
import { IRoleApi } from '../../interfaces/role';
import MediaObject from '../../molecules/MediaObject';
import TitleWithButton from '../../molecules/TitleWithButton';
import FilterSort from '../../organisms/FilterSort';
import ConfirmDelete from '../modal/ConfirmDelete';
import RoleRemove from './RoleRemove';

interface RoleListTemplateProps
{
    roleList: IRoleApi[] | undefined;
    removeAction: any;
    loading: boolean;
    viewMoreAction: any;
    nextPage: string | undefined;
}

const RoleList: Component<RoleListTemplateProps> = ( props ) =>
{
    const [ getShowScroll, setShowScroll ] = createSignal( false );
    const [ showModal, setShowModal ] = createSignal( false );
    const [ idSelected, setIdSelected ] = createSignal( '' );
    const [ text, setText ] = createSignal();

    const openConfirmDelete = ( id: string, name: string ): void =>
    {
        setShowModal( !showModal() );
        setIdSelected( id );
        setText( <RoleRemove name={name} /> );
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
                title="Roles"
                labelButtonName="Create Role"
                icon={IconPlus}
                path="/roles/create"
                // buttonAction={actionCreateButton()}
            />

            <FilterSort placeholder="Search roles..." filterBy={filterBy} orderBy={orderBy}/>

            <div class="dg-grid-3x3">
                <Show when={props.roleList?.length}>
                    <For each={props.roleList} fallback={<div>No roles...</div>}>
                        {( role ) =>
                            <MediaObject class="dg-media-object" >
                                <div class="flex-col w-10 h-10 bg-white text-black justify-center content-center rounded-full">{' '}</div>
                                <div class="flex-col justify-center content-center ml-3">
                                    <Title titleType="h6" class="hover:transform hover:scale-125">
                                        <Link href={`/roles/${role.id}/update`}>
                                            {role.name}
                                        </Link>
                                    </Title>
                                    { role.slug }
                                </div>
                                <div class="flex flex-col ml-auto">
                                    <div class="h-6 w-6 my-1">
                                        <Link
                                            class="w-6 hover:text-gray-700 mr-1 focus:outline-none"
                                            href={`/roles/${role.id}/update`}>
                                            <IconPencilAlt />
                                        </Link>
                                    </div>
                                    <div class="h-6 w-6 my-1">
                                        <button
                                            class="w-6 hover:text-gray-700 mr-1 focus:outline-none"
                                            onClick={() => openConfirmDelete( role.id, role.name )}
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

                <Button onClick={scrollTop} class={`h-10 w-10 transform rotate-90 text-main-gray-250 ${getShowScroll() ? 'flex' : 'hidden'}`} >
                    <IconArrowCircleLeft />
                </Button>
            </div>
        </section>
    );
};

export default RoleList;
