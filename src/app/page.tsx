"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

type Page = "home" | "acting" | "writing" | "contact";

export default function Home() {
  const [activePage, setActivePage] = useState<Page>("home");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const go = useCallback((page: Page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* ============ TOPBAR ============ */}
      <header className="sticky top-0 z-10 flex justify-between items-center gap-5 px-[clamp(1rem,4vw,3rem)] py-4 border-b border-[--rule] bg-[rgba(246,239,228,0.88)] backdrop-blur-[12px]">
        <button
          onClick={() => go("home")}
          className="font-[--font-libre] text-[13px] leading-none tracking-[0.24em] uppercase text-[--ink] cursor-pointer bg-none border-none whitespace-nowrap py-1.5 font-normal"
          style={{ fontFamily: "var(--font-libre), Baskerville, Georgia, serif" }}
        >
          Tess Hezlep
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

          {/* Social links in nav */}
          <span className="hidden md:inline text-[--rule] select-none">|</span>
          <a
            href="https://www.instagram.com/medicine_babyy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] tracking-[0.1em] text-[--muted] hover:text-[--ink] transition-colors no-underline border-none"
          >
            ig
          </a>
          <a
            href="https://www.backstage.com/u/tess-hezlep/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] tracking-[0.1em] text-[--muted] hover:text-[--ink] transition-colors no-underline border-none"
          >
            backstage
          </a>
          <a
            href="https://substack.com/@tess514709"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] tracking-[0.1em] text-[--muted] hover:text-[--ink] transition-colors no-underline border-none"
          >
            substack
          </a>
        </nav>
      </header>

      <main className="flex-1 min-h-[70vh]">
        {/* ============ HOME ============ */}
        {activePage === "home" && (
          <div className="page-enter">
            <div className="max-w-[1120px] mx-auto px-5 py-14 md:py-16">
              {/* Hero */}
              <div className="grid md:grid-cols-[minmax(260px,410px)_minmax(0,1fr)] gap-[clamp(2rem,5vw,5rem)] items-center">
                {/* Portrait */}
                <div className="relative max-w-[250px] md:max-w-none mx-auto md:mx-0">
                  <div className="absolute inset-[18px_-18px_-18px_18px] bg-[--rose] -z-10 opacity-40" />
                  <div className="relative aspect-[4/5.15] w-full overflow-hidden border border-[--rule] shadow-[0_22px_55px_rgba(36,27,22,0.13)]">
                    <Image
                      src="/images/hero.jpg"
                      alt="Tess Hezlep"
                      fill
                      priority
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 250px, 410px"
                    />
                  </div>
                </div>

                {/* Copy */}
                <div className="text-center md:text-left">
                  <p className="text-[12px] tracking-[0.28em] uppercase text-[--red] mb-4">
                    Actor &middot; Writer &middot; Devoted Hostess
                  </p>
                  <h1
                    className="text-[clamp(54px,8.8vw,104px)] font-normal tracking-[-0.055em] text-[--ink] m-0 mb-1.5 leading-[0.92]"
                    style={{
                      fontFamily:
                        "var(--font-libre), Baskerville, 'Times New Roman', serif",
                    }}
                  >
                    Tess
                    <br />
                    Hezlep
                  </h1>
                  <p className="text-[13px] tracking-[0.16em] uppercase text-[--muted] mt-2 mb-5">
                    Based in New York
                  </p>

                  <div className="text-[17px] md:text-[18px] leading-[1.75] text-[--body] max-w-[500px] mx-auto md:mx-0 text-left space-y-4">
                    <p>
                      I&apos;m an actress and writer from southern California. I
                      currently live in Brooklyn. My play, &ldquo;My Mother Tap
                      Dancing on Acid&rdquo; is currently in its workshop
                      process&hellip;
                    </p>
                    <p>
                      I&apos;m confused a lot of the time, but I have exquisite
                      taste and know how to host a really fabulous party, where I
                      bring together a versatile spread of personalities and
                      sensibilities. I treasure my acting class, my friendships,
                      and my boyfriend, George. I also love eating alone at
                      restaurants, the film &ldquo;La Chimera,&rdquo; being
                      disarming, and a good sweat&ndash;yes, I love pilates and
                      hot yoga and have zero shame about this.
                    </p>
                    <p>
                      I used to be a dilettante, but have recently rebranded as a
                      renaissance woman.
                    </p>
                    <p>
                      I studied theater and narrative studies at University of
                      Southern California, and graduated from Chapman University
                      with a BFA in creative writing. I currently train with David
                      Gideon in New York City.
                    </p>
                  </div>

                  <div className="flex gap-3 flex-wrap mt-5 justify-center md:justify-start">
                    <button
                      onClick={() => go("acting")}
                      className="border border-[--rule] rounded-full px-4 py-2 text-[14px] italic bg-white/25 text-[--ink] cursor-pointer hover:border-[--red] hover:bg-white/40 transition-all"
                    >
                      Acting
                    </button>
                    <button
                      onClick={() => go("writing")}
                      className="border border-[--rule] rounded-full px-4 py-2 text-[14px] italic bg-white/25 text-[--ink] cursor-pointer hover:border-[--red] hover:bg-white/40 transition-all"
                    >
                      Writing
                    </button>
                    <a
                      href="https://www.backstage.com/u/tess-hezlep/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[--rule] rounded-full px-4 py-2 text-[14px] italic bg-white/25 text-[--ink] no-underline hover:border-[--red] hover:bg-white/40 transition-all"
                    >
                      Backstage
                    </a>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div className="mt-16">
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

                {/* Reel */}
                <div className="mt-16">
                  <p className="italic text-[12.5px] tracking-[0.22em] uppercase text-[--muted] mb-5 text-center">
                    &mdash; Reel &mdash;
                  </p>
                  <div className="relative aspect-video w-full max-w-[800px] mx-auto border border-[--rule] bg-[--paper-deep] flex items-center justify-center">
                    <p className="text-[--muted] italic text-[15px]">
                      Compilation reel coming soon
                    </p>
                  </div>
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
        &copy; {new Date().getFullYear()} Tess Hezlep
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
