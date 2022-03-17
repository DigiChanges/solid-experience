import { Link } from 'solid-app-router';
import { Component, For, Show } from 'solid-js';
import Button from '../../../atoms/Button';
import IconPencilAlt from '../../../atoms/Icons/Stroke/IconPencilAlt';
import IconPlus from '../../../atoms/Icons/Stroke/IconPlus';
import IconTrash from '../../../atoms/Icons/Stroke/IconTrash';
import Title from '../../../atoms/Title';
import ButtonScrollUp from '../../../molecules/ButtonScrollUp';
import MediaObject from '../../../molecules/MediaObject';
import TitleWithButton from '../../../molecules/TitleWithButton';
import ConfirmDelete from '../../../templates/modal/ConfirmDelete';
import FilterSort from '../../filterSort/organisms/FilterSort';
import useModal from '../../shared/hooks/useModal';
import RemoveModalContent from '../../shared/modals/RemoveModalContent';
import GeneralLoader from '../../shared/templates/GeneralLoader';
import { BasicConfirmationModalData } from '../../shared/types/Modal';
import { filterBy } from '../constants/filterBy';
import { orderBy } from '../constants/orderBy';
import { IRoleApi } from '../interfaces';
import { Text, useI18n } from 'solid-i18n';

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
                        title="Are you sure delete role:"
                        content={modalData().text}
                    />
                </ConfirmDelete>
            </Show>

            <TitleWithButton
                class="dg-section-title"
                title={ t( 'r_list_title' ) }
                labelButtonName={t( 'r_create' )}
                icon={IconPlus}
                path="/roles/create"
                // buttonAction={actionCreateButton()}
            />

            <FilterSort searchPlaceholder={`${t( 'r_search', { count: 1 } )}...`} filterBy={filterBy} orderBy={orderBy}/>

            <div class="dg-grid-3x3">
                <Show when={!props.loading || props.roleList?.length} fallback={() => <GeneralLoader/>}>
                    <For each={props.roleList} fallback={<div><Text message="r_no_roles" /></div>}>
                        {( role ) =>
                            <MediaObject class="dg-media-object" >
                                <div class="flex-col justify-center content-center ml-3 text-gray-400">
                                    <Title titleType="h6" class="hover:transform hover:scale-125">
                                        <Link
                                            class="w-6 text-gray-300 hover:text-white mr-1 focus:outline-none"
                                            href={`/roles/${role.id}/update`}>
                                            {role.name}
                                        </Link>
                                    </Title>
                                    { role.slug }
                                </div>
                                <div class="flex flex-col ml-auto">
                                    <div class="h-6 w-6 my-1">
                                        <Link
                                            class="w-6 hover:text-white mr-1 focus:outline-none"
                                            href={`/roles/${role.id}/update`}>
                                            <IconPencilAlt />
                                        </Link>
                                    </div>
                                    <div class="h-6 w-6 my-1">
                                        <button
                                            class="w-6 hover:text-white mr-1 focus:outline-none"
                                            onClick={ openModal( {
                                                id: role.id,
                                                text: role.name,
                                            } )}
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
                            <Text message='a_view_more'/>
                        </Show>
                    </Button>
                </Show>

                <ButtonScrollUp />
            </div>
        </section>
    );
};

export default RoleList;
