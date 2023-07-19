import { Component } from 'solid-js';
import './Pagination.css'

interface PaginationProps {
    count: number,
    eventHandler: () => void,
    currentPage: number,
}

const Pagination: Component<PaginationProps> = ({count, eventHandler, currentPage}) => {
    return (
        <>
            <button class={`pagination-button-left${currentPage === 1 ? ` disabled-pagination` : ``}`} onClick={eventHandler}>{"<-"}</button>
            {[...Array(count)].map((_,i) => {
            if (i + 1 !== currentPage) {
                return <button class="pagination-button" onClick={eventHandler}>{i + 1}</button>
         }
         return <button class="selected-pagination" onClick={eventHandler}>{i + 1}</button>
        })}
            <button class={`pagination-button-right${currentPage === count ? ` disabled-pagination` : ``}`} onClick={eventHandler}>{"->"}</button>
        </>
    )
}

export default Pagination;