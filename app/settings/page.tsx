"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { Trash2 } from "lucide-react";

interface Rule {
  id: string;
  규칙명: string;
  키워드: string[];
  카테고리: string;
  직급: string;
  우선순위: number;
}

export default function SettingsPage() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [ruleName, setRuleName] = useState("");
  const [keywords, setKeywords] = useState("");
  const [category, setCategory] = useState("");
  const [position, setPosition] = useState("");
  const [priority, setPriority] = useState(1);

  useEffect(() => {
    const savedRules = JSON.parse(localStorage.getItem("rules") || "[]");
    setRules(savedRules);
  }, []);

  const handleAddRule = () => {
    if (!ruleName || !keywords || !category) return;

    const newRule: Rule = {
      id: Date.now().toString(),
      규칙명: ruleName,
      키워드: keywords.split(",").map(k => k.trim()),
      카테고리: category,
      직급: position,
      우선순위: priority
    };

    const updatedRules = [...rules, newRule];
    setRules(updatedRules);
    localStorage.setItem("rules", JSON.stringify(updatedRules));

    setRuleName("");
    setKeywords("");
    setCategory("");
    setPosition("");
    setPriority(1);
  };

  const handleDeleteRule = (id: string) => {
    const updatedRules = rules.filter(r => r.id !== id);
    setRules(updatedRules);
    localStorage.setItem("rules", JSON.stringify(updatedRules));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">분류 설정</h1>
        <p className="text-gray-600 mt-2">분류 규칙을 설정하고 관리하세요</p>
      </div>

      <Card className="p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">새 규칙 추가</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">규칙명</label>
            <input
              type="text"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="규칙 이름 입력"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">키워드 (쉼표로 구분)</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="예: 개발, 프로그래밍, 코딩"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="예: 백엔드"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">직급</label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="예: 주니어"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">우선순위</label>
              <input
                type="number"
                value={priority}
                onChange={(e) => setPriority(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                min="1"
              />
            </div>
          </div>
          <Button onClick={handleAddRule} variant="primary" className="w-full">
            규칙 추가
          </Button>
        </div>
      </Card>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">현재 규칙</h2>
        <div className="space-y-4">
          {rules.length === 0 ? (
            <p className="text-gray-600">설정된 규칙이 없습니다.</p>
          ) : (
            rules.map(rule => (
              <Card key={rule.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{rule.규칙명}</h3>
                    <p className="text-sm text-gray-600 mt-1">키워드: {rule.키워드.join(", ")}</p>
                    <div className="flex gap-4 mt-3 text-sm">
                      <span className="text-blue-600">카테고리: {rule.카테고리}</span>
                      {rule.직급 && <span className="text-green-600">직급: {rule.직급}</span>}
                      <span className="text-gray-600">우선순위: {rule.우선순위}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteRule(rule.id)}
                    className="text-red-600 hover:text-red-700 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
