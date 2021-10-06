export default function Card({title, actions, children}) {
    return (
        <div className="bg-white shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="flex-grow flex-1">
                        <h3 className="font-semibold text-xl text-blueGray-700">{title}</h3>
                    </div>
                    <div className="flex-grow flex-1 text-right">
                        {actions}
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}
