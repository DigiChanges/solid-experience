import { Option } from '@digichanges/solid-multiselect/dist/Option';
import { Component } from 'solid-js';
import { useField } from 'solid-js-form';
import MultiSelectForm, { MultiselectFormProps } from './MultiSelectForm';

const handleSelect = ( { setValue, name }: {setValue: any; name: string} ) => ( data: Option[], item: Option ) =>
{
    if ( typeof item === 'object' )
    {
        setValue( name, { ...item } );
    }
    else
    {
        setValue( name, item );
    }
};

const SingleSelect: Component<MultiselectFormProps> = ( props ) =>
{
    const { field, form } = useField( props.name );

    return (
        <MultiSelectForm
            singleSelect
            selectedValues={ ( field.value() ? [ field.value() ] : [] ) as Option[] }
            onSelect={handleSelect( { setValue: form.setValue, name: props.name } )}
            error={field.error()}
            {...props}
        />
    );
};

export default SingleSelect;
