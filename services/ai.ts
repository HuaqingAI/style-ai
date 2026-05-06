import { AnalysisCategory, AnalysisResult } from '@/types';
import { buildSystemPrompt, USER_INSTRUCTION } from '@/constants/prompts';
import { getPreferences } from './storage';

// 通过环境变量配置；开发阶段在 .env 中设置
const API_URL =
  process.env.EXPO_PUBLIC_AI_API_URL ?? 'https://ai-gateway.happycapy.ai/api/v1/chat/completions';
const API_KEY = process.env.EXPO_PUBLIC_AI_API_KEY ?? '';
const MODEL = process.env.EXPO_PUBLIC_AI_MODEL ?? 'anthropic/claude-sonnet-4.6';

async function imageToBase64(uri: string): Promise<string> {
  const response = await fetch(uri);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1] ?? result;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function buildUserContext(prefs: Awaited<ReturnType<typeof getPreferences>>): string {
  const parts: string[] = [];
  if (prefs.gender !== 'unspecified') {
    parts.push(`性别：${prefs.gender === 'female' ? '女' : '男'}`);
  }
  if (prefs.stylePreference.length > 0) {
    parts.push(`偏好风格：${prefs.stylePreference.join('、')}`);
  }
  return parts.join('；');
}

function parseAIResponse(text: string): AnalysisResult {
  // 容错：从可能包含 markdown 代码块的文本中提取 JSON
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('AI 返回格式不正确');

  const parsed = JSON.parse(jsonMatch[0]);
  return {
    overallScore: Number(parsed.overallScore) || 0,
    summary: String(parsed.summary ?? ''),
    aspects: Array.isArray(parsed.aspects)
      ? parsed.aspects.map((a: any) => ({
          name: String(a.name ?? ''),
          score: Number(a.score) || 0,
          comment: String(a.comment ?? ''),
        }))
      : [],
    suggestions: Array.isArray(parsed.suggestions)
      ? parsed.suggestions.map((s: any) => String(s))
      : [],
  };
}

export async function analyzeImage(
  imageUri: string,
  category: AnalysisCategory
): Promise<AnalysisResult> {
  if (!API_KEY) {
    // Demo 模式：无 API key 时返回模拟数据，方便开发/演示
    return getMockResult(category);
  }

  const prefs = await getPreferences();
  const userContext = buildUserContext(prefs);
  const systemPrompt = buildSystemPrompt(category, userContext);
  const base64 = await imageToBase64(imageUri);

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: [
            { type: 'text', text: USER_INSTRUCTION },
            {
              type: 'image_url',
              image_url: { url: `data:image/jpeg;base64,${base64}` },
            },
          ],
        },
      ],
      temperature: 0.4,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API 请求失败：${response.status} ${err}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content ?? '';
  return parseAIResponse(content);
}

function getMockResult(category: AnalysisCategory): AnalysisResult {
  const base: Record<AnalysisCategory, AnalysisResult> = {
    all: {
      overallScore: 8.2,
      summary: '整体形象清爽自然，风格统一度高。发型修饰脸型到位，穿搭配色协调，妆容淡雅适合日常场合。略调整配饰层次感即可更精致。',
      aspects: [
        { name: '发型', score: 8, comment: '发型自然柔和，与脸型搭配和谐。' },
        { name: '穿搭', score: 8, comment: '色彩搭配得体，版型合身。' },
        { name: '妆容', score: 9, comment: '底妆干净，整体氛围清透。' },
        { name: '配饰', score: 7, comment: '配饰选择朴素，可增加亮点。' },
      ],
      suggestions: [
        '可尝试一条细项链或小耳饰提升精致度',
        '下装颜色可选择更深一度增加层次',
        '发型侧边可稍作蓬松处理',
      ],
    },
    hair: {
      overallScore: 8.0,
      summary: '发型整洁自然，发色与肤色匹配度高。发量分布均衡，修饰脸型效果良好。',
      aspects: [
        { name: '发色', score: 9, comment: '发色自然，衬托气色。' },
        { name: '款式', score: 8, comment: '款式经典，适合多种场合。' },
        { name: '质感', score: 7, comment: '质感偏干，可加强护理。' },
      ],
      suggestions: ['每周做 1-2 次护发膜', '考虑调整刘海弧度', '定期修剪发尾保持线条感'],
    },
    outfit: {
      overallScore: 7.8,
      summary: '穿搭风格统一，色彩协调。版型合身，整体比例舒适。',
      aspects: [
        { name: '色彩搭配', score: 8, comment: '低饱和配色很耐看。' },
        { name: '版型', score: 8, comment: '合身度佳，线条利落。' },
        { name: '风格统一性', score: 8, comment: '风格协调，无冲突感。' },
      ],
      suggestions: ['可加一件亮色单品点缀', '鞋子可换为同色系增强整体感', '外套长度可再短一些'],
    },
    makeup: {
      overallScore: 8.5,
      summary: '妆容干净通透，细节处理到位。整体氛围自然。',
      aspects: [
        { name: '底妆', score: 9, comment: '底妆轻薄服帖。' },
        { name: '眉眼', score: 8, comment: '眉形自然，眼妆清透。' },
        { name: '唇妆', score: 8, comment: '唇色温柔，气色好。' },
      ],
      suggestions: ['可尝试更精致的眼线', '修容可略加强', '保持现有清爽风格'],
    },
    accessory: {
      overallScore: 7.5,
      summary: '配饰选择简约，与整体风格协调。可在层次感上再下功夫。',
      aspects: [
        { name: '选择', score: 8, comment: '配饰经典简约。' },
        { name: '协调度', score: 8, comment: '与穿搭风格匹配。' },
        { name: '层次', score: 6, comment: '层次感可加强。' },
      ],
      suggestions: ['尝试叠戴细项链', '增加一只腕表或手链', '耳饰可选择更有设计感的款式'],
    },
  };
  return base[category];
}
