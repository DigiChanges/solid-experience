import { Component } from 'solid-js';
import styles from './Pagination.module.css';

interface PaginationProps {
    count: number,
    eventHandler: () => void,
    currentPage: number,
}

const Pagination: Component<PaginationProps> = ({count, eventHandler, currentPage}) =>
{
    return (
        <div class={styles.pagination_component}>
            <button class={`${styles.pagination_button} ${currentPage === 1 ? styles.disabled_pagination : ''}`} disabled={currentPage === 1} onClick={eventHandler}>{"Previous"}</button>
            {[...Array(count)].map((_,i) =>
                {
                    if (i + 1 !== currentPage) {
                    return <button class={styles.pagination_button} onClick={eventHandler}>{i + 1}</button>
            }
                    return <button class={`${styles.pagination_button} ${styles.selected_pagination}`} onClick={eventHandler}>{i + 1}</button>
            })}
            <button class={`${styles.pagination_button} ${currentPage === count ? styles.disabled_pagination : ''}`} disabled={currentPage === count} onClick={eventHandler}>{"Next"}</button>
        </div>
    )
}

export default Pagination;
