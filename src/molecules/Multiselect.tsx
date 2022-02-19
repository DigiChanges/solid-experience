import { MultiSelect as MultiselectForm } from '@digichanges/solid-multiselect';
import { Component, splitProps } from 'solid-js';
import { useField } from 'solid-js-form';
import ErrorForm from '../atoms/ErrorForm';

const MultiSelect: Component<any> = ( props ) =>
{
    const [ local ] = splitProps( props, [ 'errorClass' ] );
    const { field, form } = useField( props.name );

    return (
        <>
            <MultiselectForm
                {...props}
                selectedValues={Array.from(  field.value() )}
                onSelect={( values ) => form.setValue( props.name, values )}
                onRemove={( values ) => form.setValue( props.name, values )}
            />
            <ErrorForm
                class={local.errorClass}
            >
                {field.error()}
            </ErrorForm>
        </>
    );
};

export default MultiSelect;
