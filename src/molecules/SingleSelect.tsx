import { Multiselect, Option } from '@digichanges/solid-components';
import { Component, splitProps } from 'solid-js';
import { useField } from 'solid-js-form';
import ErrorForm from '../atoms/ErrorForm';

const handleSelect = ( { setValue, name }: {setValue: any, name: string} ) => ( data: Option[], item: Option ) =>
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

const SingleSelect: Component<any> = ( props ) =>
{
    const [ local, restOfProps ] = splitProps( props, [ 'errorClass' ] );
    const { field, form } = useField( props.name );

    return (
        <>
            <Multiselect
                singleSelect
                selectedValues={ field.value() ? [ field.value() ] : [] }
                onSelect={handleSelect( { setValue: form.setValue, name: props.name } )}
                {...props}
            />
            <ErrorForm
                class={local.errorClass}
            >
                {field.error()}
            </ErrorForm>
        </>
    );
};

export default SingleSelect;
