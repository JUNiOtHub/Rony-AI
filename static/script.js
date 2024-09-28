document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const chatBox = document.getElementById("chat-box");

    const sendMessage = async () => {
        const messageText = inputField.value.trim();
        if (messageText) {
            // Mensagem do usuário
            const userMessageElement = document.createElement("div");
            userMessageElement.textContent = messageText;
            userMessageElement.className = "message user";
            chatBox.appendChild(userMessageElement);

            // Limpar o campo de entrada
            inputField.value = "";
            chatBox.scrollTop = chatBox.scrollHeight; // Rolar para a última mensagem

            // Enviar mensagem ao servidor
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: messageText }),
            });

            if (response.ok) {
                const data = await response.json();
                // Mensagem da IA
                const aiMessageElement = document.createElement("div");
                aiMessageElement.textContent = data.response;
                aiMessageElement.className = "message bot";
                chatBox.appendChild(aiMessageElement);
                chatBox.scrollTop = chatBox.scrollHeight; // Rolar para a última mensagem
            } else {
                console.error("Erro ao enviar a mensagem:", response.statusText);
            }
        }
    };

    sendButton.addEventListener("click", sendMessage);
    inputField.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});
