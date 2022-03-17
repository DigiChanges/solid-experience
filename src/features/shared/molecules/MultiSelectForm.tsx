import Multiselect, { IMultiSelectProps } from '@digichanges/solid-multiselect';
import { Component, splitProps } from 'solid-js';
import ErrorForm from '../../../atoms/ErrorForm';

export type MultiselectFormProps = Omit<IMultiSelectProps, 'placeholder'> & {
    name: string;
    errorClass?: string;
    error?: string;
    placeholder?: string | HTMLElement | ( string | HTMLElement )[];
};
const MultiSelectForm: Component<MultiselectFormProps> = ( props ) =>
{
    const [ local, restOfProps ] = splitProps( props, [ 'errorClass', 'error', 'name' ] );
    return (
        <>
            <Multiselect
                {...restOfProps}
                placeholder={props.placeholder as string}
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
