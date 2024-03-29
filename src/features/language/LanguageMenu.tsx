import { Center, Flex, IconButton } from '@hope-ui/core';
import { useI18n } from '@solid-primitives/i18n';
import { Component } from 'solid-js';
import IconLanguage from '../../atoms/Icons/Stroke/IconLanguage';
import { changeLanguage } from './handlers';
import DropdownMenu from '../shared/molecules/DropdownMenu/DropdownMenu';

const LanguageMenu: Component = () =>
{
    // const { setLanguage } = useI18n();
    // const items = [
    //     {
    //         children: {t('a_en')},
    //         onSelect: changeLanguage( { language: 'en', setLanguage } ),
    //     },
    //     {
    //         children: {t('a_es')},
    //         onSelect: changeLanguage( { language: 'es', setLanguage } ),
    //     },
    // ];

    return (
        <Flex>
            {/* <Center>*/}
            {/*    <IconButton*/}
            {/*        _dark={{ border: 'none', bgColor: 'transparent' }}*/}
            {/*        size={'md'}*/}
            {/*        aria-label="Change language"*/}
            {/*        borderRadius={'4px'}*/}
            {/*        children={*/}
            {/*            <DropdownMenu*/}
            {/*                items={items}*/}
            {/*                title={<IconLanguage />}*/}
            {/*                class={'w-[3rem]'}*/}
            {/*            />*/}
            {/*        }*/}
            {/*    />*/}
            {/* </Center>*/}
        </Flex>
    );
};

export default LanguageMenu;
