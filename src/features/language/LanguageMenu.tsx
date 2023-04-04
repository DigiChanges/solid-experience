import { Center, Flex, IconButton } from '@hope-ui/core';
import { Text, useI18n } from 'solid-i18n';
import { Component } from 'solid-js';
import IconLanguage from '../../atoms/Icons/Stroke/IconLanguage';
import { changeLanguage } from './handlers';
import styles from './LanguageMenu.module.css';
import { DropdownMenu } from '@kobalte/core';

const LanguageMenu: Component = () =>
{
    const { setLanguage } = useI18n();

    return (
        <Flex>
            <Center>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger class={styles.language_menu}>
                        <IconButton
                            class={styles.icon}
                            aria-label="Change language"
                            children={<IconLanguage />}
                        />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content>
                            <DropdownMenu.Item
                                onSelect={changeLanguage( { language: 'en', setLanguage } )}
                            >
                                <Text message="a_en" />
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                                onSelect={changeLanguage( { language: 'es', setLanguage } )}
                            >
                                <Text message="a_es" />
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </Center>
        </Flex>
    );
};

export default LanguageMenu;
