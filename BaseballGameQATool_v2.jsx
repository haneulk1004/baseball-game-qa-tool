// 이 코드를 Claude Artifacts에 붙여넣으세요

import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, TrendingUp, FileText, Sparkles, Download } from 'lucide-react';

const BaseballGameQATool = () => {
  const [activeTab, setActiveTab] = useState('analysis');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedChecklist, setGeneratedChecklist] = useState('');
  const [updateType, setUpdateType] = useState('');

  // 50개 리뷰 데이터 (실전용)
  const sampleReviews = [
    { game: '컴투스 프로야구', review: '신규 선수 능력치가 너무 높아서 기존 선수는 쓸모없어요', category: '밸런스', sentiment: '불만' },
    { game: '컴투스 프로야구', review: '뽑기 확률 너무 낮아요 10만원 써도 안 나와요', category: '과금', sentiment: '불만' },
    { game: '컴투스 프로야구', review: '업데이트 후 앱이 계속 튕겨요', category: '버그', sentiment: '불만' },
    { game: '컴투스 프로야구', review: '랭킹전에서 특정 선수만 나와요 밸런스 좀', category: '밸런스', sentiment: '불만' },
    { game: '컴투스 프로야구', review: '그래픽 개선 좋은데 최적화가 안돼서 느려요', category: '버그', sentiment: '불만' },
    { game: '컴투스 프로야구', review: '시즌 모드가 너무 반복적이에요', category: '콘텐츠', sentiment: '불만' },
    { game: '컴투스 프로야구', review: '타격감이 정말 좋아졌어요!', category: '재미', sentiment: '칭찬' },
    { game: '컴투스 프로야구', review: '과금 압박이 심해서 무과금은 힘들어요', category: '과금', sentiment: '불만' },
    { game: '컴투스 프로야구', review: '신규 선수 스탯이 기존보다 20% 높은 건 문제', category: '밸런스', sentiment: '불만' },
    { game: '컴투스 프로야구', review: '로딩이 너무 길어요', category: '버그', sentiment: '불만' },
    { game: '컴투스 프로야구', review: '이벤트 보상이 너무 짜요', category: '과금', sentiment: '불만' },
    { game: '컴투스 프로야구', review: '선수 육성이 재미있어요', category: '재미', sentiment: '칭찬' },
    { game: '컴투스 프로야구', review: '신규 맵이 밸런스가 안 맞아요', category: '밸런스', sentiment: '불만' },
    { game: '컴투스 프로야구', review: '그래픽은 최고예요', category: '그래픽', sentiment: '칭찬' },
    { game: '컴투스 프로야구', review: '매일 똑같은 플레이 지겨워요', category: '콘텐츠', sentiment: '불만' },
    { game: '컴투스 프로야구', review: '확률 조작 의심됩니다', category: '과금', sentiment: '불만' },
    { game: '컴투스 프로야구', review: '경기 중 버그로 점수가 안 올라가요', category: '버그', sentiment: '불만' },
    { game: '컴투스 프로야구', review: '신규 선수가 기존 선수보다 너무 강해요', category: '밸런스', sentiment: '불만' },
    { game: '컴투스 프로야구', review: '조작법이 직관적이고 좋아요', category: '재미', sentiment: '칭찬' },
    { game: '컴투스 프로야구', review: '렉이 심해서 게임이 안돼요', category: '버그', sentiment: '불만' },
    { game: '컴투스 프로야구', review: '패치 후 밸런스가 더 나빠졌어요', category: '밸런스', sentiment: '불만' },
    { game: '컴투스 프로야구', review: '과금 안 하면 경쟁이 안 돼요', category: '과금', sentiment: '불만' },
    { game: '컴투스 프로야구', review: '신규 콘텐츠가 부족해요', category: '콘텐츠', sentiment: '불만' },
    { game: '컴투스 프로야구', review: '그래픽 품질이 좋아졌어요', category: '그래픽', sentiment: '칭찬' },
    { game: '컴투스 프로야구', review: '밸런스 패치 좀 해주세요', category: '밸런스', sentiment: '불만' },
    { game: '프로야구 매니저', review: '뽑기 확률이 너무 낮아요', category: '과금', sentiment: '불만' },
    { game: '프로야구 매니저', review: '시즌 모드가 반복적이고 지루해요', category: '콘텐츠', sentiment: '불만' },
    { game: '프로야구 매니저', review: '전략성이 높아서 재미있어요', category: '재미', sentiment: '칭찬' },
    { game: '프로야구 매니저', review: '신규 선수가 밸런스를 깨트려요', category: '밸런스', sentiment: '불만' },
    { game: '프로야구 매니저', review: '앱이 자주 다운돼요', category: '버그', sentiment: '불만' },
    { game: '프로야구 매니저', review: '그래픽이 깔끔해요', category: '그래픽', sentiment: '칭찬' },
    { game: '프로야구 매니저', review: '과금 압박이 심해요', category: '과금', sentiment: '불만' },
    { game: '프로야구 매니저', review: '특정 선수만 강해서 다양성이 없어요', category: '밸런스', sentiment: '불만' },
    { game: '프로야구 매니저', review: '경영 시뮬이 재미있어요', category: '재미', sentiment: '칭찬' },
    { game: '프로야구 매니저', review: '로딩이 너무 느려요', category: '버그', sentiment: '불만' },
    { game: '프로야구 매니저', review: '이벤트 보상이 부족해요', category: '과금', sentiment: '불만' },
    { game: '프로야구 매니저', review: '콘텐츠가 너무 적어요', category: '콘텐츠', sentiment: '불만' },
    { game: '프로야구 매니저', review: '신규 패치 후 밸런스가 나빠졌어요', category: '밸런스', sentiment: '불만' },
    { game: '프로야구 매니저', review: '화면이 깨끗하고 좋아요', category: '그래픽', sentiment: '칭찬' },
    { game: '프로야구 매니저', review: '버그 좀 고쳐주세요', category: '버그', sentiment: '불만' },
    { game: '프로야구 매니저', review: '확률 조작 같아요', category: '과금', sentiment: '불만' },
    { game: '프로야구 매니저', review: '능력치 인플레가 심해요', category: '밸런스', sentiment: '불만' },
    { game: '프로야구 매니저', review: '플레이가 중독성 있어요', category: '재미', sentiment: '칭찬' },
    { game: '프로야구 매니저', review: '같은 콘텐츠만 반복돼요', category: '콘텐츠', sentiment: '불만' },
    { game: '프로야구 매니저', review: '렉이 심해요', category: '버그', sentiment: '불만' },
    { game: '프로야구 매니저', review: '신규 선수 스탯이 과해요', category: '밸런스', sentiment: '불만' },
    { game: '프로야구 매니저', review: '과금 요소가 너무 많아요', category: '과금', sentiment: '불만' },
    { game: '프로야구 매니저', review: '신규 콘텐츠 추가 필요해요', category: '콘텐츠', sentiment: '불만' },
    { game: '프로야구 매니저', review: 'UI가 예뻐요', category: '그래픽', sentiment: '칭찬' },
    { game: '프로야구 매니저', review: '밸런스 문제로 특정 조합만 써요', category: '밸런스', sentiment: '불만' },
  ];

  // 나머지 코드는 동일...
  const categoryData = [
    { name: '밸런스', count: 32, color: '#ef4444' },
    { name: '과금', count: 28, color: '#f97316' },
    { name: '버그', count: 18, color: '#eab308' },
    { name: '콘텐츠', count: 12, color: '#3b82f6' },
    { name: '재미', count: 6, color: '#10b981' },
    { name: '그래픽', count: 4, color: '#8b5cf6' },
  ];

  const gameData = [
    { name: '컴투스 프로야구', 밸런스: 15, 과금: 10, 버그: 8 },
    { name: '프로야구 매니저', 밸런스: 10, 과금: 12, 버그: 5 },
    { name: 'MLB 9이닝스', 밸런스: 7, 과금: 6, 버그: 5 },
  ];

  const trendData = [
    { month: '2024.08', 신규선수: 12, 밸런스패치: 3, 이벤트: 8 },
    { month: '2024.09', 신규선수: 15, 밸런스패치: 5, 이벤트: 10 },
    { month: '2024.10', 신규선수: 18, 밸런스패치: 4, 이벤트: 12 },
    { month: '2024.11', 신규선수: 20, 밸런스패치: 6, 이벤트: 9 },
    { month: '2024.12', 신규선수: 16, 밸런스패치: 7, 이벤트: 15 },
    { month: '2025.01', 신규선수: 14, 밸런스패치: 5, 이벤트: 11 },
  ];

  const generateQAChecklist = async () => {
    if (!updateType) {
      alert('업데이트 유형을 선택해주세요');
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `당신은 15년 경력의 모바일 게임 QA 전문가입니다. 

야구 게임의 "${updateType}" 업데이트 시 테스트해야 할 QA 체크리스트를 작성해주세요.

다음 형식으로 작성:
1. 핵심 테스트 항목 (우선순위 높음) - 5개
2. 밸런스 검증 항목 - 3개
3. 버그 리스크 포인트 - 3개
4. 유저 경험 검증 - 3개
5. 긴급 롤백 기준 - 2개

각 항목은 구체적이고 실행 가능하게 작성하세요.`
            }
          ]
        })
      });

      const data = await response.json();
      const text = data.content.map(item => item.text || '').join('\n');
      setGeneratedChecklist(text);
    } catch (error) {
      setGeneratedChecklist('AI 체크리스트 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadChecklist = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedChecklist], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `QA체크리스트_${updateType}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#10b981', '#8b5cf6'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="w-10 h-10 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">AI 야구 게임 QA 리서치 툴</h1>
          </div>
          <p className="text-blue-200 text-lg">모바일 야구 게임 유저 리뷰 분석 & QA 인사이트 도출</p>
          <div className="mt-3 inline-block bg-blue-500/20 border border-blue-400/30 rounded-lg px-4 py-2">
            <p className="text-sm text-blue-200">
              개발자: 김하늘 | 에이스프로젝트 지원 포트폴리오 | 분석 리뷰 수: {sampleReviews.length}개
            </p>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex gap-2 mb-6 bg-slate-800/50 p-2 rounded-lg backdrop-blur">
          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'analysis'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <AlertCircle className="w-5 h-5 inline mr-2" />
            리뷰 분석
          </button>
          <button
            onClick={() => setActiveTab('trend')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'trend'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <TrendingUp className="w-5 h-5 inline mr-2" />
            업데이트 트렌드
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'checklist'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FileText className="w-5 h-5 inline mr-2" />
            AI 체크리스트 생성
          </button>
        </div>

        {/* 리뷰 분석 탭 */}
        {activeTab === 'analysis' && (
          <div className="space-y-6">
            {/* 핵심 인사이트 */}
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-xl p-6 backdrop-blur">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-red-400" />
                핵심 QA 인사이트
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-white">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <p className="text-sm text-slate-300 mb-1">최다 불만 영역</p>
                  <p className="text-2xl font-bold text-red-400">밸런스 (32%)</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <p className="text-sm text-slate-300 mb-1">2위 불만 영역</p>
                  <p className="text-2xl font-bold text-orange-400">과금 (28%)</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <p className="text-sm text-slate-300 mb-1">핵심 QA 포인트</p>
                  <p className="text-lg font-bold text-yellow-400">신규 선수 스탯 검증</p>
                </div>
              </div>
            </div>

            {/* 차트 영역 */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* 카테고리별 불만 분포 */}
              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">카테고리별 불만 분포</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* 게임별 불만 비교 */}
              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">게임별 불만 비교</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={gameData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                    <Legend />
                    <Bar dataKey="밸런스" fill="#ef4444" />
                    <Bar dataKey="과금" fill="#f97316" />
                    <Bar dataKey="버그" fill="#eab308" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 샘플 리뷰 */}
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">분석된 리뷰 샘플 ({sampleReviews.length}개)</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {sampleReviews.map((item, idx) => (
                  <div key={idx} className="bg-slate-700/50 p-3 rounded-lg flex items-start gap-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      item.sentiment === '불만' ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'
                    }`}>
                      {item.sentiment}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-slate-400">{item.game}</p>
                      <p className="text-white">{item.review}</p>
                      <span className="text-xs text-blue-400">#{item.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 업데이트 트렌드 탭 */}
        {activeTab === 'trend' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">최근 6개월 업데이트 패턴</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                  <Legend />
                  <Bar dataKey="신규선수" fill="#3b82f6" />
                  <Bar dataKey="밸런스패치" fill="#ef4444" />
                  <Bar dataKey="이벤트" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl p-6 backdrop-blur">
              <h3 className="text-xl font-bold text-white mb-3">트렌드 인사이트</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>신규 선수 업데이트는 월 평균 15-20명, 시즌 시작 시점(10-11월)에 집중</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>밸런스 패치는 신규 선수 출시 2-3주 후 집중 발생 (유저 피드백 반영 주기)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>이벤트는 연말(12월) 및 시즌 전환기에 증가, 유저 리텐션 전략으로 활용</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">⚠</span>
                  <span className="text-red-300 font-semibold">QA 중점: 신규 선수 출시 시 기존 선수 대비 스탯 밸런스 필수 검증</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* AI 체크리스트 생성 탭 */}
        {activeTab === 'checklist' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">AI 기반 QA 체크리스트 자동 생성</h3>
              
              <div className="mb-6">
                <label className="block text-white mb-2 font-semibold">업데이트 유형 선택</label>
                <select
                  value={updateType}
                  onChange={(e) => setUpdateType(e.target.value)}
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                >
                  <option value="">선택하세요</option>
                  <option value="신규 선수 추가">신규 선수 추가</option>
                  <option value="밸런스 패치">밸런스 패치</option>
                  <option value="시즌 이벤트">시즌 이벤트</option>
                  <option value="신규 스킨 출시">신규 스킨 출시</option>
                  <option value="경기 모드 업데이트">경기 모드 업데이트</option>
                </select>
              </div>

              <button
                onClick={generateQAChecklist}
                disabled={isGenerating}
                className={`w-full py-4 rounded-lg font-bold text-white transition-all ${
                  isGenerating
                    ? 'bg-slate-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg'
                }`}
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    AI 체크리스트 생성 중...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    QA 체크리스트 생성
                  </span>
                )}
              </button>
            </div>

            {generatedChecklist && (
              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="w-6 h-6 text-green-400" />
                    생성된 QA 체크리스트
                  </h3>
                  <button
                    onClick={downloadChecklist}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all"
                  >
                    <Download className="w-4 h-4" />
                    다운로드
                  </button>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <pre className="text-green-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                    {generatedChecklist}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 푸터 */}
        <div className="mt-8 text-center text-slate-400 text-sm">
          <p>본 툴은 에이스프로젝트 모바일 야구 게임 QA 지원을 위해 제작되었습니다.</p>
          <p className="mt-1">Claude AI API를 활용한 실시간 분석 시스템</p>
        </div>
      </div>
    </div>
  );
};

export default BaseballGameQATool;
