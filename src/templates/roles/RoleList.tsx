// import { useDispatch } from 'react-redux';
// import { useRouter } from "next/router";
// import FilterSort from "../../organisms/FilterSort";
// import FilterFactory from "../../helpers/FilterFactory";
// import { openModal, resetQueryPagination } from "../../redux/general/actions";
// import RoleRemove from "./RoleRemove";
// import { removeRole, resetRoles } from "../../redux/roles/actions";
import { Component, createSignal } from 'solid-js';
import { IRoleApi } from '../../interfaces/role';
import Title from '../../atoms/Title';
import IconPlus from '../../atoms/Icons/Stroke/IconPlus';
import IconPencilAlt from '../../atoms/Icons/Stroke/IconPlus';
import IconArrowCircleLeft from '../../atoms/Icons/Stroke/IconViewMediaObject';
import IconTrash from '../../atoms/Icons/Stroke/IconPlus';
import Button from '../../atoms/Button';
import MediaObject from '../../molecules/MediaObject';
import TitleWithButton from '../../molecules/TitleWithButton';
import { For } from 'solid-js';
import {  Link } from 'solid-app-router';

interface roleListTemplateProps {
    rolesList?: IRoleApi[];
    query?: never;
    viewMore?: never;
}
const RoleList: Component<roleListTemplateProps> = ( props ) =>
{
    // const router = useRouter();
    // solid have useRouter
    // const dispatch = useDispatch();
    const [getshowScroll, setShowScroll] = createSignal( false );
    const openConfirmDelete = ( id: string, name: string ): void =>

    {
        // const modalData = {
        //     idSelected: id,
        //     open: true,
        //     text: <RoleRemove name={name} />,
        //     action: removeRole
        // };

        // dispatch( openModal( modalData ) );
    };

    const actionCreateButton = () =>
    {
        // return router.push("/roles/create");
        return true;
    };

    // const onClickFilter = ( search: string, filterBy: string, orderBy: string, sort: 'asc' | 'desc' ) =>
    // {
    //     dispatch(resetRoles());
    //     dispatch(resetQueryPagination());

    //     const uriParam = FilterFactory.getUriParam({ search, filterBy, orderBy, sort });

    //     router.push(`/roles/list?${uriParam}`, undefined, { shallow: false });
    // };

    const checkScrollTop = () =>
    {
        if ( !getshowScroll() && window.pageYOffset > 300 )
        {
            setShowScroll( true );
        }
        else if ( getshowScroll() && window.pageYOffset <= 300 )
        {
            setShowScroll( false );
        }
    };

    if ( typeof window !== 'undefined' )
    {
        window.addEventListener( 'scroll', checkScrollTop );
    }

    const scrollTop = () => {
        if ( typeof window !== 'undefined' )
        {
            window.scrollTo( { top: 0, behavior: 'smooth' } );
        }
    };

    return (
        <section class="mx-8">
            <TitleWithButton
                class="dg-section-title"
                title="Roles"
                labelButtonName="Create Role"
                icon={IconPlus}
                path="/roles/create"
                // buttonAction={actionCreateButton()}
            />
            {/* <FilterSort actionFilter={onClickFilter} filterQuery={query} placeholder="Search roles..." /> */}
            <div class="dg-grid-3x3">
                {/* {props.rolesList && */}
                <For each={props.rolesList } fallback={<div>Loading...</div>}>
                    {( item ) =>
                        <MediaObject class="dg-media-object" >
                            <div class="flex-col w-10 h-10 bg-white text-black justify-center content-center rounded-full">{' '}</div>
                            <div class="flex-col justify-center content-center ml-3">
                                <Title titleType="h6" class="hover:transform hover:scale-125"><a href={`/roles/view/${item.id}`}>{item.name}</a></Title>
                                { item.name }
                            </div>
                            <div class="flex flex-col ml-auto">
                                <div class="h-6 w-6 my-1">
                                    <button
                                        class="w-6 hover:text-gray-700 mr-1 focus:outline-none"
                                        onClick={() => window.open( `/roles/update/${item.id}` )}
                                    >
                                        <IconPencilAlt />
                                    </button>
                                </div>
                                <div class="h-6 w-6 my-1">
                                    <button
                                        class="w-6 hover:text-gray-700 mr-1 focus:outline-none"
                                        onClick={() => openConfirmDelete( item.id, item.name )}
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

export default RoleList;
