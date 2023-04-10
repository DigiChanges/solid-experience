import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import { Button, FormControl, FormControlError, FormControlLabel, Input } from '@hope-ui/core';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, createEffect, createMemo, For, onMount, Show } from 'solid-js';
import { InferType } from 'yup';
import { country, gender, userDocumentTypeOptions } from '../../../../entities';
import { PermissionApi } from '../../../auth/interfaces/permission';
import { RoleApi } from '../../../role/interfaces';
import { UserApi, UserPayload } from '../../interfaces';
import userCreateValidationSchema from '../../validations/schemas/userCreateValidationSchema';
import userUpdateValidationSchema from '../../validations/schemas/userUpdateValidationSchema';
import './UserForm.module.css';
import DatePicker from '../../../../atoms/DatePicker/DatePicker';
import { Select, RadioGroup, MultiSelect, As, Switch } from '@kobalte/core';
import styles from './UserForm.module.css';

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

    const rolesSelected = createMemo( () => { return props.userSelected?.roles?.map( role => role.id ) } );

    const userSchema = props.userSelected?.id ? userUpdateValidationSchema : userCreateValidationSchema;
    const {
        data,
        errors,
        form,
        isSubmitting,
        isValid,
        setFields,
        setTouched,
        // @ts-ignore
    } = createForm<InferType<typeof userSchema>>( {
        initialValues: {
            permissions: props.userSelected?.permissions,
            roles: rolesSelected(),
            documentType: props.userSelected?.documentType,
            country: props.userSelected?.country,
        },
        extend: validator( { schema: userSchema } ),
        onSuccess: props.onSuccess,
        onError: props.onError,
        onSubmit: values => props.onSubmit( values as UserPayload ),
    } );

    const handleSelect = ( field: keyof InferType<typeof userSchema> ) => ( value: string[] | boolean ) =>
    {
        setFields( field, value );
        setTouched( field, true );
    };

    onMount( () =>
    {
        const forbiddenKeys = [ 'permissions', 'roles', 'country', 'documentType' ];
        for ( const key in props.userSelected )
        {
            // @ts-ignore
            if ( !forbiddenKeys.includes( key ) ){ setFields( key, props.userSelected[key] ); }
        }
    } );

    createEffect(()=> {
        console.log(errors('enable'), 'enable')
        console.log(errors('country'), 'country')
        console.log(errors('gender'), 'gender')
    })

    return (
        <form ref={form} class="form_flex">
            <h2 class="section_title_opaque border_bottom">
                <Text message="a_personal_information" />
            </h2>
            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'firstName' )}>
                    <FormControlLabel for="firstName"><Text message="first_name"/></FormControlLabel>
                    <Input autofocus name="firstName" type="text" placeholder={t( 'a_enter_first_name' ) as string} value={props.userSelected?.firstName} />
                    <Show when={errors( 'firstName' )} keyed>
                        <FormControlError><Text message={errors( 'firstName' )![0]} /></FormControlError>
                    </Show>
                </FormControl>
            </div>
            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'lastName' )}>
                    <FormControlLabel for="lastName"><Text message="last_name"/></FormControlLabel>
                    <Input name="lastName" type="text" placeholder={t( 'a_enter_last_name' ) as string} value={props.userSelected?.lastName}/>
                    <Show when={errors( 'lastName' )} keyed>
                        <FormControlError><Text message={errors( 'lastName' )![0]} /></FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class="field_wrapper full">
                <div class="field_justify_between">
                    <FormControl isRequired isInvalid={!!errors( 'documentType' )}>
                        <FormControlLabel for="documentType"><Text message="document_type"/></FormControlLabel>
                        <Select.Root
                            name="documentType"
                            options={userDocumentTypeOptions}
                            placeholder={<Text message="type_id"/> as string}
                            value={data().documentType}
                            optionValue="value"
                            optionTextValue="label"
                            onValueChange={( value ) => setFields( 'documentType', value, true )}
                            valueComponent={props => props.item.rawValue.label}
                            itemComponent={props => (
                                <Select.Item item={props.item} class={styles.select__item}>
                                    <Select.ItemLabel>{props.item.rawValue.label}</Select.ItemLabel>
                                    <Select.ItemIndicator class={styles.select__item__indicator}>
                                        x
                                    </Select.ItemIndicator>
                                </Select.Item>
                            )}
                        >
                            <Select.Trigger class={styles.select__trigger}>
                                <Select.Value class={styles.select__value} />
                            </Select.Trigger>
                            <Select.Portal>
                                <Select.Content class={styles.select__content}>
                                    <Select.Listbox class={styles.select__listbox} />
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>
                        <Show when={errors( 'documentType' )} keyed>
                            <div class="flex absolute">
                                <FormControlError>
                                    <Text message={errors( 'documentType' )![0] || ''} />
                                </FormControlError>
                            </div>
                        </Show>
                    </FormControl>

                    <FormControl isRequired isInvalid={!!errors( 'documentNumber' )} class="big">
                        <FormControlLabel for="documentNumber"><Text message="document_number"/></FormControlLabel>
                        <Input name="documentNumber" type="text" placeholder={t( 'a_enter_id_number' ) as string} />
                        <Show when={errors( 'documentNumber' )} keyed>
                            <div class="flex absolute">
                                <FormControlError>
                                    <Text message={errors( 'documentNumber' )![0]} />
                                </FormControlError>
                            </div>
                        </Show>
                    </FormControl>
                </div>
            </div>

            <div class="field_wrapper full">
                <FormControl isRequired isInvalid={!!errors( 'gender' )}>
                    <FormControlLabel for="gender"><Text message="gender"/></FormControlLabel>
                    <RadioGroup.Root
                        class={styles.radio__group}
                        defaultValue="other"
                        value={data().gender}
                        name="gender"
                        onValueChange={( value ) => setFields( 'gender', value, true )}
                    >
                        <div class={styles.radio__group__items}>
                            <For each={gender}>
                                {gender => (
                                    <RadioGroup.Item value={gender.value} class={styles.radio}>
                                        <RadioGroup.ItemInput class={styles.radio__input}/>
                                        <RadioGroup.ItemControl class={styles.radio__control}>
                                            <RadioGroup.ItemIndicator class={styles.radio__indicator}/>
                                        </RadioGroup.ItemControl>
                                        <RadioGroup.ItemLabel><Text message={gender.label}/></RadioGroup.ItemLabel>
                                    </RadioGroup.Item>
                                )}
                            </For>
                        </div>
                    </RadioGroup.Root>
                    <Show when={errors( 'gender' )} keyed>
                        <FormControlError>
                            <Text message={errors( 'gender' )![0]} />
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'birthday' )}>
                    <FormControlLabel for="birthday"><Text message="birthday"/></FormControlLabel>
                    <DatePicker prevDate={new Date( '05/01/2022' )}
                        endDate={new Date()}
                        currentDate={new Date( props.userSelected ? props.userSelected.birthday : new Date() )}
                        dateFormat={'DD/MM/YYYY'}
                        headerMonthFormat={'MM'}
                        enableSelectedDate={false}
                        enableCalendarViewType={true}
                        calendarResponse={( e: any ) => setFields( 'birthday', e.currentDate?.toISOString().split( 'T' )[0] )}
                    ></DatePicker>
                    <Show when={errors( 'birthday' )} keyed>
                        <FormControlError><Text message={errors( 'birthday' )![0]} /></FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'enable' )}>
                    <Switch.Root name="enable" class={styles.switch} defaultIsChecked={props.userSelected?.id ? props.userSelected?.enable : true} onCheckedChange={handleSelect( 'enable' )}>
                        <Switch.Label class={styles.switch__label}><FormControlLabel><Text message="enable"/></FormControlLabel></Switch.Label>
                        <Switch.Input class={styles.switch__input} />
                        <Switch.Control class={styles.switch__control}>
                            <Switch.Thumb class={styles.switch__thumb}/>
                        </Switch.Control>
                    </Switch.Root>
                    <Show when={errors( 'enable' )}>
                        <FormControlError><Text message={errors( 'enable' )![0]}/></FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class="field_wrapper full">
                <FormControl isRequired isInvalid={!!errors( 'country' )}>
                    <FormControlLabel for="country"><Text message="country"/></FormControlLabel>
                    <Select.Root
                        name="country"
                        options={country}
                        value={data().country}
                        placeholder={<Text message="a_select_country"/> as string}
                        onValueChange={( value ) => setFields( 'country', value, true )}
                        optionValue="value"
                        onfocusout={() => setTouched( 'country', true )}
                        optionTextValue="label"
                        valueComponent={props => props.item.rawValue.label}
                        itemComponent={props => (
                            <Select.Item item={props.item} class={styles.select__item}>
                                <Select.ItemLabel>{props.item.rawValue.label}</Select.ItemLabel>
                                <Select.ItemIndicator class={styles.select__item__indicator}>
                                    x
                                </Select.ItemIndicator>
                            </Select.Item>
                        )}
                    >
                        <Select.Trigger class={styles.select__trigger}>
                            <Select.Value class={styles.select__value} />
                        </Select.Trigger>
                        <Select.Portal>
                            <Select.Content class={styles.select__content}>
                                <Select.Listbox class={styles.select__listbox} />
                            </Select.Content>
                        </Select.Portal>
                    </Select.Root>
                    <Show when={errors( 'country' )} keyed>
                        <FormControlError>
                            <Text message={errors( 'country' )![0] || ''} />
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>
            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'address' )}>
                    <FormControlLabel for="address"><Text message="address"/></FormControlLabel>
                    <Input name="address" type="text" placeholder={t( 'a_your_address' ) as string} value={props.userSelected?.address}/>
                    <Show when={errors( 'address' )} keyed>
                        <FormControlError><Text message={errors( 'address' )![0]} /></FormControlError>
                    </Show>
                </FormControl>
            </div>
            <h2 class="section_title_opaque border_bottom">
                <Text message="a_contact_information" />
            </h2>
            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'email' )}>
                    <FormControlLabel for="email"><Text message="email"/></FormControlLabel>
                    <Input name="email" type="text" placeholder={t( 'a_your_email' ) as string} value={props.userSelected?.email}/>
                    <Show when={errors( 'email' )} keyed>
                        <FormControlError><Text message={errors( 'email' )![0]} /></FormControlError>
                    </Show>
                </FormControl>
            </div>
            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'phone' )}>
                    <FormControlLabel for="phone"><Text message="phone"/></FormControlLabel>
                    <Input name="phone" type="text" placeholder={t( 'a_enter_phone' ) as string} value={props.userSelected?.phone}/>
                    <Show when={errors( 'phone' )} keyed>
                        <FormControlError><Text message={errors( 'phone' )![0]} /></FormControlError>
                    </Show>
                </FormControl>
            </div>
            <Show keyed={true} when={!props.userSelected?.id}>
                <div class="field_wrapper full">
                    <FormControl isRequired isInvalid={!!errors( 'password' )}>
                        <FormControlLabel for="password"><Text message="password"/></FormControlLabel>
                        <Input name="password" type="password" placeholder={t( 'a_your_password' ) as string} />
                        <Show when={errors( 'password' )} keyed>
                            <FormControlError><Text message={errors( 'password' )![0]} /></FormControlError>
                        </Show>
                    </FormControl>
                </div>
                <div class="field_wrapper full">
                    <FormControl isRequired isInvalid={!!errors( 'passwordConfirmation' )}>
                        <FormControlLabel for="passwordConfirmation"><Text message="confirm_password"/></FormControlLabel>
                        <Input name="passwordConfirmation" type="password" placeholder={t( 'a_repeat_password' ) as string}/>
                        <Show when={errors( 'passwordConfirmation' )} keyed>
                            <FormControlError><Text message={errors( 'passwordConfirmation' )![0]} /></FormControlError>
                        </Show>
                    </FormControl>
                </div>
            </Show>
            <div class="field_wrapper">
                <FormControl id="permissions" isInvalid={!!errors( 'permissions' )}>
                    <FormControlLabel for="permissions"><Text message="permissions"/></FormControlLabel>
                    {/* <Select multiple
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
                    </Select> */}
                    {/* <Show when={errors( 'passwordConfirmation' )} keyed>
                        <FormControlError><Text message={errors( 'passwordConfirmation' )![0]} /></FormControlError>
                    </Show> */}
                    <FormControlError><Text message={errors( 'permissions' ) && errors( 'permissions' )![0] || ''} /></FormControlError>
                </FormControl>
            </div>
            <div class="field_wrapper">
                <FormControl id="roles" isInvalid={!!errors( 'roles' )}>
                    <FormControlLabel for="roles"><Text message="roles"/></FormControlLabel>
                    {/* <Select multiple
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
                    </Select> */}
                    {/* <Show when={errors( 'passwordConfirmation' )} keyed>
                        <FormControlError><Text message={errors( 'passwordConfirmation' )![0]} /></FormControlError>
                    </Show> */}
                    <FormControlError><Text message={errors( 'roles' ) && errors( 'roles' )![0] || ''} /></FormControlError>
                </FormControl>
            </div>
            <div class="update_save_buttons_container" data-parent={props.requiredPermission.submit}>
                <div class="button_full has-permission">
                    <Button class="button_full" as={Link} href="/users" colorScheme="neutral">
                        <Text message="a_close" />
                    </Button>
                </div>
                <div class="button_full has-permission">
                    <Button class="button_full" type="submit" isDisabled={!isValid()} isLoading={isSubmitting()} loadingText={<Text message="a_submitting"/> as string}>
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
