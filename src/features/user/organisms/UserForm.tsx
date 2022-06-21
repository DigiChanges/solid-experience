import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Radio,
    RadioGroup,
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
    SimpleSelect,
    Switch
} from '@hope-ui/solid';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, For, Show } from 'solid-js';
import { InferType } from 'yup';
import { country, userDocumentTypeOptions } from '../../../entities';
import { PermissionApi } from '../../auth/interfaces/permission';
import { RoleApi } from '../../role/interfaces';
import { UserApi, UserPayload, UserResponse } from '../interfaces';
import userCreateValidationSchema from '../validations/schemas/userCreateValidationSchema';
import userUpdateValidationSchema from '../validations/schemas/userUpdateValidationSchema';

interface UserUpdateTemplateProps
{
    loading: boolean;
    onError: ( error: unknown ) => void;
    onSubmit: ( data: UserPayload ) => Promise<UserResponse>;
    onSuccess: () => void;
    permissionsList?: PermissionApi[];
    userSelected?: UserApi | undefined;
    userPermission: Record<string, string>;
    rolesList?: RoleApi[];
}

const UserForm: Component<UserUpdateTemplateProps> = ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;
    const handleSelect = () => ( value: string[] ) =>
    {
        setFields( 'permissions', value );
        setTouched( 'permissions', true );
    };
    const handleSelectRoles = () => ( value: string[] ) =>
    {
        setFields( 'roles', value );
        setTouched( 'roles', true );
    };

    const typeSchema = props.userSelected?.id ? userUpdateValidationSchema : userCreateValidationSchema;
    const {
        errors,
        form,
        isValid,
        setFields,
        setTouched,
        // @ts-ignore
    } = createForm<InferType<typeof typeSchema>>( {
        initialValues: { permissions: props.userSelected?.permissions || [], roles: props.userSelected?.roles || [], documentType: props.userSelected?.documentType || '', country: props.userSelected?.country || ''},
        extend: validator( { schema: typeSchema } ),
        onSuccess: props.onSuccess,
        onError: props.onError,
        onSubmit: values => props.onSubmit( values as UserPayload ),
    } );

    return (
        <form ref={form} class="flex flex-wrap text-sm">
            <div class="flex flex-wrap text-sm">
                <h2 class="w-full text-xs text-bold uppercase border-b-2 border-gray-800 mb-2">
                    <Text message="a_personal_information" />
                </h2>
                <div class="dg-form-full-field-wrapper">
                    <FormControl required invalid={!!errors( 'firstName' )}>
                        <FormLabel for="firstName"><Text message="first_name"/></FormLabel>
                        <Input name="firstName" type="text" placeholder={t( 'a_enter_first_name' )} value={props.userSelected?.firstName}/>
                        <FormErrorMessage><Text message={errors( 'first_name' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>
                <div class="dg-form-full-field-wrapper">
                    <FormControl required invalid={!!errors( 'lastName' )}>
                        <FormLabel for="lastName"><Text message="last_name"/></FormLabel>
                        <Input name="lastName" type="text" placeholder={t( 'a_enter_last_name' )} value={props.userSelected?.lastName}/>
                        <FormErrorMessage><Text message={errors( 'last_name' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>

                <div class="dg-form-full-field-wrapper w-full ">
                    <FormLabel><Text message="documentType"/></FormLabel>
                    <div class="w-full flex justify-between">
                        <div class="w-1/4">
                            <FormControl required invalid={!!errors( 'documentType' )}>
                                <SimpleSelect
                                    value={props.userSelected?.documentType}
                                    placeholder={<Text message="type_id"/> as string}
                                    onChange={value => setFields( 'documentType', value )}
                                >
                                    <For each={ userDocumentTypeOptions }>
                                        {/* @ts-ignore */}
                                        {item => <SimpleOption value={item.value}>{item.label}</SimpleOption>}
                                    </For>
                                </SimpleSelect>
                                <FormErrorMessage>{errors( 'documentType' )[0]}</FormErrorMessage>
                            </FormControl>
                        </div>
                        <div class="w-3/4">
                            <FormControl required invalid={!!errors( 'documentNumber' )}>
                                <Input name="documentNumber" type="text" placeholder={t( 'a_enter_id_number' )} value={props.userSelected?.documentNumber}/>
                                <FormErrorMessage><Text message={errors( 'documentNumber' )[0]} /></FormErrorMessage>
                            </FormControl>
                        </div>
                    </div>
                </div>

                <div class="dg-form-full-field-wrapper">
                    <FormControl required invalid={!!errors( 'gender' )}>
                        <FormLabel for="gender"><Text message="gender"/></FormLabel>
                        <RadioGroup defaultValue="1" value={props.userSelected?.gender}>
                            <HStack spacing="$4" class="flex justify-between items-center">
                        F<Radio name="gender" id="gender-f" value="fame" class="input-addon-container flex-grow"></Radio>
                        M<Radio name="gender" id="gender-m" value="male" class="input-addon-container flex-grow"></Radio>
                                {t( 'a_gender_other' )} <Radio name="gender" id="gender-o" value="other" class="input-addon-container "></Radio>
                            </HStack>
                        </RadioGroup>
                        <FormErrorMessage><Text message={errors( 'gender' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>

                <div class="dg-form-full-field-wrapper">
                    <FormControl required invalid={!!errors( 'birthday' )}>
                        <FormLabel for="birthday"><Text message="birthday"/></FormLabel>
                        <Input name="birthday" type="date" placeholder={t( 'a_choose_birthday' )} value={props.userSelected?.birthday}/>
                        <FormErrorMessage><Text message={errors( 'birthday' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>
                <div class="dg-form-full-field-wrapper">
                    <FormControl required invalid={!!errors( 'enable' )}>
                        <FormLabel><Text message="enable"/></FormLabel>
                        <Switch class="block ml-3 mt-1" name="enable" defaultChecked={props.userSelected?.enable}></Switch>
                        <FormErrorMessage><Text message={errors( 'enable' )[0]}/></FormErrorMessage>
                    </FormControl>
                </div>
                <div class="dg-form-full-field-wrapper">
                    <FormControl required invalid={!!errors( 'country' )}>
                        <FormLabel><Text message="country"/></FormLabel>
                        <SimpleSelect
                            placeholder={<Text message="a_select_enable"/> as string}
                            onChange={value => setFields( 'country', value )}
                            value={props.userSelected?.country}
                        >
                            <For each={ country }>
                                {/* @ts-ignore */}
                                {item => <SimpleOption value={item.value}>{item.label}</SimpleOption>}
                            </For>
                        </SimpleSelect>
                        <FormErrorMessage>{errors( 'country' )[0]}</FormErrorMessage>
                    </FormControl>
                </div>
                <div class="dg-form-full-field-wrapper">
                    <FormControl required invalid={!!errors( 'address' )}>
                        <FormLabel for="address"><Text message="address"/></FormLabel>
                        <Input name="address" type="text" placeholder={t( 'a_your_address' )} value={props.userSelected?.address}/>
                        <FormErrorMessage><Text message={errors( 'address' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>
                <span class="w-full mt-5">
                    <Text message="a_contact_information" />
                </span>
                <div class="dg-form-full-field-wrapper">
                    <FormControl required invalid={!!errors( 'email' )}>
                        <FormLabel for="email"><Text message="email"/></FormLabel>
                        <Input name="email" type="text" placeholder={t( 'a_your_email' )} value={props.userSelected?.email}/>
                        <FormErrorMessage><Text message={errors( 'email' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>
                <div class="dg-form-full-field-wrapper">
                    <FormControl required invalid={!!errors( 'phone' )}>
                        <FormLabel for="phone"><Text message="phone"/></FormLabel>
                        <Input name="phone" type="text" placeholder={t( 'a_enter_phone' )} value={props.userSelected?.phone}/>
                        <FormErrorMessage><Text message={errors( 'phone' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>
                <Show when={!props.userSelected?.id}>
                    <div class="w-full mb-5 pr-2">
                        <FormControl required invalid={!!errors( 'password' )}>
                            <FormLabel for="password"><Text message="password"/></FormLabel>
                            <Input name="password" type="password" placeholder={t( 'a_your_password' )} />
                            <FormErrorMessage><Text message={errors( 'password' )[0]} /></FormErrorMessage>
                        </FormControl>
                    </div>
                    <div class="w-full mb-5 pr-2">
                        <FormControl required invalid={!!errors( 'passwordConfirmation' )}>
                            <FormLabel for="passwordConfirmation"><Text message="confirm_password"/></FormLabel>
                            <Input name="passwordConfirmation" type="password" placeholder={t( 'a_repeat_password' )}/>
                            <FormErrorMessage><Text message={errors( 'confirm_password' )[0]} /></FormErrorMessage>
                        </FormControl>
                    </div>
                </Show>
                <div class="dg-form-full-field-wrapper">
                    <FormControl id="permissions" required invalid={!!errors( 'permissions' )}>
                        <FormLabel for="permissions"><Text message="permissions"/></FormLabel>
                        <Select multiple
                            value={props.userSelected?.permissions}
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
                    <FormControl id="roles" required invalid={!!errors( 'roles' )}>
                        <FormLabel for="roles"><Text message="roles"/></FormLabel>
                        <Select multiple
                            value={props.userSelected?.roles}
                            onChange={handleSelectRoles()}
                        >
                            <SelectTrigger
                                onBlur={() => setTouched( 'roles', true )}
                            >
                                <SelectPlaceholder>
                                    <Text message="a_select_roles"/>
                                </SelectPlaceholder>
                                <SelectValue />
                                <SelectIcon />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectListbox>
                                    <SelectOptGroup>
                                        <For each={props.rolesList}>
                                            {rol => (
                                                <SelectOption
                                                    value={rol.slug}
                                                    rounded="$none"
                                                    fontSize="$sm"
                                                    _active={{ bg: '$warning3', color: '$warning11' }}
                                                    _selected={{ bg: '$warning9', color: 'white' }}
                                                >
                                                    <SelectOptionText _groupSelected={{ fontWeight: '$medium' }}>
                                                        {rol.slug}
                                                    </SelectOptionText>
                                                    <SelectOptionIndicator/>
                                                </SelectOption>
                                            )}
                                        </For>
                                    </SelectOptGroup>
                                </SelectListbox>
                            </SelectContent>
                        </Select>
                        <FormErrorMessage><Text message={errors( 'roles' ) && errors( 'roles' )[0] || 'loading'} /></FormErrorMessage>
                    </FormControl>
                </div>
                <div class="w-full mt-5 md:mr-5 flex flex-wrap md:justify-end gap-4">
                    {/* <Link href="/users" class="px-10 py-2 dg-secondary-button">
                    <Text message="a_close" />
                </Link>
                <ButtonConfirm type="submit">
                    <Text message="a_save"/>
                </ButtonConfirm> */}
                    <Button as={Link} colorScheme="neutral" href="/users">
                        <Text message="a_close" />
                    </Button>
                    <Button type="submit" disabled={!isValid()}>
                        <Text message="a_save"/>
                    </Button>
                </div>
            </div>
        </form>
    );
};
export default UserForm;
