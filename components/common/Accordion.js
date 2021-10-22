import {Disclosure} from '@headlessui/react'
import {ChevronUpIcon, XIcon} from "@heroicons/react/solid";

/**
 *
 * @param title
 * @param children
 * @param onDelete
 * @returns {JSX.Element}
 * @constructor
 */
export default function Accordion({title, children,onDelete=() => {}}) {
    return (
        <Disclosure as={'div'}>
            <Disclosure.Button
                className="flex justify-between w-full px-4 py-2 border border-indigo-200 text-sm font-semibold capitalize text-left text-indigo-900 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                <span>{title}</span>
                <div className={`flex items-center gap-x-2`}>
                    <ChevronUpIcon
                        className={`${
                            open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-indigo-500`}
                    />
                    <XIcon onClick={onDelete}
                           className={`w-5 h-5 text-red-500 z-50`}
                    />
                </div>
            </Disclosure.Button>
            <Disclosure.Panel className={`bg-white bg-opacity-60 shadow-sm py-2 px-4`}>
                {children}
            </Disclosure.Panel>
        </Disclosure>
    )
}
