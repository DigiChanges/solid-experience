import { Center, Flex, IconButton, Menu, MenuContent, MenuItem, MenuTrigger } from '@hope-ui/solid';
import { Text, useI18n } from 'solid-i18n';
import { Component } from 'solid-js';
import IconLanguage from '../../atoms/Icons/Stroke/IconLanguage';
import { changeLanguage } from './handlers';

const LanguageMenu: Component = () =>
{
    const { setLanguage } = useI18n();

    return (
        <Flex>
            <Center>
                <Menu>
                    <MenuTrigger>
                        <IconButton
                            colorScheme="neutral"
                            aria-label="Change language"
                            icon={<IconLanguage />}
                            compact
                        />
                    </MenuTrigger>
                    <MenuContent>
                        <MenuItem
                            onSelect={changeLanguage( { language: 'en', setLanguage } )}
                        >
                            <Text message="a_en" />
                        </MenuItem>
                        <MenuItem
                            onSelect={changeLanguage( { language: 'es', setLanguage } )}
                        >
                            <Text message="a_es" />
                        </MenuItem>
                    </MenuContent>
                </Menu>
            </Center>
        </Flex>
    );
};

export default LanguageMenu;
