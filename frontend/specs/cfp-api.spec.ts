import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { SpeakerDTO } from '@cfp-platform/shared-types';
import { CFP_API_ENDPOINT, getCfps, submitCfp } from '../src/app/services/cfp-api';

describe('cfp-api service', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe('getCfps', () => {
    it('deve retornar a lista de palestras com sucesso quando a API responde 200 OK', async () => {
      const mockSpeakers: SpeakerDTO[] = [
        {
          id: 'spk-1',
          name: 'Ada Lovelace',
          email: 'ada@example.com',
          talkTitle: 'First Computer Program',
          isGDE: true,
        },
        {
          id: 'spk-2',
          name: 'Alan Turing',
          email: 'alan@example.com',
          talkTitle: 'Enigma Machine & Computation',
          isGDE: false,
        },
      ];

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockSpeakers,
      });

      const result = await getCfps();

      expect(global.fetch).toHaveBeenCalledWith(CFP_API_ENDPOINT, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(result).toEqual(mockSpeakers);
    });

    it('deve lançar erro com a mensagem do backend quando a resposta da API não for ok', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ message: 'Erro interno no servidor' }),
      });

      await expect(getCfps()).rejects.toThrow('Erro interno no servidor');
    });

    it('deve lançar erro com mensagens em array concatenadas quando fornecidas pelo backend', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ message: ['campo inválido 1', 'campo inválido 2'] }),
      });

      await expect(getCfps()).rejects.toThrow('campo inválido 1, campo inválido 2');
    });

    it('deve lançar erro padrão com status quando a resposta de erro não for JSON', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 502,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      await expect(getCfps()).rejects.toThrow('Erro ao carregar as palestras (Status 502)');
    });
  });

  describe('submitCfp', () => {
    it('deve submeter a palestra com sucesso quando a API responder 201 Created', async () => {
      const newSpeaker: SpeakerDTO = {
        id: 'spk-3',
        name: 'Grace Hopper',
        email: 'grace@example.com',
        talkTitle: 'Compilers and Nanoseconds',
        isGDE: true,
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 201,
        json: async () => newSpeaker,
      });

      const result = await submitCfp(newSpeaker);

      expect(global.fetch).toHaveBeenCalledWith(CFP_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSpeaker),
      });
      expect(result).toEqual(newSpeaker);
    });
  });
});
