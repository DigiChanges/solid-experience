
import { Text, useI18n } from 'solid-i18n';
import { Component, createSignal } from 'solid-js';
import IconLanguage from '../../atoms/Icons/Stroke/IconLanguage';
import { changeLanguage } from './handlers';

const LanguageMenu: Component = () =>
{
    const [ getToggledLanguageDrop, setToggleLanguageDrop ] = createSignal( false );
    const { setLanguage } = useI18n();

    return (
        <div class="flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0 mr-5">
            <div class="rounded-full text-gray-400 hover:text-white h-8 w-8 absolute">
                <button class="p-1 rounded-full text-gray-400 hover:text-white h-8 w-8"
                    onClick={() => setToggleLanguageDrop( !getToggledLanguageDrop() )}
                >
                    <span class="sr-only">Change Language</span>
                    <span>
                        <span class=""><IconLanguage/></span>
                    </span>
                </button>


                <div class="absolute md:static right-0 w-32 py-1 mt-5 shadow-md bg-main-gray-500 text-white z-10"
                    classList={{ hidden: !getToggledLanguageDrop() }}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu">
                    <div role="none">
                        <button type="button"
                            class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                            onClick={changeLanguage( { setToggleLanguageDrop, language: 'en', setLanguage } )}
                        >
                            <Text message="a_en" />
                        </button>
                        <button type="button"
                            class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                            onClick={changeLanguage( { setToggleLanguageDrop, language: 'es', setLanguage } )}
                        >
                            <Text message="a_es" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LanguageMenu;
