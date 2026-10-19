import { sharedTypes } from './shared-types';
import type { EventDTO } from './event.dto';

describe('sharedTypes', () => {
  it('should work', () => {
    expect(sharedTypes()).toEqual('shared-types');
  });

  it('should support EventDTO structure', () => {
    const event: EventDTO = {
      id: '1',
      name: 'Tech Conference 2025',
      address: 'Av. Paulista, 1000',
      capacity: 500,
      date: '2025-10-15',
    };

    expect(event.name).toBe('Tech Conference 2025');
    expect(event.capacity).toBe(500);
  });
});
