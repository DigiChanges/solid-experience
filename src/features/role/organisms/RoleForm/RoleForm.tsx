import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import { Button, FormControl, FormControlError, FormControlLabel, Input } from '@hope-ui/core';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, onMount, Show } from 'solid-js';
import { InferType } from 'yup';
import { PermissionApi } from '../../../auth/interfaces/permission';
import preventEnterCharacter from '../../../shared/utils/PreventEnterCharacter';
import { RoleApi, RolePayload, RoleResponse } from '../../interfaces';
import roleSchema from '../../validations/schemas/RoleSchema';
import { MultiSelect } from '../../../shared/molecules/Select/Select';
import Switch from '../../../shared/molecules/Switch/Switch';


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
        data,
        errors,
        form,
        isSubmitting,
        isValid,
        setFields,
        // @ts-ignore
    } = createForm<InferType<typeof roleSchema>>( {
        initialValues: {
            permissions: [],
            enable: true,
        },
        extend: validator( { schema: roleSchema } ),
        onSuccess: props.onSuccess,
        onError: props.onError,
        onSubmit: values => props.onSubmit( values as RolePayload ),
    } );

    const handleSelect = ( field: keyof InferType<typeof roleSchema> ) => ( value: string[] | boolean ) =>
    {
        setFields( field, value, true );
    };

    const handleMultiSelect = ( field: keyof InferType<typeof roleSchema> ) => ( value: any ) =>
    {
        const valuesArray: string[] = Array.from( value );
        setFields( field, valuesArray, true );
    };

    onMount( () =>
    {
        if ( props.roleSelected )
        {
            for ( const key in props.roleSelected )
            {
                // @ts-ignore
                setFields( key, props.roleSelected[key] );
            }
        }
    } );

    return (
        <form ref={form} class="form_flex">
            <div class="field_wrapper">
                <FormControl isRequired isInvalid={ !!errors( 'name' ) } >
                    <FormControlLabel for="name"><Text message="name"/></FormControlLabel>
                    <Input autofocus name="name" type="text" placeholder={t( 'a_enter_name' ) as string} value={props.roleSelected?.name} />
                    <Show when={errors( 'name' )} keyed>
                        <FormControlError><Text message={errors( 'name' )![0]} /></FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'slug' )}>
                    <FormControlLabel for="slug"><Text message="slug"/></FormControlLabel>
                    <Input name="slug" type="text" placeholder={t( 'a_enter_slug' ) as string} value={props.roleSelected?.slug} onKeyDown={preventEnterCharacter( [ 'Space' ] )}/>
                    <Show when={errors( 'slug' )} keyed>
                        <FormControlError><Text message={errors( 'slug' )![0]} /></FormControlError>
                    </Show>
                </FormControl>
            </div>
            <div class="field_wrapper">
                <FormControl id="permissions" isRequired isInvalid={!!errors( 'permissions' )}>
                    <FormControlLabel for="permissions"><Text message="permissions"/></FormControlLabel>
                    <MultiSelect
                        name={'permissions'}
                        options={props.permissionsList}
                        placeholder={'a_enter_permissions'}
                        value={data().permissions}
                        onChange={handleMultiSelect( 'permissions' )}
                        valueProperty={'id'}
                        labelProperty={'name'}
                        groupSelector={'permissions'}
                    />
                    <FormControlError><Text message={errors( 'permissions' ) && errors( 'permissions' )![0] || ''} /></FormControlError>
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'enable' )}>
                    <FormControlLabel><Text message="enable"/></FormControlLabel>
                    <Switch
                        name={'enable'}
                        value={data().enable}
                        onChange={handleSelect( 'enable' )}
                    />
                    <Show when={errors( 'enable' )} keyed>
                        <FormControlError><Text message={errors( 'enable' )![0] || ''}/></FormControlError>
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
                    <Button class="button_full" type="submit" isDisabled={!isValid()} isLoading={isSubmitting()} loadingText={<Text message="a_submitting"/> as string}>
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
