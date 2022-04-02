export default function ArrowIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      style={{
        transform: `rotate(${isOpen ? "0" : "-90"}deg)`,
        transition: ".1s all ease-in-out",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#6e6e6e"
        rotate="90"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M7 10l5 5 5-5H7z" />
      </svg>
    </div>
  );
}
