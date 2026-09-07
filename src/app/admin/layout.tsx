import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";

export const metadata = {
  title: "Admin CMS Dashboard — Ethio-Eureka",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAdminAuthenticated();

  return (
    <div className="min-h-screen bg-slate-50 text-eureka-dark font-sans flex">
      {authenticated && <AdminSidebar />}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {authenticated && <AdminHeader />}
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}

