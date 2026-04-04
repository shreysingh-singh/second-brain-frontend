export function InputFunction({
  onChange,
  placeholder,
  refrence,
  type = "text",
  className,
}: {
  onChange?: () => void;
  placeholder?: string;
  refrence?: any;
  type?: string;
  className?: string;
}) {
  return (
    <div>
      <input
        ref={refrence}
        placeholder={placeholder}
        type={type}
        className={
          className ||
          "w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-slate-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition-all bg-slate-50 text-slate-900 placeholder-slate-400"
        }
        onChange={onChange}
      />
    </div>
  );
}
