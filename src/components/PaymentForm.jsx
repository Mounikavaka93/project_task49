import { cardBrand, digitsOnly, formatCardNumber, formatExpiry } from '../lib/payment'
import { cn } from '../lib/cn'
import { Field } from './ui'

const methods = [
  { id: 'card', label: 'Card' },
  { id: 'upi', label: 'UPI' },
]

export default function PaymentForm({ value, onChange, errors }) {
  function setField(key, next) {
    onChange({ ...value, [key]: next })
  }

  const brand = cardBrand(digitsOnly(value.number))

  return (
    <section className="rounded-3xl bg-panel p-5 ring-1 ring-white/10 sm:p-6">
      <h2 className="font-display text-2xl">Payment details</h2>
      <p className="mt-1 text-sm text-muted">Demo checkout only. Nothing is charged.</p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {methods.map((method) => (
          <button
            key={method.id}
            type="button"
            aria-pressed={value.method === method.id}
            onClick={() => setField('method', method.id)}
            className={cn(
              'min-h-11 rounded-2xl border text-sm font-medium transition',
              value.method === method.id
                ? 'border-gold bg-gold text-ink'
                : 'border-white/10 bg-white/5 text-cream hover:border-gold/40',
            )}
          >
            {method.label}
          </button>
        ))}
      </div>

      {value.method === 'card' ? (
        <div key="card" className="swap mt-5 grid gap-4">
          <Field
            label="Name on card"
            name="cc-name"
            autoComplete="cc-name"
            value={value.name}
            error={errors.name}
            onChange={(event) => setField('name', event.target.value)}
          />
          <Field
            label="Card number"
            name="cc-number"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="4242 4242 4242 4242"
            value={value.number}
            error={errors.number}
            end={
              digitsOnly(value.number).length >= 1 ? (
                <span className="pr-1 text-xs text-gold">{brand}</span>
              ) : null
            }
            onChange={(event) => setField('number', formatCardNumber(event.target.value))}
          />
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Expiry"
              name="cc-exp"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              value={value.expiry}
              error={errors.expiry}
              onChange={(event) => setField('expiry', formatExpiry(event.target.value))}
            />
            <Field
              label="CVV"
              name="cc-csc"
              type="password"
              inputMode="numeric"
              autoComplete="cc-csc"
              maxLength={3}
              value={value.cvv}
              error={errors.cvv}
              onChange={(event) => setField('cvv', digitsOnly(event.target.value).slice(0, 3))}
            />
          </div>
        </div>
      ) : (
        <div key="upi" className="swap mt-5">
          <Field
            label="UPI ID"
            name="upi"
            autoComplete="off"
            placeholder="name@bank"
            value={value.upi}
            error={errors.upi}
            onChange={(event) => setField('upi', event.target.value.trimStart())}
          />
        </div>
      )}
    </section>
  )
}
