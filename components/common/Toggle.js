import {Switch} from "@headlessui/react";

/**
 *
 * @param onChange {function}
 * @param label {string}
 * @param value {boolean}
 * @returns {JSX.Element}
 * @constructor
 */
export default function Toggle({value, onChange, label}) {
    return (
        <Switch.Group>
            <div className={`flex items-center`}>
                <Switch
                    checked={value}
                    onChange={onChange}
                    className={`${
                        value ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                    <span className={`sr-only`}>{label}</span>
                    <span
                        className={`${
                            value ? 'translate-x-6' : 'translate-x-1'
                        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                    />
                </Switch>
                <Switch.Label className={`ml-2`}>{label}</Switch.Label>
            </div>
        </Switch.Group>
    )
}
