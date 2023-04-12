import { Center, Flex, IconButton } from '@hope-ui/core';
import { Text, useI18n } from 'solid-i18n';
import { Component } from 'solid-js';
import IconLanguage from '../../atoms/Icons/Stroke/IconLanguage';
import { changeLanguage } from './handlers';
import DropdownMenu from '../shared/molecules/DropdownMenu/DropdownMenu';
import styles from '../navBar/organisms/Nav.module.css';


const LanguageMenu: Component = () =>
{
    const { setLanguage } = useI18n();
    const items = [
        {
            children: <Text message="a_en" />,
            onSelect: changeLanguage( { language: 'en', setLanguage } ),
        },
        {
            children: <Text message="a_es" />,
            onSelect: changeLanguage( { language: 'es', setLanguage } ),
        },
    ];

    return (
        <Flex>
            <Center>
                <IconButton
                    size={'md'}
                    class={'w-[150%]'}
                    aria-label="Change language"
                    children={
                        <DropdownMenu
                            items={items}
                            icon={<IconLanguage />}
                        />
                    }
                />
            </Center>
        </Flex>
    );
};

export default LanguageMenu;
