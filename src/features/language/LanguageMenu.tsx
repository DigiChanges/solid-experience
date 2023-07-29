import { Center, Flex, IconButton } from '@hope-ui/core';
import useTranslation from '../shared/hooks/useTranslation';
import { Component } from 'solid-js';
import IconLanguage from '../../atoms/Icons/Stroke/IconLanguage';
import { changeLanguage } from './handlers';
import DropdownMenu from '../shared/molecules/DropdownMenu/DropdownMenu';

const LanguageMenu: Component = () =>
{
    const { translate: t, locale } = useTranslation();
    const items = [
        {
            children: t('a_en'),
            onSelect: changeLanguage({ language: 'en', locale })
        },
        {
            children: t('a_es'),
            onSelect: changeLanguage({ language: 'es', locale })
        }
    ];

    return (
        <Flex>
          <Center>
            <IconButton
                _dark={{ border: 'none', bgColor: 'transparent' }}
                size={'md'}
                aria-label="Change language"
                borderRadius={'4px'}
                children={
                    <DropdownMenu
                        items={items}
                        title={<IconLanguage />}
                        class={'w-[3rem]'}
                    />
                }
            />
          </Center>
        </Flex>
    );
};

export default LanguageMenu;
