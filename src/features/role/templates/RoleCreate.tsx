import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import { Button,
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
    SimpleOption,
    SimpleSelect } from '@hope-ui/solid';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, For, Show } from 'solid-js';
import { InferType } from 'yup';
import Title from '../../../atoms/Title';
import { states } from '../../../entities';
import { PermissionApi } from '../../auth/interfaces/permission';
import GeneralLoader from '../../shared/templates/GeneralLoader';
import preventEnterCharacter from '../../shared/utils/PreventEnterCharacter';
import roleSchema from '../validations/schemas/RoleSchema';

interface RoleCreateTemplateProps {
    permissionsList?: PermissionApi[];
    createAction: ( data: any ) => Promise<void>;
    loading: boolean;
}

const RoleCreate: Component<RoleCreateTemplateProps> = props =>
{
    const i18n = useI18n();
    const { t } = i18n;

    const {
        form,
        errors,
        isValid,
        setFields,
    // @ts-ignore
    } = createForm<InferType<typeof roleSchema>>( {
        extend: validator( { schema: roleSchema } ),
        onSubmit: async values =>
        {
            props.createAction( values );
        },
    } );

    return (
        <section class="px-4">
            <section class="flex flex-row justify-between items-center my-6">
                <Title class="dg-section-title" titleType="h1">
                    <Text message="r_create" />
                </Title>
            </section>

            <Show when={!props.loading} fallback={() => <GeneralLoader/>}>
                <form ref={form} class="flex flex-wrap text-sm">

                    <div class="dg-form-full-field-wrapper">
                        <FormControl required invalid={!!errors( 'name' )}>
                            <FormLabel for="name"><Text message="name"/></FormLabel>
                            <Input name="name" type="text" placeholder={t( 'a_enter_name' )}/>
                            <FormErrorMessage><Text message={errors( 'name' )[0]} /></FormErrorMessage>
                        </FormControl>
                    </div>

                    <div class="dg-form-full-field-wrapper">
                        <FormControl required invalid={!!errors( 'slug' )}>
                            <FormLabel for="slug"><Text message="slug"/></FormLabel>
                            <Input name="slug" type="text" placeholder={t( 'a_enter_slug' )} onKeyDown={preventEnterCharacter( [ 'Space' ] )}/>
                            <FormErrorMessage><Text message={errors( 'slug' )[0]} /></FormErrorMessage>
                        </FormControl>
                    </div>

                    <div class="dg-form-full-field-wrapper">
                        <FormControl required invalid={!!errors( 'permissions' )}>
                            <FormLabel for="permissions"><Text message="permissions"/></FormLabel>
                            <Select multiple
                                onChange={value => setFields( 'permissions', value )}
                            >
                                <SelectTrigger>
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
                            <FormErrorMessage><Text message={errors( 'permissions' )[0]} /></FormErrorMessage>
                        </FormControl>
                    </div>

                    <div class="dg-form-full-field-wrapper">
                        <FormControl required invalid={!!errors( 'enable' )}>
                            <FormLabel><Text message="enable"/></FormLabel>
                            <SimpleSelect
                                placeholder={<Text message="a_select_enable"/> as string}
                                onChange={value => setFields( 'enable', value )}
                            >
                                <For each={ states }>
                                    {/* @ts-ignore */}
                                    {item => <SimpleOption value={item.value}>{item.label}</SimpleOption>}
                                </For>
                            </SimpleSelect>
                            <FormErrorMessage>{errors( 'enable' )[0]}</FormErrorMessage>
                        </FormControl>
                    </div>

                    <div class="w-full mt-5 md:mr-5 flex flex-wrap md:justify-end gap-4">
                        <Button as={Link} colorScheme="neutral" href="/roles">
                            <Text message="a_close" />
                        </Button>
                        <Button type="submit" disabled={!isValid()}>
                            <Text message="a_save"/>
                        </Button>
                    </div>

                </form>
            </Show>

        </section>
    );
};

export default RoleCreate;
