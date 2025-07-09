import { helpers } from '@vuelidate/validators'

// Common validation messages in English
export const englishMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  strongEmail: 'Please enter a valid email address',
  strongPassword: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  mediumPassword: 'Password must be at least 6 characters long',
  passwordComplexity: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  sameAs: 'Passwords do not match',
  minLength: (min: number) => `Please enter at least ${min} characters`
}

// Common validation messages in Persian
export const persianMessages = {
  required: 'این فیلد الزامی است',
  email: 'لطفاً یک آدرس ایمیل معتبر وارد کنید',
  strongEmail: 'لطفاً یک آدرس ایمیل معتبر وارد کنید',
  strongPassword: 'رمز عبور باید حداقل ۸ کاراکتر باشد و شامل حروف بزرگ، کوچک، عدد و کاراکتر خاص باشد',
  mediumPassword: 'رمز عبور باید حداقل ۶ کاراکتر باشد',
  passwordComplexity: 'رمز عبور باید شامل حروف بزرگ، کوچک و عدد باشد',
  sameAs: 'رمزهای عبور مطابقت ندارند',
  minLength: (min: number) => `حداقل ${min} کاراکتر وارد کنید`
}

// Enhanced email validation with better regex
export const strongEmail = helpers.withMessage(
  englishMessages.strongEmail,
  (value: string) => {
    if (!value) return true // Let required handle empty values
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(value)
  }
)

// Strong password validation
export const strongPassword = helpers.withMessage(
  englishMessages.strongPassword,
  (value: string) => {
    if (!value) return true // Let required handle empty values
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(value)
  }
)

// Medium password validation (less strict for login)
export const mediumPassword = helpers.withMessage(
  englishMessages.mediumPassword,
  (value: string) => {
    if (!value) return true
    return value.length >= 6
  }
)

// Password complexity check
export const passwordComplexity = helpers.withMessage(
  englishMessages.passwordComplexity,
  (value: string) => {
    if (!value) return true
    const hasUpperCase = /[A-Z]/.test(value)
    const hasLowerCase = /[a-z]/.test(value)
    const hasNumber = /\d/.test(value)
    return hasUpperCase && hasLowerCase && hasNumber
  }
)

// Password strength indicator
export const getPasswordStrength = (password: string): { strength: number; message: string; color: string } => {
  if (!password) return { strength: 0, message: 'Enter a password', color: 'text-muted' }
  
  let score = 0
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password)
  }
  
  score = Object.values(checks).filter(Boolean).length
  
  if (score <= 2) return { strength: score, message: 'Weak', color: 'text-danger' }
  if (score <= 3) return { strength: score, message: 'Fair', color: 'text-warning' }
  if (score <= 4) return { strength: score, message: 'Good', color: 'text-info' }
  return { strength: score, message: 'Strong', color: 'text-success' }
} 