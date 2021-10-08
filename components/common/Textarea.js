/**
 *
 * @param value
 * @param onChange
 * @param name
 * @returns {JSX.Element}
 * @constructor
 */
export default function Textarea({value, onChange, name}) {
    return (
        <textarea
            name={name}
            className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
            value={value} onChange={onChange}/>
    )
}
