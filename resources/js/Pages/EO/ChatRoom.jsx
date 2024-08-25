import ChatMessages from "@/Components/ChatMessages";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import DashboardLayout from "@/Layouts/dashboard";
import { Head, usePage } from "@inertiajs/react";
import { Send } from "@mui/icons-material";
import { Avatar, Box, Divider, List, ListItem } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const ChatRoom = ({ users }) => {
    const [activeChat, setActiveChat] = useState(null);
    const [message, setMessage] = useState("");

    const loggedInUserId = usePage().props.auth.user.id;

    async function sendMessage() {
        try {
            const response = await axios.post(route("chatroom.send.message"), {
                recepientId: activeChat.id,
                message: message,
            });

            console.log(response.data);
            setMessage("");
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    function activateUser(user) {
        setActiveChat(null);
        setActiveChat(user);
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
                            {users.map((user, index) => {
                                if (user.id === loggedInUserId) return null;

                                return (
                                    <ListItem
                                        key={index}
                                        onClick={() => activateUser(user)}
                                        className="flex p-2 my-2 hover:bg-gray-200 rounded cursor-pointer"
                                    >
                                        <Avatar
                                            src={user.profile_photo_url}
                                            alt="photoURL"
                                        />
                                        <div className="ml-1 flex-1">
                                            <h6 className="text-md font-bold">
                                                {user.name}
                                            </h6>
                                            <p className="text-sm font-regular">
                                                {user.email}
                                            </p>
                                            <p className="text-xs font-small">
                                                {user.role}
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
                                    <div className="flex p-2 my-2 rounded">
                                        <Avatar
                                            src={activeChat.profile_photo_url}
                                            alt="photoURL"
                                            className="my-auto"
                                        />
                                        <div className="ml-1 flex-1">
                                            <h6 className="text-md font-bold my-auto">
                                                {activeChat.name}
                                            </h6>
                                            <p className="text-sm flex font-regular my-auto">
                                                <span className="flex-1">
                                                    {activeChat.email}
                                                </span>
                                                <span className="text-xs my-auto font-regular">
                                                    {activeChat.role}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                            {!activeChat && <>Select Chat To Start</>}
                        </div>
                        <Divider />
                        <Box
                            flexDirection={"column"}
                            className="w-full mb-6 flex-1 my-5 flex"
                        >
                            {activeChat && (
                                <ChatMessages userId={activeChat.id} />
                            )}
                        </Box>
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
