import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import { Button, FormControl, FormControlError, FormControlLabel, Input } from '@hope-ui/core';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, createEffect, Show } from 'solid-js';
import { InferType } from 'yup';
import { country, gender, userDocumentTypeOptions } from '../../../../../entities';
import RegisterSchema from '../../../validations/schemas/RegisterSchema.';
import { RegisterApi, RegisterResponse } from '../../interfaces/createAccount';
import { Select } from '../../../../shared/molecules/Select/Select';
import Radio from '../../../../shared/molecules/Radio/Radio';
import DatePicker from '../../../../shared/molecules/DatePicker/DatePicker';

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
            <h1 class="section_title"><Text message="a_create_account" /></h1>
            <div class="form_flex">
                <div class="section mid">
                    <h3 class="group_field_full_title"><Text message="a_basic_information" /></h3>
                </div>

                <div class="section mid">
                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'firstName' )} >
                            <FormControlLabel for="firstName"><Text message="first_name"/></FormControlLabel>
                            <Input name="firstName" type="text" placeholder={t( 'a_enter_first_name' ) as string} />
                            <Show when={errors( 'firstName' )} keyed>
                                <FormControlError><Text message={errors( 'firstName' )![0]} /></FormControlError>
                            </Show>
                        </FormControl>
                    </div>

                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'lastName' )} >
                            <FormControlLabel for="lastName"><Text message="last_name"/></FormControlLabel>
                            <Input name="lastName" type="text" placeholder={t( 'a_enter_last_name' ) as string} />
                            <Show when={errors( 'lastName' )} keyed>
                                <FormControlError><Text message={errors( 'lastName' )![0]} /></FormControlError>
                            </Show>
                        </FormControl>
                    </div>
                </div>

                <div class="section mid">
                    <p class="group_field_full_info"><Text message="av_email_valid" /></p>
                    <p class="group_field_full_info"><Text message="a_used_sign_in" /></p>
                </div>

                <div class="section mid">
                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'email' )} >
                            <FormControlLabel for="email"><Text message="email"/></FormControlLabel>
                            <Input name="email" type="text" placeholder={t( 'a_your_email' ) as string} />
                            <Show when={errors( 'email' )} keyed>
                                <FormControlError><Text message={errors( 'email' )![0]} /></FormControlError>
                            </Show>
                        </FormControl>
                    </div>

                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'phone' )} >
                            <FormControlLabel for="phone"><Text message="phone"/></FormControlLabel>
                            <Input name="phone" type="text" placeholder={t( 'a_enter_phone' ) as string} />
                            <Show when={errors( 'phone' )} keyed>
                                <FormControlError><Text message={errors( 'phone' )![0]} /></FormControlError>
                            </Show>
                        </FormControl>
                    </div>

                    <div class="field_wrapper full">
                        <div class="field_justify_between">
                            <FormControl isRequired isInvalid={!!errors( 'documentType' )}>
                                <FormControlLabel for="documentType"><Text message="document_type"/></FormControlLabel>
                                <Select
                                    name={'documentType'}
                                    options={userDocumentTypeOptions}
                                    placeholder={'type_id'}
                                    value={data().documentType}
                                    onChange={handleSelect( 'documentType' )}
                                    valueProperty={'value'}
                                    labelProperty={'label'}
                                />
                                <Show when={errors( 'documentType' )} keyed>
                                    <div class="flex absolute">
                                        <FormControlError><Text message={errors( 'documentType' )![0] || ''} /></FormControlError>
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
                            <Radio
                                name={'gender'}
                                options={gender}
                                value={data().gender}
                                onChange={handleSelect( 'gender' )}
                            />
                            <Show when={errors( 'gender' )} keyed>
                                <FormControlError><Text message={errors( 'gender' )![0] || ''} /></FormControlError>
                            </Show>
                        </FormControl>
                    </div>

                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'birthday' )}>
                            <FormControlLabel for="birthday"><Text message="birthday"/></FormControlLabel>
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
                            />
                            {/* <Input name="birthday" type="date" placeholder={t( 'a_choose_birthday' ) as string} /> */}
                            <Show when={errors( 'birthday' )} keyed>
                                <FormControlError><Text message={errors( 'birthday' )![0]} /></FormControlError>
                            </Show>
                        </FormControl>
                    </div>

                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'country' )}>
                            <FormControlLabel for="country"><Text message="country"/></FormControlLabel>
                            <Select
                                name={'country'}
                                placeholder={'a_select_country'}
                                options={country}
                                value={data().country}
                                onChange={handleSelect( 'country' )}
                                valueProperty={'value'}
                                labelProperty={'label'}
                            />
                            <Show when={errors( 'country' )} keyed>
                                <FormControlError><Text message={errors( 'country' )![0] || ''} /></FormControlError>
                            </Show>
                        </FormControl>
                    </div>
                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'address' )} >
                            <FormControlLabel for="address"><Text message="address"/></FormControlLabel>
                            <Input name="address" type="text" placeholder={t( 'a_your_address' ) as string} />
                            <Show when={errors( 'address' )} keyed>
                                <FormControlError>
                                    <Text message={errors( 'address' )![0]} />
                                </FormControlError>
                            </Show>
                        </FormControl>
                    </div>
                </div>

                <div class="section mid">
                    <p class="group_field_full_info"><Text message="a_security" /></p>
                    <p class="group_field_full_info"><Text message="a_used_sign_in" /></p>
                </div>

                <div class="section mid">
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
                </div>
            </div>

            <div class="update_save_buttons_container">
                <Button as={Link} colorScheme="neutral" href="/users">
                    <Text message="a_close" />
                </Button>
                <Button type="submit" disabled={!isValid()}>
                    <Text message="a_save"/>
                </Button>
            </div>
        </form>
    );
};
export default RegisterForm;

