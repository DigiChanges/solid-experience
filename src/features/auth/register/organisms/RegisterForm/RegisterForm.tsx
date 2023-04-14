import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import { Button, FormControl, FormControlError, FormControlLabel, Input } from '@hope-ui/core';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, Show } from 'solid-js';
import { InferType } from 'yup';
import { country, gender, userDocumentTypeOptions } from '../../../../../entities';
import RegisterSchema from '../../../validations/schemas/RegisterSchema.';
import { RegisterApi, RegisterResponse } from '../../interfaces/createAccount';
import { Select } from '../../../../shared/molecules/Select/Select';
import Radio from '../../../../shared/molecules/Radio/Radio';
import DatePicker from '../../../../shared/molecules/DatePicker/DatePicker';
import { darkInput, placeholderInput, darkNeutralButton, darkPrimaryButton } from '../../../../shared/constants/hopeAdapter';

interface UserUpdateTemplateProps
{
    onError: ( error: unknown ) => void;
    onSubmit: ( data: RegisterApi ) => Promise<RegisterResponse>;
    onSuccess: () => void;
    userPermission: Record<string, string>;
}

const RegisterForm: Component<UserUpdateTemplateProps> = ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;
    const {
        data,
        errors,
        form,
        isValid,
        setFields,
    } = createForm<InferType<typeof RegisterSchema>>( {
        extend: validator( { schema: RegisterSchema } ),
        onSuccess: props.onSuccess,
        onError: props.onError,
        onSubmit: values => props.onSubmit( values as any ),
    } );

    const handleSelect = ( field: keyof InferType<typeof RegisterSchema> ) => ( value: string | boolean ) =>
    {
        setFields( field, value, true );
    };

    const handleDate = ( field: keyof InferType<typeof RegisterSchema>, value: any ) =>
    {
        setFields( field, value, true );
    };

    return (
        <form ref={form}>
            <h1 class="section_title text-neutral-50"><Text message="a_create_account" /></h1>
            <div class="form_flex">
                <div class="section mid">
                    <h3 class="group_field_full_title text-neutral-50"><Text message="a_basic_information" /></h3>
                </div>

                <div class="section mid">
                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'firstName' )} >
                            <FormControlLabel class={'mb-1'} for="firstName"><Text class={'form_label'} message="first_name"/></FormControlLabel>
                            <Input
                                _dark={darkInput}
                                _placeholder={placeholderInput}
                                name="firstName"
                                type="text"
                                placeholder={t( 'a_enter_first_name' ) as string}
                            />
                            <Show when={errors( 'firstName' )} keyed>
                                <FormControlError class="error_message_block"><Text message={errors( 'firstName' )![0]} /></FormControlError>
                            </Show>
                        </FormControl>
                    </div>

                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'lastName' )} >
                            <FormControlLabel class={'mb-1'} for="lastName"><Text class={'form_label'} message="last_name"/></FormControlLabel>
                            <Input
                                _dark={darkInput}
                                _placeholder={placeholderInput}
                                name="lastName"
                                type="text"
                                placeholder={t( 'a_enter_last_name' ) as string} />
                            <Show when={errors( 'lastName' )} keyed>
                                <FormControlError class="error_message_block"><Text message={errors( 'lastName' )![0]} /></FormControlError>
                            </Show>
                        </FormControl>
                    </div>
                </div>

                <div class="section mid">
                    <p class="group_field_full_info text-neutral-50"><Text message="av_email_valid" /></p>
                    <p class="group_field_full_info text-neutral-50"><Text message="a_used_sign_in" /></p>
                </div>

                <div class="section mid">
                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'email' )} >
                            <FormControlLabel class={'mb-1'} for="email"><Text class={'form_label'} message="email"/></FormControlLabel>
                            <Input
                                _dark={darkInput}
                                _placeholder={placeholderInput}
                                name="email"
                                type="text"
                                placeholder={t( 'a_your_email' ) as string}
                            />
                            <Show when={errors( 'email' )} keyed>
                                <FormControlError class="error_message_block"><Text message={errors( 'email' )![0]} /></FormControlError>
                            </Show>
                        </FormControl>
                    </div>

                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'phone' )} >
                            <FormControlLabel class={'mb-1'} for="phone"><Text class={'form_label'} message="phone"/></FormControlLabel>
                            <Input
                                _dark={darkInput}
                                _placeholder={placeholderInput}
                                name="phone"
                                type="text"
                                placeholder={t( 'a_enter_phone' ) as string}
                            />
                            <Show when={errors( 'phone' )} keyed>
                                <FormControlError class="error_message_block"><Text message={errors( 'phone' )![0]} /></FormControlError>
                            </Show>
                        </FormControl>
                    </div>

                    <div class="field_wrapper full">
                        <div class="field_justify_between h-[90px]">
                            <FormControl isRequired isInvalid={!!errors( 'documentType' )} class={'w-[25%]'}>
                                <FormControlLabel class={'mb-1'} for="documentType"><Text class={'form_label'} message="document_type"/></FormControlLabel>
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
                                    <FormControlError class="error_message_block"><Text message={errors( 'documentType' )![0] || ''} /></FormControlError>
                                </Show>
                            </FormControl>

                            <FormControl isRequired isInvalid={!!errors( 'documentNumber' )} class="big">
                                <FormControlLabel class={'mb-1'} for="documentNumber"><Text class={'form_label'} message="document_number"/></FormControlLabel>
                                <Input
                                    _dark={darkInput}
                                    _placeholder={placeholderInput}
                                    name="documentNumber"
                                    type="text"
                                    placeholder={t( 'a_enter_id_number' ) as string}
                                />
                                <Show when={errors( 'documentNumber' )} keyed>
                                    <FormControlError class="error_message_block"><Text message={errors( 'documentNumber' )![0]} /></FormControlError>
                                </Show>
                            </FormControl>
                        </div>
                    </div>

                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'gender' )}>
                            <FormControlLabel class={'mb-1'} for="gender"><Text class={'form_label'} message="gender"/></FormControlLabel>
                            <Radio
                                name={'gender'}
                                options={gender}
                                value={data().gender}
                                onChange={handleSelect( 'gender' )}
                            />
                            <Show when={errors( 'gender' )} keyed>
                                <FormControlError class="error_message_block"><Text message={errors( 'gender' )![0] || ''} /></FormControlError>
                            </Show>
                        </FormControl>
                    </div>

                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'birthday' )}>
                            <FormControlLabel class={'mb-1'} for="birthday"><Text class={'form_label'} message="birthday"/></FormControlLabel>
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
                                theme={'dark'}
                            />
                            <Show when={errors( 'birthday' )} keyed>
                                <FormControlError class="error_message_block"><Text message={errors( 'birthday' )![0]} /></FormControlError>
                            </Show>
                        </FormControl>
                    </div>

                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'country' )}>
                            <FormControlLabel class={'mb-1'} for="country"><Text class={'form_label'} message="country"/></FormControlLabel>
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
                                <FormControlError class="error_message_block"><Text message={errors( 'country' )![0] || ''} /></FormControlError>
                            </Show>
                        </FormControl>
                    </div>
                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'address' )} >
                            <FormControlLabel class={'mb-1'} for="address"><Text class={'form_label'} message="address"/></FormControlLabel>
                            <Input
                                _dark={darkInput}
                                _placeholder={placeholderInput}
                                name="address"
                                type="text"
                                placeholder={t( 'a_your_address' ) as string}
                            />
                            <Show when={errors( 'address' )} keyed>
                                <FormControlError class="error_message_block">
                                    <Text message={errors( 'address' )![0]} />
                                </FormControlError>
                            </Show>
                        </FormControl>
                    </div>
                </div>

                <div class="section mid">
                    <p class="group_field_full_info text-neutral-50"><Text message="a_security" /></p>
                    <p class="group_field_full_info text-neutral-50"><Text message="a_used_sign_in" /></p>
                </div>

                <div class="section mid">
                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'password' )}>
                            <FormControlLabel class={'mb-1'} for="password"><Text class={'form_label'} message="password"/></FormControlLabel>
                            <Input
                                _dark={darkInput}
                                _placeholder={placeholderInput}
                                name="password"
                                type="password"
                                placeholder={t( 'a_your_password' ) as string}
                            />
                            <Show when={errors( 'password' )} keyed>
                                <FormControlError class="error_message_block"><Text message={errors( 'password' )![0]} /></FormControlError>
                            </Show>
                        </FormControl>
                    </div>

                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'passwordConfirmation' )}>
                            <FormControlLabel class={'mb-1'} for="passwordConfirmation"><Text class={'form_label'} message="confirm_password"/></FormControlLabel>
                            <Input
                                _dark={darkInput}
                                _placeholder={placeholderInput}
                                name="passwordConfirmation"
                                type="password"
                                placeholder={t( 'a_repeat_password' ) as string}
                            />
                            <Show when={errors( 'passwordConfirmation' )} keyed>
                                <FormControlError class="error_message_block"><Text message={errors( 'passwordConfirmation' )![0]} /></FormControlError>
                            </Show>
                        </FormControl>
                    </div>
                </div>
            </div>

            <div class="update_save_buttons_container">
                <Button
                    as={Link}
                    href="/users"
                    colorScheme="neutral"
                    _dark={darkNeutralButton}
                >
                    <Text message="a_close" />
                </Button>
                <Button
                    _dark={darkPrimaryButton}
                    type="submit"
                    disabled={!isValid()}
                >
                    <Text message="a_save"/>
                </Button>
            </div>
        </form>
    );
};
export default RegisterForm;

