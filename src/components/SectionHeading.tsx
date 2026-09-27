import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`section-eyebrow ${isCenter ? "mx-auto" : ""}`}>
        {eyebrow}
      </p>
      <h2 className="section-title mt-4">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-steel-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
