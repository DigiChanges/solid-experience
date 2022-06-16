import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Select, SelectContent, SelectIcon, SelectLabel, SelectListbox, SelectOptGroup, SelectOption, SelectOptionIndicator, SelectOptionText, SelectPlaceholder, SelectTrigger, SelectValue, SimpleOption, SimpleSelect } from '@hope-ui/solid';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, createMemo, For, Show } from 'solid-js';
import Title from '../../../atoms/Title';
import { country, states } from '../../../entities';
import { PermissionApi } from '../../auth/interfaces/permission';
import { RoleApi } from '../../role/interfaces';
import GeneralLoader from '../../shared/templates/GeneralLoader';
import { SelectTransform } from '../../shared/utils/SelectTransform';
import { UserApi } from '../interfaces';
import userUpdateValidationSchema from '../validations/schemas/userUpdateValidationSchema';

interface UserUpdateTemplateProps
{
    permissionsList: PermissionApi[] | undefined;
    rolesList: RoleApi[] | undefined;
    idSelected: string;
    userSelected?: UserApi;
    onUpdate: ( data: any ) => Promise<void>;
    loading: boolean;
}

const UserUpdate: Component<UserUpdateTemplateProps> = ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;
    const groupedPermissions = createMemo( () => SelectTransform.getPermissionsGroupedToSelectArray( props?.permissionsList ) );

    const {
        form,
        errors,
        isValid,
        setFields,
    // @ts-ignore
    } = createForm<InferType<typeof userUpdateValidationSchema>>( {
        extend: validator( { schema: userUpdateValidationSchema } ),
        onSubmit: async values =>
        {
            props.onUpdate( values );
        },
    } );

    // const roleOptions = createMemo( () =>
    //     SelectTransform.getOptionsObjectArray<RoleApi>(
    //         props.rolesList,
    //         ( item ) => item.name,
    //         ( item ) => item.id
    //     )
    // );

    // const statesOptions = createMemo( () =>
    //     SelectTransform.getOptionsObjectArray<SelectValueOption>(
    //         states,
    //         ( item ) => t( item.label ) as string,
    //         ( item ) => item.value
    //     )
    // );
    // const currentUserRoles = createMemo( () =>
    //     SelectTransform.getOptionsObjectArray<RoleApi>(
    //         props.userSelected?.roles,
    //         ( item ) => item.name,
    //         ( item ) => item.id
    //     )
    // );

    // const getCurrentCountry = createMemo( () => ( { ...country.find( countryOption => countryOption.value === props.userSelected?.country ) } ) );


    return (
        <section class="px-4">
            <section class="flex flex-row justify-between items-center my-6">
                <Title class="dg-section-title" titleType="h1">
                    <div data-parent="usersUpdate">
                        <div class="has-permission">
                            <Text message="u_update" />
                        </div>
                        <div class="fallback">
                            <Text message="User" />
                        </div>
                    </div>
                </Title>
            </section>

            <Show when={!props.loading} fallback={() => <GeneralLoader/>}>

                <form ref={form} class="flex flex-wrap text-sm">

                    <span class="w-full text-xs text-bold"><Text message="a_personal_information" /></span>

                    <div class="dg-form-full-field-wrapper">
                        <FormControl required invalid={!!errors( 'firstName' )}>
                            <FormLabel for="firstName"><Text message="firstName"/></FormLabel>
                            <Input name="firstName" autoFocus type="text" placeholder={t( 'a_enter_first_name' )} value={props.userSelected?.firstName}/>
                            <FormErrorMessage><Text message={errors( 'firstName' )[0]} /></FormErrorMessage>
                        </FormControl>
                    </div>

                    <div class="dg-form-full-field-wrapper">
                        <FormControl required invalid={!!errors( 'lastName' )}>
                            <FormLabel for="lastName"><Text message="lastName"/></FormLabel>
                            <Input name="lastName" type="text" placeholder={t( 'a_enter_last_name' )} value={props.userSelected?.lastName}/>
                            <FormErrorMessage><Text message={errors( 'lastName' )[0]} /></FormErrorMessage>
                        </FormControl>
                    </div>

                    <div class="dg-form-full-field-wrapper">
                        <FormControl required invalid={!!errors( 'country' )}>
                            <FormLabel><Text message="country"/></FormLabel>
                            <SimpleSelect
                                value={props.userSelected?.country}
                                placeholder={<Text message="a_select_country"/> as string}
                                onChange={value => setFields( 'country', value )}
                            >
                                <For each={ country }>
                                    {/* @ts-ignore */}
                                    {item => <SimpleOption
                                        value={item.value}
                                        rounded="$none"
                                        fontSize="$sm"
                                        _active={{ bg: '$warning3', color: '$warning11' }}
                                        _selected={{ bg: '$warning9', color: 'white' }}
                                    >{item.label}</SimpleOption>}
                                </For>
                            </SimpleSelect>
                            <FormErrorMessage>{errors( 'country' )[0]}</FormErrorMessage>
                        </FormControl>
                    </div>

                    <div class="dg-form-full-field-wrapper">
                        <FormControl required invalid={!!errors( 'address' )}>
                            <FormLabel for="address"><Text message="address"/></FormLabel>
                            <Input name="address" type="text" placeholder={t( 'a_enter_last_name' )} value={props.userSelected?.address}/>
                            <FormErrorMessage><Text message={errors( 'address' )[0]} /></FormErrorMessage>
                        </FormControl>
                    </div>

                    <div class="dg-form-full-field-wrapper">
                        <FormControl required invalid={!!errors( 'enable' )}>
                            <FormLabel><Text message="enable"/></FormLabel>
                            <SimpleSelect
                                value={props.userSelected?.enable}
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

                    <span class="w-full mt-5">
                        <Text message="a_contact_information" />
                    </span>

                    <div class="dg-form-full-field-wrapper">
                        <FormControl required invalid={!!errors( 'email' )}>
                            <FormLabel for="email"><Text message="email"/></FormLabel>
                            <Input name="email" autoFocus type="email" placeholder={t( 'a_enter_email' )} value={props.userSelected?.email}/>
                            <FormErrorMessage><Text message={errors( 'email' )[0]} /></FormErrorMessage>
                        </FormControl>
                    </div>

                    <div class="dg-form-full-field-wrapper">
                        <FormControl required invalid={!!errors( 'phone' )}>
                            <FormLabel for="phone"><Text message="phone"/></FormLabel>
                            <Input name="phone" autoFocus type="phone" placeholder={t( 'a_enter_phone' )} value={props.userSelected?.phone}/>
                            <FormErrorMessage><Text message={errors( 'phone' )[0]} /></FormErrorMessage>
                        </FormControl>
                    </div>

                    <div class="dg-form-full-field-wrapper">
                        <FormControl required invalid={!!errors( 'permissions' )}>
                            <FormLabel for="permissions"><Text message="permissions"/></FormLabel>
                            <Select multiple
                                value={props.userSelected?.permissions}
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
                        <FormControl required invalid={!!errors( 'roles' )}>
                            <FormLabel for="roles"><Text message="roles"/></FormLabel>
                            <Select multiple
                                value={props.userSelected?.roles}
                                onChange={value => setFields( 'roles', value )}
                            >
                                <SelectTrigger>
                                    <SelectPlaceholder>
                                        <Text message="a_select_roles"/>
                                    </SelectPlaceholder>
                                    <SelectValue />
                                    <SelectIcon />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectListbox>
                                        <For each={props.rolesList}>
                                            {role => (
                                                <SelectOption
                                                    value={role.id}
                                                    rounded="$none"
                                                    fontSize="$sm"
                                                    _active={{ bg: '$warning3', color: '$warning11' }}
                                                    _selected={{ bg: '$warning9', color: 'white' }}
                                                >
                                                    <SelectOptionText _groupSelected={{ fontWeight: '$medium' }}>{role.name}</SelectOptionText>
                                                    <SelectOptionIndicator/>
                                                </SelectOption>
                                            )}
                                        </For>
                                    </SelectListbox>
                                </SelectContent>
                            </Select>
                            <FormErrorMessage><Text message={errors( 'roles' )[0]} /></FormErrorMessage>
                        </FormControl>
                    </div>

                    <div class="w-full mt-5 md:mr-5 flex flex-wrap md:justify-end gap-4" data-parent="usersUpdate">
                        <div class="w-full md:w-32 m-0 has-permission">
                            <Button as={Link} href="/users" colorScheme="neutral">
                                <Text message="a_close" />
                            </Button>
                        </div>
                        <div class="w-full md:w-32 m-0 has-permission">
                            <Button type="submit" disabled={!isValid()}>
                                <Text message="a_save"/>
                            </Button>
                        </div>
                        <div class="fallback w-full md:w-32">
                            <Button as={Link} href="/users">
                                <Text message="a_close" />
                            </Button>
                        </div>
                    </div>

                </form>
            </Show>
        </section>
    );
};

export default UserUpdate;
