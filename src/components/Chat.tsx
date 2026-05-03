import { useState } from "react";
import { IoIosSend } from "react-icons/io";

interface messageChat {
    text: string,
    date: Date,
    direction: "sent" | "received"
}
const Chat = () => {

    // Classes para mensagens
    const baseClassMessage = "flex flex-col rounded-md w-fit min-w-[200px] p-2 text-xs"
    const directionClassMessage = (direction: string) => direction === "received" ? "bg-white" : "self-end bg-green-200";
    const firstMessage: messageChat = { date: new Date(), text: "Olá! Como você está?", direction: "received" };

    // Actions: Chat
    const [chat, setChat] = useState<messageChat[]>([firstMessage]);
    const handlePushChat = () => {
        if (!messageInput.trim()) return;

        const newMessage: messageChat = {
            date: new Date(),
            text: messageInput.trim(),
            direction: "sent"
        }
        setChat([...chat, newMessage])
        setMessageInput('');
    }

    // Chat Input
    const [messageInput, setMessageInput] = useState<string>('');


    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 flex flex-col gap-2 overflow-y-auto min-h-0">
                {
                    chat && chat.map((message) => (
                        <p className={`${baseClassMessage} ${directionClassMessage(message.direction)}`}>{message.text}
                            <span className="self-end text-[11px] text-gray-400">{message.date.toLocaleTimeString('pt-br', { timeStyle: "short" })}</span>
                        </p>
                    ))
                }
            </div>

            <div className="flex flex-row-flex-nowrap bg-white border border-gray-400 p-2 rounded-2xl">
                <input type="text" className="flex-1 outline-none font-thin text-black" placeholder="Escreva sua mensagem..." onChange={(e) => setMessageInput(e.target.value)} value={messageInput} onKeyDown={(e) => e.key === "Enter" && handlePushChat()} />
                <button className="cursor-pointer p-2" onClick={handlePushChat}>
                    <IoIosSend />
                </button>
            </div>
        </div>
    )
}

export default Chat