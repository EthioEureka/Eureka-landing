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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-gray pb-6">
        <div>
          <h1 className="text-2xl font-light text-off-white">Contact Leads & Inquiries</h1>
          <p className="text-xs font-mono text-soft-gray mt-1">
            Real-time client inquiries received from Ethio-Eureka landing page
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadSubmissions}
            className="p-2 border border-border-gray text-soft-gray hover:text-eureka-green transition-colors"
            title="Refresh Leads"
          >
            <RefreshCw size={14} />
          </button>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-3 text-soft-gray" />
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-dark-gray border border-border-gray text-off-white pl-9 pr-4 py-2 text-xs font-mono focus:border-eureka-green focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Counter Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-dark-gray border border-border-gray p-4 font-mono">
          <span className="text-[10px] text-soft-gray uppercase block mb-1">TOTAL INQUIRIES</span>
          <span className="text-2xl font-light text-off-white">{totalCount}</span>
        </div>

        <div className="bg-dark-gray border border-eureka-green/40 p-4 font-mono relative overflow-hidden">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-eureka-green uppercase font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-eureka-green animate-pulse" /> UNREAD LEADS
            </span>
          </div>
          <span className="text-2xl font-light text-eureka-green">{unreadCount}</span>
        </div>

        <div className="bg-dark-gray border border-border-gray p-4 font-mono">
          <span className="text-[10px] text-blue-400 uppercase block mb-1">IN PROGRESS</span>
          <span className="text-2xl font-light text-blue-300">{contactedCount}</span>
        </div>

        <div className="bg-dark-gray border border-border-gray p-4 font-mono">
          <span className="text-[10px] text-emerald-400 uppercase block mb-1">COMPLETED</span>
          <span className="text-2xl font-light text-emerald-300">{completedCount}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border-gray overflow-x-auto text-xs font-mono">
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-5 py-3 border-b-2 font-semibold uppercase transition-colors whitespace-nowrap ${
            statusFilter === "all"
              ? "border-eureka-green text-eureka-green bg-deep-black/60"
              : "border-transparent text-soft-gray hover:text-off-white"
          }`}
        >
          All ({totalCount})
        </button>

        <button
          onClick={() => setStatusFilter("unread")}
          className={`px-5 py-3 border-b-2 font-semibold uppercase transition-colors whitespace-nowrap flex items-center gap-2 ${
            statusFilter === "unread"
              ? "border-eureka-green text-eureka-green bg-deep-black/60"
              : "border-transparent text-soft-gray hover:text-off-white"
          }`}
        >
          Unread ({unreadCount})
        </button>

        <button
          onClick={() => setStatusFilter("contacted")}
          className={`px-5 py-3 border-b-2 font-semibold uppercase transition-colors whitespace-nowrap ${
            statusFilter === "contacted"
              ? "border-eureka-green text-eureka-green bg-deep-black/60"
              : "border-transparent text-soft-gray hover:text-off-white"
          }`}
        >
          Contacted ({contactedCount})
        </button>

        <button
          onClick={() => setStatusFilter("completed")}
          className={`px-5 py-3 border-b-2 font-semibold uppercase transition-colors whitespace-nowrap ${
            statusFilter === "completed"
              ? "border-eureka-green text-eureka-green bg-deep-black/60"
              : "border-transparent text-soft-gray hover:text-off-white"
          }`}
        >
          Completed ({completedCount})
        </button>

        <button
          onClick={() => setStatusFilter("archived")}
          className={`px-5 py-3 border-b-2 font-semibold uppercase transition-colors whitespace-nowrap ${
            statusFilter === "archived"
              ? "border-eureka-green text-eureka-green bg-deep-black/60"
              : "border-transparent text-soft-gray hover:text-off-white"
          }`}
        >
          Archived
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex items-center justify-center text-soft-gray font-mono text-xs">
          <Loader2 className="animate-spin mr-2" size={16} /> Loading contact inquiries...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-dark-gray border border-border-gray font-mono text-xs text-soft-gray">
          <Inbox className="mx-auto mb-3 opacity-40" size={32} />
          No contact inquiries match the selected filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Submissions List Table */}
          <div className="lg:col-span-7 bg-dark-gray border border-border-gray overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-border-gray text-soft-gray uppercase text-[10px] bg-deep-black/60">
                  <th className="py-4 px-6 font-semibold">Lead Contact</th>
                  <th className="py-4 px-4 font-semibold">Service Required</th>
                  <th className="py-4 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-gray/50">
                {filtered.map((s) => {
                  const isUnread = !s.read || s.status === "new";
                  return (
                    <tr
                      key={s.id}
                      onClick={() => handleSelectSub(s)}
                      className={`cursor-pointer transition-colors ${
                        selectedSub?.id === s.id
                          ? "bg-deep-black border-l-2 border-eureka-green"
                          : "hover:bg-deep-black/40"
                      }`}
                    >
                      <td className="py-4 px-6 text-off-white">
                        <div className="flex items-center gap-3">
                          {isUnread && (
                            <span className="w-2 h-2 rounded-full bg-eureka-green shrink-0 animate-pulse" title="Unread Message" />
                          )}
                          <div>
                            <p className={`font-sans ${isUnread ? "font-bold text-white" : "font-medium text-off-white"}`}>
                              {s.name}
                            </p>
                            <p className="text-[10px] text-soft-gray">{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-soft-gray">{s.service || "General Inquiry"}</td>
                      <td className="py-4 px-4">
                        {isUnread ? (
                          <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-eureka-green/20 text-eureka-green border border-eureka-green/50">
                            UNREAD
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-[10px] uppercase font-mono text-soft-gray/60 border border-border-gray">
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
          <div className="lg:col-span-5 bg-dark-gray border border-border-gray p-6">
            {selectedSub ? (
              <div className="space-y-6 font-mono text-xs">
                {/* Header */}
                <div className="flex justify-between items-start border-b border-border-gray pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-sans font-semibold text-off-white">{selectedSub.name}</h2>
                      {(!selectedSub.read || selectedSub.status === "new") && (
                        <span className="text-[9px] bg-eureka-green text-deep-black font-bold uppercase px-1.5 py-0.5">
                          NEW UNREAD
                        </span>
                      )}
                    </div>
                    <p className="text-soft-gray">{selectedSub.email}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleRead(selectedSub.id, !!selectedSub.read)}
                      className="p-1 text-soft-gray hover:text-eureka-green"
                      title={selectedSub.read ? "Mark as Unread" : "Mark as Read"}
                    >
                      {selectedSub.read ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>

                    <button
                      onClick={() => openDeleteModal(selectedSub.id, selectedSub.name)}
                      disabled={deletingId === selectedSub.id}
                      className="text-soft-gray hover:text-red-400 p-1"
                      title="Delete Lead"
                    >
                      {deletingId === selectedSub.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    </button>
                  </div>
                </div>

                {/* Info Metadata */}
                <div className="space-y-3 text-soft-gray bg-deep-black/60 p-4 border border-border-gray/50">
                  <div className="flex items-center gap-2">
                    <Building size={14} className="text-eureka-green shrink-0" />
                    <span>Company: <strong className="text-off-white">{selectedSub.company || "Direct Client"}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-eureka-green shrink-0" />
                    <span>Phone: <strong className="text-off-white">{selectedSub.phone || "Not provided"}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-eureka-green shrink-0" />
                    <span>Service: <strong className="text-off-white">{selectedSub.service || "Website Design & Development"}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-eureka-green shrink-0" />
                    <span>Budget Range: <strong className="text-off-white">{selectedSub.budget || "Flexible / Unspecified"}</strong></span>
                  </div>
                </div>

                {/* Message Content */}
                <div>
                  <p className="text-off-white font-semibold mb-2 uppercase text-[10px] tracking-wider text-eureka-green">
                    MESSAGE CONTENT:
                  </p>
                  <div className="p-4 bg-deep-black border border-border-gray text-soft-gray leading-relaxed font-sans text-sm whitespace-pre-wrap">
                    {selectedSub.message}
                  </div>
                </div>

                {/* Status Update Actions */}
                <div className="border-t border-border-gray/50 pt-4 space-y-2">
                  <p className="text-off-white font-semibold mb-2 uppercase text-[10px] tracking-wider">
                    UPDATE LEAD STATUS:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleStatusChange(selectedSub.id, "contacted")}
                      className={`p-2.5 border text-[10px] uppercase flex items-center justify-center gap-1.5 transition-colors ${
                        selectedSub.status === "contacted"
                          ? "bg-blue-950/80 border-blue-600 text-blue-300 font-bold"
                          : "border-border-gray text-soft-gray hover:text-blue-400 hover:border-blue-700"
                      }`}
                    >
                      <Clock size={12} /> Contacted
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedSub.id, "completed")}
                      className={`p-2.5 border text-[10px] uppercase flex items-center justify-center gap-1.5 transition-colors ${
                        selectedSub.status === "completed"
                          ? "bg-emerald-950/80 border-emerald-600 text-emerald-300 font-bold"
                          : "border-border-gray text-soft-gray hover:text-emerald-400 hover:border-emerald-700"
                      }`}
                    >
                      <CheckCircle2 size={12} /> Completed
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedSub.id, "archived")}
                      className={`p-2.5 border text-[10px] uppercase flex items-center justify-center gap-1.5 col-span-2 transition-colors ${
                        selectedSub.status === "archived"
                          ? "bg-gray-900 border-gray-600 text-gray-300 font-bold"
                          : "border-border-gray text-soft-gray hover:text-white"
                      }`}
                    >
                      <Archive size={12} /> Archive Lead
                    </button>
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2">
                  <a
                    href={`mailto:${selectedSub.email}?subject=RE: Ethio-Eureka Inquiry — ${selectedSub.service || "Project"}`}
                    className="w-full py-3 bg-eureka-green text-deep-black font-semibold text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Sparkles size={14} /> Reply via Email to Client
                  </a>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-xs font-mono text-soft-gray">
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
