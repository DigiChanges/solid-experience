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
import { Component, For, Show } from 'solid-js';
import { InferType } from 'yup';
import { country, userDocumentTypeOptions } from '../../../../entities';
import { PermissionApi } from '../../../auth/interfaces/permission';
import { RoleApi } from '../../../role/interfaces';
import { UserApi, UserPayload, UserResponse } from '../../interfaces';
import userCreateValidationSchema from '../../validations/schemas/userCreateValidationSchema';
import userUpdateValidationSchema from '../../validations/schemas/userUpdateValidationSchema';
import styles from './UserForm.module.css';

interface UserUpdateTemplateProps
{
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

    const userSchema = props.userSelected?.id ? userUpdateValidationSchema : userCreateValidationSchema;
    const {
        errors,
        form,
        isValid,
        setFields,
        setTouched,
        // @ts-ignore
    } = createForm<InferType<typeof userSchema>>( {
        initialValues: { permissions: props.userSelected?.permissions || [], roles: props.userSelected?.roles || [], documentType: props.userSelected?.documentType || '', country: props.userSelected?.country || '' },
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
        <form ref={form} class={styles.form}>
            <div class={styles.form}>
                <h2 class={styles.form_h2}>

                    <Text message="a_personal_information" />
                </h2>
                <div class={styles.field_wrapper}>
                    <FormControl required invalid={!!errors( 'firstName' )}>
                        <FormLabel for="firstName"><Text message="first_name"/></FormLabel>
                        <Input autofocus name="firstName" type="text" placeholder={t( 'a_enter_first_name' )} value={props.userSelected?.firstName}/>
                        <FormErrorMessage><Text message={errors( 'firstName' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>
                <div class={styles.field_wrapper}>
                    <FormControl required invalid={!!errors( 'lastName' )}>
                        <FormLabel for="lastName"><Text message="last_name"/></FormLabel>
                        <Input name="lastName" type="text" placeholder={t( 'a_enter_last_name' )} value={props.userSelected?.lastName}/>
                        <FormErrorMessage><Text message={errors( 'lastName' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>

                <div class={styles.field_wrapper}>
                    <FormLabel><Text message="documentType"/></FormLabel>
                    <div class={styles.field_justify_between}>
                        <div class={styles.field_small}>

                            <FormControl required invalid={!!errors( 'documentType' )}>
                                <Select
                                    value={props.userSelected?.documentType}
                                    onChange={handleSelect( 'documentType' )}
                                >
                                    <SelectTrigger
                                        onBlur={() => setTouched( 'documentType', true )}
                                    >
                                        <SelectPlaceholder>
                                            <Text message="type_id"/>
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
                        </div>
                        <div class={styles.field_big}>
                            <FormControl required invalid={!!errors( 'documentNumber' )}>
                                <Input name="documentNumber" type="text" placeholder={t( 'a_enter_id_number' )} value={props.userSelected?.documentNumber}/>
                                <FormErrorMessage><Text message={errors( 'documentNumber' )[0]} /></FormErrorMessage>
                            </FormControl>
                        </div>
                    </div>
                </div>

                <div class={styles.field_wrapper}>
                    <FormControl required invalid={!!errors( 'gender' )}>
                        <FormLabel for="gender"><Text message="gender"/></FormLabel>
                        <RadioGroup defaultValue={props.userSelected?.gender}>
                            <div class={styles.radio_group}>
                                <Radio name="gender" id="gender-f" value="fame" class={styles.radio_group_input_f_m}>F</Radio>
                                <Radio name="gender" id="gender-m" value="male" class={styles.radio_group_input_f_m}>M</Radio>
                                <Radio name="gender" id="gender-o" value="other"><Text message="a_gender_other"/></Radio>
                            </div>
                        </RadioGroup>
                        <FormErrorMessage><Text message={errors( 'gender' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>

                <div class={styles.field_wrapper}>
                    <FormControl required invalid={!!errors( 'birthday' )}>
                        <FormLabel for="birthday"><Text message="birthday"/></FormLabel>
                        <Input name="birthday" type="date" placeholder={t( 'a_choose_birthday' )} value={props.userSelected?.birthday}/>
                        <FormErrorMessage><Text message={errors( 'birthday' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>
                <div class={styles.field_wrapper}>
                    <FormControl required invalid={!!errors( 'enable' )}>
                        <FormLabel><Text message="enable"/></FormLabel>
                        <Switch class={styles.switch_enable} name="enable" defaultChecked={props.userSelected?.id ? props.userSelected?.enable : true}></Switch>
                        <FormErrorMessage><Text message={errors( 'enable' )[0]}/></FormErrorMessage>
                    </FormControl>
                </div>
                <div class={styles.field_wrapper}>
                    <FormControl required invalid={!!errors( 'country' )}>
                        <FormLabel><Text message="country"/></FormLabel>
                        <Select
                            value={props.userSelected?.country}
                            onChange={value => setFields( 'country', value )}
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
                                        {/* @ts-ignore */}
                                        {item => <SelectOption value={item.value}>{item.label}</SelectOption>}
                                    </For>
                                </SelectListbox>
                            </SelectContent>
                        </Select>
                        <FormErrorMessage><Text message={errors( 'country' ) && errors( 'country' )[0] || 'loading'} /></FormErrorMessage>
                    </FormControl>
                </div>
                <div class={styles.field_wrapper}>
                    <FormControl required invalid={!!errors( 'address' )}>
                        <FormLabel for="address"><Text message="address"/></FormLabel>
                        <Input name="address" type="text" placeholder={t( 'a_your_address' )} value={props.userSelected?.address}/>
                        <FormErrorMessage><Text message={errors( 'address' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>
                <span class={styles.span_contact}>
                    <Text message="a_contact_information" />
                </span>
                <div class={styles.field_wrapper}>
                    <FormControl required invalid={!!errors( 'email' )}>
                        <FormLabel for="email"><Text message="email"/></FormLabel>
                        <Input name="email" type="text" placeholder={t( 'a_your_email' )} value={props.userSelected?.email}/>
                        <FormErrorMessage><Text message={errors( 'email' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>
                <div class={styles.field_wrapper}>
                    <FormControl required invalid={!!errors( 'phone' )}>
                        <FormLabel for="phone"><Text message="phone"/></FormLabel>
                        <Input name="phone" type="text" placeholder={t( 'a_enter_phone' )} value={props.userSelected?.phone}/>
                        <FormErrorMessage><Text message={errors( 'phone' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>
                <Show when={!props.userSelected?.id}>
                    <div class={styles.input_password}>
                        <FormControl required invalid={!!errors( 'password' )}>
                            <FormLabel for="password"><Text message="password"/></FormLabel>
                            <Input name="password" type="password" placeholder={t( 'a_your_password' )} />
                            <FormErrorMessage><Text message={errors( 'password' )[0]} /></FormErrorMessage>
                        </FormControl>
                    </div>
                    <div class={styles.input_password}>
                        <FormControl required invalid={!!errors( 'passwordConfirmation' )}>
                            <FormLabel for="passwordConfirmation"><Text message="confirm_password"/></FormLabel>
                            <Input name="passwordConfirmation" type="password" placeholder={t( 'a_repeat_password' )}/>
                            <FormErrorMessage><Text message={errors( 'passwordConfirmation' )[0]} /></FormErrorMessage>
                        </FormControl>
                    </div>
                </Show>
                <div class={styles.field_wrapper}>
                    <FormControl id="permissions" required invalid={!!errors( 'permissions' )}>
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
                <div class={styles.field_wrapper}>
                    <FormControl id="roles" required invalid={!!errors( 'roles' )}>
                        <FormLabel for="roles"><Text message="roles"/></FormLabel>
                        <Select multiple
                            value={props.userSelected?.roles}
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
                <div class={styles.container_buttons}>
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
