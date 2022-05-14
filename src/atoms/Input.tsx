import type { InputFormProps } from '@digichanges/solid-components';
import { InputForm } from '@digichanges/solid-components';
import { Component, JSX } from 'solid-js';
import { useField } from 'solid-js-form';

type InputProps = Omit<InputFormProps, 'value' | 'placeholder' | 'labelName'> & {
    value?: any;
    placeholder?: string | HTMLElement | ( string | HTMLElement )[];
    labelName?: string | HTMLElement | ( string | HTMLElement )[] | JSX.Element;
};

type setValue = ( name: string, value: any ) => void;

const handleSelect = ( { setValue }: { setValue: setValue } ) => ( event: any ) =>
{
    const { name, value, checked, type } = event.target;

    if ( type === 'checkbox' )
    {
        setValue( name, checked );
    }
    else
    {
        setValue( name, value );
    }
};

const isChecked = ( { type, value, field }: any ) =>
{
    return ( type === 'radio' || type === 'checkbox' ) && value === field.value();
};

const Input: Component<InputProps> = ( props ) =>
{
    const { field, form } = useField( props.name );

    return (
        <InputForm
            value={field.value() as string}
            errorChildren={field.error()}
            checked={isChecked( { type: props.type, value: props.value, field } )}
            onChange={handleSelect( { setValue: form.setValue } )}
            {...props}
            placeholder={props.placeholder as string}
            labelName={props.labelName}
        />
    );
};

export default Input;
