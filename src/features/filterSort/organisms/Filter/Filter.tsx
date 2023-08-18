import { createForm } from '@felte/solid';
import { Button, Icon, Input, CloseButton } from '@hope-ui/core';
import { useSearchParams } from '@solidjs/router';
import useTranslation from '../../../shared/hooks/useTranslation';
import { Component, createMemo, createSignal, For } from 'solid-js';
import IconPlus from '../../../../atoms/Icons/Stroke/IconPlus';
import Card from '../../../shared/molecules/Card/Card';
import CardContent from '../../../shared/molecules/CardContent/CardContent';
import { SelectValueOption } from '../../../shared/types/Selects';
import styles from './Filter.module.css';
import { Select } from '../../../shared/molecules/Select/Select';
import { InferType } from 'yup';
import { FiFilter } from 'solid-icons/fi';
import { darkInput, darkPrimaryButtonWithBackground, placeholderInput } from '../../../shared/constants/hopeAdapter';

type FilterType = {
    field: string;
    value: string;
};

interface FilterProps{
    initialFilterOptions: SelectValueOption[];
}

const getFieldWithoutFilterArrayText = (field: string) => field.replace('filter[', '').replace(']', '');

const Filter: Component<FilterProps> = (props) =>
{
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedMenu, setSelectedMenu] = createSignal(props.initialFilterOptions[0].value);
    const [showFilter, setShowFilter] = createSignal(false);
    const { translate: t } = useTranslation();

    const getSearchParams = createMemo(() =>
    {
        if (searchParams)
        {
            return Object.entries(searchParams).map(([field, value]) => ({
                field: getFieldWithoutFilterArrayText(field),
                value
            }));
        }
        return [];
    });

    const handleSelect = (filterBy: string) =>
    {
        setSelectedMenu(filterBy);
    };

    const handleRemoveFilter = (filter: FilterType) => () =>
    {
        setSearchParams({ [`filter[${filter.field}]`]: null });
    };

    const {
        errors,
        form,
        reset
        // @ts-ignore
    } = createForm<InferType<typeof roleSchema>>({
        onSubmit: (values) =>
        {
            setSearchParams({ [`filter[${selectedMenu()}]`]: values.valor });
            setShowFilter(false);
            reset();
        }
    });

    return (
        <>
            <div class={styles.dropdown}>
                <div class={'w-[100%] md:w-auto'}>
                    <Button
                        _dark={darkPrimaryButtonWithBackground}
                        leftIcon={<FiFilter />}
                        onClick={() => setShowFilter(!showFilter())}
                        class={'z-50 w-[100%] md:w-auto'}
                    >
                        {t('a_filter')}
                    </Button>
                    <Card
                        class={styles.dropdown_content}
                        classList={{
                            [styles.show]: showFilter()
                        }}
                    >
                        <div class={styles.show}>
                            <CardContent>
                                <form ref={form} class={styles.form}>
                                    <Select
                                        options={props.initialFilterOptions}
                                        placeholder={'type_id'}
                                        value={selectedMenu()}
                                        onChange={(value: string) => handleSelect(value)}
                                        valueProperty={'value'}
                                        labelProperty={'label'}
                                    />
                                    <p class={'text-neutral-50'}>{t('a_contains')}:</p>
                                    <Input
                                        _dark={darkInput}
                                        _placeholder={placeholderInput}
                                        type="text"
                                        name="valor"
                                        autofocus
                                    />
                                    <Button
                                        _dark={darkPrimaryButtonWithBackground}
                                        disabled={!errors()}
                                        type="submit"
                                        leftIcon={<Icon><IconPlus/></Icon>}
                                    >
                                        {t('a_add_filter')}
                                    </Button>
                                </form>
                            </CardContent>
                        </div>
                    </Card>
                </div>

                <For each={getSearchParams()}>
                    {(filter) => (
                        <div class={styles.badge}>
                            <p>{t(filter.field)} {t('a_contains')} {filter.value}</p>
                            <CloseButton
                                _dark={{ color: 'primary.100', cursor: 'pointer' }}
                                aria-label="remove filter"
                                size="sm"
                                onClick={handleRemoveFilter(filter)}
                            />
                        </div>
                    )}
                </For>
            </div>
        </>
    );
};

export default Filter;
