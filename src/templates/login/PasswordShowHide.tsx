import type { InputFormProps } from '@digichanges/solid-components';
import { InputPassword } from '@digichanges/solid-components';
import { Component } from 'solid-js';
import { useField } from 'solid-js-form';

type PasswordShowHideProps = Omit<InputFormProps, 'value'>

const PasswordShowHide: Component<PasswordShowHideProps> = props =>
{
    const { field, form } = useField( props.name );
    const formHandler = form.formHandler;

    return (
        <InputPassword
            {...props}
            value={field.value() as string}
            useHandler={formHandler}
            errorChildren={field.error()}
        />
    );
};

export default PasswordShowHide;
