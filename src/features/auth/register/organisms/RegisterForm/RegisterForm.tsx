import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import {
    Button,
    FormControl,
    FormControlError,
    FormControlLabel,
    Input,
    Radio,
    RadioGroup,
    Select,
    SelectContent,
    SelectIcon,
    SelectListbox,
    SelectOptGroup,
    SelectOption,
    SelectOptionIndicator,
    SelectOptionText,
    SelectPlaceholder,
    SelectTrigger,
    SelectValue,
    SimpleOption,
    SimpleSelect } from '@hope-ui/core';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, For } from 'solid-js';
import { InferType } from 'yup';
import { country, userDocumentTypeOptions } from '../../../../../entities';
import RegisterSchema from '../../../validations/schemas/RegisterSchema.';
import { RegisterApi, RegisterResponse } from '../../interfaces/createAccount';
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
        errors,
        form,
        isValid,
        setFields,
        setTouched,
        // @ts-ignore
    } = createForm<InferType<typeof RegisterSchema>>( {
        initialValues: { },
        extend: validator( { schema: RegisterSchema } ),
        onSuccess: props.onSuccess,
        onError: props.onError,
        onSubmit: values => props.onSubmit( values as any ),
    } );

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
                            <FormControlError><Text message={errors( 'firstName' )[0]} /></FormControlError>
                        </FormControl>
                    </div>

                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'lastName' )} >
                            <FormControlLabel for="lastName"><Text message="last_name"/></FormControlLabel>
                            <Input name="lastName" type="text" placeholder={t( 'a_enter_last_name' ) as string} />
                            <FormControlError><Text message={errors( 'lastName' )[0]} /></FormControlError>
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
                            <FormControlError><Text message={errors( 'email' )[0]} /></FormControlError>
                        </FormControl>
                    </div>

                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'phone' )} >
                            <FormControlLabel for="phone"><Text message="phone"/></FormControlLabel>
                            <Input name="phone" type="text" placeholder={t( 'a_enter_phone' ) as string} />
                            <FormControlError><Text message={errors( 'phone' )[0]} /></FormControlError>
                        </FormControl>
                    </div>

                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'documentType' )}>
                            <FormControlLabel><Text message="documentType"/></FormControlLabel>
                            <div class="field_justify_between">
                                <FormControl isRequired isInvalid={!!errors( 'documentType' )} class="small">
                                    <Select
                                        onChange={value => setFields( 'documentType', value )}
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
                                    <div class="flex absolute">
                                        <FormControlError><Text message={errors( 'documentType' ) && errors( 'documentType' )[0] || 'loading'} /></FormControlError>
                                    </div>
                                </FormControl>

                                <FormControl isRequired isInvalid={!!errors( 'documentNumber' )} class="big">
                                    <Input name="documentNumber" type="text" placeholder={t( 'a_enter_id_number' ) as string} />
                                    <div class="flex absolute">
                                        <FormControlError><Text message={errors( 'documentNumber' )[0]} /></FormControlError>
                                    </div>
                                </FormControl>
                            </div>
                        </FormControl>
                    </div>

                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'gender' )} >
                            <FormControlLabel for="gender"><Text message="gender"/></FormControlLabel>
                            <RadioGroup defaultValue="other">
                                <div class="field_justify_between">
                                    <Radio name="gender" id="gender-f" value="fame">F</Radio>
                                    <Radio name="gender" id="gender-m" value="male">M</Radio>
                                    <Radio name="gender" id="gender-o" value="other" ><Text message="a_gender_other"/></Radio>
                                </div>
                            </RadioGroup>
                            <FormControlError><Text message={errors( 'gender' )[0]} /></FormControlError>
                        </FormControl>
                    </div>

                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'birthday' )}>
                            <FormControlLabel for="birthday"><Text message="birthday"/></FormControlLabel>
                            <Input name="birthday" type="date" placeholder={t( 'a_choose_birthday' ) as string} />
                            <FormControlError><Text message={errors( 'birthday' )[0]} /></FormControlError>
                        </FormControl>
                    </div>

                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'country' )}>
                            <FormControlLabel><Text message="country"/></FormControlLabel>
                            <SimpleSelect
                                placeholder={<Text message="a_select_country"/> as string}
                                onChange={value => setFields( 'country', value )}
                            >
                                <For each={ country }>
                                    {/* @ts-ignore */}
                                    {item => <SimpleOption value={item.value}>{item.label}</SimpleOption>}
                                </For>
                            </SimpleSelect>
                            <FormControlError>{errors( 'country' )[0]}</FormControlError>
                        </FormControl>
                    </div>
                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'address' )} >
                            <FormControlLabel for="address"><Text message="address"/></FormControlLabel>
                            <Input name="address" type="text" placeholder={t( 'a_your_address' ) as string} />
                            <FormControlError><Text message={errors( 'address' )[0]} /></FormControlError>
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
                            <FormControlError><Text message={errors( 'password' )[0]} /></FormControlError>
                        </FormControl>
                    </div>

                    <div class="field_wrapper full">
                        <FormControl isRequired isInvalid={!!errors( 'passwordConfirmation' )}>
                            <FormControlLabel for="passwordConfirmation"><Text message="confirm_password"/></FormControlLabel>
                            <Input name="passwordConfirmation" type="password" placeholder={t( 'a_repeat_password' ) as string}/>
                            <FormControlError><Text message={errors( 'passwordConfirmation' )[0]} /></FormControlError>
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

