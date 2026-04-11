import { TestBed } from '@angular/core/testing';
import { SyllableService } from './syllable.service';

describe('SyllableService', () => {
  let service: SyllableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyllableService);
  });

  describe('splitUkrainianWord', () => {
    it('single syllable word', () => {
      expect(service.splitUkrainianWord('ні')).toEqual(['ні']);
    });

    it('two syllable word', () => {
      expect(service.splitUkrainianWord('мама')).toEqual(['ма', 'ма']);
    });

    it('complex syllable pattern', () => {
      const result = service.splitUkrainianWord('дракон');
      expect(result.length).toBeGreaterThanOrEqual(2);
    });

    it('word with various Ukrainian vowels', () => {
      const result = service.splitUkrainianWord('їжак');
      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('empty string returns empty array', () => {
      expect(service.splitUkrainianWord('')).toEqual([]);
    });

    it('uppercase handling', () => {
      expect(service.splitUkrainianWord('МАМА')).toEqual(['МА', 'МА']);
    });
  });

  describe('generateFakeSyllables', () => {
    it('zero count returns empty array', () => {
      expect(service.generateFakeSyllables('мама', 0)).toEqual([]);
    });

    it('returns requested count', () => {
      const fakes = service.generateFakeSyllables('дракон', 2);
      expect(fakes.length).toBe(2);
    });

    it('fakes do not match real syllables', () => {
      const real = service.splitUkrainianWord('книга');
      const fakes = service.generateFakeSyllables('книга', 5);
      fakes.forEach(fake => {
        expect(real).not.toContain(fake);
      });
    });

    it('fakes are unique', () => {
      const fakes = service.generateFakeSyllables('дракон', 3);
      const uniqueFakes = new Set(fakes);
      expect(uniqueFakes.size).toBe(fakes.length);
    });
  });

  describe('shuffle', () => {
    it('returns array of same length', () => {
      const arr = ['а', 'б', 'в', 'г'];
      expect(service.shuffle(arr).length).toBe(4);
    });

    it('contains same elements', () => {
      const arr = ['ма', 'ма', 'фа', 'ке'];
      const shuffled = service.shuffle(arr);
      expect(shuffled.sort()).toEqual(arr.sort());
    });

    it('produces different order (non-deterministic)', () => {
      const arr = ['а', 'б', 'в', 'г', 'д'];
      const shuffles = Array.from({ length: 5 }, () => service.shuffle(arr));
      const anyDifferent = shuffles.some(s => JSON.stringify(s) !== JSON.stringify(arr));
      expect(anyDifferent).toBe(true);
    });
  });

  describe('generateSyllableSet', () => {
    it('returns real and shuffled all syllables', () => {
      const { real, all } = service.generateSyllableSet('дракон', 2);
      expect(real.length).toBeGreaterThanOrEqual(2);
      expect(all.length).toBe(real.length + 2);
      expect(all).not.toEqual(real);
    });
  });
});
