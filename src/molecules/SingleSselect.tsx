import { Multiselect, Option } from '@digichanges/solid-components';
import { Component } from 'solid-js';
import { useField } from 'solid-js-form';

const handleSelect = ( { setValue, name }: {setValue: any, name: string} ) => ( data: Option[] ) =>
{
    const [ value ] = data;
    setValue( name, value );
};

const SingleSelect: Component<any> = ( props ) =>
{
    const { field, form } = useField( props.name );

    return (
        <Multiselect
            {...props}
            singleSelect
            selectedValues={ field.value() ? [ field.value() ] : null }
            onSelect={handleSelect( { setValue: form.setValue, name: props.name } )}
            onRemove={handleSelect( { setValue: form.setValue, name: props.name } )}
        />
    );
};

export default SingleSelect;
