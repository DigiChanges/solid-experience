import { notificationService } from '../../shared/molecules/Toast/Toast';
import { useNavigate } from 'solid-start';
import useTranslation from '../../shared/hooks/useTranslation';
import { Component } from 'solid-js';
import createAlert from '../../shared/hooks/createAlert';
import AlertErrors from '../../shared/molecules/AlertErrors/AlertErrors';
import { ItemPayload, ItemResponse } from '../interfaces';
import ItemForm from '../organisms/ItemForm/ItemForm';

interface ItemCreateTemplateProps
{
    onCreate: (data: ItemPayload) => Promise<ItemResponse>;
}

const ItemCreate: Component<ItemCreateTemplateProps> = props =>
{
    const { translate: t } = useTranslation();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show({
            status: 'success',
            title: t('i_created') as string
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
                <h1 class="section_title">{t('i_create')}</h1>
            </header>

            <ItemForm
                onError={handleError()}
                onSubmit={props.onCreate}
                onSuccess={handleSuccess()}
            />

        </section>
    );
};

export default ItemCreate;
