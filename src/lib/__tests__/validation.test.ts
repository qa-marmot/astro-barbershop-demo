import { describe, it, expect } from 'vitest';
import { validateContactForm, isValidEmail, isValidPhone } from '../validation';
import type { ContactForm } from '../validation';

const validData: ContactForm = {
  name:    '山田太郎',
  email:   'yamada@example.com',
  phone:   '03-0000-0000',
  date:    '2026-04-15',
  message: 'カットの予約をお願いしたいです。よろしくお願いします。',
};

describe('validateContactForm', () => {
  describe('正常系', () => {
    it('有効なデータはバリデーションを通過する', () => {
      const result = validateContactForm(validData);
      expect(result.valid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('電話番号が空の場合も有効（任意入力）', () => {
      const result = validateContactForm({ ...validData, phone: '' });
      expect(result.valid).toBe(true);
      expect(result.errors.phone).toBeUndefined();
    });

    it('日付が空の場合も有効（任意入力）', () => {
      const result = validateContactForm({ ...validData, date: '' });
      expect(result.valid).toBe(true);
    });

    it('メッセージが10文字以上であれば有効', () => {
      const result = validateContactForm({
        ...validData,
        message: 'ちょうど十文字以上あるメッセージです',
      });
      expect(result.valid).toBe(true);
    });
  });

  describe('お名前バリデーション', () => {
    it('空のお名前はエラー', () => {
      const result = validateContactForm({ ...validData, name: '' });
      expect(result.valid).toBe(false);
      expect(result.errors.name).toBeDefined();
    });

    it('スペースのみのお名前はエラー', () => {
      const result = validateContactForm({ ...validData, name: '   ' });
      expect(result.valid).toBe(false);
      expect(result.errors.name).toBeDefined();
    });

    it('1文字のお名前はエラー（2文字以上が必要）', () => {
      const result = validateContactForm({ ...validData, name: 'A' });
      expect(result.valid).toBe(false);
      expect(result.errors.name).toBeDefined();
    });

    it('2文字のお名前は有効', () => {
      const result = validateContactForm({ ...validData, name: '山田' });
      expect(result.valid).toBe(true);
      expect(result.errors.name).toBeUndefined();
    });
  });

  describe('メールアドレスバリデーション', () => {
    it('空のメールはエラー', () => {
      const result = validateContactForm({ ...validData, email: '' });
      expect(result.valid).toBe(false);
      expect(result.errors.email).toBeDefined();
    });

    it('不正なメール形式はエラー', () => {
      const invalidEmails = ['not-an-email', '@no-local', 'no-at-sign', 'a@'];
      invalidEmails.forEach(email => {
        const result = validateContactForm({ ...validData, email });
        expect(result.valid, `"${email}" should be invalid`).toBe(false);
        expect(result.errors.email).toBeDefined();
      });
    });

    it('有効なメールアドレスは通過する', () => {
      const validEmails = [
        'test@example.com',
        'user.name+tag@example.co.jp',
        'hello@trim-studio.jp',
      ];
      validEmails.forEach(email => {
        const result = validateContactForm({ ...validData, email });
        expect(result.valid, `"${email}" should be valid`).toBe(true);
      });
    });
  });

  describe('電話番号バリデーション', () => {
    it('有効な電話番号形式は通過する', () => {
      const validPhones = ['03-0000-0000', '090-1234-5678', '+81-3-0000-0000', ''];
      validPhones.forEach(phone => {
        const result = validateContactForm({ ...validData, phone });
        expect(result.errors.phone, `"${phone}" should not have phone error`).toBeUndefined();
      });
    });

    it('英字を含む電話番号はエラー', () => {
      const result = validateContactForm({ ...validData, phone: 'ABC-1234' });
      expect(result.valid).toBe(false);
      expect(result.errors.phone).toBeDefined();
    });

    it('記号を多用した電話番号はエラー', () => {
      const result = validateContactForm({ ...validData, phone: '!!invalid!!' });
      expect(result.valid).toBe(false);
      expect(result.errors.phone).toBeDefined();
    });
  });

  describe('お問い合わせ内容バリデーション', () => {
    it('空のメッセージはエラー', () => {
      const result = validateContactForm({ ...validData, message: '' });
      expect(result.valid).toBe(false);
      expect(result.errors.message).toBeDefined();
    });

    it('9文字以下のメッセージはエラー（10文字以上が必要）', () => {
      const result = validateContactForm({ ...validData, message: '123456789' });
      expect(result.valid).toBe(false);
      expect(result.errors.message).toBeDefined();
    });

    it('10文字のメッセージは有効', () => {
      const result = validateContactForm({ ...validData, message: '1234567890' });
      expect(result.valid).toBe(true);
      expect(result.errors.message).toBeUndefined();
    });
  });

  describe('複数エラー', () => {
    it('複数フィールドが不正な場合は全エラーを返す', () => {
      const result = validateContactForm({ name: '', email: 'bad', phone: '', date: '', message: '' });
      expect(result.valid).toBe(false);
      expect(result.errors.name).toBeDefined();
      expect(result.errors.email).toBeDefined();
      expect(result.errors.message).toBeDefined();
    });
  });
});

describe('isValidEmail', () => {
  it('有効なメールアドレスで true を返す', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user@domain.co.jp')).toBe(true);
  });

  it('無効なメールアドレスで false を返す', () => {
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('@no-local')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});

describe('isValidPhone', () => {
  it('空文字は有効（任意入力）', () => {
    expect(isValidPhone('')).toBe(true);
  });

  it('数字とハイフンを含む番号は有効', () => {
    expect(isValidPhone('03-0000-0000')).toBe(true);
    expect(isValidPhone('+81 3 0000 0000')).toBe(true);
  });

  it('英字を含む番号は無効', () => {
    expect(isValidPhone('abc-1234')).toBe(false);
  });
});
