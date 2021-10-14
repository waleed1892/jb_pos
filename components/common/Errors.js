import {ErrorMessage} from '@hookform/error-message';

/**
 *
 * @param name {string}
 * @param errors {Object}
 * @returns {JSX.Element}
 * @constructor
 */

export default function Errors({name, errors}) {
    const messages = {
        required: `${name} is required`
    }
    return <ErrorMessage name={name} errors={errors}
                         render={({message = (name in errors) ? messages[errors[name].type] : ''}) => <p
                             className={`text-red-500 text-sm`}>{message}</p>}/>
}
