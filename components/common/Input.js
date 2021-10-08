/**
 *
 * @param type {string}
 * @param value
 * @param onChange {function}
 * @param placeholder {string}
 * @param name {string}
 * @param id {string}
 * @returns {JSX.Element}
 * @constructor
 */
export default function Input({type = 'text', value = '', onChange, placeholder = '', name,id}) {
    return (
        <input
            id={id}
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            className="appearance-none border-0 px-3 py-3 placeholder-blueGray-400 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        />
    )
}
