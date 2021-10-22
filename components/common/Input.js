/**
 *
 * @param type {string}
 * @param placeholder {string}
 * @param name {string}
 * @param register {function}
 * @param props
 * @param onChangeCb
 * @param readOnly {boolean}
 * @returns {JSX.Element}
 * @constructor
 */
export default function Input({type = 'text', placeholder = '', name, register, readOnly = false, onChangeCb}) {
    const {onChange, ref, onBlur} = register(name);
    const changeHandler = (e) => {
        onChange(e)
        if (onChangeCb) {
            onChangeCb()
        }
    }
    return (
        <input
            type={type}
            name={name}
            onChange={changeHandler}
            ref={ref}
            onBlur={onBlur}
            placeholder={placeholder}
            readOnly={readOnly}
            className="appearance-none border-0 px-3 py-3 placeholder-blueGray-400 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        />
    )
}
