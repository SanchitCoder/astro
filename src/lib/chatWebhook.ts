import { N8N_CHAT_WEBHOOK_URL } from './constants';

export type ChatHistoryItem = {
  role: 'user' | 'assistant';
  text: string;
};

export type ChatWebhookPayload = {
  message: string;
  question: string;
  submitted_at: string;
  session_id: string;
  page_url: string;
  history: ChatHistoryItem[];
};

export class ChatWebhookError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = 'ChatWebhookError';
  }
}

function pickReplyText(value: unknown): string | null {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed || null;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const nested = pickReplyText(item);
      if (nested) return nested;
    }
    return null;
  }

  if (!value || typeof value !== 'object') return null;

  const record = value as Record<string, unknown>;
  const keys = ['output', 'reply', 'message', 'text', 'response', 'answer', 'content', 'result'];
  for (const key of keys) {
    const nested = pickReplyText(record[key]);
    if (nested) return nested;
  }

  if ('data' in record) {
    const nested = pickReplyText(record.data);
    if (nested) return nested;
  }

  if ('json' in record) {
    const nested = pickReplyText(record.json);
    if (nested) return nested;
  }

  return null;
}

export function parseChatWebhookResponse(data: unknown): string {
  const reply = pickReplyText(data);
  if (reply) return reply;
  return 'Sorry, I could not read the response. Please try again or call us directly.';
}

export async function sendChatToN8nWebhook(input: {
  message: string;
  sessionId: string;
  history: ChatHistoryItem[];
}): Promise<string> {
  const payload: ChatWebhookPayload = {
    message: input.message,
    question: input.message,
    submitted_at: new Date().toISOString(),
    session_id: input.sessionId,
    page_url: window.location.href,
    history: input.history,
  };

  let response: Response;
  try {
    response = await fetch(N8N_CHAT_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ChatWebhookError(
      'Unable to reach the chat service. Please check your connection and try again.',
    );
  }

  if (!response.ok) {
    throw new ChatWebhookError(
      `Chat request failed (${response.status}). Please try again.`,
      response.status,
    );
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    const data: unknown = await response.json();
    return parseChatWebhookResponse(data);
  }

  const text = (await response.text()).trim();
  return text || parseChatWebhookResponse(null);
}
