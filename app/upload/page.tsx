"use client";

import { useRef, useState } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { Upload, CheckCircle } from "lucide-react";

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

export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsLoading(true);
    const resumes = JSON.parse(localStorage.getItem("resumes") || "[]");
    const newFiles: string[] = [];

    for (let i = 0; i < files.length; i++) ++) {
      const file = files[i];
      const resume: Resume = {
        id: Date.now().toString() + Math.random(),
        파일명: file.name,
        업로드일시: new Date().toISOString(),
        지원자명: "",
        전화번호: "",
        이메일: "",
        분류카테고리: "",
        직급: "",
        경력년수: 0,
        파일경로: ""
      };
      resumes.push(resume);
      newFiles.push(file.name);
    }

    localStorage.setItem("resumes", JSON.stringify(resumes));
    setUploadedFiles(newFiles);
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">이력서 업로드</h1>
        <p className="text-gray-600">여러 개의 이력서 파일을 한 번에 업로드하세요</p>
      </div>

      <Card className="border-2 border-dashed border-blue-300 p-12 text-center cursor-pointer hover:border-blue-500 transition"
        onClick={() => fileInputRef.current?.click()}>
        <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <p className="text-lg font-semibold text-gray-900">파일을 선택하거나 여기에 드래그하세요</p>
        <p className="text-sm text-gray-600 mt-2">PDF, DOC, DOCX 파일 지원</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />
      </Card>

      {uploadedFiles.length > 0 && (
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">업로드된 파일</h2>
          <div className="space-y-2">
            {uploadedFiles.map((file, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>{file}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4">총 {uploadedFiles.length}개 파일 업로드됨</p>
        </Card>
      )}

      {isLoading && <p className="text-center text-gray-600">처리 중...</p>}
    </div>
  );
}
