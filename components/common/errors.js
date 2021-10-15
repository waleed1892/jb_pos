import {ErrorMessage} from "@hookform/error-message";

/**
 *
 * @param name {string}
 * @param errors
 * @returns {JSX.Element}
 * @constructor
 */
export default function Errors({name, errors}) {
    return <ErrorMessage name={name} errors={errors}
                         render={({message}) => <p className={`text-red-500 text-sm`}>{message}</p>}/>
}
