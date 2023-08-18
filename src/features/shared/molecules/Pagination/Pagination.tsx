import { Component } from 'solid-js';
import './Pagination.css'

interface PaginationProps {
    count: number,
    eventHandler: () => void,
    currentPage: number,
}

const Pagination: Component<PaginationProps> = ({count, eventHandler, currentPage}) => 
{
    return (
        <div class="pagination-component">
            <button class={`pagination-button${currentPage === 1 ? ` disabled-pagination` : ``}`} disabled={currentPage === 1} onClick={eventHandler}>{"Previous"}</button>
            {[...Array(count)].map((_,i) => 
                {
                    if (i + 1 !== currentPage) {
                    return <button class="pagination-button" onClick={eventHandler}>{i + 1}</button>
            }
                    return <button class="pagination-button selected-pagination" onClick={eventHandler}>{i + 1}</button>
            })}
            <button class={`pagination-button${currentPage === count ? ` disabled-pagination` : ``}`} disabled={currentPage === count} onClick={eventHandler}>{"Next"}</button>
        </div>
    )
}

export default Pagination;