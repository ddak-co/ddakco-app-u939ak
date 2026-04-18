"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { BarChart3, FileUp, CheckCircle, Settings } from "lucide-react";

interface DashboardStats {
  totalResumes: number;
  classified: number;
  pending: number;
  categories: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalResumes: 0,
    classified: 0,
    pending: 0,
    categories: 0
  });

  useEffect(() => {
    const resumes = JSON.parse(localStorage.getItem("resumes") || "[]");
    const classified = resumes.filter((r: any) => r.분류카테고리).length;
    
    setStats({
      totalResumes: resumes.length,
      classified: classified,
      pending: resumes.length - classified,
      categories: new Set(resumes.map((r: any) => r.분류카테고리)).size
    });
  }, []);

  const statCards = [
    { icon: FileUp, label: "전체 이력서", value: stats.totalResumes },
    { icon: CheckCircle, label: "분류완료", value: stats.classified },
    { icon: BarChart3, label: "미분류", value: stats.pending },
    { icon: Settings, label: "카테고리", value: stats.categories }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">이력서 자동분류기</h1>
        <p className="text-gray-600 mt-2">이력서를 효율적으로 분류하고 관리하세요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="text-center">
              <Icon className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
