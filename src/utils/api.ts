import { GoogleGenerativeAI } from '@google/generative-ai';
import type { BirthInfo, SajuResult } from '../types/saju';
import { SYSTEM_PROMPT, buildUserMessage } from './prompts';

// JSON 응답에서 순수 JSON 부분만 추출
function extractJson(text: string): string {
  // 마크다운 코드블록 제거
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim();
  }

  // 첫 번째 { 부터 마지막 } 까지 추출
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return jsonMatch[0];
  }

  return text.trim();
}

export async function validateApiKey(apiKey: string): Promise<boolean> {
  if (!apiKey.trim()) return false;

  try {
    const genAI = new GoogleGenerativeAI(apiKey.trim());
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });
    const result = await model.generateContent('안녕하세요. 간단히 "확인"이라고만 답해주세요.');
    const text = result.response.text();
    return text.length > 0;
  } catch {
    return false;
  }
}

export async function fetchSajuReading(
  apiKey: string,
  birthInfo: BirthInfo
): Promise<SajuResult> {
  const genAI = new GoogleGenerativeAI(apiKey.trim());
  const model = genAI.getGenerativeModel({
    model: 'gemini-3-flash-preview',
    generationConfig: {
      temperature: 0.8,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    },
  });

  const userMessage = buildUserMessage(birthInfo);

  // 타임아웃 30초
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT + '\n\n' + userMessage }],
        },
      ],
    });

    clearTimeout(timeoutId);

    const responseText = result.response.text();
    const jsonString = extractJson(responseText);
    const parsed: SajuResult = JSON.parse(jsonString);

    // 기본 구조 검증
    if (!parsed.saju || !parsed.categories || !Array.isArray(parsed.categories)) {
      throw new Error('응답 데이터 구조가 올바르지 않습니다.');
    }

    return parsed;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof SyntaxError) {
      throw new Error('AI 응답을 분석하는 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('요청 시간이 초과되었습니다. 네트워크 연결을 확인하고 다시 시도해 주세요.');
    }
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('API 키가 유효하지 않습니다. 키를 확인해 주세요.');
      }
      if (error.message.includes('quota') || error.message.includes('rate')) {
        throw new Error('API 사용 한도에 도달했습니다. 잠시 후 다시 시도해 주세요.');
      }
      throw error;
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
}
