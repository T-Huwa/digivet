import { forwardRef } from "react";

const PrintComponent = forwardRef(({ data }, ref) => {
    return (
        <div ref={ref} className="p-6 my-8 bg-white shadow-md rounded-lg">
            <div
                id="reportToPrint"
                dangerouslySetInnerHTML={{
                    __html: data,
                }}
            />
        </div>
    );
});

export default PrintComponent;
