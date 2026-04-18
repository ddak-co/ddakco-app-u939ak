"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Upload, CheckCircle, Settings } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "대시보드", icon: BarChart3 },
    { href: "/upload", label: "업로드", icon: Upload },
    { href: "/results", label: "분류 결과", icon: CheckCircle },
    { href: "/settings", label: "설정", icon: Settings }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-lg text-blue-600">
            이력서 분류기
          </Link>
          <div className="flex gap-1 md:gap-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg transition font-medium text-sm md:text-base ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
