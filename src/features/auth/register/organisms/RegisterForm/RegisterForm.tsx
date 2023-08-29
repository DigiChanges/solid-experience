import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import { Button, FormControl, FormControlError, FormControlLabel, Input } from '@hope-ui/core';
import { A } from 'solid-start';
import { Component, Show } from 'solid-js';
import { InferType } from 'yup';
import { country, gender } from '../../../../../entities';
import RegisterSchema from '../../../validations/schemas/RegisterSchema.';
import { RegisterApi, RegisterResponse } from '../../interfaces/createAccount';
import { Select } from '../../../../shared/molecules/Select/Select';
import Radio from '../../../../shared/molecules/Radio/Radio';
import DatePicker from '../../../../shared/molecules/DatePicker/DatePicker';
import { darkInput, placeholderInput, darkNeutralButton, darkPrimaryButton } from '../../../../shared/constants/hopeAdapter';
import useTranslation from '../../../../shared/hooks/useTranslation';
import typoStyles from '../../../../../styles/typography.module.css';
import formStyles from '../../../../../styles/form.module.css';
import layoutStyles from '../../../../../styles/layout.module.css';
import registerStyles from './registerForm.module.css';

interface UserUpdateTemplateProps
{
    onError: (error: unknown) => void;
    onSubmit: (data: RegisterApi) => Promise<RegisterResponse>;
    onSuccess: () => void;
    userPermission: Record<string, string>;
}

const RegisterForm: Component<UserUpdateTemplateProps> = (props) =>
{
    const { translate: t } = useTranslation();
    const {
        data,
        errors,
        form,
        isValid,
        setFields
    } = createForm<InferType<typeof RegisterSchema>>({
        initialValues: {
            permissions: []
        },
        extend: validator({ schema: RegisterSchema }),
        onSuccess: props.onSuccess,
        onError: props.onError,
        onSubmit: values => props.onSubmit(values as any)
    });

    const handleSelect = (field: keyof InferType<typeof RegisterSchema>) => (value: string | any[]) =>
    {
        setFields(field, value, true);
    };

    const handleDate = (field: keyof InferType<typeof RegisterSchema>, value: any) =>
    {
        setFields(field, value, true);
    };

    return (
        <form ref={form}>
            <h1 class={typoStyles.section_title}> { t('a_create_account') }</h1>
            <div class={formStyles.form_flex}>
                <div class={`${layoutStyles.section} ${layoutStyles.mid}`}>
                    <h3 class={typoStyles.group_field_full_title}>{ t('a_basic_information') } </h3>
                </div>

                <div class={`${layoutStyles.section} ${layoutStyles.mid}`}>
                    <div class={`${formStyles.field_wrapper} ${formStyles.full}`}>
                        <FormControl isRequired isInvalid={!!errors('firstName')} >
                            <FormControlLabel class={formStyles.form_label} for="firstName" _dark={{ _after: { color: 'danger.300' } }}>
                                {t('first_name')}
                            </FormControlLabel>
                            <Input
                                _dark={darkInput}
                                _placeholder={placeholderInput}
                                name="firstName"
                                type="text"
                                placeholder={t('a_enter_first_name') as string}
                            />
                            <Show when={errors('firstName')} keyed>
                                <FormControlError class={formStyles.error_message_block}>
                                    {t(errors('firstName')?.[0] ?? '')}
                                </FormControlError>
                            </Show>
                        </FormControl>
                    </div>

                    <div class={`${formStyles.field_wrapper} ${formStyles.full}`}>
                        <FormControl isRequired isInvalid={!!errors('lastName')} >
                            <FormControlLabel class={formStyles.form_label} for="lastName" _dark={{ _after: { color: 'danger.300' } }}>
                                 {t('last_name')}
                            </FormControlLabel>
                            <Input
                                _dark={darkInput}
                                _placeholder={placeholderInput}
                                name="lastName"
                                type="text"
                                placeholder={t('a_enter_last_name') as string} />
                            <Show when={errors('lastName')} keyed>
                                <FormControlError class={formStyles.error_message_block}>
                                    {t(errors('lastName')?.[0] ?? '')}
                                </FormControlError>
                            </Show>
                        </FormControl>
                    </div>
                </div>

                <div class={`${layoutStyles.section} ${layoutStyles.mid}`}>
                    <p class={typoStyles.group_field_full_info}>{t('av_email_valid')}</p>
                    <p class={typoStyles.group_field_full_info}>{t('a_used_sign_in')}</p>
                </div>

                <div class={`${layoutStyles.section} ${layoutStyles.mid}`}>
                    <div class={`${formStyles.field_wrapper} ${formStyles.full}`}>
                        <FormControl isRequired isInvalid={!!errors('email')} >
                            <FormControlLabel class={formStyles.form_label} for="email" _dark={{ _after: { color: 'danger.300' } }}>
                                {t('email')}
                            </FormControlLabel>
                            <Input
                                _dark={darkInput}
                                _placeholder={placeholderInput}
                                name="email"
                                type="text"
                                placeholder={t('a_your_email') as string}
                            />
                            <Show when={errors('email')} keyed>
                                <FormControlError class={formStyles.error_message_block}>
                                    {t(errors('email')?.[0] ?? '')}
                                </FormControlError>
                            </Show>
                        </FormControl>
                    </div>

                    <div class={`${formStyles.field_wrapper} ${formStyles.full}`}>
                        <FormControl isRequired isInvalid={!!errors('phone')} >
                            <FormControlLabel class={formStyles.form_label} for="phone" _dark={{ _after: { color: 'danger.300' } }}>
                                {t('phone')}
                            </FormControlLabel>
                            <Input
                                _dark={darkInput}
                                _placeholder={placeholderInput}
                                name="phone"
                                type="text"
                                placeholder={t('a_enter_phone') as string}
                            />
                            <Show when={errors('phone')} keyed>
                                <FormControlError class={formStyles.error_message_block}>
                                    {t(errors('phone')?.[0] ?? '')}
                                </FormControlError>
                            </Show>
                        </FormControl>
                    </div>

                    <div class={`${formStyles.field_wrapper} ${formStyles.full}`}>
                        <FormControl isRequired isInvalid={!!errors('genre')}>
                            <FormControlLabel class={formStyles.form_label} for="genre" _dark={{ _after: { color: 'danger.300' } }}>
                                {t('gender')}
                            </FormControlLabel>
                            <Radio
                                name={'genre'}
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

                    <div class={`${formStyles.field_wrapper} ${formStyles.full}`}>
                        <FormControl isRequired isInvalid={!!errors('birthdate')}>
                            <FormControlLabel class={formStyles.form_label} for="birthdate" _dark={{ _after: { color: 'danger.300' } }}>
                                {t('birthday')}
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
                                customizeCalendar={ 'register-birthday' }
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

                    <div class={`${formStyles.field_wrapper} ${formStyles.full}`}>
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
                                class={registerStyles.selectCountry}
                            />
                            <Show when={errors('country')} keyed>
                                <FormControlError class={formStyles.error_message_block}>
                                    {t(errors('country')?.[0] ?? '')}
                                </FormControlError>
                            </Show>
                        </FormControl>
                    </div>
                </div>

                <div class={`${layoutStyles.section} ${layoutStyles.mid}`}>
                    <p class={typoStyles.group_field_full_info}>{t('a_security')}</p>
                    <p class={typoStyles.group_field_full_info}>{t('a_used_sign_in')}</p>
                </div>

                <div class={`${layoutStyles.section} ${layoutStyles.mid}`}>
                    <div class={`${formStyles.field_wrapper} ${formStyles.full}`}>
                        <FormControl isRequired isInvalid={!!errors('password')}>
                            <FormControlLabel class={formStyles.form_label} for="password" _dark={{ _after: { color: 'danger.300' } }}>
                                {t('password')}
                            </FormControlLabel>
                            <Input
                                _dark={darkInput}
                                _placeholder={placeholderInput}
                                name="password"
                                type="password"
                                placeholder={t('a_your_password') as string}
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
                                _dark={darkInput}
                                _placeholder={placeholderInput}
                                name="passwordConfirmation"
                                type="password"
                                placeholder={t('a_repeat_password') as string}
                            />
                            <Show when={errors('passwordConfirmation')} keyed>
                                <FormControlError class={formStyles.error_message_block}>
                                    {t(errors('passwordConfirmation')?.[0] ?? '')}
                                </FormControlError>
                            </Show>
                        </FormControl>
                    </div>
                </div>
            </div>

            <div class={formStyles.update_save_buttons_container}>
                <Button
                    as={A}
                    href="/auth/login"
                    colorScheme="neutral"
                    _dark={darkNeutralButton}
                >
                    {t('a_back')}
                </Button>
                <Button
                    _dark={darkPrimaryButton}
                    type="submit"
                    disabled={!isValid()}
                >
                    {t('a_save')}
                </Button>
            </div>
        </form>
    );
};

export default RegisterForm;
