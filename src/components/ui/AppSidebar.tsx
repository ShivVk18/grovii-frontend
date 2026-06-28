import Link from "next/link"
import { LayoutDashboard, PlusCircle, FileText, Settings } from "lucide-react"

export function AppSidebar() {
  return (
    <aside className="w-64 border-r border-[#8B5E3C]/20 bg-white hidden md:flex flex-col p-6">
      
      <h2 className="text-2xl font-bold mb-8">
        <span className="bg-gradient-to-r from-[#8B5E3C] to-[#A47551] bg-clip-text text-transparent">
          Grovii
        </span>
      </h2>

      <nav className="space-y-4">
        <SidebarItem href="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
        <SidebarItem href="/dashboard/create" icon={<PlusCircle size={18} />} label="Create" />
        <SidebarItem href="/dashboard/storyboards" icon={<FileText size={18} />} label="Storyboards" />
        <SidebarItem href="/dashboard/settings" icon={<Settings size={18} />} label="Settings" />
      </nav>
    </aside>
  )
}

function SidebarItem({ href, icon, label }: any) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 text-gray-700"
    >
      {icon}
      {label}
    </Link>
  )
}
