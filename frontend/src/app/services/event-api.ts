import type { EventDTO } from '@cfp-platform/shared-types';

export const EVENT_API_ENDPOINT =
  process.env.NEXT_PUBLIC_EVENT_API_URL || 'http://localhost:3300/api/event';

export async function submitEvent(data: EventDTO): Promise<EventDTO> {
  const response = await fetch(EVENT_API_ENDPOINT, {
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

export async function getEvents(): Promise<EventDTO[]> {
  const response = await fetch(EVENT_API_ENDPOINT, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    let errorMessage = `Erro ao carregar os eventos (Status ${response.status})`;
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
