import {Fragment, useEffect, useMemo, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, SelectorIcon, XIcon} from '@heroicons/react/solid'
import {useController} from "react-hook-form";

/**
 *
 * @param options {array}
 * @param valueField {string}
 * @param labelField {string}
 * @param control
 * @param name {string}
 * @param onSelect
 * @param multiSelect {boolean}
 * @param onOptionDeleted
 * @returns {JSX.Element}
 * @constructor
 */
export default function Select(
    {
        options = [],
        valueField = 'value',
        labelField = 'label',
        control,
        name,
        onSelect = () => {
        },
        multiSelect = false,
        onOptionDeleted
    }) {
    const {
        field: {onChange, value},
    } = useController({
        name,
        control,
    });
    const [selected, setSelected] = useState(value);

    useEffect(() => {
        setSelected(value)
    }, [value])
    const selectedOption = useMemo(() => {
        if (multiSelect) {
            return options.filter(item => selected.includes(item[valueField]))
        } else {
            if (!selected) {
                return null;
            }
            return options.find(option => option[valueField] === selected)
        }
    }, [selected])
    const handleChange = (e) => {
        if (multiSelect) {
            const tmpSelected = [...selected];
            tmpSelected.push(e)
            // setSelected(tmpSelected)
            onChange(tmpSelected)
            onSelect(e)
        } else {
            onChange(e);
            // setSelected(e)
            onSelect(e)
        }
    }

    const deleteOption = (val) => {
        onChange(selected.filter(item => item !== val))
        if (onOptionDeleted) {
            onOptionDeleted(val)
        }
    }

    let alteredOptions = useMemo(() => {
        if (multiSelect) {
            return options.filter(item => !selected.includes(item.id))
        }
        return options;
    }, [selected])

    return (
        <Listbox value={selected} onChange={handleChange}>
            <div className="relative">
                <Listbox.Button
                    className="relative w-full pl-3 pr-10 border-0 px-3 py-3 placeholder-blueGray-400 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    {
                        multiSelect ?
                            selectedOption.length ?
                                <ul className={`flex items-center gap-x-2`}>
                                    {
                                        selectedOption.map(option => <li key={option.id}
                                                                         className={`bg-indigo-200 px-1 py-0.5 rounded text-sm flex items-center gap-x-1`}>
                                            <span>{option[labelField]}</span>
                                            <XIcon onClick={() => deleteOption(option[valueField])}
                                                   className={`w-3 h-3 text-red-500`}/>
                                        </li>)
                                    }
                                </ul>
                                :
                                <span>&nbsp;</span>
                            :
                            selectedOption ?
                                <span className="block truncate text-left">{selectedOption[labelField]}</span>
                                :
                                <span>&nbsp;</span>
                    }
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
              />
            </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options
                        className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {
                            alteredOptions.map((option, optionIndex) => (
                                <Listbox.Option
                                    key={optionIndex}
                                    className={({active}) => `${active ? 'text-indigo-600 bg-indigo-200' : 'text-gray-900'} cursor-pointer select-none relative py-2 pl-10 pr-4`}
                                    value={option[valueField]}>
                                    {
                                        ({selected, active}) => {
                                            return (
                                                <>
                                                    <div
                                                        className={`${
                                                            selected ? 'font-medium' : 'font-normal'
                                                        } block truncate inline`}
                                                    >
                                                        {option[labelField]}
                                                    </div>
                                                    {
                                                        selected ? (
                                                            <div
                                                                className={`${active ? 'text-indigo-600' : 'text-indigo-600'} absolute inset-y-0 left-0 flex items-center pl-3 inline`}>
                                                                <CheckIcon className="w-5 h-5" aria-hidden="true"/>
                                                            </div>
                                                        ) : null
                                                    }
                                                </>
                                            )
                                        }
                                    }
                                </Listbox.Option>
                            ))
                        }
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
}
