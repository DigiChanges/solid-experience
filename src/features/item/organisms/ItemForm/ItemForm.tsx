import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import { Button, FormControl, FormControlError, FormControlLabel, Input } from '@hope-ui/core';
import { useNavigate } from 'solid-start';
import { InferType } from 'yup';
import {Component, createEffect, onMount, Show} from 'solid-js';

import useTranslation from '../../../shared/hooks/useTranslation';
import preventEnterCharacter from '../../../shared/utils/PreventEnterCharacter';
import { ItemApi, ItemPayload, ItemResponse } from '../../interfaces';
import itemSchema from '../../validations/schemas/ItemSchema';
import { darkInput, darkNeutralButton, darkPrimaryButtonWithBackground, placeholderInput } from '../../../shared/constants/hopeAdapter';
import formStyles from '../../../../styles/form.module.css';
import indexStyles from '../../../../styles/index.module.css';
import itemFormStyles from './itemForm.module.css';

interface ItemUpdateTemplateProps
{
    onError: (error: unknown) => void;
    onSubmit: (data: ItemPayload) => Promise<ItemResponse>;
    onSuccess: () => void;
    itemSelected?: ItemApi | undefined;
}

const ItemForm: Component<ItemUpdateTemplateProps> = (props) =>
{
    const { translate: t } = useTranslation();
    const navigate = useNavigate();

    const {
        data,
        errors,
        form,
        isSubmitting,
        isValid,
        setFields
        // @ts-ignore
    } = createForm<InferType<typeof itemSchema>>({
        initialValues: {
            name: '',
            type: 0
        },
        extend: validator({ schema: itemSchema }),
        onSuccess: props.onSuccess,
        onError: props.onError,
        onSubmit: values => props.onSubmit(values as ItemPayload)
    });

    onMount(() =>
    {
        if (props.itemSelected)
        {
            for (const key in props.itemSelected)
            {
                // @ts-ignore
                setFields(key, props.itemSelected[key]);
            }
        }
    });

    return (
        <form ref={form} class={formStyles.form_flex}>
            <div class={formStyles.field_wrapper}>
                <FormControl isRequired isInvalid={ !!errors('name') } >
                    <FormControlLabel class={formStyles.form_label} for="name" _dark={{ _after: { color: 'danger.300' } }}>
                        {t('name')}
                    </FormControlLabel>
                    <Input
                        _dark={darkInput}
                        _placeholder={placeholderInput}
                        autofocus
                        name="name"
                        type="text"
                        placeholder={t('a_enter_name') as string}
                        value={props.itemSelected?.name}
                    />
                    <Show when={errors('name')} keyed>
                        <FormControlError class={formStyles.error_message_block}>
                            {t(errors('name')?.[0] ?? '')}
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class={formStyles.field_wrapper}>
                <FormControl isRequired isInvalid={!!errors('type')}>
                    <FormControlLabel class={formStyles.form_label} for="type" _dark={{ _after: { color: 'danger.300' } }}>
                        {t('type')}
                    </FormControlLabel>
                    <Input
                        _dark={darkInput}
                        _placeholder={placeholderInput}
                        name="type"
                        type="number"
                        placeholder={t('a_enter_type') as string}
                        value={props.itemSelected?.type}
                        onKeyDown={preventEnterCharacter(['Space'])}
                    />
                    <Show when={errors('type')} keyed>
                        <FormControlError class={formStyles.error_message_block}>
                            {t(errors('type')?.[0] ?? '')}
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class={formStyles.update_save_buttons_container}>
                <div class={`${formStyles.button_full} ${indexStyles.hasPermission}`}>
                    <Button
                        _dark={darkNeutralButton}
                        class={formStyles.button_full}
                        onClick={() => navigate('/items/list')}
                        colorScheme="neutral"
                    >
                        {t('a_back')}
                    </Button>
                </div>
                <div class={formStyles.button_full}>
                    <Button
                        _dark={darkPrimaryButtonWithBackground}
                        class={formStyles.button_full}
                        type="submit"
                        isDisabled={!isValid()}
                        isLoading={isSubmitting()}
                        loadingText={t('a_submitting') as string}
                    >
                        {t('a_save')}
                    </Button>
                </div>
                <div class={`${formStyles.button_full} ${formStyles.fallback}`}>
                    <Button
                        _dark={darkNeutralButton}
                        class={itemFormStyles.button}
                        onClick={() => navigate('/items')}
                    >
                        {t('a_back')}
                    </Button>
                </div>
            </div>

        </form>
    );
};
export default ItemForm;
