/**
 *
 * @param children
 * @param type {string}
 * @param onClick
 * @param size {('sm','lg')}
 * @returns {JSX.Element}
 * @constructor
 */
export default function CardAction({children, type = 'button', onClick, size}) {
    let sizeClass = ''
    switch (size) {
        case 'sm':
            sizeClass = 'px-2 py-0.5 font-semibold'
            break;
        case 'lg':
            sizeClass = 'px-4 py-2 font-bold'
            break;
        default:
            sizeClass = 'px-3 py-1 font-bold'
            break;
    }
    return (
        <button
            onClick={onClick}
            className={`bg-indigo-500 text-white active:bg-indigo-600 text-xs uppercase ${sizeClass} rounded outline-none focus:outline-none mr-1 mb-2 ease-linear transition-all duration-150`}
            type={type}
        >{children}</button>
    )
}
