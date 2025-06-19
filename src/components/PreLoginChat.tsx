import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

// Simple type for chat messages
interface ChatMessage {
  id: string;
  user: string;
  message: string;
  isCurrentUser: boolean;
  timestamp: number;
}

export function PreLoginChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Load messages from localStorage on component mount
  useEffect(() => {
    const storedMessages = localStorage.getItem("preLoginChatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
    
    // Generate random username if not set
    const storedUserName = localStorage.getItem("preLoginChatUserName");
    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      const randomName = `User${Math.floor(Math.random() * 10000)}`;
      setUserName(randomName);
      localStorage.setItem("preLoginChatUserName", randomName);
    }
  }, []);
  
  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("preLoginChatMessages", JSON.stringify(messages));
    }
  }, [messages]);
  
  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: ChatMessage = {
      id: Date.now().toString(),
      user: userName,
      message: newMessage.trim(),
      isCurrentUser: true,
      timestamp: Date.now(),
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
    
    // Simulate receiving a response after a short delay
    setTimeout(() => {
      const responses = [
        "Thanks for your message!",
        "Interesting point!",
        "I'll get back to you on that.",
        "Could you tell me more?",
        "That's great to hear!"
      ];
      
      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        user: "ChatBot",
        message: responses[Math.floor(Math.random() * responses.length)],
        isCurrentUser: false,
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
    
    // Focus back on the input for continued conversation
    inputRef.current?.focus();
  };

  // Format timestamp to readable time
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Handle message input submission
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Clear chat history
  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem("preLoginChatMessages");
    toast({
      title: "Chat cleared",
      description: "All messages have been deleted",
    });
  };

  // Change username
  const handleChangeUsername = () => {
    const newName = prompt("Enter your name:", userName);
    if (newName && newName.trim()) {
      setUserName(newName.trim());
      localStorage.setItem("preLoginChatUserName", newName.trim());
      toast({
        title: "Username updated",
        description: `You'll now appear as "${newName.trim()}"`,
      });
    }
  };

  return (
    <div className="flex justify-center p-4 h-full">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Quick Chat</CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleChangeUsername}
              >
                Change Name
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleClearChat}
              >
                Clear Chat
              </Button>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Chatting as <span className="font-semibold">{userName}</span>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="p-4">
          <div className="h-[400px] overflow-y-auto pr-2">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No messages yet. Start a conversation!
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-2 max-w-[80%] ${msg.isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={msg.isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-500 text-white"}>
                          {msg.user.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className={`rounded-lg px-3 py-2 ${
                          msg.isCurrentUser 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}>
                          {msg.message}
                        </div>
                        <div className={`text-xs mt-1 text-muted-foreground ${
                          msg.isCurrentUser ? 'text-right' : 'text-left'
                        }`}>
                          {msg.user}, {formatTime(msg.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="flex w-full gap-2">
            <Input
              ref={inputRef}
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow"
            />
            <Button onClick={handleSendMessage} type="submit">
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}