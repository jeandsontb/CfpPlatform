import { submitEvent, getEvents, EVENT_API_ENDPOINT } from '../src/app/services/event-api';
import type { EventDTO } from '@cfp-platform/shared-types';

describe('event-api service', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('submitEvent should call fetch with POST method and correct body', async () => {
    const mockEvent: EventDTO = {
      name: 'Tech Event 2025',
      address: 'Av Paulista 1000',
      capacity: 250,
      date: '2025-12-01',
    };

    const mockResponse: EventDTO = { id: 'evt-1', ...mockEvent };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const result = await submitEvent(mockEvent);

    expect(global.fetch).toHaveBeenCalledWith(EVENT_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockEvent),
    });
    expect(result).toEqual(mockResponse);
  });

  it('getEvents should call fetch with GET method', async () => {
    const mockList: EventDTO[] = [
      { id: '1', name: 'Event A', address: 'Addr A', capacity: 100, date: '2025-01-01' },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockList),
    } as Response);

    const result = await getEvents();

    expect(global.fetch).toHaveBeenCalledWith(EVENT_API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(result).toEqual(mockList);
  });
});
