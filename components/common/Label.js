export default function Label({children, forEl}) {
    return (
        <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor={forEl}
        >
            {children}
        </label>
    )
}
