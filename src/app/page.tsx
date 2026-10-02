import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="afterHero" id="treatments" aria-label="Introduction">
        <p className="kicker">THE GINAMU RITUAL</p>
        <h2>
          Beauty that feels <em>considered.</em>
        </h2>
        <p className="introCopy">
          Skin, body and beauty rituals designed around care, detail and visible
          results — in the heart of Westlands.
        </p>
      </section>
    </main>
  );
}
