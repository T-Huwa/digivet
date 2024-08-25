const CleanBubble = ({ message }) => {
    return (
        <>
            <div className="flex items-start gap-2.5">
                <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900">
                            {message.name}
                        </span>
                        <span className="text-sm font-normal text-gray-500">
                            {message.created_at}
                        </span>
                    </div>
                    <p className="text-sm font-normal py-2 text-gray-900">
                        {message.message}
                    </p>
                    <span className="text-sm font-normal text-gray-500">D</span>
                </div>
            </div>
        </>
    );
};

export default CleanBubble;
