import { Component, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';

import { notificationService } from '../../../shared/molecules/Toast/Toast';
import useTranslation from '../../../shared/hooks/useTranslation';
import createAlert from '../../../shared/hooks/createAlert';
import AlertErrors from '../../../shared/molecules/AlertErrors/AlertErrors';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import { ItemApi, ItemPayload, ItemResponse } from '../../interfaces';
import ItemForm from '../../organisms/ItemForm/ItemForm';

interface ItemUpdateTemplateProps
{
    onUpdate: (data: ItemPayload) => Promise<ItemResponse>;
    itemSelected: ItemApi | undefined;
    loading: boolean;
}

const ItemUpdate: Component<ItemUpdateTemplateProps> = (props) =>
{
    const { translate: t } = useTranslation();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show({
            status: 'success',
            title: t('i_updated') as string
        });
        navigate('/items', { replace: true });
    };

    const handleError = () => (error: unknown) =>
    {
        const errorMessage = setError(error);
        notificationService.show({
            status: 'danger',
            title: t('err_save_item') as string,
            description: t(errorMessage) as string
        });
    };

    return (
        <section class="section_container">

            <AlertErrors
                errorData={errorAlert.errorData()}
                title="err_save"
                description="err_save_item"
            />

            <header class="section_header_container">
                <div class="has-permission">
                    <h1 class="section_title">{t('i_update')}</h1>
                </div>
                <div class="fallback">
                    <h1 class="section_title">{t('item')}</h1>
                </div>
            </header>

            <Show when={!props.loading} fallback={<GeneralLoader/>} keyed>
                <ItemForm
                    onError={handleError()}
                    onSubmit={props.onUpdate}
                    onSuccess={handleSuccess()}
                    itemSelected={props.itemSelected}
                />
            </Show>
        </section>
    );
};
export default ItemUpdate;
