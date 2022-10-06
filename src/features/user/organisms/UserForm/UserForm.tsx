import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
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
    Switch
} from '@hope-ui/solid';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, createMemo, For, Show } from 'solid-js';
import { InferType } from 'yup';
import { country, userDocumentTypeOptions } from '../../../../entities';
import { PermissionApi } from '../../../auth/interfaces/permission';
import { RoleApi } from '../../../role/interfaces';
import { UserApi, UserPayload } from '../../interfaces';
import userCreateValidationSchema from '../../validations/schemas/userCreateValidationSchema';
import userUpdateValidationSchema from '../../validations/schemas/userUpdateValidationSchema';

enum RequiredPermission {
    submit='submit'
}

interface UserUpdateTemplateProps
{
    onError: ( error: unknown ) => void;
    onSubmit: ( data: UserPayload ) => Promise<void>;
    onSuccess: () => void;
    permissionsList?: PermissionApi[];
    userSelected?: UserApi | undefined;
    requiredPermission: Record<RequiredPermission, string>;
    rolesList?: RoleApi[];
}

const UserForm: Component<UserUpdateTemplateProps> = ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;

    const rolesSelected = createMemo( () => { return props.userSelected?.roles?.map( role => role.id ) || []; } );

    const userSchema = props.userSelected?.id ? userUpdateValidationSchema : userCreateValidationSchema;
    const {
        errors,
        form,
        isSubmitting,
        isValid,
        setFields,
        setTouched,
        // @ts-ignore
    } = createForm<InferType<typeof userSchema>>( {
        initialValues: {
            permissions: props.userSelected?.permissions || [],
            roles: rolesSelected(),
            documentType: props.userSelected?.documentType || '',
            country: props.userSelected?.country || '',
        },
        extend: validator( { schema: userSchema } ),
        onSuccess: props.onSuccess,
        onError: props.onError,
        onSubmit: values => props.onSubmit( values as UserPayload ),
    } );

    const handleSelect = ( field: keyof InferType<typeof userSchema> ) => ( value: string[] ) =>
    {
        setFields( field, value );
        setTouched( field, true );
    };

    return (
        <form ref={form} class="form_flex">
            <h2 class="section_title_opaque border_bottom">
                <Text message="a_personal_information" />
            </h2>
            <div class="field_wrapper">
                <FormControl required invalid={!!errors( 'firstName' )}>
                    <FormLabel for="firstName"><Text message="first_name"/></FormLabel>
                    <Input autofocus name="firstName" type="text" placeholder={t( 'a_enter_first_name' ) as string} value={props.userSelected?.firstName}/>
                    <FormErrorMessage><Text message={errors( 'firstName' )[0]} /></FormErrorMessage>
                </FormControl>
            </div>
            <div class="field_wrapper">
                <FormControl required invalid={!!errors( 'lastName' )}>
                    <FormLabel for="lastName"><Text message="last_name"/></FormLabel>
                    <Input name="lastName" type="text" placeholder={t( 'a_enter_last_name' ) as string} value={props.userSelected?.lastName}/>
                    <FormErrorMessage><Text message={errors( 'lastName' )[0]} /></FormErrorMessage>
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl required invalid={!!errors( 'documentType' )}>
                    <FormLabel><Text message="documentType"/></FormLabel>
                    <div class="field_justify_between">
                        <FormControl required invalid={!!errors( 'documentType' )} class="small">
                            <Select
                                value={props.userSelected?.documentType}
                                onChange={handleSelect( 'documentType' )}
                            >
                                <SelectTrigger
                                    onBlur={() => setTouched( 'documentType', true )}
                                >
                                    <SelectPlaceholder>
                                        <Text message={ props.userSelected?.documentType || 'type_id' }/>
                                    </SelectPlaceholder>
                                    <SelectValue />
                                    <SelectIcon />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectListbox>
                                        <SelectOptGroup>
                                            <For each={userDocumentTypeOptions}>
                                                {documentType => (
                                                    <SelectOption
                                                        value={documentType.value}
                                                        rounded="$none"
                                                        fontSize="$sm"
                                                        _active={{ bg: '$warning3', color: '$warning11' }}
                                                        _selected={{ bg: '$warning9', color: 'white' }}
                                                    >
                                                        <SelectOptionText _groupSelected={{ fontWeight: '$medium' }}>
                                                            {documentType.label}
                                                        </SelectOptionText>
                                                        <SelectOptionIndicator/>
                                                    </SelectOption>
                                                )}
                                            </For>
                                        </SelectOptGroup>
                                    </SelectListbox>
                                </SelectContent>
                            </Select>
                            <FormErrorMessage><Text message={errors( 'documentType' ) && errors( 'documentType' )[0] || 'loading'} /></FormErrorMessage>
                        </FormControl>

                        <FormControl required invalid={!!errors( 'documentNumber' )} class="big">
                            <Input name="documentNumber" type="text" placeholder={t( 'a_enter_id_number' ) as string} value={props.userSelected?.documentNumber}/>
                            <FormErrorMessage><Text message={errors( 'documentNumber' )[0]} /></FormErrorMessage>
                        </FormControl>
                    </div>
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl required invalid={!!errors( 'gender' )}>
                    <FormLabel for="gender"><Text message="gender"/></FormLabel>
                    <RadioGroup defaultValue={props.userSelected?.gender}>
                        <div class="field_justify_between">
                            <Radio name="gender" id="gender-f" value="fame">F</Radio>
                            <Radio name="gender" id="gender-m" value="male">M</Radio>
                            <Radio name="gender" id="gender-o" value="other"><Text message="a_gender_other"/></Radio>
                        </div>
                    </RadioGroup>
                    <FormErrorMessage><Text message={errors( 'gender' )[0]} /></FormErrorMessage>
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl required invalid={!!errors( 'birthday' )}>
                    <FormLabel for="birthday"><Text message="birthday"/></FormLabel>
                    <Input name="birthday" type="date" placeholder={t( 'a_choose_birthday' ) as string} value={props.userSelected?.birthday}/>
                    <FormErrorMessage><Text message={errors( 'birthday' )[0]} /></FormErrorMessage>
                </FormControl>
            </div>
            <div class="field_wrapper">
                <FormControl required invalid={!!errors( 'enable' )}>
                    <FormLabel><Text message="enable"/></FormLabel>
                    <Switch class="switch_position" name="enable" defaultChecked={props.userSelected?.id ? props.userSelected?.enable : true} />
                    <FormErrorMessage><Text message={errors( 'enable' )[0]}/></FormErrorMessage>
                </FormControl>
            </div>
            <div class="field_wrapper">
                <FormControl required invalid={!!errors( 'country' )}>
                    <FormLabel><Text message="country"/></FormLabel>
                    <Select
                        value={props.userSelected?.country}
                        onChange={handleSelect( 'country' )}
                    >
                        <SelectTrigger
                            onBlur={() => setTouched( 'country', true )}
                        >
                            <SelectPlaceholder>
                                <Text message="a_select_country"/>
                            </SelectPlaceholder>
                            <SelectValue />
                            <SelectIcon />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectListbox>
                                <For each={ country }>
                                    {item => <SelectOption value={item.value}>{item.label}</SelectOption>}
                                </For>
                            </SelectListbox>
                        </SelectContent>
                    </Select>
                    <FormErrorMessage><Text message={errors( 'country' ) && errors( 'country' )[0] || 'loading'} /></FormErrorMessage>
                </FormControl>
            </div>
            <div class="field_wrapper">
                <FormControl required invalid={!!errors( 'address' )}>
                    <FormLabel for="address"><Text message="address"/></FormLabel>
                    <Input name="address" type="text" placeholder={t( 'a_your_address' ) as string} value={props.userSelected?.address}/>
                    <FormErrorMessage><Text message={errors( 'address' )[0]} /></FormErrorMessage>
                </FormControl>
            </div>
            <h2 class="section_title_opaque border_bottom">
                <Text message="a_contact_information" />
            </h2>
            <div class="field_wrapper">
                <FormControl required invalid={!!errors( 'email' )}>
                    <FormLabel for="email"><Text message="email"/></FormLabel>
                    <Input name="email" type="text" placeholder={t( 'a_your_email' ) as string} value={props.userSelected?.email}/>
                    <FormErrorMessage><Text message={errors( 'email' )[0]} /></FormErrorMessage>
                </FormControl>
            </div>
            <div class="field_wrapper">
                <FormControl required invalid={!!errors( 'phone' )}>
                    <FormLabel for="phone"><Text message="phone"/></FormLabel>
                    <Input name="phone" type="text" placeholder={t( 'a_enter_phone' ) as string} value={props.userSelected?.phone}/>
                    <FormErrorMessage><Text message={errors( 'phone' )[0]} /></FormErrorMessage>
                </FormControl>
            </div>
            <Show when={!props.userSelected?.id}>
                <div class="field_wrapper full">
                    <FormControl required invalid={!!errors( 'password' )}>
                        <FormLabel for="password"><Text message="password"/></FormLabel>
                        <Input name="password" type="password" placeholder={t( 'a_your_password' ) as string} />
                        <FormErrorMessage><Text message={errors( 'password' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>
                <div class="field_wrapper full">
                    <FormControl required invalid={!!errors( 'passwordConfirmation' )}>
                        <FormLabel for="passwordConfirmation"><Text message="confirm_password"/></FormLabel>
                        <Input name="passwordConfirmation" type="password" placeholder={t( 'a_repeat_password' ) as string}/>
                        <FormErrorMessage><Text message={errors( 'passwordConfirmation' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>
            </Show>
            <div class="field_wrapper">
                <FormControl id="permissions" invalid={!!errors( 'permissions' )}>
                    <FormLabel for="permissions"><Text message="permissions"/></FormLabel>
                    <Select multiple
                        value={props.userSelected?.permissions}
                        onChange={handleSelect( 'permissions' )}
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
            <div class="field_wrapper">
                <FormControl id="roles" invalid={!!errors( 'roles' )}>
                    <FormLabel for="roles"><Text message="roles"/></FormLabel>
                    <Select multiple
                        value={rolesSelected()}
                        onChange={handleSelect( 'roles' )}
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
                                                value={rol.id}
                                                rounded="$none"
                                                fontSize="$sm"
                                                _active={{ bg: '$warning3', color: '$warning11' }}
                                                _selected={{ bg: '$warning9', color: 'white' }}
                                            >
                                                <SelectOptionText _groupSelected={{ fontWeight: '$medium' }}>
                                                    {rol.name}
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
            <div class="update_save_buttons_container" data-parent={props.requiredPermission.submit}>
                <div class="button_full has-permission">
                    <Button class="button_full" as={Link} href="/users" colorScheme="neutral">
                        <Text message="a_close" />
                    </Button>
                </div>
                <div class="button_full has-permission">
                    <Button class="button_full" type="submit" disabled={!isValid()} loading={isSubmitting()} loadingText={<Text message="a_submitting"/> as string}>
                        <Text message="a_save"/>
                    </Button>
                </div>
                <div class="button_full fallback">
                    <Button class="w-full" as={Link} href="/users">
                        <Text message="a_close" />
                    </Button>
                </div>
            </div>
        </form>
    );
};
export default UserForm;
