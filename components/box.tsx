export default function Box({ children }: any) {
  return (
    <div
      style={{
        boxShadow: "-0.5rem -0.5rem #82dcf5, 0.5rem 0.5rem #966ac7",
      }}
      className="rounded-md"
    >
      <div className="p-4 rounded-lg bg-cover bg-[#000000c0] font-mono font-medium text-[#66728d] drop-shadow-lg">
        {children}
      </div>
    </div>
  );
}
