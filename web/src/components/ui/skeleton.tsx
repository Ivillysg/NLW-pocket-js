export function Skeleton() {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="w-32 h-8 bg-zinc-200 rounded-full dark:bg-zinc-700 mb-4" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
