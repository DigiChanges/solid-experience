import { Link } from '@solidjs/router';
import { Component } from 'solid-js';
import styles from './error.module.css'

const IndexPage: Component  = () => (
    <div class={styles.container}>
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
            {/*<h2 class="text-xl text-left mx-1/4 text-main-gray-250 font-extrabold gilroy ">*/}
            {/*    {t('err_view')}*/}
            {/*</h2>*/}
            {/*<Link href="/" class="px-10 py-2 dg-main-button">*/}
            {/*    {t('a_home')}*/}
            {/*</Link>*/}
        </div>
    </div>
);

export default IndexPage;
