import { Component } from 'solid-js';
import { A } from 'solid-start';
import useTranslation from '../features/shared/hooks/useTranslation';
import styles from './404.module.css';

const IndexPage: Component = () =>
{
    const { translate: t } = useTranslation();

    return (<div class={styles.main_container}>
        <div class={styles.svg_container}>
            <svg
                class={styles.svg}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <h2 class={styles.h2}>
                {t('err_404')}
            </h2>
            <A href="/" class={styles.a_component}>
                {t('a_home')}
            </A>
        </div>
    </div>);
};

export default IndexPage;
