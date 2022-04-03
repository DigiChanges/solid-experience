import { Component } from 'solid-js';
import { useField } from 'solid-js-form';
import ErrorForm from './ErrorForm';

interface ErrorFieldProps
{
    name: string;
    class?: string;
}

const ErrorField: Component<ErrorFieldProps> = props =>
{
    const { field } = useField( props.name );

    return (
        <ErrorForm class={props.class}>
            {field.error()}
        </ErrorForm>
    );
};

export default ErrorField;
