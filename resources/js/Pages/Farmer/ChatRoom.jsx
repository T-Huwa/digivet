import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import DashboardLayout from "@/Layouts/dashboard";
import { Head, router } from "@inertiajs/react";
import { Send } from "@mui/icons-material";
import { Avatar, Box, Divider, List, ListItem } from "@mui/material";
import { useState } from "react";

const ChatRoom = ({ EOs }) => {
    const [activeChat, setActiveChat] = useState(null);
    const [message, setMessage] = useState("");

    function sendMessage() {
        router.post(route("chatroom.send.message"), {
            recepientId: activeChat.id,
            message: message,
        });
    }

    return (
        <>
            <DashboardLayout>
                <Head title="ChatRoom" />
                <div className="bg-white flex h-full border-2 border-gray-400 rounded mx-3 p-2">
                    <Box
                        className="p-3"
                        sx={{
                            minWidth: 220,
                            maxWidth: 260,
                            //display: { xs: "none", sm: "block" },
                        }}
                    >
                        <h5 className="text-lg font-medium">Chats</h5>
                        <Divider />
                        <List className="py-6">
                            {EOs.map((eo, index) => {
                                return (
                                    <ListItem
                                        key={index}
                                        onClick={() => setActiveChat(eo)}
                                        className="flex p-2 my-2 hover:bg-gray-200 rounded cursor-pointer"
                                    >
                                        <Avatar
                                            src={eo.profile_photo_url}
                                            alt="photoURL"
                                        />
                                        <div className="ml-1 flex-1">
                                            <h6 className="text-md font-bold">
                                                {eo.name}
                                            </h6>
                                            <p className="text-sm font-regular">
                                                {eo.email}
                                            </p>
                                        </div>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                    <Box
                        className="flex-1 px-3 pt-3 h-full flex"
                        sx={{
                            borderLeft: { xs: 0, sm: 2 },
                        }}
                        flexDirection={"column"}
                    >
                        <div className="header text-lg font-bold">
                            {activeChat && (
                                <>
                                    <div className="flex p-2 my-2 hover:bg-gray-200 rounded cursor-pointer">
                                        <Avatar
                                            src={activeChat.profile_photo_url}
                                            alt="photoURL"
                                        />
                                        <div className="ml-1 flex-1">
                                            <h6 className="text-md font-bold">
                                                {activeChat.name}
                                            </h6>
                                            <p className="text-sm font-regular">
                                                {activeChat.email}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <Divider />
                        <Box
                            flexDirection={"column"}
                            className="w-full mb-6 flex-1 my-5 flex"
                        >
                            <div className="w-full flex-1"> Here</div>
                        </Box>{" "}
                        <div className="w-full flex">
                            <TextInput
                                className="flex-1 my-auto"
                                value={message}
                                disabled={!activeChat}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <PrimaryButton
                                disabled={!activeChat}
                                className="ml-3"
                                onClick={sendMessage}
                            >
                                <Send />
                            </PrimaryButton>
                        </div>
                    </Box>
                </div>
            </DashboardLayout>
        </>
    );
};

export default ChatRoom;
