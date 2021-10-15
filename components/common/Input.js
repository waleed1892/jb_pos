/**
 *
 * @param type {string}
 * @param placeholder {string}
 * @param name {string}
 * @param register {function}
 * @param props
 * @param readOnly {boolean}
 * @returns {JSX.Element}
 * @constructor
 */
export default function Input({type = 'text', placeholder = '', name, register, readOnly = false}) {
    return (
        <input
            type={type}
            name={name}
            {...register(name)}
            placeholder={placeholder}
            readOnly={readOnly}
            className="appearance-none border-0 px-3 py-3 placeholder-blueGray-400 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        />
    )
}
