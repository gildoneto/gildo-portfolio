"use client";

import { useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  type User,
} from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import {
  getContacts,
  markAsRead,
  type ContactMessage,
} from "@/app/lib/firestore";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "gildorama@gmail.com";

function formatDate(ts: ContactMessage["createdAt"]): string {
  if (!ts) return "—";
  const d = ts.toDate();
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [msgLoading, setMsgLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("unread");

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
  }, []);

  useEffect(() => {
    if (user?.email !== ADMIN_EMAIL) return;
    setMsgLoading(true);
    getContacts()
      .then(setMessages)
      .finally(() => setMsgLoading(false));
  }, [user]);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleSignOut = () => signOut(auth);

  const handleMarkRead = async (id: string) => {
    await markAsRead(id);
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  };

  /* ── Loading ── */
  if (authLoading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <span className="font-mono text-sm text-ink-muted animate-pulse">
          Carregando...
        </span>
      </div>
    );
  }

  /* ── Sign-in ── */
  if (!user) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center gap-6">
        <p className="font-display font-extrabold text-ink text-4xl tracking-tight">
          Admin
        </p>
        <p className="font-mono text-sm text-ink-muted">
          Gildo Neto · Portfolio
        </p>
        <button
          onClick={handleSignIn}
          className="flex items-center gap-3 bg-surface border border-surface-up hover:border-amber text-ink text-sm font-medium px-6 py-3 rounded-lg transition-colors duration-200"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
          </svg>
          Entrar com Google
        </button>
      </div>
    );
  }

  /* ── Unauthorized ── */
  if (user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center gap-4">
        <p className="text-ink font-medium">Acesso negado.</p>
        <p className="font-mono text-sm text-ink-muted">{user.email}</p>
        <button
          onClick={handleSignOut}
          className="text-sm text-amber underline mt-2"
        >
          Sair
        </button>
      </div>
    );
  }

  /* ── Messages ── */
  const visible =
    filter === "all" ? messages : messages.filter((m) => !m.read);
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Header */}
      <header className="border-b border-surface sticky top-0 bg-canvas/90 backdrop-blur-md z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-extrabold text-xl tracking-tight">
              Mensagens
            </span>
            {unreadCount > 0 && (
              <span className="bg-amber text-canvas font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-ink-muted hidden sm:block">
              {user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="font-mono text-xs text-ink-muted hover:text-amber transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Filter */}
        <div className="flex gap-2 mb-8">
          {(["unread", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={[
                "font-mono text-xs tracking-widest uppercase px-3 py-1.5 rounded transition-colors",
                filter === f
                  ? "bg-amber text-canvas"
                  : "text-ink-muted border border-surface-up hover:border-ink-muted",
              ].join(" ")}
            >
              {f === "unread" ? `Não lidas (${unreadCount})` : `Todas (${messages.length})`}
            </button>
          ))}
        </div>

        {/* Content */}
        {msgLoading ? (
          <p className="font-mono text-sm text-ink-muted animate-pulse">
            Carregando mensagens...
          </p>
        ) : visible.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-mono text-ink-muted text-sm">
              {filter === "unread"
                ? "Nenhuma mensagem não lida."
                : "Nenhuma mensagem ainda."}
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {visible.map((msg) => (
              <li
                key={msg.id}
                className={[
                  "bg-surface border rounded-xl p-6 transition-colors",
                  msg.read
                    ? "border-surface-up opacity-60"
                    : "border-surface-up hover:border-amber/40",
                ].join(" ")}
              >
                {/* Top row */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="font-medium text-ink">{msg.name}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <a
                        href={`mailto:${msg.email}`}
                        className="font-mono text-xs text-amber hover:underline"
                      >
                        {msg.email}
                      </a>
                      {msg.whatsapp && (
                        <a
                          href={`https://wa.me/${msg.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-terminal hover:underline"
                        >
                          {msg.whatsapp}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-mono text-[10px] text-ink-muted uppercase tracking-widest">
                      {msg.lang?.toUpperCase()}
                    </span>
                    <span className="font-mono text-[10px] text-ink-muted">
                      {formatDate(msg.createdAt)}
                    </span>
                    {!msg.read && (
                      <button
                        onClick={() => handleMarkRead(msg.id)}
                        className="font-mono text-[10px] text-ink-muted border border-surface-up hover:border-amber hover:text-amber px-2 py-1 rounded transition-colors"
                      >
                        Marcar lida
                      </button>
                    )}
                  </div>
                </div>

                {/* Project */}
                <div className="mb-3">
                  <span className="font-mono text-[10px] text-terminal tracking-widest uppercase">
                    projeto
                  </span>
                  <p className="text-sm text-ink mt-1">{msg.project}</p>
                </div>

                {/* Message */}
                {msg.message && (
                  <div>
                    <span className="font-mono text-[10px] text-ink-muted tracking-widest uppercase">
                      mensagem
                    </span>
                    <p className="text-sm text-ink-muted mt-1 leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
