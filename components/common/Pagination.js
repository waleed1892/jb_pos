import {useMemo} from "react";

/**
 *
 * @param meta
 * @param onPageChange
 * @returns {JSX.Element}
 * @constructor
 */
const Pagination = ({meta, onPageChange}) => {
    const {first_page, last_page, current_page} = meta
    const max_pages = 10;
    const pages = useMemo(() => {
        return Array.from(Array(last_page), (_, i) => i + 1);
    }, [last_page])
    // const {active, total, step, onClickHandler} = props;
    //
    // const showingNumbers = step * 2 + 1;
    // let startNumber = 2;
    // let startArrayNumber = props.step;
    //
    // let needStartDots = false;
    // let needEndDots = false;
    //
    // if (active > step) {
    //     startArrayNumber = active - step;
    //
    //     needStartDots = active > step + startNumber ? true : false;
    // }
    //
    // if (total > showingNumbers) {
    //     {
    //         needEndDots = total > active + step + 1 ? true : false;
    //
    //         if (total < active + step + 1) {
    //             startArrayNumber = total - showingNumbers;
    //         }
    //     }
    // }
    //
    // let contentNumber;

    return (
        <div className="block py-4">
            <ul className="flex pl-0 rounded list-none flex-wrap justify-center">
                <li>
                    <a onClick={() => onPageChange(first_page)}
                       className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid ${current_page !== 1 ? 'border-indigo-500 bg-white text-indigo-500 cursor-pointer' : 'border-indigo-200 text-white bg-indigo-200 cursor-not-allowed pointer-events-none'}`}>
                        <i className="fas fa-chevron-left -ml-px"></i>
                        <i className="fas fa-chevron-left -ml-px"></i>
                    </a>
                </li>
                <li>
                    <a onClick={() => onPageChange(current_page - 1)}
                       className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid ${current_page !== 1 ? 'border-indigo-500 bg-white text-indigo-500 cursor-pointer' : 'border-indigo-200 text-white bg-indigo-200 cursor-not-allowed pointer-events-none'}`}>
                        <i className="fas fa-chevron-left -ml-px"></i>
                    </a>
                </li>
                {
                    pages.map((link) => <li key={link}>
                        <a onClick={() => onPageChange(link)}
                           className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-500 cursor-pointer ${link===current_page ? 'text-white bg-indigo-500' : 'bg-white text-indigo-500'}`}>
                            {link}
                        </a>
                    </li>)
                }
                <li>
                    <a onClick={() => onPageChange(current_page + 1)}
                       className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid ${current_page === last_page ? 'border-indigo-200 text-white bg-indigo-200 cursor-not-allowed pointer-events-none' : 'border-indigo-500 bg-white text-indigo-500 cursor-pointer'}`}>
                        <i className="fas fa-chevron-right -mr-px"></i>
                    </a>
                </li>
                <li>
                    <a
                        onClick={() => onPageChange(last_page)}
                        className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid ${current_page === last_page ? 'border-indigo-200 text-white bg-indigo-200 cursor-not-allowed pointer-events-none' : 'border-indigo-500 bg-white text-indigo-500 cursor-pointer'}`}>
                        <i className="fas fa-chevron-right -mr-px"></i>
                        <i className="fas fa-chevron-right -mr-px"></i>
                    </a>
                </li>
            </ul>
        </div>
        // <ul className="pagination">
        //     {size > showingNumbers + startNumber ? (
        //         <React.Fragment>
        //             <li
        //                 onClick={(e) => onClickHandler(e.currentTarget.textContent)}
        //                 className={`page-item ${active === 1 && "active"}`}
        //             >
        //                 1
        //             </li>
        //
        //             {needStartDots && <span>...</span>}
        //             {_.times(showingNumbers, (i) => (
        //                 <li
        //                     key={i++}
        //                     {...(contentNumber = needStartDots
        //                         ? startArrayNumber
        //                         : startNumber)}
        //                     {...startNumber++}
        //                     {...startArrayNumber++}
        //                     className={`page-item ${active === contentNumber && "active"}`}
        //                     onClick={(e) => onClickHandler(e.currentTarget.textContent)}
        //                 >
        //                     {contentNumber}
        //                 </li>
        //             ))}
        //             {needEndDots && <span>...</span>}
        //             <li
        //                 className={`page-item ${active === size && "active"}`}
        //                 onClick={(e) => onClickHandler(e.currentTarget.textContent)}
        //             >
        //                 {size}
        //             </li>
        //         </React.Fragment>
        //     ) : (
        //         ((startArrayNumber = 1),
        //             _.times(size, (i) => (
        //                 <li
        //                     key={i++}
        //                     className={`page-item ${active === startArrayNumber && "active"}`}
        //                     onClick={(e) => onClickHandler(e.currentTarget.textContent)}
        //                 >
        //                     {startArrayNumber++}
        //                 </li>
        //             )))
        //     )}
        // </ul>
    );
};


export default Pagination
