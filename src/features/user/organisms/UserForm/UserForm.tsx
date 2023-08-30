import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import { Button, FormControl, FormControlError, FormControlLabel, Input } from '@hope-ui/core';
import { useNavigate } from 'solid-start';
import useTranslation from '../../../shared/hooks/useTranslation';
import { Component, onMount, Show } from 'solid-js';
import { InferType } from 'yup';
import { country, gender } from '../../../../entities';
import { RoleApi } from '../../../role/interfaces';
import { UserApi, UserPayload } from '../../interfaces';
import userCreateValidationSchema from '../../validations/schemas/userCreateValidationSchema';
import userUpdateValidationSchema from '../../validations/schemas/userUpdateValidationSchema';
import { Select } from '../../../shared/molecules/Select/Select';
import Radio from '../../../shared/molecules/Radio/Radio';
import DatePicker from '../../../shared/molecules/DatePicker/DatePicker';
import { darkInput, darkNeutralButton, darkPrimaryButtonWithBackground, placeholderInput } from '../../../shared/constants/hopeAdapter';
import formStyles from '../../../../styles/form.module.css';
import typoStyles from '../../../../styles/typography.module.css';
import userFormStyles from './userForm.module.css';

interface UserUpdateTemplateProps
{
    onError: (error: unknown) => void;
    onSubmit?: (data: UserPayload) => Promise<void>;
    onSuccess: () => void;
    userSelected?: UserApi | undefined;
    rolesList?: RoleApi[];
}

const UserForm: Component<UserUpdateTemplateProps> = (props) =>
{
    const { translate: t } = useTranslation();
    const navigate = useNavigate();

    const userSchema = props.userSelected?.id ? userUpdateValidationSchema : userCreateValidationSchema;

    const {
        data,
        errors,
        form,
        isSubmitting,
        isValid,
        setFields
        // @ts-ignore
    } = createForm<InferType<typeof userSchema>>({
        initialValues: {
            enable: true,
            genre: '',
            country: '',
            password: ''
        },
        extend: validator({ schema: userSchema }),
        onSuccess: props.onSuccess,
        onError: props.onError,
        onSubmit: values => props.onSubmit ? props.onSubmit(values as UserPayload) : null
    });

    const handleSelect = (field: keyof InferType<typeof userSchema>) => (value: string[] | boolean) =>
    {
        setFields(field, value, true);
    };

    const handleMultiSelect = (field: keyof InferType<typeof userSchema>) => (value: any) =>
    {
        const valuesArray: string[] = Array.from(value);
        setFields(field, valuesArray, true);
    };

    const handleDate = (field: keyof InferType<typeof userSchema>, value: any) =>
    {
        setFields(field, value, true);
    };

    // onMount(() =>
    // {
    //     if (props.userSelected)
    //     {
    //         for (const key in props.userSelected)
    //         {
    //             if (key === 'roles')
    //             {
    //                 const rolesIds = props.userSelected[key].map((role) => role.id);
    //                 setFields(key, rolesIds);
    //             }
    //             else
    //             {
    //                 // @ts-ignore
    //                 setFields(key, props.userSelected[key]);
    //             }
    //         }
    //     }
    // });

    return (
        <form ref={form} class={formStyles.form_flex}>
            <h2 class={`${typoStyles.section_title_opaque} ${typoStyles.border_bottom}`}>
                {t('a_personal_information')}
            </h2>

            <div class={formStyles.field_wrapper}>
                <FormControl isRequired isInvalid={!!errors('firstName')}>
                    <FormControlLabel class={formStyles.form_label} for="firstName" _dark={{ _after: { color: 'danger.300' } }}>
                        {t('first_name')}
                    </FormControlLabel>
                    <Input
                        _dark={darkInput}
                        _placeholder={placeholderInput}
                        autofocus
                        name="firstName"
                        type="text"
                        placeholder={t('a_enter_first_name')}
                        value={props.userSelected?.firstName}
                    />
                    <Show when={errors('firstName')} keyed>
                        <FormControlError class={formStyles.error_message_block}>
                            {t(errors('firstName')?.[0] ?? '')}
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class={formStyles.field_wrapper}>
                <FormControl isRequired isInvalid={!!errors('lastName')}>
                    <FormControlLabel class={formStyles.form_label} for="lastName" _dark={{ _after: { color: 'danger.300' } }}>
                        {t('last_name')}
                    </FormControlLabel>
                    <Input
                        _dark={darkInput}
                        _placeholder={placeholderInput}
                        name="lastName"
                        type="text"
                        placeholder={t('a_enter_last_name')}
                        value={props.userSelected?.lastName}
                    />
                    <Show when={errors('lastName')} keyed>
                        <FormControlError class={formStyles.error_message_block}>
                            {t(errors('lastName')?.[0] ?? '')}
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class={formStyles.field_wrapper}>
                <FormControl isRequired isInvalid={!!errors('genre')}>
                    <FormControlLabel class={formStyles.form_label} for="gender" _dark={{ _after: { color: 'danger.300' } }}>
                        {t('gender')}
                    </FormControlLabel>
                    <Radio
                        name={'gender'}
                        options={gender}
                        value={data().genre}
                        onChange={handleSelect('genre')}
                    />
                    <Show when={errors('genre')} keyed>
                        <FormControlError class={formStyles.error_message_block}>
                            {t(errors('genre')?.[0] ?? '')}
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class={formStyles.field_wrapper}>
                <FormControl isRequired isInvalid={!!errors('birthdate')}>
                    <FormControlLabel class={formStyles.form_label} for="birthdate" _dark={{ _after: { color: 'danger.300' } }}>
                        {t('birthdate')}
                    </FormControlLabel>
                    <DatePicker
                        currentDate={ new Date() }
                        dateFormat={ 'DD/MM/YYYY' }
                        headerMonthFormat={ 'MM' }
                        enableSelectedDate={ false }
                        enableCalendarViewType={ true }
                        activeCalendarView={ 'year' }
                        calendarResponse={ (e: any) =>
                        {
                            handleDate('birthdate', e.currentDate?.toISOString().split('T')[0]);
                        } }
                        maxDate={ new Date() }
                        minDate={ new Date('1901') }
                        customizeCalendar={ 'register-birthdate' }
                        name="birthdate"
                        theme="dark"
                    />
                    <Show when={errors('birthdate')} keyed>
                        <FormControlError class={formStyles.error_message_block}>
                            {t(errors('birthdate')?.[0] ?? '')}
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            {/* <div class="field_wrapper">*/}
            {/*    <FormControl isRequired isInvalid={!!errors('genre')}>*/}
            {/*        <FormControlLabel class={'form_label'} _dark={{ _after: { color: 'danger.300' } }}>*/}
            {/*            {t('enable')}*/}
            {/*        </FormControlLabel>*/}
            {/*        <Switch*/}
            {/*            name={'enable'}*/}
            {/*            value={data().enable}*/}
            {/*            onChange={handleSelect('enable')}*/}
            {/*        />*/}
            {/*        <Show when={errors('enable')} keyed>*/}
            {/*            <FormControlError class="error_message_block">*/}
            {/*                {t(errors('enable')?.[0] || '')}*/}
            {/*            </FormControlError>*/}
            {/*        </Show>*/}
            {/*    </FormControl>*/}
            {/* </div>*/}

            <div class={formStyles.field_wrapper}>
                <FormControl isRequired isInvalid={!!errors('country')}>
                    <FormControlLabel class={formStyles.form_label} for="country" _dark={{ _after: { color: 'danger.300' } }}>
                        {t('country')}
                    </FormControlLabel>
                    <Select
                        name={'country'}
                        placeholder={'a_select_country'}
                        options={country}
                        value={data().country}
                        onChange={handleSelect('country')}
                        valueProperty={'value'}
                        labelProperty={'label'}
                        class={userFormStyles.fullW}
                    />
                    <Show when={errors('country')} keyed>
                        <FormControlError class={formStyles.error_message_block}>
                            {t(errors('country')?.[0] ?? '')}
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            <h2 class={`${typoStyles.section_title_opaque} ${typoStyles.border_bottom}`}>
                {t('a_contact_information')}
            </h2>

            <div class={formStyles.field_wrapper}>
                <FormControl isRequired isInvalid={!!errors('email')}>
                    <FormControlLabel class={formStyles.form_label} for="email" _dark={{ _after: { color: 'danger.300' } }}>
                        {t('email')}
                    </FormControlLabel>
                    <Input
                        _dark={darkInput}
                        _placeholder={placeholderInput}
                        name="email"
                        type="text"
                        placeholder={t('a_your_email')}
                        value={props.userSelected?.username}
                    />
                    <Show when={errors('email')} keyed>
                        <FormControlError class={formStyles.error_message_block}>
                            {t(errors('email')?.[0] ?? '')}
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class={formStyles.field_wrapper}>
                <FormControl isRequired isInvalid={!!errors('phone')}>
                    <FormControlLabel class={formStyles.form_label} for="phone" _dark={{ _after: { color: 'danger.300' } }}>
                        {t('phone')}
                    </FormControlLabel>
                    <Input
                        _dark={darkInput}
                        _placeholder={placeholderInput}
                        name="phone"
                        type="text"
                        placeholder={t('a_enter_phone')}
                        value={props.userSelected?.phone}
                    />
                    <Show when={errors('phone')} keyed>
                        <FormControlError class={formStyles.error_message_block}>
                            {t(errors('phone')?.[0] ?? '')}
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            <Show when={!props.userSelected?.id} keyed>
                <div class={`${formStyles.field_wrapper} ${formStyles.full}`}>
                    <FormControl isRequired isInvalid={!!errors('password')}>
                        <FormControlLabel class={formStyles.form_label} for="password" _dark={{ _after: { color: 'danger.300' } }}>
                            {t('password')}
                        </FormControlLabel>
                        <Input
                             autocomplete="password"
                            _dark={darkInput}
                            _placeholder={placeholderInput}
                            name="password"
                            type="password"
                            placeholder={t('a_your_password')}
                        />
                        <Show when={errors('password')} keyed>
                            <FormControlError class={formStyles.error_message_block}>
                                {t(errors('password')?.[0] ?? '')}
                            </FormControlError>
                        </Show>
                    </FormControl>
                </div>
                <div class={`${formStyles.field_wrapper} ${formStyles.full}`}>
                    <FormControl isRequired isInvalid={!!errors('passwordConfirmation')}>
                        <FormControlLabel class={formStyles.form_label} for="passwordConfirmation" _dark={{ _after: { color: 'danger.300' } }}>
                            {t('confirm_password')}
                        </FormControlLabel>
                        <Input
                             autocomplete="passwordConfirmation"
                            _dark={darkInput}
                            _placeholder={placeholderInput}
                            name="passwordConfirmation"
                            type="password"
                            placeholder={t('a_repeat_password')}
                        />
                        <Show when={errors('passwordConfirmation')} keyed>
                            <FormControlError class={formStyles.error_message_block}>
                                {t(errors('passwordConfirmation')?.[0] ?? '')}
                            </FormControlError>
                        </Show>
                    </FormControl>
                </div>
            </Show>

            {/*<div class="field_wrapper">*/}
            {/*    <FormControl id="roles" isInvalid={!!errors('roles')}>*/}
            {/*        <FormControlLabel _after={{ content: '' }} class={'form_label'} for="roles" _dark={{ _after: { color: 'danger.300' } }}>*/}
            {/*            {t('roles')}*/}
            {/*        </FormControlLabel>*/}
            {/*        <MultiSelect*/}
            {/*            name={'roles'}*/}
            {/*            options={props.rolesList}*/}
            {/*            placeholder={'a_select_roles'}*/}
            {/*            value={data().roles}*/}
            {/*            onChange={handleMultiSelect('roles')}*/}
            {/*            valueProperty={'id'}*/}
            {/*            labelProperty={'name'}*/}
            {/*            class={'w-full'}*/}
            {/*        />*/}
            {/*        <Show when={errors('roles')} keyed>*/}
            {/*            <FormControlError class="error_message_block">*/}
            {/*                {t(errors('roles')?.[0] ?? '')}*/}
            {/*            </FormControlError>*/}
            {/*        </Show>*/}
            {/*    </FormControl>*/}
            {/*</div>*/}

            <div class={formStyles.update_save_buttons_container}>
                <div class={formStyles.button_full}>
                    <Button
                        _dark={darkNeutralButton}
                        class={formStyles.button_full}>
                        onClick={() => navigate('/users')}
                        colorScheme="neutral"
                    >
                        {t('a_back')}
                    </Button>
                </div>
                <div class={formStyles.button_full}>
                    <Button
                        _dark={darkPrimaryButtonWithBackground}
                        class={formStyles.button_full}
                        type="submit"
                        isDisabled={!isValid()}
                        isLoading={isSubmitting()}
                        loadingText={t('a_submitting')}
                    >
                        {t('a_save')}
                    </Button>
                </div>
                <div class={formStyles.button_full}>
                    <Button
                        _dark={darkNeutralButton}
                        class={userFormStyles.full_w}
                        onClick={() => navigate('/users')}
                    >
                        {t('a_back')}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default UserForm;
