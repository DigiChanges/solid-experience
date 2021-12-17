import { Multiselect as MultiselectForm } from '@digichanges/solid-components';
import { Component } from 'solid-js';
import { useField } from 'solid-js-form';

const Multiselect: Component<any> = ( props ) =>
{
    const { field, form } = useField( props.name );

    return (
        <MultiselectForm
            {...props}
            selectedValues={Array.from( field.value() )}
            onSelect={( values ) => form.setValue( props.name, values )}
            onRemove={( values ) => form.setValue( props.name, values )}
        />
    );
};

export default Multiselect;
