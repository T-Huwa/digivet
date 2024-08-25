import ChatMessages from "@/Components/ChatMessages";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import DashboardLayout from "@/Layouts/dashboard";
import { Head } from "@inertiajs/react";
import { Send } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Divider,
    List,
    ListItem,
    IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useState } from "react";

const ChatRoom = ({ EOs }) => {
    const [activeChat, setActiveChat] = useState(null);
    const [message, setMessage] = useState("");
    const [showChats, setShowChats] = useState(true);

    async function sendMessage() {
        try {
            const response = await axios.post(route("chatroom.send.message"), {
                recepientId: activeChat?.id,
                message: message,
            });
            setMessage("");
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    function activateUser(user) {
        setActiveChat(user);
        setShowChats(false);
    }

    function handleBack() {
        setShowChats(true);
        setActiveChat(null);
    }

    return (
        <DashboardLayout>
            <Head title="ChatRoom" />
            <div className="bg-white flex h-full border-2 border-gray-400 rounded mx-3 p-2">
                {showChats && (
                    <Box
                        className="p-3"
                        sx={{
                            minWidth: 220,
                            maxWidth: { xs: "100%", sm: 260 },
                            display: {
                                xs: activeChat ? "none" : "block",
                                sm: "block",
                            },
                        }}
                    >
                        <h5 className="text-lg font-medium">Chats</h5>
                        <Divider />
                        <List className="py-6">
                            {EOs.map((eo, index) => (
                                <ListItem
                                    key={index}
                                    onClick={() => activateUser(eo)}
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
                            ))}
                        </List>
                    </Box>
                )}
                <Box
                    className={`flex-1 px-3 pt-3 h-full flex ${
                        !showChats && "block"
                    }`}
                    sx={{
                        display: {
                            xs: showChats ? "none" : "flex",
                            sm: "flex",
                        },
                    }}
                    flexDirection={"column"}
                >
                    {activeChat && (
                        <>
                            <div className="header text-lg font-bold">
                                <div className="flex rounded">
                                    <IconButton
                                        className="block sm:hidden"
                                        onClick={handleBack}
                                    >
                                        <ArrowBackIcon />
                                    </IconButton>
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
                            </div>
                            <Divider />
                            <Box
                                flexDirection={"column"}
                                className="w-full mb-6 flex-1 my-5 flex"
                            >
                                <ChatMessages userId={activeChat.id} />
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
                        </>
                    )}
                    {!activeChat && (
                        <div className="text-lg font-bold">
                            Select Chat To Start
                        </div>
                    )}
                </Box>
            </div>
        </DashboardLayout>
    );
};

export default ChatRoom;
