const PaginateIndicator = () => {
    return (
        <div className="absolute right-8 bottom-[10%]">
            <ul className="flex gap-1">
                <li className="h-1 w-6 cursor-pointer bg-slate-100"></li>
                <li className="h-1 w-6 cursor-pointer bg-slate-600"></li>
                <li className="h-1 w-6 cursor-pointer bg-slate-600"></li>
                <li className="h-1 w-6 cursor-pointer bg-slate-600"></li>
            </ul>
        </div>
    );
};
export default PaginateIndicator;
