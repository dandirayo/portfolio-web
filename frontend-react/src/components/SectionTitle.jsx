function SectionTitle({ eyebrow, title, description, align = "center" }) {
  const alignment = align === "left" ? "text-start" : "text-center mx-auto";

  return (
    <div className={`section-title ${alignment}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default SectionTitle;
