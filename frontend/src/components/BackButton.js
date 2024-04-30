import Link from "next/link";

export default function BackButton() {
  return (
    <Link href={"/"}>
      <button className="bg-sky-900 px-4 py-2 rounded-md">Go back</button>
    </Link>
  );
}
