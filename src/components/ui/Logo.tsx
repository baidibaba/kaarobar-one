/**
 * Kaarobar One logo (Figma: Logo/KaarobarOne).
 */
export function Logo() {
  return (
    <div className="flex items-center gap-[5px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-mark.svg" alt="" width={56} height={56} />
      <span className="text-5xl font-black tracking-[-0.01em] text-accent-logo">1</span>
      <span className="flex w-[66px] flex-col gap-1 text-primary-600">
        <span dir="auto" className="text-right text-2xl font-bold">کاروبار</span>
        <span className="text-sm font-semibold tracking-[-0.01em]">Kaarobar</span>
      </span>
    </div>
  );
}
