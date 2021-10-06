/**
 *
 * @param type {string}
 * @param value
 * @param onChange {function}
 * @param placeholder {string}
 * @returns {JSX.Element}
 * @constructor
 */
export default function Input({type = 'text', value = '', onChange, placeholder = ''}) {
    return (
        <input
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        />
    )
}
