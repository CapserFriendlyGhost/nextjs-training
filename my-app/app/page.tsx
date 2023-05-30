import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="text-8xl">Home Page</div>

      <Link href="/signup">
        <button className="btn btn-accent">Sing up</button>
      </Link>
      <Link href="/participants">
        <button className="btn btn-secondary">List of participants</button>
      </Link>
    </main>
  );
}
