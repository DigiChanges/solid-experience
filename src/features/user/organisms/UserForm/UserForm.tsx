import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import { Button, FormControl, FormControlError, FormControlLabel, Input } from '@hope-ui/core';
import { useNavigate} from '@solidjs/router';
import { Text, useI18n } from 'solid-i18n';
import { Component, onMount, Show } from 'solid-js';
import { InferType } from 'yup';
import { country, gender, userDocumentTypeOptions } from '../../../../entities';
import { PermissionApi } from '../../../auth/interfaces/permission';
import { RoleApi } from '../../../role/interfaces';
import { UserApi, UserPayload } from '../../interfaces';
import userCreateValidationSchema from '../../validations/schemas/userCreateValidationSchema';
import userUpdateValidationSchema from '../../validations/schemas/userUpdateValidationSchema';
import { MultiSelect, Select } from '../../../shared/molecules/Select/Select';
import Radio from '../../../shared/molecules/Radio/Radio';
import Switch from '../../../shared/molecules/Switch/Switch';
import DatePicker from '../../../shared/molecules/DatePicker/DatePicker';
import { darkInput, darkNeutralButton, darkPrimaryButtonWithBackground, placeholderInput } from '../../../shared/constants/hopeAdapter';

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
    const navigate = useNavigate();

    const userSchema = props.userSelected?.id ? userUpdateValidationSchema : userCreateValidationSchema;

    const {
        data,
        errors,
        form,
        isSubmitting,
        isValid,
        setFields,
        // @ts-ignore
    } = createForm<InferType<typeof userSchema>>( {
        initialValues: {
            permissions: [],
            roles: [],
            enable: true,
            gender: '',
            country: '',
            documentType: '',
            password: '',
        },
        extend: validator( { schema: userSchema } ),
        onSuccess: props.onSuccess,
        onError: props.onError,
        onSubmit: values => props.onSubmit( values as UserPayload ),
    } );

    const handleSelect = ( field: keyof InferType<typeof userSchema> ) => ( value: string[] | boolean ) =>
    {
        setFields( field, value, true );
    };

    const handleMultiSelect = ( field: keyof InferType<typeof userSchema> ) => ( value: any ) =>
    {
        const valuesArray: string[] = Array.from( value );
        setFields( field, valuesArray, true );
    };

    const handleDate = ( field: keyof InferType<typeof userSchema>, value: any ) =>
    {
        setFields( field, value, true );
    };

    onMount( () =>
    {
        if ( props.userSelected )
        {
            for ( const key in props.userSelected )
            {
                if ( key === 'roles' )
                {
                    const rolesIds = props.userSelected[key].map( ( role ) => role.id );
                    setFields( key, rolesIds );
                }
                else
                {
                    // @ts-ignore
                    setFields( key, props.userSelected[key] );
                }
            }
        }
    } );

    return (
        <form ref={form} class="form_flex">
            <h2 class="section_title_opaque border_bottom">
                <Text message="a_personal_information" />
            </h2>

            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'firstName' )}>
                    <FormControlLabel class={'form_label'} for="firstName" _dark={{ _after: { color: 'danger.300' } }}>
                        <Text message="first_name"/>
                    </FormControlLabel>
                    <Input
                        _dark={darkInput}
                        _placeholder={placeholderInput}
                        autofocus
                        name="firstName"
                        type="text"
                        placeholder={t( 'a_enter_first_name' ) as string}
                        value={props.userSelected?.firstName}
                    />
                    <Show when={errors( 'firstName' )} keyed>
                        <FormControlError class="error_message_block">
                            <Text message={errors( 'firstName' )?.[0] ?? ''} />
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'lastName' )}>
                    <FormControlLabel class={'form_label'} for="lastName" _dark={{ _after: { color: 'danger.300' } }}>
                        <Text message="last_name"/>
                    </FormControlLabel>
                    <Input
                        _dark={darkInput}
                        _placeholder={placeholderInput}
                        name="lastName"
                        type="text"
                        placeholder={t( 'a_enter_last_name' ) as string}
                        value={props.userSelected?.lastName}
                    />
                    <Show when={errors( 'lastName' )} keyed>
                        <FormControlError class="error_message_block">
                            <Text message={errors( 'lastName' )?.[0] ?? ''} />
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class="field_wrapper">
                <div class="field_justify_between h-[90px]">
                    <FormControl isRequired isInvalid={!!errors( 'documentType' )} class={'w-[25%]'}>
                        <FormControlLabel class={'form_label'} for="documentType" _dark={{ _after: { color: 'danger.300' } }}>
                            <Text message="document_type"/>
                        </FormControlLabel>
                        <Select
                            name={'documentType'}
                            options={userDocumentTypeOptions}
                            placeholder={'type_id'}
                            value={data().documentType}
                            onChange={handleSelect( 'documentType' )}
                            valueProperty={'value'}
                            labelProperty={'label'}
                            class={'w-full'}
                        />
                        <Show when={errors( 'documentType' )} keyed>
                            <FormControlError class="error_message_block">
                                <Text message={errors( 'documentType' )?.[0] ?? ''} />
                            </FormControlError>
                        </Show>
                    </FormControl>

                    <FormControl isRequired isInvalid={!!errors( 'documentNumber' )} class="big">
                        <FormControlLabel class={'form_label'} for="documentNumber" _dark={{ _after: { color: 'danger.300' } }}>
                            <Text message="document_number"/>
                        </FormControlLabel>
                        <Input
                            _dark={darkInput}
                            _placeholder={placeholderInput}
                            name="documentNumber"
                            type="text"
                            placeholder={t( 'a_enter_id_number' ) as string}
                        />
                        <Show when={errors( 'documentNumber' )} keyed>
                            <FormControlError class="error_message_block">
                                <Text message={errors( 'documentNumber' )?.[0] ?? ''} />
                            </FormControlError>
                        </Show>
                    </FormControl>
                </div>
            </div>

            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'gender' )}>
                    <FormControlLabel class={'form_label'} for="gender" _dark={{ _after: { color: 'danger.300' } }}>
                        <Text message="gender"/>
                    </FormControlLabel>
                    <Radio
                        name={'gender'}
                        options={gender}
                        value={data().gender}
                        onChange={handleSelect( 'gender' )}
                    />
                    <Show when={errors( 'gender' )} keyed>
                        <FormControlError class="error_message_block">
                            <Text message={errors( 'gender' )?.[0] ?? ''} />
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'birthday' )}>
                    <FormControlLabel class={'form_label'} for="birthday" _dark={{ _after: { color: 'danger.300' } }}>
                        <Text message="birthday"/>
                    </FormControlLabel>
                    <DatePicker
                        currentDate={ new Date() }
                        dateFormat={ 'DD/MM/YYYY' }
                        headerMonthFormat={ 'MM' }
                        enableSelectedDate={ false }
                        enableCalendarViewType={ true }
                        activeCalendarView={ 'year' }
                        calendarResponse={ ( e: any ) =>
                        {
                            handleDate( 'birthday', e.currentDate?.toISOString().split( 'T' )[0] );
                        } }
                        maxDate={ new Date() }
                        minDate={ new Date( '1901' ) }
                        customizeCalendar={ 'register-birthday' }
                        name="birthday"
                        theme="dark"
                    />
                    <Show when={errors( 'birthday' )} keyed>
                        <FormControlError class="error_message_block">
                            <Text message={errors( 'birthday' )?.[0] ?? ''} />
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'enable' )}>
                    <FormControlLabel class={'form_label'} _dark={{ _after: { color: 'danger.300' } }}>
                        <Text message="enable"/>
                    </FormControlLabel>
                    <Switch
                        name={'enable'}
                        value={data().enable}
                        onChange={handleSelect( 'enable' )}
                    />
                    <Show when={errors( 'enable' )} keyed>
                        <FormControlError class="error_message_block">
                            <Text message={errors( 'enable' )?.[0] || ''}/>
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'country' )}>
                    <FormControlLabel class={'form_label'} for="country" _dark={{ _after: { color: 'danger.300' } }}>
                        <Text message="country"/>
                    </FormControlLabel>
                    <Select
                        name={'country'}
                        placeholder={'a_select_country'}
                        options={country}
                        value={data().country}
                        onChange={handleSelect( 'country' )}
                        valueProperty={'value'}
                        labelProperty={'label'}
                        class={'w-full'}
                    />
                    <Show when={errors( 'country' )} keyed>
                        <FormControlError class="error_message_block">
                            <Text message={errors( 'country' )?.[0] ?? ''} />
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'address' )}>
                    <FormControlLabel class={'form_label'} for="address" _dark={{ _after: { color: 'danger.300' } }}>
                        <Text message="address"/>
                    </FormControlLabel>
                    <Input
                        _dark={darkInput}
                        _placeholder={placeholderInput}
                        name="address"
                        type="text"
                        placeholder={t( 'a_your_address' ) as string}
                        value={props.userSelected?.address}
                    />
                    <Show when={errors( 'address' )} keyed>
                        <FormControlError class="error_message_block">
                            <Text message={errors( 'address' )?.[0] ?? ''} />
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            <h2 class="section_title_opaque border_bottom">
                <Text message="a_contact_information" />
            </h2>

            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'email' )}>
                    <FormControlLabel class={'form_label'} for="email" _dark={{ _after: { color: 'danger.300' } }}>
                        <Text message="email"/>
                    </FormControlLabel>
                    <Input
                        _dark={darkInput}
                        _placeholder={placeholderInput}
                        name="email"
                        type="text"
                        placeholder={t( 'a_your_email' ) as string}
                        value={props.userSelected?.email}
                    />
                    <Show when={errors( 'email' )} keyed>
                        <FormControlError class="error_message_block">
                            <Text message={errors( 'email' )?.[0] ?? ''} />
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'phone' )}>
                    <FormControlLabel class={'form_label'} for="phone" _dark={{ _after: { color: 'danger.300' } }}>
                        <Text message="phone"/>
                    </FormControlLabel>
                    <Input
                        _dark={darkInput}
                        _placeholder={placeholderInput}
                        name="phone"
                        type="text"
                        placeholder={t( 'a_enter_phone' ) as string}
                        value={props.userSelected?.phone}
                    />
                    <Show when={errors( 'phone' )} keyed>
                        <FormControlError class="error_message_block">
                            <Text message={errors( 'phone' )?.[0] ?? ''} />
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            <Show when={!props.userSelected?.id} keyed>
                <div class="field_wrapper full">
                    <FormControl isRequired isInvalid={!!errors( 'password' )}>
                        <FormControlLabel class={'form_label'} for="password" _dark={{ _after: { color: 'danger.300' } }}>
                            <Text message="password"/>
                        </FormControlLabel>
                        <Input
                             autocomplete="password"
                            _dark={darkInput}
                            _placeholder={placeholderInput}
                            name="password"
                            type="password"
                            placeholder={t( 'a_your_password' ) as string}
                        />
                        <Show when={errors( 'password' )} keyed>
                            <FormControlError class="error_message_block">
                                <Text message={errors( 'password' )?.[0] ?? ''} />
                            </FormControlError>
                        </Show>
                    </FormControl>
                </div>
                <div class="field_wrapper full">
                    <FormControl isRequired isInvalid={!!errors( 'passwordConfirmation' )}>
                        <FormControlLabel class={'form_label'} for="passwordConfirmation" _dark={{ _after: { color: 'danger.300' } }}>
                            <Text message="confirm_password"/>
                        </FormControlLabel>
                        <Input
                             autocomplete="passwordConfirmation"
                            _dark={darkInput}
                            _placeholder={placeholderInput}
                            name="passwordConfirmation"
                            type="password"
                            placeholder={t( 'a_repeat_password' ) as string}
                        />
                        <Show when={errors( 'passwordConfirmation' )} keyed>
                            <FormControlError class="error_message_block">
                                <Text message={errors( 'passwordConfirmation' )?.[0] ?? ''} />
                            </FormControlError>
                        </Show>
                    </FormControl>
                </div>
            </Show>

            <div class="field_wrapper">
                <FormControl id="permissions" isInvalid={!!errors( 'permissions' )}>
                    <FormControlLabel _after={{ content: '' }} class={'form_label'} for="permissions" _dark={{ _after: { color: 'danger.300' } }}>
                        <Text message="permissions"/>
                    </FormControlLabel>
                    <MultiSelect
                        name={'permissions'}
                        options={props.permissionsList}
                        placeholder={'a_enter_permissions'}
                        value={data().permissions}
                        onChange={handleMultiSelect( 'permissions' )}
                        valueProperty={'id'}
                        labelProperty={'name'}
                        groupSelector={'permissions'}
                        class={'w-full'}
                    />
                    <FormControlError class="error_message_block">
                        <Text message={errors( 'permissions' ) && errors( 'permissions' )?.[0] || ''} />
                    </FormControlError>
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl id="roles" isInvalid={!!errors( 'roles' )}>
                    <FormControlLabel _after={{ content: '' }} class={'form_label'} for="roles" _dark={{ _after: { color: 'danger.300' } }}>
                        <Text message="roles"/>
                    </FormControlLabel>
                    <MultiSelect
                        name={'roles'}
                        options={props.rolesList}
                        placeholder={'a_select_roles'}
                        value={data().roles}
                        onChange={handleMultiSelect( 'roles' )}
                        valueProperty={'id'}
                        labelProperty={'name'}
                        class={'w-full'}
                    />
                    <Show when={errors( 'roles' )} keyed>
                        <FormControlError class="error_message_block">
                            <Text message={ errors( 'roles' )?.[0] ?? ''} />
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class="update_save_buttons_container" data-parent={props.requiredPermission.submit}>
                <div class="button_full has-permission">
                    <Button
                        _dark={darkNeutralButton}
                        class="button_full"
                        onClick={()=>navigate('/users/list')}
                        colorScheme="neutral"
                    >
                        <Text message="a_back" />
                    </Button>
                </div>
                <div class="button_full has-permission">
                    <Button
                        _dark={darkPrimaryButtonWithBackground}
                        class="button_full"
                        type="submit"
                        isDisabled={!isValid()}
                        isLoading={isSubmitting()}
                        loadingText={<Text message="a_submitting"/> as string}
                    >
                        <Text message="a_save"/>
                    </Button>
                </div>
                <div class="button_full fallback">
                    <Button
                        _dark={darkNeutralButton}
                        class="w-full"
                        onClick={()=>navigate('/users/list')}
                    >
                        <Text message="a_back" />
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default UserForm;
