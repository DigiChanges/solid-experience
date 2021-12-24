import type { InputFormProps } from '@digichanges/solid-components';
import { InputForm } from '@digichanges/solid-components';
import { Component } from 'solid-js';
import { useField } from 'solid-js-form';

type InputProps = Omit<InputFormProps, 'value'>

const Input: Component<InputProps> = ( props ) =>
{
    const { field, form } = useField( props.name );
    const formHandler = form.formHandler;

    return (
        <InputForm
            {...props}
            value={field.value() as string}
            errorChildren={field.error()}
            useHandler={formHandler}
        />
    );
};

export default Input;
