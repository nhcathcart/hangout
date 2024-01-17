export default function PaddedContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl  p-4">
        {children}
      </div>
    </div>
  );
}
