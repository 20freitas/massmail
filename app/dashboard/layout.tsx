import { Sidebar } from '@/components/layout/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 antialiased" style={{ ['--sidebar-width' as any]: '250px' }}>
      <Sidebar />
      <div className="content-wrapper min-h-screen" style={{ marginLeft: 'var(--sidebar-width)' }}>
        <main className="px-4 py-3 w-full h-screen overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
