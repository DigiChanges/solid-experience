import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import { Button, FormControl, FormControlError, FormControlLabel, Input } from '@hope-ui/core';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, For, Show } from 'solid-js';
import { InferType } from 'yup';
import { PermissionApi } from '../../../auth/interfaces/permission';
import preventEnterCharacter from '../../../shared/utils/PreventEnterCharacter';
import { RoleApi, RolePayload, RoleResponse } from '../../interfaces';
import roleSchema from '../../validations/schemas/RoleSchema';
import { MultiSelect, As, Switch } from '@kobalte/core';

enum RequiredPermission {
    submit='submit'
}

interface RoleUpdateTemplateProps
{
    onError: ( error: unknown ) => void;
    onSubmit: ( data: RolePayload ) => Promise<RoleResponse>;
    onSuccess: () => void;
    permissionsList?: PermissionApi[];
    roleSelected?: RoleApi | undefined;
    requiredPermission: Record<RequiredPermission, string>;
}

const RoleForm: Component<RoleUpdateTemplateProps> = ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;

    const {
        errors,
        form,
        isSubmitting,
        isValid,
        setFields,
        setTouched,
        // @ts-ignore
    } = createForm<InferType<typeof roleSchema>>( {
        initialValues: { permissions: props.roleSelected?.permissions || [] },
        extend: validator( { schema: roleSchema } ),
        onSuccess: props.onSuccess,
        onError: props.onError,
        onSubmit: values => props.onSubmit( values as RolePayload ),
    } );

    const handleSelect = ( field: keyof InferType<typeof roleSchema> ) => ( value: any ) =>
    {
        const valuesArray = Array.from( value );
        setFields( field, valuesArray );
        setTouched( field, true );
    };

    const handleCheck = ( field: keyof InferType<typeof roleSchema> ) => ( value: boolean ) =>
    {
        setFields( field, value );
        setTouched( field, true );
    };

    return (
        <form ref={form} class="form_flex">
            <div class="field_wrapper">
                <FormControl isRequired isInvalid={ !!errors( 'name' ) } >
                    <FormControlLabel for="name"><Text message="name"/></FormControlLabel>
                    <Input autofocus name="name" type="text" placeholder={t( 'a_enter_name' ) as string} value={props.roleSelected?.name} />
                    <Show when={errors( 'name' )} keyed>
                        <FormControlError><Text message={errors( 'name' )[0]} /></FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'slug' )}>
                    <FormControlLabel for="slug"><Text message="slug"/></FormControlLabel>
                    <Input name="slug" type="text" placeholder={t( 'a_enter_slug' ) as string} value={props.roleSelected?.slug} onKeyDown={preventEnterCharacter( [ 'Space' ] )}/>
                    <Show when={errors( 'slug' )}>
                        <FormControlError><Text message={errors( 'slug' )[0]} /></FormControlError>
                    </Show>
                </FormControl>
            </div>
            <div class="field_wrapper">
                <FormControl id="permissions" isRequired isInvalid={!!errors( 'permissions' )}>
                    <MultiSelect.Root
                        class={'w-full'}
                        onValueChange={handleSelect( 'permissions' )}
                        value={props.roleSelected?.permissions}
                        options={props.permissionsList}
                        optionGroupChildren="permissions"
                        placeholder={<Text message="a_enter_permissions"/>}
                        valueComponent={props =>
                            <>
                                <div>
                                    <For each={props.items}>
                                        {item =>
                                            <span>
                                                {item.rawValue}
                                                <button
                                                    onPointerDown={e => e.stopPropagation()}
                                                    onClick={() => props.remove( item )}
                                                >X</button>
                                            </span>
                                        }
                                    </For>
                                </div>
                                <button onPointerDown={e => e.stopPropagation()} onClick={props.clear}>X</button>
                            </>
                        }
                        itemComponent={props =>
                            <MultiSelect.Item item={props.item} class="select__item">
                                <MultiSelect.ItemLabel>{props.item.rawValue}</MultiSelect.ItemLabel>
                            </MultiSelect.Item>
                        }
                        sectionComponent={props => <MultiSelect.Section>{props.section.rawValue.group}</MultiSelect.Section>}
                    >
                        <MultiSelect.Trigger class="select__trigger w-full" aria-label="Fruits" asChild onBlur={() => setTouched( 'permissions', true )}>
                            <As component="div">
                                <MultiSelect.Value class="select__value"/>
                                <MultiSelect.Icon class="select__icon">
                                    +
                                </MultiSelect.Icon>
                            </As>
                        </MultiSelect.Trigger>
                        <MultiSelect.Portal>
                            <MultiSelect.Content class="select__content">
                                <MultiSelect.Listbox class="select__listbox"/>
                            </MultiSelect.Content>
                        </MultiSelect.Portal>
                    </MultiSelect.Root>
                    <FormControlError><Text message={errors( 'permissions' ) && errors( 'permissions' )[0] || 'loading'} /></FormControlError>
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'enable' )}>
                    <Switch.Root name="enable" class="switch" defaultIsChecked={props.roleSelected?.id ? props.roleSelected?.enable : true} onCheckedChange={handleCheck( 'enable' )}>
                        <Switch.Label class="switch__label"><FormControlLabel><Text message="enable"/></FormControlLabel></Switch.Label>
                        <Switch.Input class="switch__input" />
                        <Switch.Control class="switch__control">
                            <Switch.Thumb class="switch__thumb"/>
                        </Switch.Control>
                    </Switch.Root>
                    <Show when={errors( 'enable' )}>
                        <FormControlError><Text message={errors( 'enable' )[0]}/></FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class="update_save_buttons_container" data-parent={props.requiredPermission.submit}>
                <div class="button_full has-permission">
                    <Button class="button_full" as={Link} href="/roles" colorScheme="neutral">
                        <Text message="a_close" />
                    </Button>
                </div>
                <div class="button_full has-permission ">
                    <Button class="button_full" type="submit" disabled={!isValid()} loading={isSubmitting()} loadingText={<Text message="a_submitting"/> as string}>
                        <Text message="a_save"/>
                    </Button>
                </div>
                <div class="button_full fallback">
                    <Button class="w-full" as={Link} href="/roles">
                        <Text message="a_close" />
                    </Button>
                </div>
            </div>

        </form>
    );
};
export default RoleForm;
