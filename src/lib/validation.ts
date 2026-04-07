/** お問い合わせフォームのフィールド */
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  date: string;
  message: string;
}

/** バリデーション結果 */
export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactForm, string>>;
}

/**
 * お問い合わせフォームのバリデーション。
 * 全フィールドを検証し、エラーがあればフィールドごとのメッセージを返す。
 */
export function validateContactForm(data: ContactForm): ValidationResult {
  const errors: Partial<Record<keyof ContactForm, string>> = {};

  /* お名前 */
  if (!data.name.trim()) {
    errors.name = 'お名前を入力してください';
  } else if (data.name.trim().length < 2) {
    errors.name = 'お名前は2文字以上で入力してください';
  }

  /* メールアドレス */
  if (!data.email.trim()) {
    errors.email = 'メールアドレスを入力してください';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = '有効なメールアドレスを入力してください';
  }

  /* 電話番号（任意） */
  if (data.phone.trim() && !/^[\d\-+().\s]+$/.test(data.phone.trim())) {
    errors.phone = '有効な電話番号を入力してください';
  }

  /* お問い合わせ内容 */
  if (!data.message.trim()) {
    errors.message = 'お問い合わせ内容を入力してください';
  } else if (data.message.trim().length < 10) {
    errors.message = 'お問い合わせ内容は10文字以上でご記入ください';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/** メールアドレス形式チェック */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/** 電話番号形式チェック（任意入力のため空文字はtrue） */
export function isValidPhone(phone: string): boolean {
  if (!phone.trim()) return true;
  return /^[\d\-+().\s]+$/.test(phone.trim());
}
