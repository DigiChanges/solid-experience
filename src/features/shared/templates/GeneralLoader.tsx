import { Component } from 'solid-js';
import { Portal } from 'solid-js/web';
import styles from './GeneralLoader.module.css';

const GeneralLoader: Component = ()  => (
    <Portal>
        <div class={styles.preloader}>
            <div class={styles.loader}/><div>
            </div>
        </div>
    </Portal>
);

export default GeneralLoader;
