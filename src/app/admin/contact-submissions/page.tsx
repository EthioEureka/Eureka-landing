"use client";

import { useState, useEffect } from "react";
import { Search, Mail, Phone, Building, Calendar, CheckCircle2, Clock, Archive, Trash2, Loader2 } from "lucide-react";
import { ContactSubmission } from "@/lib/types";

export default function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedSub, setSelectedSub] = useState<ContactSubmission | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadSubmissions = async () => {
    try {
      const res = await fetch("/api/admin/contact-submissions");
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
        if (data.submissions?.length > 0) {
          setSelectedSub(data.submissions[0]);
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

  const filtered = submissions.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.company && s.company.toLowerCase().includes(search.toLowerCase()))
  );

  const handleStatusChange = async (id: string, newStatus: ContactSubmission["status"]) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    if (selectedSub && selectedSub.id === id) {
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

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete lead from "${name}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/contact-submissions?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
        if (selectedSub?.id === id) {
          setSelectedSub(null);
        }
      }
    } catch (err: unknown) {
      console.error("Failed to delete lead", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-gray pb-6">
        <div>
          <h1 className="text-2xl font-light text-off-white">Contact Leads</h1>
          <p className="text-xs font-mono text-soft-gray mt-1">
            Inquiries received from the public contact form
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-3 text-soft-gray" />
          <input
            type="text"
            placeholder="Search by name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-dark-gray border border-border-gray text-off-white pl-10 pr-4 py-2 text-xs font-mono focus:border-eureka-green focus:outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex items-center justify-center text-soft-gray font-mono text-xs">
          <Loader2 className="animate-spin mr-2" size={16} /> Loading contact leads...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Submissions List Table */}
          <div className="lg:col-span-7 bg-dark-gray border border-border-gray overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-border-gray text-soft-gray uppercase text-[10px] bg-deep-black/60">
                  <th className="py-4 px-6 font-semibold">Lead Contact</th>
                  <th className="py-4 px-4 font-semibold">Service</th>
                  <th className="py-4 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-gray/50">
                {filtered.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => setSelectedSub(s)}
                    className={`cursor-pointer transition-colors ${
                      selectedSub?.id === s.id
                        ? "bg-deep-black border-l-2 border-eureka-green"
                        : "hover:bg-deep-black/40"
                    }`}
                  >
                    <td className="py-4 px-6 text-off-white">
                      <p className="font-semibold font-sans">{s.name}</p>
                      <p className="text-[10px] text-soft-gray">{s.email}</p>
                    </td>
                    <td className="py-4 px-4 text-soft-gray">{s.service || "General"}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-0.5 text-[10px] uppercase border font-semibold ${
                          s.status === "new"
                            ? "bg-eureka-green/10 text-eureka-green border-eureka-green/40"
                            : s.status === "contacted"
                            ? "bg-blue-950/60 text-blue-400 border-blue-800"
                            : s.status === "completed"
                            ? "bg-emerald-950/60 text-emerald-400 border-emerald-800"
                            : "bg-gray-800 text-gray-400 border-gray-700"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Selected Lead Details Card */}
          <div className="lg:col-span-5 bg-dark-gray border border-border-gray p-6">
            {selectedSub ? (
              <div className="space-y-6 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-border-gray pb-4">
                  <div>
                    <h2 className="text-lg font-sans font-semibold text-off-white">{selectedSub.name}</h2>
                    <p className="text-soft-gray">{selectedSub.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] bg-eureka-green text-deep-black font-bold uppercase">
                      {selectedSub.status}
                    </span>
                    <button
                      onClick={() => handleDelete(selectedSub.id, selectedSub.name)}
                      disabled={deletingId === selectedSub.id}
                      className="text-soft-gray hover:text-red-400 p-1"
                      title="Delete Lead"
                    >
                      {deletingId === selectedSub.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-3 text-soft-gray">
                  <div className="flex items-center gap-2">
                    <Building size={14} className="text-eureka-green" />
                    <span>Company: {selectedSub.company || "Not specified"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-eureka-green" />
                    <span>Phone: {selectedSub.phone || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-eureka-green" />
                    <span>Service: {selectedSub.service}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-eureka-green" />
                    <span>Budget: {selectedSub.budget || "Flexible"}</span>
                  </div>
                </div>

                <div className="border-t border-border-gray/50 pt-4">
                  <p className="text-off-white font-semibold mb-2">FULL MESSAGE:</p>
                  <div className="p-4 bg-deep-black border border-border-gray/60 text-soft-gray leading-relaxed font-sans text-sm">
                    {selectedSub.message}
                  </div>
                </div>

                <div className="border-t border-border-gray/50 pt-4 space-y-2">
                  <p className="text-off-white font-semibold mb-2">UPDATE STATUS:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleStatusChange(selectedSub.id, "contacted")}
                      className="p-2 border border-border-gray text-soft-gray hover:text-eureka-green hover:border-eureka-green text-[10px] uppercase flex items-center justify-center gap-1"
                    >
                      <Clock size={12} /> Contacted
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedSub.id, "completed")}
                      className="p-2 border border-border-gray text-soft-gray hover:text-emerald-400 hover:border-emerald-500 text-[10px] uppercase flex items-center justify-center gap-1"
                    >
                      <CheckCircle2 size={12} /> Completed
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedSub.id, "archived")}
                      className="p-2 border border-border-gray text-soft-gray hover:text-gray-300 text-[10px] uppercase flex items-center justify-center gap-1 col-span-2"
                    >
                      <Archive size={12} /> Archive Lead
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-xs font-mono text-soft-gray">
                Select an inquiry from the list to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
