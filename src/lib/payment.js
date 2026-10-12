export const emptyPayment = {
  method: 'card',
  name: '',
  number: '',
  expiry: '',
  cvv: '',
  upi: '',
}

export function digitsOnly(value) {
  return value.replace(/\D/g, '')
}

export function formatCardNumber(value) {
  return digitsOnly(value)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
}

export function formatExpiry(value) {
  const digits = digitsOnly(value).slice(0, 4)
  if (digits.length < 3) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

export function cardBrand(digits) {
  if (digits.startsWith('4')) return 'Visa'
  if (digits.startsWith('5')) return 'Mastercard'
  if (digits.startsWith('6')) return 'RuPay'
  return 'Card'
}

function luhnValid(digits) {
  let sum = 0
  let alternate = false
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index])
    if (alternate) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
    alternate = !alternate
  }
  return sum % 10 === 0
}

export function validatePayment(payment) {
  const errors = {}
  if (payment.method === 'upi') {
    if (!/^[\w.]{2,}@[\w]{2,}$/.test(payment.upi.trim())) {
      errors.upi = 'Enter a UPI ID like name@bank.'
    }
    return errors
  }

  if (payment.name.trim().length < 2) errors.name = 'Enter the name on the card.'
  const number = digitsOnly(payment.number)
  if (number.length !== 16 || !luhnValid(number)) {
    errors.number = 'Enter a valid 16-digit card number.'
  }
  const match = /^(\d{2})\/(\d{2})$/.exec(payment.expiry)
  if (!match) {
    errors.expiry = 'Use MM/YY.'
  } else {
    const month = Number(match[1])
    const year = 2000 + Number(match[2])
    const now = new Date()
    const expired =
      month < 1 ||
      month > 12 ||
      year < now.getFullYear() ||
      (year === now.getFullYear() && month < now.getMonth() + 1)
    if (expired) errors.expiry = 'Enter a future expiry date.'
  }
  if (!/^\d{3}$/.test(payment.cvv)) errors.cvv = 'Enter the 3-digit CVV.'
  return errors
}

export function paymentSnapshot(payment) {
  if (payment.method === 'upi') {
    return { method: 'upi', label: payment.upi.trim() }
  }
  const number = digitsOnly(payment.number)
  return {
    method: 'card',
    brand: cardBrand(number),
    last4: number.slice(-4),
    name: payment.name.trim(),
  }
}

export function paymentLabel(payment) {
  if (!payment) return ''
  if (payment.method === 'upi') return `UPI · ${payment.label}`
  return `${payment.brand} ···· ${payment.last4}`
}
