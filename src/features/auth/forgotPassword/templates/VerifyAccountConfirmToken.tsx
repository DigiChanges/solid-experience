import { Component, createEffect, Show } from 'solid-js';
import GeneralLoader from '../../../shared/templates/GeneralLoader';

interface VerifyAccountConfirmTokenTemplateProps
{
    verifyAccountAction: any;
    isLoading: boolean;
}

const VerifyAccountConfirmToken: Component<VerifyAccountConfirmTokenTemplateProps> = ( props ) =>
{
    createEffect( () =>
    {
        props.verifyAccountAction();
    } );

    return (
        <>
            <Show when={props.isLoading} >
                <GeneralLoader/>
            </Show>
        </>
    );
};

export default VerifyAccountConfirmToken;
