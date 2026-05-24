"use client";


interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  className = "",
}: AnimatedCounterProps) {
  // Inicializando diretamente com o valor final para evitar exibir 0.
  // A animação foi desativada para priorizar credibilidade e performance.
  const count = target;

  return (
    <span className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
