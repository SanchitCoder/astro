import { N8N_WEBHOOK_URL } from './constants';

export type FormSource =
  | 'connect_modal'
  | 'contact_form'
  | 'consultation_form'
  | 'kundli_calculator'
  | 'webinar_registration';

export type WebhookPayload = {
  source: FormSource;
  submitted_at: string;
  name: string;
  email?: string;
  phone?: string;
  consultation_type?: string;
  format?: string;
  message?: string;
  date_of_birth?: string;
  birth_time?: string;
  birth_place?: string;
  page_url?: string;
  user_agent?: string;
};

export class WebhookSubmitError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = 'WebhookSubmitError';
  }
}

export async function submitToN8nWebhook(
  data: Omit<WebhookPayload, 'submitted_at' | 'page_url' | 'user_agent'>,
): Promise<void> {
  const payload: WebhookPayload = {
    ...data,
    submitted_at: new Date().toISOString(),
    page_url: window.location.href,
    user_agent: navigator.userAgent,
  };

  let response: Response;
  try {
    response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new WebhookSubmitError(
      'Unable to reach the server. Please check your connection and try again.',
    );
  }

  if (!response.ok) {
    throw new WebhookSubmitError(
      `Submission failed (${response.status}). Please try again or call us directly.`,
      response.status,
    );
  }
}
