export default function Button({
  onClick,
  primary,
  label,
}: {
  onClick: any;
  primary: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: primary ? "red" : "yellow" }}
    >
      {label}
    </button>
  );
}
