/**
 *
 * @param children
 * @param variant {('warning','error','info','success')}
 * @returns {JSX.Element}
 * @constructor
 */
export default function Alert({children, variant}) {
    let variantClass = '';
    switch (variant) {
        case "info":
            variantClass = `bg-lightBlue-500`;
            break;
        case "warning":
            variantClass = `bg-amber-500`;
            break;
        case "error":
            variantClass = `bg-red-500`;
            break;
        case "success":
            variantClass = `bg-emerald-500`
    }
    return (
        <div className={`py-4 px-6 text-white rounded ${variantClass}`}>
            {children}
        </div>
    )
}
