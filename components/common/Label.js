/**
 *
 * @param children
 * @param forEl {string}
 * @returns {JSX.Element}
 * @constructor
 */
export default function Label({children, forEl}) {
    return (
        <label
            className="uppercase inline-block text-blueGray-600 text-xs font-bold mb-2"
            htmlFor={forEl}
        >
            {children}
        </label>
    )
}
