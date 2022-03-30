import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, For, Show } from 'solid-js';
import Button from '../../../atoms/Button';
import IconPencilAlt from '../../../atoms/Icons/Stroke/IconPencilAlt';
import IconPlus from '../../../atoms/Icons/Stroke/IconPlus';
import IconTrash from '../../../atoms/Icons/Stroke/IconTrash';
import Title from '../../../atoms/Title';
import ButtonIcon from '../../../molecules/ButtonIcon';
import ButtonScrollUp from '../../../molecules/ButtonScrollUp';
import MediaObject from '../../../molecules/MediaObject';
import ConfirmDelete from '../../../templates/modal/ConfirmDelete';
import FilterSort from '../../filterSort/organisms/FilterSort';
import useModal from '../../shared/hooks/useModal';
import RemoveModalContent from '../../shared/modals/RemoveModalContent';
import GeneralLoader from '../../shared/templates/GeneralLoader';
import { BasicConfirmationModalData } from '../../shared/types/Modal';
import { filterBy } from '../constants/filterBy';
import { orderBy } from '../constants/orderBy';
import { IRoleApi } from '../interfaces';

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
                        title={t( 'r_remove' ) as string}
                        content={modalData().text}
                    />
                </ConfirmDelete>
            </Show>

            <section class="flex flex-row justify-between items-center my-6">
                <Title class="dg-section-title" titleType="h4">
                    <Text message='r_list' />
                </Title>

                <div id="rolesSave">
                    <div class="permission hidden">
                        <ButtonIcon
                            icon={IconPlus}
                            labelName={t( 'r_create' )}
                            path="/roles/create"
                        />
                    </div>
                </div>
            </section>

            <FilterSort searchPlaceholder={`${t( 'r_search', { count: 1 } )}...`} filterBy={filterBy} orderBy={orderBy}/>

            <Show when={props.loading} >
                <GeneralLoader/>
            </Show>

            <div class="dg-grid-3x3">
                <Show when={!props.loading || props.roleList?.length}>
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
                                    <div class="h-6 w-6 my-1" id="rolesDelete">
                                        <div class="permission hidden">
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
