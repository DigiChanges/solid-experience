import Multiselect, { IMultiSelectProps } from '@digichanges/solid-multiselect';
import { Component, splitProps } from 'solid-js';
import ErrorForm from '../../../atoms/ErrorForm';

export type MultiselectFormProps = IMultiSelectProps & {
    name: string;
    errorClass?: string;
    error?: string;
};
const MultiSelectForm: Component<MultiselectFormProps> = ( props ) =>
{
    const [ local, restOfProps ] = splitProps( props, [ 'errorClass', 'error', 'name' ] );
    return (
        <>
            <Multiselect
                {...restOfProps}
            />
            <ErrorForm
                class={local.errorClass}
            >
                {local.error}
            </ErrorForm>
        </>
    );
};

export default MultiSelectForm;
