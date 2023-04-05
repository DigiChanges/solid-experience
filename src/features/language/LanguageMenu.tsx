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
                    <DropdownMenu.Trigger class={styles.dropdown__menu__trigger}>
                        <IconButton
                            class={styles.dropdown__menu__trigger__icon}
                            aria-label="Change language"
                            children={<IconLanguage />}
                            style={{border: 'none'}}
                        />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content class={styles.dropdown__menu__content}>
                            <DropdownMenu.Item
                                class={styles.dropdown__menu__item}
                                onSelect={changeLanguage( { language: 'en', setLanguage } )}
                            >
                                <Text message="a_en" />
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                                class={styles.dropdown__menu__item}
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
