import * as React from "react";
import { 
  IconClock, 
  IconMessage, 
  IconSend, 
  IconSparkles, 
  IconUser, 
  IconCheck, 
  IconAlertTriangle,
  IconKeyboard
} from "@tabler/icons-react";
import { clsx } from "clsx";

interface Message {
  id: string;
  sender: "guest" | "operator" | "ai-draft";
  text: string;
  timestamp: string;
}

interface Thread {
  id: string;
  guestName: string;
  roomNumber: string;
  lastMessage: string;
  slaTimeRemainingMin: number; // in minutes
  status: "critical" | "warning" | "on-track" | "resolved";
  messages: Message[];
  aiSuggestedReply?: string;
}

export function SLAInboxThread() {
  const [threads, setThreads] = React.useState<Thread[]>([
    {
      id: "1",
      guestName: "John Doe",
      roomNumber: "Room 304",
      lastMessage: "AC is making a loud noise and blowing warm air. Please help ASAP!",
      slaTimeRemainingMin: 3,
      status: "critical",
      aiSuggestedReply: "Hi John, I am so sorry to hear that the AC is malfunctioning. I've immediately dispatched our maintenance technician to Room 304. They will be there in less than 10 minutes. Can I offer to move you to another room in the meantime?",
      messages: [
        { id: "1-1", sender: "guest", text: "Just checked in. The room is nice!", timestamp: "9:15 AM" },
        { id: "1-2", sender: "operator", text: "Welcome John! Please let us know if you need anything.", timestamp: "9:16 AM" },
        { id: "1-3", sender: "guest", text: "AC is making a loud noise and blowing warm air. Please help ASAP!", timestamp: "9:25 AM" }
      ]
    },
    {
      id: "2",
      guestName: "Sarah Smith",
      roomNumber: "Room 102",
      lastMessage: "Could we get 3 extra feather pillows delivered to the room?",
      slaTimeRemainingMin: 14,
      status: "warning",
      aiSuggestedReply: "Hello Sarah, absolutely! I will have housekeeping deliver 3 extra feather pillows to Room 102 right away.",
      messages: [
        { id: "2-1", sender: "guest", text: "Could we get 3 extra feather pillows delivered to the room?", timestamp: "9:20 AM" }
      ]
    },
    {
      id: "3",
      guestName: "Michael Brown",
      roomNumber: "Room 215",
      lastMessage: "Everything looks amazing, thank you for the welcoming chocolate!",
      slaTimeRemainingMin: 45,
      status: "resolved",
      messages: [
        { id: "3-1", sender: "guest", text: "Everything looks amazing, thank you for the welcoming chocolate!", timestamp: "8:45 AM" },
        { id: "3-2", sender: "operator", text: "Our pleasure Michael! Have a wonderful stay.", timestamp: "8:50 AM" }
      ]
    }
  ]);

  const [activeThreadId, setActiveThreadId] = React.useState<string>("1");
  const [replyText, setReplyText] = React.useState("");
  const [isGeneratingAI, setIsGeneratingAI] = React.useState(false);
  const [announcement, setAnnouncement] = React.useState("");

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  // Optimistic message send
  const handleSendMessage = (textToSend?: string) => {
    const finalTxt = textToSend || replyText;
    if (!finalTxt.trim()) return;

    const newMessage: Message = {
      id: Math.random().toString(),
      sender: "operator",
      text: finalTxt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Optimistically update active thread
    setThreads((prevThreads) => 
      prevThreads.map((t) => {
        if (t.id === activeThread.id) {
          return {
            ...t,
            lastMessage: finalTxt,
            status: "resolved", // responding resolves or cools down SLA
            slaTimeRemainingMin: 60, // Reset timer
            messages: [...t.messages, newMessage]
          };
        }
        return t;
      })
    );

    setReplyText("");
    setAnnouncement(`Message sent to ${activeThread.guestName} successfully.`);
    
    // Clear live announcement after reading
    setTimeout(() => setAnnouncement(""), 3000);
  };

  // Keyboard shortcut Ctrl + Enter to send
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Triggers mock AI replies generation
  const handleTriggerAI = () => {
    if (!activeThread.aiSuggestedReply) return;
    setIsGeneratingAI(true);
    setAnnouncement("Generating AI smart draft reply...");

    setTimeout(() => {
      setIsGeneratingAI(false);
      setReplyText(activeThread.aiSuggestedReply || "");
      setAnnouncement("AI suggested reply loaded into message area.");
      setTimeout(() => setAnnouncement(""), 3000);
    }, 900);
  };

  return (
    <div className="theme-operator flex h-[600px] w-full max-w-5xl rounded-xl border border-slate-200 bg-[#f8fafc] text-slate-800 shadow-xl overflow-hidden font-sans">
      
      {/* ARIA Live Region for screen-reader notifications */}
      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>

      {/* 1. Sidebar conversation triage list */}
      <div className="w-1/3 border-r border-slate-200 bg-white flex flex-col" aria-label="Conversation Inbox Queue">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-[#f8fafc]">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">SLA Active Triage</h2>
          <span className="px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-600 rounded-full flex items-center gap-1">
            <IconClock className="w-3 h-3" />
            <span>SLA Queue</span>
          </span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {threads.map((thread) => {
            const isCritical = thread.status === "critical";
            const isWarning = thread.status === "warning";
            const isResolved = thread.status === "resolved";
            const isActive = thread.id === activeThreadId;

            return (
              <button
                key={thread.id}
                onClick={() => setActiveThreadId(thread.id)}
                aria-selected={isActive}
                className={clsx(
                  "w-full text-left p-4 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#0284c7] focus-visible:z-10 flex flex-col gap-1.5",
                  isActive ? "bg-slate-50 border-l-4 border-[#0284c7]" : "hover:bg-slate-50/50 border-l-4 border-transparent"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-slate-900">{thread.guestName}</span>
                    <span className="text-xs text-slate-500">• {thread.roomNumber}</span>
                  </div>
                  
                  {/* Blinking Critical Alert (<5m) */}
                  {!isResolved && (
                    <span
                      className={clsx(
                        "text-xs px-2 py-0.5 rounded-md font-bold flex items-center gap-1",
                        isCritical && "bg-red-50 text-red-600 border border-red-200 animate-pulse",
                        isWarning && "bg-amber-50 text-amber-600 border border-amber-200"
                      )}
                    >
                      {isCritical && <IconAlertTriangle className="w-3.5 h-3.5" />}
                      <span>{thread.slaTimeRemainingMin}m left</span>
                    </span>
                  )}

                  {isResolved && (
                    <span className="text-xs px-2 py-0.5 rounded-md font-medium bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-0.5">
                      <IconCheck className="w-3 h-3" />
                      <span>SLA resolved</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {thread.lastMessage}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Message Thread area */}
      <div className="flex-1 flex flex-col bg-slate-50/50" aria-label="Conversation Thread Content">
        {/* Thread Header */}
        <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
              <IconUser className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 leading-tight flex items-center gap-1.5">
                <span>{activeThread.guestName}</span>
                <span className="text-xs font-normal text-slate-500">({activeThread.roomNumber})</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Direct chat channel</p>
            </div>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {activeThread.messages.map((msg) => {
            const isGuest = msg.sender === "guest";
            return (
              <div
                key={msg.id}
                className={clsx(
                  "flex flex-col max-w-[75%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-sm",
                  isGuest 
                    ? "mr-auto bg-white border border-slate-100 text-slate-800 rounded-bl-none" 
                    : "ml-auto bg-[#0284c7] text-white rounded-br-none"
                )}
              >
                <p>{msg.text}</p>
                <span
                  className={clsx(
                    "text-[10px] mt-1 text-right block font-medium",
                    isGuest ? "text-slate-400" : "text-slate-200"
                  )}
                >
                  {msg.timestamp}
                </span>
              </div>
            );
          })}
        </div>

        {/* Input & AI replies panel */}
        <div className="p-4 bg-white border-t border-slate-200 space-y-3">
          
          {/* 3. AI Generated Smart Reply Assistant Panel */}
          {activeThread.aiSuggestedReply && (
            <div className="p-3 bg-[#0284c7]/5 border border-[#0284c7]/15 rounded-lg flex items-start gap-3">
              <div className="p-1.5 bg-[#0284c7]/10 text-[#0284c7] rounded-md mt-0.5">
                <IconSparkles className="w-4 h-4 animate-spin-slow" />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider flex items-center gap-1">
                    <span>AI Concierge Draft</span>
                  </span>
                  <button
                    onClick={handleTriggerAI}
                    disabled={isGeneratingAI}
                    className="text-xs font-semibold text-[#0284c7] hover:text-[#026896] hover:underline cursor-pointer disabled:opacity-50"
                  >
                    {isGeneratingAI ? "Inserting..." : "Insert draft"}
                  </button>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {activeThread.aiSuggestedReply}
                </p>
              </div>
            </div>
          )}

          {/* Typing field */}
          <div className="space-y-2">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your response to the guest..."
              className="w-full min-h-[70px] p-3 text-sm bg-slate-50 border border-slate-200 focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/10 rounded-lg outline-none resize-none transition-all leading-relaxed"
            />
            
            <div className="flex items-center justify-between">
              {/* Keyboard badges for shortcut */}
              <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                <IconKeyboard className="w-3.5 h-3.5 text-slate-300" />
                <span>Press</span>
                <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-500 font-bold">Ctrl</kbd>
                <span>+</span>
                <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-500 font-bold">Enter</kbd>
                <span>to send</span>
              </div>

              <button
                onClick={() => handleSendMessage()}
                disabled={!replyText.trim()}
                className="px-4 py-2 bg-[#0284c7] hover:bg-[#026da0] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold text-sm rounded-lg flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Send</span>
                <IconSend className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
