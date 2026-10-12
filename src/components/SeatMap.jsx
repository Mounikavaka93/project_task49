import { formatINR } from '../lib/format'
import { cn } from '../lib/cn'
import { SEAT_GROUPS, TIER_BANDS, seatPrice } from '../data/catalog'

function SeatButton({ id, status, onClick }) {
  return (
    <button
      type="button"
      aria-label={`Seat ${id}, ${status}`}
      aria-pressed={status === 'selected'}
      disabled={status === 'booked'}
      onClick={onClick}
      className={cn(
        'seat h-7 w-7 text-[10px] font-medium sm:h-8 sm:w-8',
        status === 'available' &&
          'bg-[#1c1c22] text-cream/75 ring-1 ring-white/10 hover:bg-gold/20 hover:text-gold',
        status === 'selected' && 'seat-pop bg-gold text-ink',
        status === 'booked' &&
          'cursor-not-allowed bg-[length:8px_8px] bg-[repeating-linear-gradient(135deg,#3a3a42_0_2px,#24242a_2px_4px)] text-transparent',
      )}
    >
      {status === 'booked' ? '' : id.slice(1)}
    </button>
  )
}

function SeatRow({ row, booked, selected, onToggle }) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <span className="w-4 text-center text-[11px] text-muted">{row}</span>
      {SEAT_GROUPS.map((group, index) => (
        <div key={group[0]} className={cn('flex gap-1', index > 0 && 'ml-3 sm:ml-6')}>
          {group.map((number) => {
            const id = `${row}${number}`
            const status = booked.has(id) ? 'booked' : selected.has(id) ? 'selected' : 'available'
            return (
              <SeatButton key={id} id={id} status={status} onClick={() => onToggle(id)} />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default function SeatMap({ format, booked, selected, onToggle }) {
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-4 w-4 rounded-t-md rounded-b-sm bg-[#1c1c22] ring-1 ring-white/10" />
          Available
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-4 w-4 rounded-t-md rounded-b-sm bg-gold" />
          Selected
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-4 w-4 rounded-sm bg-[repeating-linear-gradient(135deg,#3a3a42_0_2px,#24242a_2px_4px)]" />
          Booked
        </span>
      </div>

      <div className="flex w-full overflow-x-auto overscroll-x-contain [justify-content:safe_center]">
        <div className="w-max">
          <div className="mb-6">
            <div className="screen-glow mx-auto h-2 w-[92%] rounded-t-full bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_14px_40px_rgba(226,177,92,0.35)]" />
            <p className="mt-2 text-center text-[11px] tracking-[0.28em] text-muted">SCREEN</p>
          </div>
          <div className="grid gap-4">
            {TIER_BANDS.map((band) => (
              <div key={band.name}>
                <div className="mb-2 flex items-baseline justify-between pl-6 text-xs text-muted">
                  <span>{band.name}</span>
                  <span>{formatINR(seatPrice(format, band.sample))}</span>
                </div>
                <div className="grid gap-1.5">
                  {band.rows.map((row) => (
                    <SeatRow
                      key={row}
                      row={row}
                      booked={booked}
                      selected={selected}
                      onToggle={onToggle}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted sm:hidden">Swipe sideways to see every seat.</p>
    </div>
  )
}
