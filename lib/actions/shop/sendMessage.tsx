"use server"

const sendMessageToTG = async (message: string) => {
    const URL_API = `https://api.telegram.org/bot${process.env.tg_api_key}/sendMessage`;
    const chatId = process.env.tg_chat_id;

    try {
      await fetch(URL_API, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      });
    } catch (error) {
        console.error("Error while sending message:", error);
        return {
            error: "error",
        };
    }
}

export default sendMessageToTG