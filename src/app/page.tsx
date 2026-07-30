"use client";

import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Page = "home" | "acting" | "writing" | "contact";

export default function Home() {
  const [activePage, setActivePage] = useState<Page>("home");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const heroSectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  const go = useCallback((page: Page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (activePage !== "home") return;
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            if (self.progress >= 0.99) {
              gsap.set(headlineRef.current, { opacity: 0 });
              gsap.set(bioRef.current, { opacity: 1, y: 0 });
              self.kill();
            }
          },
        },
      });

      tl.to(headlineRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.4,
        ease: "power2.in",
      });

      tl.fromTo(
        bioRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        0.3
      );
    }, heroSectionRef);

    return () => ctx.revert();
  }, [activePage]);

  return (
    <>
      {/* ============ TOPBAR ============ */}
      <header className="sticky top-0 z-10 flex justify-between items-center gap-5 px-[clamp(1rem,4vw,3rem)] py-4 border-b border-[--rule] bg-[rgba(246,239,228,0.88)] backdrop-blur-[12px]">
        <button
          onClick={() => go("home")}
          className="font-[--font-libre] text-[13px] leading-none tracking-[0.24em] uppercase text-[--ink] cursor-pointer bg-none border-none whitespace-nowrap py-1.5 font-normal"
          style={{ fontFamily: "var(--font-libre), Baskerville, Georgia, serif" }}
        >
          Tess Kennedy Hezlep
        </button>

        <nav className="flex gap-5 items-center flex-wrap justify-end">
          {(
            [
              { label: "acting", page: "acting" as Page },
              { label: "writing", page: "writing" as Page },
              { label: "contact", page: "contact" as Page },
            ] as const
          ).map((item) => (
            <button
              key={item.label}
              onClick={() => go(item.page)}
              className={`text-[15px] italic bg-transparent border-none cursor-pointer py-1 transition-colors ${
                activePage === item.page
                  ? "text-[--ink]"
                  : "text-[--muted] hover:text-[--ink]"
              }`}
            >
              {item.label}
              {activePage === item.page && (
                <span className="block h-px bg-[--red] mt-0.5" />
              )}
            </button>
          ))}

          {/* Social icons */}
          <span className="hidden md:inline text-[--rule] select-none">|</span>
          <a
            href="https://www.instagram.com/medicine_babyy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[--muted] hover:text-[--ink] transition-colors"
            aria-label="Instagram"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
          <a
            href="https://www.backstage.com/u/tess-hezlep/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[--muted] hover:text-[--ink] transition-colors"
            aria-label="Backstage"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h7c1.7 0 3.1.6 4.1 1.6S18.7 7.8 18.7 9.4c0 1.2-.3 2.2-1 3-.7.9-1.6 1.4-2.7 1.6l4.5 6H16l-4-5.6H9.5V20H6V4zm3.5 3v4.2h3.2c.8 0 1.4-.2 1.9-.7s.7-1 .7-1.7c0-.8-.2-1.3-.7-1.8s-1.1-.7-1.9-.7H9.5z"/></svg>
          </a>
          <a
            href="https://substack.com/@tess514709"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[--muted] hover:text-[--ink] transition-colors"
            aria-label="Substack"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v2.4H3V3zm0 4.2h18v2.4H3V7.2zM3 11.4h18v9.6l-9-5.1-9 5.1v-9.6z"/></svg>
          </a>
          <a
            href="https://open.spotify.com/show/2g6xpGERssgYAX0uMgK9zl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[--muted] hover:text-[--ink] transition-colors"
            aria-label="Spotify"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 14.36c-.2.3-.56.4-.86.2-2.36-1.44-5.33-1.77-8.83-.97-.34.08-.67-.14-.75-.47-.08-.34.13-.67.47-.75 3.83-.87 7.12-.5 9.77 1.13.3.18.4.56.2.86zm1.23-2.72c-.24.38-.76.5-1.14.24-2.7-1.66-6.82-2.14-10.02-1.17-.4.12-.82-.1-.94-.5-.12-.4.1-.82.5-.94 3.65-1.1 8.18-.57 11.3 1.33.38.24.5.76.3 1.14v-.1zm.1-2.82C14.7 8.62 9.38 8.44 6.32 9.34c-.48.14-.98-.13-1.12-.6-.14-.48.13-.98.6-1.12 3.52-1.04 9.38-.84 13.08 1.34.44.26.6.84.34 1.28-.26.44-.84.58-1.28.34l.03-.02z"/></svg>
          </a>
        </nav>
      </header>

      <main className="flex-1 min-h-[70vh]">
        {/* ============ HOME ============ */}
        {activePage === "home" && (
          <div className="page-enter">
            {/* Hero — tall on desktop for scroll room */}
            <div ref={heroSectionRef} className="relative md:min-h-[220vh]">
              <div className="md:sticky md:top-[57px] md:h-[calc(100vh-57px)]">
                <div className="max-w-[1120px] mx-auto px-5 py-14 md:py-0 h-full">
                  <div className="grid md:grid-cols-[minmax(300px,480px)_minmax(0,1fr)] gap-[clamp(2rem,5vw,5rem)] items-center h-full">
                    {/* Portrait */}
                    <div className="relative max-w-[250px] md:max-w-none mx-auto md:mx-0">
                      <div className="absolute inset-[18px_-18px_-18px_18px] bg-[--rose] -z-10 opacity-40" />
                      <div className="relative aspect-[4/5.15] w-full overflow-hidden border border-[--rule] shadow-[0_22px_55px_rgba(36,27,22,0.13)]">
                        <Image
                          src="/images/hero.jpg"
                          alt="Tess Kennedy Hezlep"
                          fill
                          priority
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 250px, 480px"
                        />
                      </div>
                    </div>

                    {/* Right column — two overlapping layers on desktop */}
                    <div className="relative text-center md:text-left">
                      {/* Layer 1: Headline (visible on load, fades out on scroll) */}
                      <div
                        ref={headlineRef}
                        className="md:absolute md:inset-0 md:flex md:flex-col md:justify-center"
                      >
                        <h1
                          className="text-[clamp(42px,6vw,72px)] font-normal tracking-[-0.055em] text-[--ink] m-0 mb-1.5 leading-[0.92]"
                          style={{
                            fontFamily:
                              "var(--font-libre), Baskerville, 'Times New Roman', serif",
                          }}
                        >
                          Tess
                          <br />
                          Kennedy
                          <br />
                          Hezlep
                        </h1>
                        <p className="text-[13px] tracking-[0.16em] uppercase text-[--body] mt-3">
                          New York, NY
                        </p>
                        <p className="text-[12px] tracking-[0.28em] uppercase text-[--body] mt-1.5">
                          Actor &middot; Writer &middot; Devoted Hostess
                        </p>
                      </div>

                      {/* Layer 2: Bio (hidden on load, fades in on scroll) — desktop only overlay */}
                      <div
                        ref={bioRef}
                        className="mt-6 md:mt-0 md:absolute md:inset-0 md:flex md:flex-col md:justify-center md:opacity-0"
                      >
                        <div className="text-[17px] md:text-[18px] leading-[1.75] text-[--body] max-w-[500px] mx-auto md:mx-0 text-left space-y-4">
                          <p>
                            Tess is an actress and writer from southern California.
                            She currently lives in Brooklyn. Her play, &ldquo;My
                            Mother Tap Dancing on Acid&rdquo; is currently in its
                            workshop process&hellip;
                          </p>
                          <p>
                            She has exquisite taste, and frequently hosts really
                            fabulous dinner parties, where she brings together an
                            unlikely crew of personalities and sensibilities.
                            &ldquo;People typically leave feeling like they&apos;ve
                            made a new friend,&rdquo; wrote George Wildridge, a
                            culture critic and writer at the New York Times.
                          </p>
                          <p>
                            She used to be a dilettante, but has recently rebranded
                            as a renaissance woman.
                          </p>
                          <p>
                            She studied theater and narrative studies at University
                            of Southern California, and graduated from Chapman
                            University with a BFA in creative writing.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="max-w-[1120px] mx-auto px-5 py-16">
              <p className="italic text-[12.5px] tracking-[0.22em] uppercase text-[--muted] mb-5 text-center">
                &mdash; Gallery &mdash;
              </p>
              <div className="gallery-grid">
                {[
                  { src: "/images/gallery-01.jpg", alt: "Tess Hezlep at Fanelli's" },
                  { src: "/images/gallery-02.jpg", alt: "Editorial shoot" },
                  { src: "/images/gallery-03.jpg", alt: "Rooftop portrait" },
                  { src: "/images/gallery-04.jpg", alt: "Tess in NYC" },
                  { src: "/images/gallery-05.jpg", alt: "Fanelli Cafe, New York" },
                  { src: "/images/gallery-06.jpg", alt: "Tess at Fanelli's" },
                  { src: "/images/gallery-07.jpg", alt: "In the park" },
                  { src: "/images/gallery-08.jpg", alt: "Strawberry detail" },
                  { src: "/images/gallery-09.jpg", alt: "Little Tess" },
                  { src: "/images/gallery-10.jpg", alt: "Car window reflection" },
                  { src: "/images/gallery-11.jpg", alt: "Friends in the park" },
                  { src: "/images/gallery-12.jpg", alt: "Paris cafe" },
                ].map((img) => (
                  <Image
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={900}
                    className="w-full block mb-3 border border-[--rule] cursor-zoom-in hover:opacity-90 transition-opacity"
                    sizes="(max-width: 440px) 100vw, (max-width: 800px) 50vw, 33vw"
                    onClick={() => setLightboxSrc(img.src)}
                  />
                ))}
              </div>

              {/* Interviews */}
              <div className="mt-16">
                <p className="italic text-[12.5px] tracking-[0.22em] uppercase text-[--muted] mb-5 text-center">
                  &mdash; Interviews &mdash;
                </p>
                <div className="max-w-[800px] mx-auto space-y-4">
                  <iframe
                    style={{ borderRadius: "12px" }}
                    src="https://open.spotify.com/embed/show/2g6xpGERssgYAX0uMgK9zl?utm_source=generator&theme=0"
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="Burn the It Girl on Spotify"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ ACTING ============ */}
        {activePage === "acting" && (
          <div className="page-enter">
            <div className="max-w-[720px] mx-auto px-6 py-16 md:py-20">
              <h2
                className="text-[clamp(38px,7vw,58px)] font-normal italic text-[--ink] text-center mb-7 leading-none tracking-[-0.04em]"
                style={{
                  fontFamily:
                    "var(--font-libre), Baskerville, Georgia, serif",
                }}
              >
                Acting
              </h2>

              {/* Theatre Credits */}
              <h3 className="text-[22px] font-medium italic text-[--ink] mt-8 mb-3">
                Selected Theatre
              </h3>
              <div>
                {[
                  { title: "Our Town", role: "Emily", place: "Sage Hill School" },
                  {
                    title: "Pericles",
                    role: "Marina",
                    place: "University of Southern California",
                  },
                  {
                    title: "Pride & Prejudice",
                    role: "Mrs. Bennet",
                    place: "University of Southern California",
                  },
                  {
                    title: "The Good Doctor",
                    role: "Sexton",
                    place: "University of Southern California",
                  },
                  {
                    title: "Noises Off",
                    role: "Poppy Norton-Taylor",
                    place: "Sage Hill School",
                  },
                ].map((c) => (
                  <div key={c.title} className="credit-row">
                    <span className="text-[--ink] italic">{c.title}</span>
                    <span className="text-[--body]">{c.role}</span>
                    <span className="text-[--muted] text-[15px] text-right max-sm:text-left max-sm:text-[14px]">
                      {c.place}
                    </span>
                  </div>
                ))}
              </div>

              {/* Film Credits */}
              <h3 className="text-[22px] font-medium italic text-[--ink] mt-8 mb-3">
                Selected Film
              </h3>
              <div>
                {[
                  {
                    title: "Hope is Crying",
                    role: "Robbie",
                    place: "University of Southern California",
                  },
                  {
                    title: "Paintscapades",
                    role: "Short Film",
                    place: "Chapman University",
                  },
                  {
                    title: "Green Tomato",
                    role: "Student Film",
                    place: "Chapman University",
                  },
                ].map((c) => (
                  <div key={c.title} className="credit-row">
                    <span className="text-[--ink] italic">{c.title}</span>
                    <span className="text-[--body]">{c.role}</span>
                    <span className="text-[--muted] text-[15px] text-right max-sm:text-left max-sm:text-[14px]">
                      {c.place}
                    </span>
                  </div>
                ))}
              </div>

              {/* Training */}
              <h3 className="text-[22px] font-medium italic text-[--ink] mt-8 mb-3">
                Training
              </h3>
              <ul className="list-none m-0 p-0">
                {[
                  { text: "T. Schreiber Studio, New York", bold: true },
                  { text: "Advanced Shakespeare \u2014 Page Clements" },
                  {
                    text: "Create Your Own Work Fellowship \u2014 Rivka Rivera",
                  },
                  { text: "\u201CThe Method\u201D Acting Intensive \u2014 David Gideon" },
                  { text: "Columbia University, Writing for Film, Theater, & Television Workshop" },
                  { text: "Advanced Improv Inc. \u2014 Chapman University" },
                ].map((t) => (
                  <li
                    key={t.text}
                    className={`py-2 ${
                      t.bold ? "font-medium text-[--ink]" : "text-[--body]"
                    }`}
                  >
                    {t.text}
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-5 border border-[--rule] bg-[--veil] italic">
                For current casting materials, photos, and additional details,
                view Tess&apos;s{" "}
                <a
                  href="https://www.backstage.com/u/tess-hezlep/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[--red] border-b border-[--red]/30 hover:border-[--red] no-underline"
                >
                  Backstage profile
                </a>
                .
              </div>
            </div>
          </div>
        )}

        {/* ============ WRITING ============ */}
        {activePage === "writing" && (
          <div className="page-enter">
            <div className="max-w-[720px] mx-auto px-6 py-16 md:py-20">
              <h2
                className="text-[clamp(38px,7vw,58px)] font-normal italic text-[--ink] text-center mb-7 leading-none tracking-[-0.04em]"
                style={{
                  fontFamily:
                    "var(--font-libre), Baskerville, Georgia, serif",
                }}
              >
                Writing
              </h2>

              <ul className="list-none p-0 m-0 text-center">
                {["Plays", "Essays", "Short Stories"].map((g) => (
                  <li
                    key={g}
                    className="text-[20px] italic text-[--body] py-1.5"
                  >
                    {g}
                  </li>
                ))}
                <li className="text-[15px] text-[--muted] mt-3">
                  &mdash; selected work available upon request &mdash;
                </li>
              </ul>

              <div className="mt-8 p-5 border border-[--rule] bg-[--veil] italic">
                Tess is also on{" "}
                <a
                  href="https://substack.com/@tess514709"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[--red] border-b border-[--red]/30 hover:border-[--red] no-underline"
                >
                  Substack
                </a>
                .
              </div>
            </div>
          </div>
        )}

        {/* ============ CONTACT ============ */}
        {activePage === "contact" && (
          <div className="page-enter">
            <div className="max-w-[720px] mx-auto px-6 py-16 md:py-20">
              <h2
                className="text-[clamp(38px,7vw,58px)] font-normal italic text-[--ink] text-center mb-7 leading-none tracking-[-0.04em]"
                style={{
                  fontFamily:
                    "var(--font-libre), Baskerville, Georgia, serif",
                }}
              >
                Contact
              </h2>

              <p className="text-center italic text-[--muted] text-[16px] mb-6">
                For acting, writing, collaborations&hellip; or to simply befriend me:
              </p>

              <div className="grid gap-3 max-w-[390px] mx-auto text-center">
                {[
                  {
                    href: "mailto:tesshezlep@gmail.com",
                    label: "tesshezlep@gmail.com",
                  },
                  {
                    href: "https://www.instagram.com/medicine_babyy/",
                    label: "Instagram \u00B7 @medicine_babyy",
                    external: true,
                  },
                  {
                    href: "https://www.backstage.com/u/tess-hezlep/",
                    label: "Backstage Profile",
                    external: true,
                  },
                  {
                    href: "https://substack.com/@tess514709",
                    label: "Substack",
                    external: true,
                  },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="border border-[--rule] py-3 px-4 bg-[--veil] italic text-[--ink] no-underline hover:border-[--red] hover:bg-white/60 transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="py-6 px-4 text-[13px] text-[--muted] text-center italic border-t border-[--rule]">
        &copy; {new Date().getFullYear()} Tess Kennedy Hezlep
      </footer>

      {/* ============ LIGHTBOX ============ */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 bg-[rgba(30,25,20,0.93)] z-50 flex items-center justify-center cursor-zoom-out p-6"
          onClick={() => setLightboxSrc(null)}
          onKeyDown={(e) => e.key === "Escape" && setLightboxSrc(null)}
        >
          <Image
            src={lightboxSrc}
            alt="Expanded gallery image"
            width={1200}
            height={1800}
            className="max-w-[92%] max-h-[92vh] w-auto h-auto object-contain border border-white/15"
          />
        </div>
      )}
    </>
  );
}
