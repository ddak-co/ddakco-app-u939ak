"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { Download } from "lucide-react";

interface Resume {
  id: string;
  파일명: string;
  업로드일시: string;
  지원자명: string;
  전화번호: string;
  이메일: string;
  분류카테고리: string;
  직급: string;
  경력년수: number;
  파일경로: string;
}

export default function ResultsPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("resumes") || "[]");
    setResumes(data);
  }, []);

  const categories = Array.from(new Set(resumes.map(r => r.분류카테고리).filter(Boolean)));
  const filteredResumes = selectedCategory === "all" 
    ? resumes 
    : resumes.filter(r => r.분류카테고리 === selectedCategory);

  const handleExportExcel = () => {
    const csv = [
      ["파일명", "지원자명", "전화번호", "이메일", "분류카테고리", "직급", "경력년수"],
      ...filteredResumes.map(r => [
        r.파일명,
        r.지원자명,
        r.전화번호,
        r.이메일,
        r.분류카테고리,
        r.직급,
        r.경력년수
      ])
    ];

    const csvContent = csv.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `분류결과_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">분류 결과</h1>
          <p className="text-gray-600 mt-2">총 {filteredResumes.length}개의 이력서</p>
        </div>
        <Button onClick={handleExportExcel} variant="primary">
          <Download className="w-4 h-4 mr-2" />
          엑셀 내보내기
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            selectedCategory === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          전체
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat as string)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredResumes.map(resume => (
          <Card key={resume.id} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">파일명</p>
                <p className="font-semibold text-gray-900">{resume.파일명}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">지원자명</p>
                <p className="font-semibold text-gray-900">{resume.지원자명 || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">이메일</p>
                <p className="font-semibold text-gray-900">{resume.이메일 || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">분류 카테고리</p>
                <p className="font-semibold text-blue-600">{resume.분류카테고리 || "미분류"}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
