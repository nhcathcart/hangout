export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-50 overflow-hidden border-[1px] border-neutral-900 mb-4 rounded-sm">
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
}
