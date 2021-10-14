export default function PageLayout({children}) {
    return (
        <div>
            <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
            </div>
            <div className="px-4 md:px-10 mx-auto w-full -m-24 relative">
                {children}
            </div>
        </div>
    )
}
