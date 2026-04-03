interface BeamBorderProps {
  orientation: "vertical" | "horizontal";
  position?: string;
  delay?: string;
}

export function BeamBorder({ orientation, position, delay }: BeamBorderProps) {
  if (orientation === "vertical") {
    return (
      <div
        className="beam-border-v"
        style={{ left: position || "0", animationDelay: delay }}
      />
    );
  }

  return (
    <div
      className="beam-border-h"
      style={{ bottom: position || "0", animationDelay: delay }}
    />
  );
}
