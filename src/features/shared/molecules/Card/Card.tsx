import { Component, JSX } from 'solid-js';
import styles from './Card.module.css';

interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {
    variant?: string;
}

const Card: Component<CardProps> = (props) =>
{
    return (
        <div
            class={styles.container}
            classList={{
                [props.class as string]: Boolean(props.class),
                ...props.classList
            }}
        >
            {props.children}
        </div>
    );
};

export default Card;
