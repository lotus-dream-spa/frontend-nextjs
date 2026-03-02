"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { NavbarElement, FooterElement } from "@/components";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function BookingCancellationPage() {
  const t = useTranslations("bookingCancellation");
  const params = useParams();
  const token = params.token as string;

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      // Collect browser info
      const browserInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
      };

      const res = await fetch("/api/booking/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, email, browserInfo }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || t("errorMessage"));
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(t("errorMessage"));
    }
  };

  return (
    <>
      <div className="bg-lotus-blue w-full flex flex-col">
        <NavbarElement />
      </div>

      <main className="flex-grow flex flex-col items-center justify-start px-4 pb-20 mt-64">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl w-full flex flex-col items-center text-center gap-10"
        >
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl lg:text-6xl font-agr text-white leading-tight">
              {t("title")}
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/80 max-w-xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          <div className="w-full max-w-md bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-2xl shadow-2xl">
            {status === "success" ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="w-20 h-20 bg-lotus-gold/20 rounded-full flex items-center justify-center text-4xl border border-lotus-gold/30">
                  ✓
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-agr text-lotus-gold">{t("success")}</h2>
                  <p className="text-white/70 font-light">{t("successMessage")}</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex flex-col gap-3 text-left">
                  <label htmlFor="email" className="text-sm uppercase tracking-widest font-bold text-white/50">
                    {t("emailLabel")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("emailPlaceholder")}
                    className="w-full px-0 ps-4 py-4 bg-transparent border-b border-white/20 focus:border-lotus-gold outline-none transition-colors text-xl font-light text-white placeholder:text-white/10"
                  />
                </div>

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-lotus-rosewood text-sm font-bold bg-lotus-rosewood/10 p-4 rounded-lg border border-lotus-rosewood/20"
                  >
                    {t("error")}: {errorMessage}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading" || !token}
                  className={`w-full py-4 rounded-lg uppercase font-bold tracking-widest transition-all duration-500 transform active:scale-[0.98] ${status === "loading"
                    ? "bg-white/10 text-white/30 cursor-not-allowed"
                    : "bg-lotus-gold hover:bg-lotus-rosewood text-white shadow-xl shadow-black/20"
                    }`}
                >
                  {status === "loading" ? t("processing") : t("cancelButton")}
                </button>
              </form>
            )}

            {!token && status !== "success" && (
              <div className="mt-8 p-4 bg-lotus-rosewood/10 border border-lotus-rosewood/20 rounded-lg text-lotus-rosewood text-xs uppercase tracking-tighter">
                {t("invalidToken")}
              </div>
            )}
          </div>
        </motion.div>
      </main>

      <FooterElement />

    </>
  );
}