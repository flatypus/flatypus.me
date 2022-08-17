export default function Box({ children }: any) {
  return <div style={{ boxShadow: "0.25rem 0.25rem #80A7FE"}} className="rounded-md">{children}</div>;
}
