import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    SelectContent,
    SelectIcon,
    SelectLabel,
    SelectListbox,
    SelectOptGroup,
    SelectOption,
    SelectOptionIndicator,
    SelectOptionText,
    SelectPlaceholder,
    SelectTrigger,
    SelectValue,
    Switch
} from '@hope-ui/solid';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, For } from 'solid-js';
import { InferType } from 'yup';
import { PermissionApi } from '../../auth/interfaces/permission';
import preventEnterCharacter from '../../shared/utils/PreventEnterCharacter';
import { RoleApi, RolePayload, RoleResponse } from '../interfaces';
import roleSchema from '../validations/schemas/RoleSchema';

interface RoleUpdateTemplateProps
{
    onError: ( error: unknown ) => void;
    onSubmit: ( data: RolePayload ) => Promise<RoleResponse>;
    onSuccess: () => void;
    permissionsList?: PermissionApi[];
    roleSelected?: RoleApi | undefined;
    userPermission: Record<string, string>;
}

const RoleForm: Component<RoleUpdateTemplateProps> = ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;

    const handleSelect = () => ( value: string[] ) =>
    {
        setFields( 'permissions', value );
        setTouched( 'permissions', true );
    };

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

    return (
        <form ref={form} class="flex flex-wrap text-sm">

            <div class="dg-form-full-field-wrapper">
                <FormControl required invalid={!!errors( 'name' )}>
                    <FormLabel for="name"><Text message="name"/></FormLabel>
                    <Input name="name" type="text" placeholder={t( 'a_enter_name' )} value={props.roleSelected?.name} />
                    <FormErrorMessage><Text message={errors( 'name' )[0]} /></FormErrorMessage>
                </FormControl>
            </div>

            <div class="dg-form-full-field-wrapper">
                <FormControl required invalid={!!errors( 'slug' )}>
                    <FormLabel for="slug"><Text message="slug"/></FormLabel>
                    <Input name="slug" type="text" placeholder={t( 'a_enter_slug' )} value={props.roleSelected?.slug} onKeyDown={preventEnterCharacter( [ 'Space' ] )}/>
                    <FormErrorMessage><Text message={errors( 'slug' )[0]} /></FormErrorMessage>
                </FormControl>
            </div>

            <div class="dg-form-full-field-wrapper">
                <FormControl id="permissions" required invalid={!!errors( 'permissions' )}>
                    <FormLabel for="permissions"><Text message="permissions"/></FormLabel>
                    <Select multiple
                        value={props.roleSelected?.permissions}
                        onChange={handleSelect()}
                    >
                        <SelectTrigger
                            onBlur={() => setTouched( 'permissions', true )}
                        >
                            <SelectPlaceholder>
                                <Text message="a_enter_permissions"/>
                            </SelectPlaceholder>
                            <SelectValue />
                            <SelectIcon />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectListbox>
                                <SelectOptGroup>
                                    <For each={props.permissionsList}>
                                        {permissionGroup => (
                                            <>
                                                <SelectLabel>{permissionGroup.group}</SelectLabel>
                                                <For each={permissionGroup.permissions}>
                                                    {permission => (
                                                        <SelectOption
                                                            value={permission}
                                                            rounded="$none"
                                                            fontSize="$sm"
                                                            _active={{ bg: '$warning3', color: '$warning11' }}
                                                            _selected={{ bg: '$warning9', color: 'white' }}
                                                        >
                                                            <SelectOptionText _groupSelected={{ fontWeight: '$medium' }}>
                                                                {permission}
                                                            </SelectOptionText>
                                                            <SelectOptionIndicator/>
                                                        </SelectOption>
                                                    )}
                                                </For>
                                            </>
                                        )}
                                    </For>
                                </SelectOptGroup>
                            </SelectListbox>
                        </SelectContent>
                    </Select>
                    <FormErrorMessage><Text message={errors( 'permissions' ) && errors( 'permissions' )[0] || 'loading'} /></FormErrorMessage>
                </FormControl>
            </div>

            <div class="dg-form-full-field-wrapper">
                <FormControl required invalid={!!errors( 'enable' )}>
                    <FormLabel><Text message="enable"/></FormLabel>
                    <Switch class="block ml-3 mt-1" name="enable" defaultChecked={props.roleSelected?.enable}></Switch>
                    <FormErrorMessage><Text message={errors( 'enable' )[0]}/></FormErrorMessage>
                </FormControl>
            </div>

            <div class="w-full mt-5 md:mr-5 flex flex-wrap md:justify-end gap-4" data-parent={props.userPermission.submit}>
                <div class="w-full md:w-32 m-0 has-permission">
                    <Button as={Link} href="/roles" colorScheme="neutral">
                        <Text message="a_close" />
                    </Button>
                </div>
                <div class="w-full md:w-32 m-0 has-permission">
                    <Button type="submit" disabled={!isValid()} loading={isSubmitting()} loadingText={<Text message="a_submitting"/> as string}>
                        <Text message="a_save"/>
                    </Button>
                </div>
                <div class="fallback w-full md:w-32">
                    <Button as={Link} href="/roles">
                        <Text message="a_close" />
                    </Button>
                </div>
            </div>

        </form>
    );
};
export default RoleForm;
