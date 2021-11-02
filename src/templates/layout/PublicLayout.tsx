import { Component } from 'solid-js';
import Footer from '../../organisms/Footer';

const PublicLayout: Component = ( props ) =>
{
    return (
        <>
            <div class="grid grid-areas-mobile-layout md:grid-areas-tablet-layout lg:grid-areas-desktop-layout grid-cols-desktop-layout
      h-full dg-main-bg">
                <main class="grid-in-main min-h-screen w-full">
                    {props.children}
                </main>
                <Footer class="text-center flex grid-in-footer border m-4 w-auto p-4 text-sm text-gray-200 rounded justify-center">
                    2021 © DigiChanges
                </Footer>
            </div>
        </>
    );
};

export default PublicLayout;
