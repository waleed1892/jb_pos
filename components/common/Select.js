import {Fragment, useMemo} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'

/**
 *
 * @param options {Array}
 * @param valueField {string}
 * @param labelField {string}
 * @param onChange {function}
 * @param value {string|number}
 * @returns {JSX.Element}
 * @constructor
 */
export default function Select({options = [], valueField = 'id', labelField = 'label', onChange, value}) {
    const selectedOption = useMemo(() => {
        if (!value) {
            return null;
        }
        return options.find(option => option[valueField] === value)
    }, [value])
    return (
        <Listbox value={value} onChange={onChange}>
            <div className="relative">
                <Listbox.Button
                    className="relative w-full pl-3 pr-10 border-0 px-3 py-3 placeholder-blueGray-400 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    {
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
                        {options.map((option, optionIndex) => (
                            <Listbox.Option
                                key={optionIndex}
                                className={({active}) =>
                                    `${active ? 'text-indigo-600 bg-indigo-200' : 'text-gray-900'}
                          cursor-pointer select-none relative py-2 pl-10 pr-4`
                                }
                                value={option[valueField]}
                            >
                                {({selected, active}) => (
                                    <>
                      <span
                          className={`${
                              selected ? 'font-medium' : 'font-normal'
                          } block truncate`}
                      >
                        {option[labelField]}
                      </span>
                                        {selected ? (
                                            <span
                                                className={`${
                                                    active ? 'text-indigo-600' : 'text-indigo-600'
                                                }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                            >
                          <CheckIcon className="w-5 h-5" aria-hidden="true"/>
                        </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
}
