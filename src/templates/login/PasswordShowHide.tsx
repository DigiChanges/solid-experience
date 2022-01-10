import type { InputFormProps } from '@digichanges/solid-components';
import { InputPassword } from '@digichanges/solid-components';
import { Component } from 'solid-js';
import { useField } from 'solid-js-form';

type PasswordShowHideProps = Omit<InputFormProps, 'value'>
type setValue = ( name: string, value: any ) => void;

const handleSelect = ( { setValue }: { setValue: setValue } ) => ( event: any ) =>
{
    const { name, value } = event.target;
    setValue( name, value );
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
        />
    );
};

export default PasswordShowHide;
