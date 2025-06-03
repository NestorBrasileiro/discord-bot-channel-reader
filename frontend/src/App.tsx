import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function App() {
  const [messages, setMessages] = useState([
    { user: "John Doe", text: "Fala rapaziada 👋" },
    { user: "Maria", text: "E aí, de boa?" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages([...messages, { user: "Você", text: newMessage }]);
    setNewMessage("");
  };

  useEffect(() => {
    // Sempre que mensagens mudarem, rola até o final
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      
      {/* Header */}
      <header className="h-16 bg-gray-800 flex items-center px-6 shadow">
        <h1 className="text-xl font-semibold"># geral</h1>
      </header>

      {/* Área de mensagens */}
      <section className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, index) => (
          <div key={index} className="flex items-start gap-4">
            <Avatar>
              <AvatarFallback>{msg.user[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{msg.user}</p>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {/* Esse div aqui é onde vamos scrollar */}
        <div ref={messagesEndRef} />
      </section>

      {/* Campo de envio de mensagem */}
      <footer className="h-20 bg-gray-800 flex items-center px-6 border-t border-gray-700">
        <form className="flex w-full gap-4" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-gray-700 p-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-semibold"
          >
            Enviar
          </button>
        </form>
      </footer>
    </div>
  );
}
