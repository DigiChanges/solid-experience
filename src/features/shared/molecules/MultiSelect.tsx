import { Option } from '@digichanges/solid-multiselect/dist/Option';
import { Component, splitProps } from 'solid-js';
import { useField } from 'solid-js-form';
import MultiSelectForm, { MultiselectFormProps } from './MultiSelectForm';

const MultiSelect: Component<MultiselectFormProps> = ( props ) =>
{
    const [ local ] = splitProps( props, [ 'errorClass' ] );
    const { field, form } = useField( props.name );

    return (
        <MultiSelectForm
            {...props}
            error={field.error()}
            errorClass={local.errorClass}
            selectedValues={Array.from(  field.value() as Option[] )}
            onSelect={( values ) => form.setValue( props.name, values )}
            onRemove={( values ) => form.setValue( props.name, values )}
        />
    );
};

export default MultiSelect;
