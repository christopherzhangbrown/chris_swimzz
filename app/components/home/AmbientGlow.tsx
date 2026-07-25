export default function AmbientGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="motion-reduce:animate-none absolute -top-[10%] right-[5%] h-[420px] w-[420px] animate-glow-drift-a rounded-full opacity-[0.12] blur-[110px]"
        style={{ background: "radial-gradient(circle, #2f6bff 0%, transparent 70%)" }}
      />
      <div
        className="motion-reduce:animate-none absolute bottom-[5%] left-[8%] h-[380px] w-[380px] animate-glow-drift-b rounded-full opacity-[0.1] blur-[110px]"
        style={{ background: "radial-gradient(circle, #2f6bff 0%, transparent 70%)" }}
      />
    </div>
  )
}
