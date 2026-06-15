import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  X,
  Play,
  CheckCircle2,
  AlertCircle,
  Infinity,
  Check,
  Shield,
  ShieldCheck,
  ShieldAlert,
  RotateCcw,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface AntigravityPanelProps {
  antigravity: boolean;
  setAntigravity: (val: boolean) => void;
}

interface LogLine {
  id: string;
  text: string;
  type: "log" | "cmd" | "success" | "error" | "info" | "system";
  timestamp: string;
}

const MOCK_STEPS = [
  { type: "system", text: "🤖 Antigravity Developer Agent v1.0.0 initialized." },
  { type: "log", text: "🔍 Scanning workspace at '/home/arturo/Documentos/CV web arturo'..." },
  { type: "info", text: "💡 Found 12 components and 5 router views." },
  { type: "cmd", text: "git checkout -b feature/antigravity-gravity", desc: "Create a feature branch" },
  { type: "success", text: "🌿 Switched to branch 'feature/antigravity-gravity'." },
  { type: "cmd", text: "npm run optimize-aesthetics --premium", desc: "Elevate visual design to premium quality" },
  { type: "success", text: "✨ Aesthetic enhancers injected successfully." },
  { type: "log", text: "🪐 Activating 3D Parallax layers on profile portrait..." },
  { type: "cmd", text: "npx add-microinteractions --interactive", desc: "Install fluid micro-interactions" },
  { type: "success", text: "✨ Micro-interactions and hover effects applied." },
  { type: "log", text: "🧪 Running visual integration tests..." },
  { type: "success", text: "✅ All 8 verification steps passed cleanly." },
  { type: "cmd", text: "git commit -am 'feat: elevate user experience to premium'", desc: "Commit modified files" },
  { type: "success", text: "💾 Commit recorded [sha: a6b2c89f]." },
  { type: "cmd", text: "git push origin feature/antigravity-gravity", desc: "Push changes to remote repository" },
  { type: "success", text: "🚀 Remote branch created. Pull Request generated!" },
  { type: "system", text: "🎉 Workspace optimization completed successfully. Have a nice day!" },
];

export function AntigravityPanel({ antigravity, setAntigravity }: AntigravityPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [autoAccept, setAutoAccept] = useState(true);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isWaitingInput, setIsWaitingInput] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState<{ cmd: string; desc: string } | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal to bottom when logs change
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, isWaitingInput]);

  // Handle mock log execution flow
  useEffect(() => {
    if (!isRunning || isWaitingInput || stepIndex >= MOCK_STEPS.length) return;

    const currentStep = MOCK_STEPS[stepIndex];
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    const timer = setTimeout(() => {
      if (currentStep.type === "cmd") {
        if (autoAccept) {
          // Auto-accept mode: execute immediately
          setLogs((prev) => [
            ...prev,
            {
              id: Math.random().toString(),
              type: "cmd",
              text: `> Proposing command: ${currentStep.text}`,
              timestamp,
            },
            {
              id: Math.random().toString(),
              type: "system",
              text: `[AUTO-ACCEPTED] ✅ Command execution approved by Antigravity Agent.`,
              timestamp,
            },
          ]);
          setStepIndex((prev) => prev + 1);
        } else {
          // Manual confirmation required: Halt logs
          setLogs((prev) => [
            ...prev,
            {
              id: Math.random().toString(),
              type: "cmd",
              text: `> Proposing command: ${currentStep.text}`,
              timestamp,
            },
          ]);
          setCurrentPrompt({ cmd: currentStep.text, desc: currentStep.desc || "" });
          setIsWaitingInput(true);
        }
      } else {
        // Standard log line
        setLogs((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            type: currentStep.type as any,
            text: currentStep.text,
            timestamp,
          },
        ]);
        setStepIndex((prev) => prev + 1);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [isRunning, stepIndex, autoAccept, isWaitingInput]);

  const handleStartAgent = () => {
    setIsRunning(true);
    if (logs.length === 0) {
      // Clear logs first
      setLogs([]);
      setStepIndex(0);
    }
  };

  const handleResetAgent = () => {
    setLogs([]);
    setStepIndex(0);
    setIsRunning(false);
    setIsWaitingInput(false);
    setCurrentPrompt(null);
  };

  const handleApproveCommand = () => {
    if (!currentPrompt) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        type: "success",
        text: `[APPROVED] User accepted execution of: ${currentPrompt.cmd}`,
        timestamp,
      },
    ]);
    setIsWaitingInput(false);
    setCurrentPrompt(null);
    setStepIndex((prev) => prev + 1);
  };

  const handleDenyCommand = () => {
    if (!currentPrompt) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        type: "error",
        text: `[DENIED] User rejected execution. Agent execution halted.`,
        timestamp,
      },
    ]);
    setIsWaitingInput(false);
    setCurrentPrompt(null);
    setIsRunning(false);
  };

  return (
    <>
      {/* Floating Button (Bottom-Left) */}
      <div className="fixed bottom-5 left-5 z-40 flex flex-col gap-2">
        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.55_0.22_255)] text-white shadow-elegant hover:scale-105 transition-transform duration-300 relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
            isOpen && "scale-95"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggles Antigravity Control Center"
        >
          <motion.div
            animate={antigravity ? { rotate: 360 } : {}}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          >
            <Infinity className="h-6 w-6" />
          </motion.div>
          {antigravity && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-success"></span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Control Panel (Drawer / Panel Card) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "fixed bottom-24 left-5 z-50 w-full max-w-sm sm:max-w-md rounded-2xl glass-premium shadow-elegant border border-white/10 overflow-hidden flex flex-col transition-all duration-300",
              isMinimized ? "h-[64px]" : "h-[450px]"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-surface border-b border-border">
              <div className="flex items-center gap-2">
                <div className="flex h-2.5 w-2.5 rounded-full bg-success relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Antigravity Agent Center
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsMinimized((prev) => !prev)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                  title={isMinimized ? "Expandir" : "Minimizar"}
                >
                  {isMinimized ? <Maximize2 className="h-4.5 w-4.5" /> : <Minimize2 className="h-4.5 w-4.5" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Content Body (Hidden if minimized) */}
            {!isMinimized && (
              <>
                {/* Control Panel Settings */}
                <div className="grid grid-cols-2 gap-4 p-4 border-b border-border bg-surface/30">
                  {/* Antigravity Toggle */}
                  <div className="flex items-center justify-between gap-2 bg-surface/40 p-2.5 rounded-xl border border-white/5">
                    <div>
                      <div className="text-xs font-bold text-foreground">Zero Gravity</div>
                      <div className="text-[10px] text-muted-foreground">Float page elements</div>
                    </div>
                    <Switch
                      checked={antigravity}
                      onCheckedChange={setAntigravity}
                      aria-label="Toggle zero gravity animation"
                    />
                  </div>

                  {/* Auto Accept Toggle */}
                  <div className="flex items-center justify-between gap-2 bg-surface/40 p-2.5 rounded-xl border border-white/5">
                    <div>
                      <div className="text-xs font-bold text-foreground">Auto Accept</div>
                      <div className="text-[10px] text-muted-foreground">Approve agent steps</div>
                    </div>
                    <Switch
                      checked={autoAccept}
                      onCheckedChange={(val) => {
                        setAutoAccept(val);
                        // If turning on auto-accept and waiting, auto approve the pending task
                        if (val && isWaitingInput) {
                          handleApproveCommand();
                        }
                      }}
                      aria-label="Toggle agent auto-accept setting"
                    />
                  </div>
                </div>

                {/* Simulated Terminal Screen */}
                <div className="flex-1 bg-black/85 p-3.5 font-mono text-xs overflow-y-auto flex flex-col gap-1.5 min-h-0 select-text">
                  {logs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-10 gap-3">
                      <Terminal className="h-8 w-8 text-primary/40 animate-pulse" />
                      <div className="space-y-1">
                        <p className="font-semibold">Terminal ready to deploy agent</p>
                        <p className="text-[10px]">Click 'Launch Agent' to simulate an AI workflow run.</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={handleStartAgent}
                        className="bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary rounded-full px-4"
                      >
                        <Play className="h-3.5 w-3.5 mr-1" /> Launch Agent
                      </Button>
                    </div>
                  ) : (
                    <>
                      {logs.map((log) => (
                        <div
                          key={log.id}
                          className={cn(
                            "leading-relaxed break-words animate-reveal",
                            log.type === "cmd" && "text-violet-400 font-semibold",
                            log.type === "success" && "text-emerald-400",
                            log.type === "error" && "text-rose-400",
                            log.type === "system" && "text-amber-400 font-bold",
                            log.type === "info" && "text-cyan-400"
                          )}
                        >
                          <span className="text-muted-foreground text-[10px] mr-2">[{log.timestamp}]</span>
                          {log.text}
                        </div>
                      ))}

                      {/* Manual Confirmation Prompt Dialog */}
                      {isWaitingInput && currentPrompt && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-3 bg-zinc-900 border border-amber-500/30 rounded-xl p-3.5 text-foreground space-y-3 font-sans shadow-lg shadow-black/60"
                        >
                          <div className="flex gap-2 text-[11px] font-bold text-amber-500">
                            <ShieldAlert className="h-4.5 w-4.5 shrink-0" />
                            <span>PERMISSION REQUESTED BY AGENT</span>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs font-semibold font-mono text-zinc-300 break-all leading-tight bg-black/40 p-2 rounded border border-white/5">
                              {currentPrompt.cmd}
                            </div>
                            <div className="text-[10px] text-muted-foreground">
                              Action: {currentPrompt.desc}
                            </div>
                          </div>
                          <div className="flex gap-2 pt-1.5 justify-end">
                            <Button
                              onClick={handleDenyCommand}
                              variant="outline"
                              size="sm"
                              className="h-8 rounded-lg border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white"
                            >
                              Deny
                            </Button>
                            <Button
                              onClick={handleApproveCommand}
                              size="sm"
                              className="h-8 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold shadow-md shadow-amber-500/25"
                            >
                              <Check className="h-3.5 w-3.5 mr-1" /> Approve
                            </Button>
                          </div>
                        </motion.div>
                      )}

                      {/* Blinking cursor / loading line */}
                      {isRunning && !isWaitingInput && stepIndex < MOCK_STEPS.length && (
                        <div className="flex items-center gap-1.5 text-muted-foreground italic pl-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping"></span>
                          <span>Antigravity working...</span>
                        </div>
                      )}

                      {/* End node for scrolling */}
                      <div ref={terminalEndRef} />
                    </>
                  )}
                </div>

                {/* Footer Controls (Clear logs / Launch status) */}
                {logs.length > 0 && (
                  <div className="flex items-center justify-between px-4 py-2.5 bg-surface border-t border-border text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <span>Status:</span>
                      {stepIndex >= MOCK_STEPS.length ? (
                        <span className="text-emerald-500 font-semibold">Idle</span>
                      ) : isWaitingInput ? (
                        <span className="text-amber-500 font-semibold animate-pulse">Awaiting input</span>
                      ) : isRunning ? (
                        <span className="text-primary font-semibold">Running</span>
                      ) : (
                        <span className="text-zinc-500 font-semibold">Paused</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {stepIndex < MOCK_STEPS.length && !isRunning && !isWaitingInput && (
                        <button
                          onClick={handleStartAgent}
                          className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-bold"
                        >
                          <Play className="h-3 w-3" /> Resume
                        </button>
                      )}
                      <button
                        onClick={handleResetAgent}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        <RotateCcw className="h-3 w-3" /> Reset
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
