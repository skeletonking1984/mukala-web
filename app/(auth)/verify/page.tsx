import Link from "next/link";

export default function VerifyPage() {
  return (
    <div className="text-center">
      <div className="text-5xl mb-6">🐾</div>
      <h1 className="text-3xl font-bold tracking-tight mb-4">
        You're <em className="font-serif italic font-normal gradient-text">in.</em>
      </h1>
      <p className="text-white/55 leading-relaxed mb-8">
        Email verified. Account live. The next step is choosing a tier — when you're ready.
      </p>
      <Link href="/dashboard" className="btn-primary inline-flex">Go to dashboard</Link>
    </div>
  );
}
