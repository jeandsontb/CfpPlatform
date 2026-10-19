import type { SpeakerDTO } from '@cfp-platform/shared-types';

export const CFP_API_ENDPOINT =
  process.env.NEXT_PUBLIC_CFP_API_URL || 'http://localhost:3300/api/cfp';

export async function submitCfp(data: SpeakerDTO): Promise<SpeakerDTO> {
  const response = await fetch(CFP_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMessage = `Erro na submissão (Status ${response.status})`;
    try {
      const errorBody = await response.json();
      if (errorBody) {
        if (Array.isArray(errorBody.message)) {
          errorMessage = errorBody.message.join(', ');
        } else if (typeof errorBody.message === 'string') {
          errorMessage = errorBody.message;
        }
      }
    } catch {
      // Fallback em caso de corpo de resposta não-JSON
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function getCfps(): Promise<SpeakerDTO[]> {
  const response = await fetch(CFP_API_ENDPOINT, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    let errorMessage = `Erro ao carregar as palestras (Status ${response.status})`;
    try {
      const errorBody = await response.json();
      if (errorBody) {
        if (Array.isArray(errorBody.message)) {
          errorMessage = errorBody.message.join(', ');
        } else if (typeof errorBody.message === 'string') {
          errorMessage = errorBody.message;
        }
      }
    } catch {
      // Fallback em caso de corpo de resposta não-JSON
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

