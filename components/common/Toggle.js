import React, {useEffect, useState} from "react";
import {Switch} from "@headlessui/react";
import {useController} from "react-hook-form";

/**
 *
 * @param label {string}
 * @param name {string}
 * @param control
 * @param onToggle
 * @returns {JSX.Element}
 * @constructor
 */
export default function Toggle({label, name, control,onToggle=() => {}}) {
    const {
        field: {onChange, value},
    } = useController({
        name,
        control,
    });
    const [checked, setChecked] = useState(value)
    useEffect(() => {
        setChecked(value)
    }, [value])
    const handleChange = (e) => {
        onChange(e);
        setChecked(e)
        onToggle()
    }
    return (
        <Switch.Group>
            <div className={`flex items-center`}>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    className={`${
                        checked ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                    <span className={`sr-only`}>{label}</span>
                    <span
                        className={`${
                            checked ? 'translate-x-6' : 'translate-x-1'
                        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                    />
                </Switch>
                <Switch.Label className={`ml-2 font-bold text-xs uppercase`}>{label}</Switch.Label>
            </div>
        </Switch.Group>
    )
}
