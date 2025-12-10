
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">


        {/* Main Content */}
        {children}
    </div>
  );
}
