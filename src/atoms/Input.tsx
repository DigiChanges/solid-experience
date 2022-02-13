import type { InputFormProps } from '@digichanges/solid-components';
import { InputForm } from '@digichanges/solid-components';
import { Component } from 'solid-js';
import { useField } from 'solid-js-form';

type InputFormPropsWithoutValue = Omit<InputFormProps, 'value'>;
type InputProps = InputFormPropsWithoutValue & {
    value?: any;
};

type setValue = ( name: string, value: any ) => void;

const handleSelect = ( { setValue }: { setValue: setValue } ) => ( event: any ) =>
{
    const { name, value } = event.target;
    setValue( name, value );
};


const Input: Component<InputProps> = ( props ) =>
{
    const { field, form } = useField( props.name );

    return (
        <InputForm
            value={field.value() as string}
            errorChildren={field.error()}
            checked={props.type === 'radio' && props.value === field.value()}
            onChange={handleSelect( { setValue: form.setValue } )}
            {...props}
        />
    );
};

export default Input;
