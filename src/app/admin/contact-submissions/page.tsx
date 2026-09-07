"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Mail,
  Phone,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  Archive,
  Trash2,
  Loader2,
  Inbox,
  Eye,
  EyeOff,
  Sparkles,
  RefreshCw,
  MessageSquare,
} from "lucide-react";
import { ContactSubmission } from "@/lib/types";

import ConfirmModal from "@/components/admin/ConfirmModal";

export default function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "contacted" | "completed" | "archived">("all");
  const [selectedSub, setSelectedSub] = useState<ContactSubmission | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Custom Confirmation Modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    leadId: string;
    leadName: string;
  }>({
    isOpen: false,
    leadId: "",
    leadName: "",
  });

  const loadSubmissions = async () => {
    try {
      const res = await fetch("/api/admin/contact-submissions");
      if (res.ok) {
        const data = await res.json();
        const subs: ContactSubmission[] = data.submissions || [];
        setSubmissions(subs);
        if (subs.length > 0 && !selectedSub) {
          handleSelectSub(subs[0]);
        }
      }
    } catch (err: unknown) {
      console.error("Failed to load contact submissions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const handleSelectSub = async (sub: ContactSubmission) => {
    setSelectedSub(sub);

    // If unread, mark as read automatically when opened
    if (sub.read === false || sub.read === undefined) {
      setSubmissions((prev) =>
        prev.map((s) => (s.id === sub.id ? { ...s, read: true } : s))
      );
      setSelectedSub({ ...sub, read: true });

      try {
        await fetch("/api/admin/contact-submissions", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: sub.id, read: true }),
        });
      } catch (err) {
        console.error("Failed to mark lead as read", err);
      }
    }
  };

  const handleToggleRead = async (id: string, currentReadState: boolean) => {
    const newReadState = !currentReadState;
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, read: newReadState } : s))
    );
    if (selectedSub?.id === id) {
      setSelectedSub({ ...selectedSub, read: newReadState });
    }

    try {
      await fetch("/api/admin/contact-submissions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: newReadState }),
      });
    } catch (err) {
      console.error("Failed to update read state", err);
    }
  };

  const handleStatusChange = async (id: string, newStatus: ContactSubmission["status"]) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    if (selectedSub?.id === id) {
      setSelectedSub({ ...selectedSub, status: newStatus });
    }

    try {
      await fetch("/api/admin/contact-submissions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch (err: unknown) {
      console.error("Failed to update status", err);
    }
  };

  const openDeleteModal = (id: string, name: string) => {
    setConfirmModal({
      isOpen: true,
      leadId: id,
      leadName: name,
    });
  };

  const handleConfirmDelete = async () => {
    const { leadId } = confirmModal;
    if (!leadId) return;

    setDeletingId(leadId);
    try {
      const res = await fetch(`/api/admin/contact-submissions?id=${leadId}`, { method: "DELETE" });
      if (res.ok) {
        setSubmissions((prev) => prev.filter((s) => s.id !== leadId));
        if (selectedSub?.id === leadId) {
          const remaining = submissions.filter((s) => s.id !== leadId);
          setSelectedSub(remaining.length > 0 ? remaining[0] : null);
        }
      }
    } catch (err: unknown) {
      console.error("Failed to delete lead", err);
    } finally {
      setDeletingId(null);
      setConfirmModal({ isOpen: false, leadId: "", leadName: "" });
    }
  };

  // Metrics
  const totalCount = submissions.length;
  const unreadCount = submissions.filter((s) => !s.read || s.status === "new").length;
  const contactedCount = submissions.filter((s) => s.status === "contacted" || s.status === "in_progress").length;
  const completedCount = submissions.filter((s) => s.status === "completed").length;

  // Filtered List
  const filtered = submissions.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.company && s.company.toLowerCase().includes(search.toLowerCase())) ||
      (s.service && s.service.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;

    if (statusFilter === "unread") return !s.read || s.status === "new";
    if (statusFilter === "contacted") return s.status === "contacted" || s.status === "in_progress";
    if (statusFilter === "completed") return s.status === "completed";
    if (statusFilter === "archived") return s.status === "archived";

    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-eureka-border pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-eureka-dark tracking-tight">Contact Leads & Inquiries</h1>
          <p className="text-xs font-mono text-eureka-slate mt-1 font-semibold">
            Real-time client inquiries received from Ethio-Eureka landing page
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadSubmissions}
            className="p-2.5 border border-eureka-border bg-white text-eureka-slate hover:text-eureka-dark hover:bg-slate-100 rounded-xl transition-all shadow-eureka-sm"
            title="Refresh Leads"
          >
            <RefreshCw size={16} />
          </button>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3.5 top-3.5 text-eureka-slate" />
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-eureka-border text-eureka-dark pl-10 pr-4 py-2.5 text-xs font-mono rounded-xl focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Counter Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-eureka-border rounded-2xl p-5 shadow-eureka-sm font-mono">
          <span className="text-[11px] text-eureka-slate uppercase font-bold block mb-1">TOTAL INQUIRIES</span>
          <span className="text-3xl font-extrabold text-eureka-dark">{totalCount}</span>
        </div>

        <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-5 shadow-eureka-sm font-mono relative overflow-hidden">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-eureka-blue uppercase font-extrabold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-eureka-blue animate-pulse" /> UNREAD LEADS
            </span>
          </div>
          <span className="text-3xl font-extrabold text-eureka-blue">{unreadCount}</span>
        </div>

        <div className="bg-white border border-eureka-border rounded-2xl p-5 shadow-eureka-sm font-mono">
          <span className="text-[11px] text-eureka-indigo uppercase font-bold block mb-1">IN PROGRESS</span>
          <span className="text-3xl font-extrabold text-eureka-indigo">{contactedCount}</span>
        </div>

        <div className="bg-white border border-eureka-border rounded-2xl p-5 shadow-eureka-sm font-mono">
          <span className="text-[11px] text-emerald-600 uppercase font-bold block mb-1">COMPLETED</span>
          <span className="text-3xl font-extrabold text-emerald-600">{completedCount}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-eureka-border overflow-x-auto text-xs font-mono gap-1">
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-5 py-3 border-b-2 font-bold uppercase transition-all whitespace-nowrap rounded-t-xl ${
            statusFilter === "all"
              ? "border-eureka-blue text-eureka-blue bg-blue-50/50"
              : "border-transparent text-eureka-slate hover:text-eureka-dark hover:bg-slate-50"
          }`}
        >
          All ({totalCount})
        </button>

        <button
          onClick={() => setStatusFilter("unread")}
          className={`px-5 py-3 border-b-2 font-bold uppercase transition-all whitespace-nowrap flex items-center gap-2 rounded-t-xl ${
            statusFilter === "unread"
              ? "border-eureka-blue text-eureka-blue bg-blue-50/50"
              : "border-transparent text-eureka-slate hover:text-eureka-dark hover:bg-slate-50"
          }`}
        >
          Unread ({unreadCount})
        </button>

        <button
          onClick={() => setStatusFilter("contacted")}
          className={`px-5 py-3 border-b-2 font-bold uppercase transition-all whitespace-nowrap rounded-t-xl ${
            statusFilter === "contacted"
              ? "border-eureka-blue text-eureka-blue bg-blue-50/50"
              : "border-transparent text-eureka-slate hover:text-eureka-dark hover:bg-slate-50"
          }`}
        >
          Contacted ({contactedCount})
        </button>

        <button
          onClick={() => setStatusFilter("completed")}
          className={`px-5 py-3 border-b-2 font-bold uppercase transition-all whitespace-nowrap rounded-t-xl ${
            statusFilter === "completed"
              ? "border-eureka-blue text-eureka-blue bg-blue-50/50"
              : "border-transparent text-eureka-slate hover:text-eureka-dark hover:bg-slate-50"
          }`}
        >
          Completed ({completedCount})
        </button>

        <button
          onClick={() => setStatusFilter("archived")}
          className={`px-5 py-3 border-b-2 font-bold uppercase transition-all whitespace-nowrap rounded-t-xl ${
            statusFilter === "archived"
              ? "border-eureka-blue text-eureka-blue bg-blue-50/50"
              : "border-transparent text-eureka-slate hover:text-eureka-dark hover:bg-slate-50"
          }`}
        >
          Archived
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex items-center justify-center text-eureka-slate font-mono text-xs">
          <Loader2 className="animate-spin mr-2 text-eureka-blue" size={16} /> Loading contact inquiries...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-white border border-eureka-border rounded-2xl p-8 font-mono text-xs text-eureka-slate shadow-eureka-sm">
          <Inbox className="mx-auto mb-3 opacity-40 text-eureka-blue" size={36} />
          No contact inquiries match the selected filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Submissions List Table */}
          <div className="lg:col-span-7 bg-white border border-eureka-border rounded-2xl shadow-eureka-sm overflow-hidden">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-eureka-border text-eureka-slate uppercase text-[10px] bg-slate-50">
                  <th className="py-4 px-6 font-bold">Lead Contact</th>
                  <th className="py-4 px-4 font-bold">Service Required</th>
                  <th className="py-4 px-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-eureka-border">
                {filtered.map((s) => {
                  const isUnread = !s.read || s.status === "new";
                  return (
                    <tr
                      key={s.id}
                      onClick={() => handleSelectSub(s)}
                      className={`cursor-pointer transition-all ${
                        selectedSub?.id === s.id
                          ? "bg-blue-50/60 border-l-4 border-eureka-blue"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <td className="py-4 px-6 text-eureka-dark">
                        <div className="flex items-center gap-3">
                          {isUnread && (
                            <span className="w-2.5 h-2.5 rounded-full bg-eureka-blue shrink-0 animate-pulse" title="Unread Message" />
                          )}
                          <div>
                            <p className={`font-sans ${isUnread ? "font-extrabold text-eureka-dark text-sm" : "font-semibold text-eureka-dark text-sm"}`}>
                              {s.name}
                            </p>
                            <p className="text-[11px] text-eureka-slate">{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-eureka-slate font-sans font-medium">{s.service || "General Inquiry"}</td>
                      <td className="py-4 px-4">
                        {isUnread ? (
                          <span className="px-2.5 py-0.5 text-[10px] uppercase font-extrabold bg-blue-50 text-eureka-blue border border-blue-200 rounded-md">
                            UNREAD
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 text-[10px] uppercase font-mono text-eureka-slate bg-slate-100 border border-slate-200 rounded-md">
                            OPENED
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Selected Lead Details Card */}
          <div className="lg:col-span-5 bg-white border border-eureka-border rounded-2xl p-6 shadow-eureka-sm">
            {selectedSub ? (
              <div className="space-y-6 font-mono text-xs">
                {/* Header */}
                <div className="flex justify-between items-start border-b border-eureka-border pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-sans font-extrabold text-eureka-dark">{selectedSub.name}</h2>
                      {(!selectedSub.read || selectedSub.status === "new") && (
                        <span className="text-[9px] bg-eureka-blue text-white font-extrabold uppercase px-2 py-0.5 rounded-md">
                          NEW UNREAD
                        </span>
                      )}
                    </div>
                    <p className="text-eureka-slate text-xs font-semibold">{selectedSub.email}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleRead(selectedSub.id, !!selectedSub.read)}
                      className="p-2 text-eureka-slate hover:text-eureka-blue hover:bg-slate-100 rounded-lg transition-all"
                      title={selectedSub.read ? "Mark as Unread" : "Mark as Read"}
                    >
                      {selectedSub.read ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>

                    <button
                      onClick={() => openDeleteModal(selectedSub.id, selectedSub.name)}
                      disabled={deletingId === selectedSub.id}
                      className="text-eureka-slate hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                      title="Delete Lead"
                    >
                      {deletingId === selectedSub.id ? <Loader2 size={16} className="animate-spin text-red-600" /> : <Trash2 size={16} />}
                    </button>
                  </div>
                </div>

                {/* Info Metadata */}
                <div className="space-y-3 text-eureka-slate bg-slate-50 p-4 border border-eureka-border rounded-xl">
                  <div className="flex items-center gap-2.5">
                    <Building size={15} className="text-eureka-blue shrink-0" />
                    <span>Company: <strong className="text-eureka-dark font-sans">{selectedSub.company || "Direct Client"}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone size={15} className="text-eureka-blue shrink-0" />
                    <span>Phone: <strong className="text-eureka-dark font-sans">{selectedSub.phone || "Not provided"}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail size={15} className="text-eureka-blue shrink-0" />
                    <span>Service: <strong className="text-eureka-dark font-sans">{selectedSub.service || "Website Design & Development"}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Calendar size={15} className="text-eureka-blue shrink-0" />
                    <span>Budget Range: <strong className="text-eureka-dark font-sans">{selectedSub.budget || "Flexible / Unspecified"}</strong></span>
                  </div>
                </div>

                {/* Message Content */}
                <div>
                  <p className="text-eureka-blue font-extrabold mb-2 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                    <MessageSquare size={13} /> MESSAGE CONTENT:
                  </p>
                  <div className="p-4 bg-slate-50 border border-eureka-border text-eureka-dark leading-relaxed font-sans text-sm rounded-xl whitespace-pre-wrap">
                    {selectedSub.message}
                  </div>
                </div>

                {/* Status Update Actions */}
                <div className="border-t border-eureka-border pt-4 space-y-2">
                  <p className="text-eureka-slate font-bold mb-2 uppercase text-[10px] tracking-wider">
                    UPDATE LEAD STATUS:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleStatusChange(selectedSub.id, "contacted")}
                      className={`p-3 border rounded-xl text-[10px] uppercase font-bold flex items-center justify-center gap-1.5 transition-all ${
                        selectedSub.status === "contacted"
                          ? "bg-blue-50 border-eureka-blue text-eureka-blue font-extrabold shadow-sm"
                          : "border-eureka-border text-eureka-slate hover:text-eureka-blue hover:bg-slate-50"
                      }`}
                    >
                      <Clock size={13} /> Contacted
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedSub.id, "completed")}
                      className={`p-3 border rounded-xl text-[10px] uppercase font-bold flex items-center justify-center gap-1.5 transition-all ${
                        selectedSub.status === "completed"
                          ? "bg-emerald-50 border-emerald-500 text-emerald-700 font-extrabold shadow-sm"
                          : "border-eureka-border text-eureka-slate hover:text-emerald-600 hover:bg-slate-50"
                      }`}
                    >
                      <CheckCircle2 size={13} /> Completed
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedSub.id, "archived")}
                      className={`p-3 border rounded-xl text-[10px] uppercase font-bold flex items-center justify-center gap-1.5 col-span-2 transition-all ${
                        selectedSub.status === "archived"
                          ? "bg-slate-100 border-slate-400 text-slate-700 font-extrabold"
                          : "border-eureka-border text-eureka-slate hover:text-eureka-dark hover:bg-slate-50"
                      }`}
                    >
                      <Archive size={13} /> Archive Lead
                    </button>
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2">
                  <a
                    href={`mailto:${selectedSub.email}?subject=RE: Ethio-Eureka Inquiry — ${selectedSub.service || "Project"}`}
                    className="w-full py-3 bg-eureka-blue text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-eureka-indigo transition-all flex items-center justify-center gap-2 shadow-eureka-sm font-mono"
                  >
                    <Sparkles size={16} /> Reply via Email to Client
                  </a>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-xs font-mono text-eureka-slate">
                Select a lead inquiry to view details
              </div>
            )}
          </div>
        </div>
      )}

      {/* Custom Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title="Delete Contact Inquiry"
        message={`Are you sure you want to delete the lead inquiry from "${confirmModal.leadName}"? This submission will be permanently erased.`}
        confirmText="Delete Inquiry"
        cancelText="Keep Inquiry"
        variant="danger"
        loading={deletingId === confirmModal.leadId}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmModal({ isOpen: false, leadId: "", leadName: "" })}
      />
    </div>
  );
}

