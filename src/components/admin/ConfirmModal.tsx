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
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-eureka-border w-full max-w-md p-6 font-mono text-xs space-y-6 rounded-3xl shadow-eureka-lg relative">
        
        {/* Header Icon & Title */}
        <div className="flex items-start justify-between border-b border-eureka-border pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                isDanger
                  ? "bg-red-50 border-red-200 text-red-600"
                  : isWarning
                  ? "bg-amber-50 border-amber-200 text-amber-600"
                  : "bg-blue-50 border-blue-200 text-eureka-blue"
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
              <h3 className="text-base font-sans font-bold text-eureka-dark tracking-tight">
                {title}
              </h3>
              <span className="text-[10px] text-eureka-slate uppercase tracking-wider block font-bold">
                {isDanger ? "PERMANENT ACTION" : "CONFIRMATION REQUIRED"}
              </span>
            </div>
          </div>

          <button
            onClick={onCancel}
            disabled={loading}
            className="text-eureka-slate hover:text-eureka-dark transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Message */}
        <p className="text-eureka-slate leading-relaxed font-sans text-xs bg-slate-50 p-4 border border-eureka-border rounded-xl">
          {message}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-2.5 border border-eureka-border text-eureka-slate hover:text-eureka-dark hover:bg-slate-100 rounded-xl transition-all font-mono text-xs uppercase font-bold"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`px-6 py-2.5 font-bold font-mono text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm ${
              isDanger
                ? "bg-red-600 hover:bg-red-700 text-white"
                : isWarning
                ? "bg-amber-500 hover:bg-amber-600 text-white"
                : "bg-eureka-blue hover:bg-eureka-indigo text-white"
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

