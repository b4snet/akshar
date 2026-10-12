import Link from "next/link";

export default function NotFound() {
  return <main className="akshar-not-found"><div className="akshar-not-found-shade" aria-hidden="true" /><Link href="/" className="akshar-not-found-brand" aria-label="Akshar home"><span aria-hidden="true">अ</span> akshar<i>.</i></Link><section aria-labelledby="not-found-title"><p>AKSHAR / 404</p><h1 id="not-found-title">404</h1><div aria-hidden="true" /><h2>This page may be missing, but your learning journey continues.</h2><Link href="/" className="akshar-not-found-link">Return home <span aria-hidden="true">↗</span></Link></section></main>;
}
