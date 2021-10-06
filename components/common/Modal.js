import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";

/**
 *
 * @param isOpen {boolean}
 * @param close {function}
 * @param title {string}
 * @param children {JSX}
 * @param size {('sm','md','lg')}
 * @returns {JSX.Element}
 * @constructor
 */
export default function Modal({isOpen, close, title, children, size}) {
    let sizeClasses = '';
    switch (size) {
        case 'sm':
            sizeClasses = 'max-w-md';
            break;
        case 'lg':
            sizeClasses = 'max-w-6xl';
            break;
        case 'xl':
            sizeClasses = 'max-w-7xl';
            break;
        default:
            sizeClasses = 'max-w-2xl';
            break;
    }
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 bg-gray-800 bg-opacity-20 overflow-y-auto"
                onClose={close}>
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Dialog.Overlay className="fixed inset-0"/>
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true">
              &#8203;
            </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95">
                        <div
                            className={`inline-block w-full overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-xl ` + sizeClasses}>
                            {
                                title &&
                                <Dialog.Title as="h3"
                                              className="text-base px-4 py-2 text-left font-semibold leading-6 text-gray-900 border-b border-gray-200">{title}</Dialog.Title>
                            }
                            <div className={`p-4`}>
                                {children}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}
