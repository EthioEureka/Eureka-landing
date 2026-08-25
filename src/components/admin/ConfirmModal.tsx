"use client";

import React from "react";
import { AlertTriangle, Info, CheckCircle2, Loader2, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const isDanger = variant === "danger";
  const isWarning = variant === "warning";

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#121212] border border-border-gray w-full max-w-md p-6 font-mono text-xs space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
        
        {/* Header Icon & Title */}
        <div className="flex items-start justify-between border-b border-border-gray/60 pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded flex items-center justify-center border shrink-0 ${
                isDanger
                  ? "bg-red-950/60 border-red-800 text-red-400"
                  : isWarning
                  ? "bg-amber-950/60 border-amber-800 text-amber-400"
                  : "bg-emerald-950/60 border-emerald-800 text-eureka-green"
              }`}
            >
              {isDanger ? (
                <AlertTriangle size={20} />
              ) : isWarning ? (
                <Info size={20} />
              ) : (
                <CheckCircle2 size={20} />
              )}
            </div>
            <div>
              <h3 className="text-base font-sans font-semibold text-off-white tracking-tight">
                {title}
              </h3>
              <span className="text-[10px] text-soft-gray uppercase tracking-wider block">
                {isDanger ? "PERMANENT ACTION" : "CONFIRMATION REQUIRED"}
              </span>
            </div>
          </div>

          <button
            onClick={onCancel}
            disabled={loading}
            className="text-soft-gray hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Message */}
        <p className="text-soft-gray leading-relaxed font-sans text-xs bg-deep-black p-4 border border-border-gray/40">
          {message}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-2.5 border border-border-gray text-soft-gray hover:text-off-white hover:border-white transition-colors font-mono text-xs uppercase"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`px-6 py-2.5 font-semibold font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              isDanger
                ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                : isWarning
                ? "bg-amber-500 hover:bg-amber-400 text-deep-black"
                : "bg-eureka-green hover:bg-white text-deep-black"
            }`}
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : null}
            <span>{loading ? "Processing..." : confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
