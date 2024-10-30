import { fToNow } from "@/utils/format-time";
import { usePage } from "@inertiajs/react";

const Bubble = ({ message }) => {
    // Check if the message was sent by the logged-in user
    const isSentByMe = message.sender_id === usePage().props.auth.user.id;

    return (
        <>
            <div
                className={`flex items-start gap-2.5 ${
                    isSentByMe ? "justify-end" : ""
                }`}
            >
                <div
                    className={`m-2 flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 ${
                        isSentByMe ? "bg-green-100 text-right" : "bg-gray-100"
                    } rounded-xl ${
                        isSentByMe
                            ? "rounded-s-xl rounded-se-xl"
                            : "rounded-e-xl rounded-es-xl"
                    }`}
                >
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900">
                            {message.name}
                        </span>
                        <span className="text-sm font-normal text-gray-500">
                            {fToNow(message.created_at)}
                        </span>
                    </div>
                    <p className="text-sm font-normal py-2.5 text-gray-900">
                        {message.message}
                    </p>
                    <span className="text-sm font-normal text-gray-500">
                        Delivered
                    </span>
                </div>
            </div>
        </>
    );
};

export default Bubble;
