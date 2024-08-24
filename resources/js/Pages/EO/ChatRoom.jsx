import DashboardLayout from "@/Layouts/dashboard";
import { Head } from "@inertiajs/react";
import { Divider } from "@mui/material";

const ChatRoom = () => {
    return (
        <>
            <DashboardLayout>
                <Head title="ChatRoom" />
                <div className="flex">
                    <div>
                        <h5 className="text-lg font-medium">Chats</h5>
                        <Divider />
                    </div>
                    <div className="flex-1 border-left-2">
                        <div className="header text-lg font-bold">
                            Chat Name
                        </div>
                        <Divider />
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default ChatRoom;
