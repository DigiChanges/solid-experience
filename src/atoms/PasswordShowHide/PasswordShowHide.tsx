import type { InputFormProps } from '@digichanges/solid-components';
import { InputPassword } from '@digichanges/solid-components';
import { Component } from 'solid-js';
import { useField } from 'solid-js-form';
import { handleSelect } from './handlers';

type InputFormPropsWithoutValue = Omit<InputFormProps, 'value' | 'placeholder' | 'labelName'>;
type PasswordShowHideProps = InputFormPropsWithoutValue & {
    placeholder?: string | HTMLElement | ( string | HTMLElement )[];
    labelName?: string | HTMLElement | ( string | HTMLElement )[];
};

const PasswordShowHide: Component<PasswordShowHideProps> = props =>
{
    const { field, form } = useField( props.name );

    return (
        <InputPassword
            value={field.value() as string}
            errorChildren={field.error()}
            onChange={handleSelect( { setValue: form.setValue } )}
            {...props}
            placeholder={props.placeholder as string}
            labelName={props.labelName as string}
        />
    );
};

export default PasswordShowHide;
