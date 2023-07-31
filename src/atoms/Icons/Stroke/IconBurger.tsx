import styles from './iconBurguer.module.css';
import { Component } from 'solid-js';

interface IconBurgerProps
{
    isOpened: boolean;
}

const IconBurger: Component<IconBurgerProps> = (props) => (
    <button class={styles.lineContainer} style={{ outline: 'none', border: 'none' }}>
        <span class={props.isOpened ? styles.line : `${styles.line} ${styles.line1Closed}`} />
        <span class={props.isOpened ? styles.line : `${styles.line} ${styles.line2Closed}`} />
        <span class={props.isOpened ? `${styles.line} ${styles.line3Opened}` : `${styles.line} ${styles.line3Closed}`} />
    </button>
);

export default IconBurger;
