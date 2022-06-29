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
    SimpleOption,
    SimpleSelect} from '@hope-ui/solid';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, For } from 'solid-js';
import { InferType } from 'yup';
import Title from '../../../../../atoms/Title';
import { country, userDocumentTypeOptions } from '../../../../../entities';
import RegisterSchema from '../../../validations/schemas/RegisterSchema.';
import { RegisterApi, RegisterResponse } from '../../interfaces/createAccount';
import styles from './RegisterForm.module.css';
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
            <section class={styles.section_title} >
                <Title class={styles.title} titleType="h1">
                    <Text message="a_create_account" />
                </Title>
            </section>
            <div class={styles.form} >
                <div class={styles.form_container_span}>
                    <span class={styles.form_span}><Text message="a_basic_information" /></span>
                </div>
                <div class={styles.field_wrapper}>
                    <FormControl required invalid={!!errors( 'firstName' )} class={styles.form_control} >
                        <FormLabel for="firstName"><Text message="first_name"/></FormLabel>
                        <Input name="firstName" type="text" placeholder={t( 'a_enter_first_name' )} />
                        <FormErrorMessage><Text message={errors( 'firstName' )[0]} /></FormErrorMessage>
                    </FormControl>

                    <FormControl required invalid={!!errors( 'lastName' )} class={styles.form_control} >
                        <FormLabel for="lastName"><Text message="last_name"/></FormLabel>
                        <Input name="lastName" type="text" placeholder={t( 'a_enter_last_name' )} />
                        <FormErrorMessage><Text message={errors( 'lastName' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>
                <div class={styles.info_email}>
                    <span class={styles.info_span}><Text message="av_email_valid" /></span>
                    <span class={styles.info_span}><Text message="a_used_sign_in" /></span>
                </div>
                <div class={styles.field_wrapper}>

                    <FormControl required invalid={!!errors( 'email' )} class={styles.form_control} >
                        <FormLabel for="email"><Text message="email"/></FormLabel>
                        <Input name="email" type="text" placeholder={t( 'a_your_email' )} />
                        <FormErrorMessage><Text message={errors( 'email' )[0]} /></FormErrorMessage>
                    </FormControl>

                    <FormControl required invalid={!!errors( 'phone' )} class={styles.form_control} >
                        <FormLabel for="phone"><Text message="phone"/></FormLabel>
                        <Input name="phone" type="text" placeholder={t( 'a_enter_phone' )} />
                        <FormErrorMessage><Text message={errors( 'phone' )[0]} /></FormErrorMessage>
                    </FormControl>

                    <div class={styles.container_document_type}>
                        <div class={styles.field_small}>
                            <FormControl required invalid={!!errors( 'documentType' )}>
                                <FormLabel><Text message="documentType" /></FormLabel>
                                <SimpleSelect
                                    placeholder={<Text message="type_id"/> as string}
                                    onChange={value => setFields( 'documentType', value )}
                                >
                                    <For each={ userDocumentTypeOptions }>
                                        {/* @ts-ignore  */}
                                        {item => <SimpleOption value={item.value}>{item.label}</SimpleOption>}
                                    </For>
                                </SimpleSelect>
                                <FormErrorMessage>{errors( 'documentType' )[0] === '' ? 'required' : ''}</FormErrorMessage>
                            </FormControl>
                        </div>
                        <div class={styles.container_document_number}>
                            <FormControl required invalid={!!errors( 'documentNumber' )}>
                                <Input name="documentNumber" type="text" placeholder={t( 'a_enter_id_number' )} />
                                <FormErrorMessage><Text message={errors( 'documentNumber' )[0]} /></FormErrorMessage>
                            </FormControl>
                        </div>
                    </div>

                    <div class={styles.gender_container}>
                        <FormControl required invalid={!!errors( 'gender' )} >
                            <FormLabel for="gender"><Text message="gender"/></FormLabel>
                            <RadioGroup defaultValue="other">
                                <div class={styles.radio_group}>
                                    <Radio name="gender" id="gender-f" value="fame" class={styles.radio_group_input_f_m}>F</Radio>
                                    <Radio name="gender" id="gender-m" value="male" class={styles.radio_group_input_f_m}>M</Radio>
                                    <Radio name="gender" id="gender-o" value="other" ><Text message="a_gender_other"/></Radio>
                                </div>
                            </RadioGroup>
                            <FormErrorMessage><Text message={errors( 'gender' )[0]} /></FormErrorMessage>
                        </FormControl>
                    </div>
                    <FormControl required invalid={!!errors( 'birthday' )} class={styles.form_control}>
                        <FormLabel for="birthday"><Text message="birthday"/></FormLabel>
                        <Input name="birthday" type="date" placeholder={t( 'a_choose_birthday' )} />
                        <FormErrorMessage><Text message={errors( 'birthday' )[0]} /></FormErrorMessage>
                    </FormControl>

                    <FormControl required invalid={!!errors( 'country' )} class={styles.form_control}>
                        <FormLabel><Text message="country"/></FormLabel>
                        <SimpleSelect
                            placeholder={<Text message="a_select_enable"/> as string}
                            onChange={value => setFields( 'country', value )}
                        >
                            <For each={ country }>
                                {/* @ts-ignore */}
                                {item => <SimpleOption value={item.value}>{item.label}</SimpleOption>}
                            </For>
                        </SimpleSelect>
                        <FormErrorMessage>{errors( 'country' )[0]}</FormErrorMessage>
                    </FormControl>
                    <FormControl required invalid={!!errors( 'address' )} class={styles.form_control} >
                        <FormLabel for="address"><Text message="address"/></FormLabel>
                        <Input name="address" type="text" placeholder={t( 'a_your_address' )} />
                        <FormErrorMessage><Text message={errors( 'address' )[0]} /></FormErrorMessage>
                    </FormControl>

                </div>
            </div>

            <div class={styles.info_segurity}>
                <div class={styles.info_segurity_container}>
                    <span class={styles.info_span}><Text message="a_security" /></span>
                    <span class={styles.info_span}><Text message="a_used_sign_in" /></span>
                </div>
                <div class={styles.password_container}>
                    <FormControl required invalid={!!errors( 'password' )} class={styles.form_control}>
                        <FormLabel for="password"><Text message="password"/></FormLabel>
                        <Input name="password" type="password" placeholder={t( 'a_your_password' )} />
                        <FormErrorMessage><Text message={errors( 'password' )[0]} /></FormErrorMessage>
                    </FormControl>

                    <FormControl required invalid={!!errors( 'passwordConfirmation' )} class={styles.form_control}>
                        <FormLabel for="passwordConfirmation"><Text message="confirm_password"/></FormLabel>
                        <Input name="passwordConfirmation" type="password" placeholder={t( 'a_repeat_password' )}/>
                        <FormErrorMessage><Text message={errors( 'passwordConfirmation' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>
            </div>
            <div class={styles.container_buttons}>
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

