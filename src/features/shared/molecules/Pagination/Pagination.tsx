import { Component } from 'solid-js';
import './Pagination.css'
import { number } from 'yup';

interface PaginationProps {
    count: number,
    eventHandler: () => void,
    currentPage: number,
}

const Pagination: Component<PaginationProps> = ({count, eventHandler, currentPage}) => 
{
    const renderNumbers = (num: number) => {
        const myArr = [];
        for (let i = 1; i <= num; i++) {
            if (i !== currentPage) {
                            myArr.push(<button class="pagination-button" onClick={eventHandler}>{i}</button>)
                            continue
                     }
                     myArr.push(<button class="selected-pagination" onClick={eventHandler}>{i}</button>)
        }
        return myArr
    }

    // const arrNum = new Array(count).fill(null)
    // arrNum.map((_,i) => {
    //     if (i !== currentPage) {
    //         return <button class="pagination-button" onClick={eventHandler}>{i}</button>
    //  }
    //  return <button class="selected-pagination" onClick={eventHandler}>{i}</button>
    // })
    
  
    return (
        <>
            <button class={`pagination-button-left${currentPage === 1 ? ` disabled-pagination` : ``}`} onClick={eventHandler}>{"<-"}</button>
            {renderNumbers(count)}
            <button class={`pagination-button-right${currentPage === count ? ` disabled-pagination` : ``}`} onClick={eventHandler}>{"->"}</button>
        </>
    )
}

export default Pagination;