import { useState, useRef, useCallback } from "react";

const BASE = "https://statics3.promeai.pro/cutout-next/virtual-try-on/";

const galleryItems = [
  { id: 1, prompt: "Have the model change into a pure cotton white printed T-shirt, loose fit, hem naturally draping at hip level, cotton fabric texture clear, casual and comfortable." },
  { id: 2, prompt: "Have the model put on a washed blue denim jacket, white undershirt inside, jacket open, metal buttons reflecting clearly, crisp denim texture." },
  { id: 3, prompt: "Have the model change into a gray hoodie, hood naturally hanging behind, cuffs slightly bunched, pure cotton fabric's thickness and softness realistically restored." },
  { id: 4, prompt: "Have the model wear a blue and white vertical striped oxford shirt, collar slightly open, sleeves rolled to elbows, hem naturally draping, showcasing casual lifestyle feel." },
  { id: 5, prompt: "Have the model change into a beige chunky knit cardigan, V-neck design, large button details, yarn fluffy and soft, showcasing warm autumn atmosphere." },
  { id: 6, prompt: "Have the model wear a purple fitted mock neck base layer, perfectly hugging body curves, modal fabric's matte texture, minimalist and sophisticated." },
  { id: 7, prompt: "Have the model change into a red and black flannel plaid shirt, worn open with T-shirt underneath, fabric surface with slight brushed texture, American retro style." },
  { id: 8, prompt: "Have the model wear a dark navy blue polo shirt, pique mesh fabric details clear, collar crisp, sleeves moderately wrapping arm muscles." },
  { id: 9, prompt: "Have the model change into a silk satin camisole, champagne gold, thin straps, fabric showing silky sheen in sunlight, cool summer feel." },
  { id: 10, prompt: "Have the model wear a multi-pocket utility vest, khaki, zipper and buckle details abundant, fabric stiff and durable, outdoor functional style." },
  { id: 11, prompt: "Have the model change into a sharply tailored black blazer, peak lapel design, shoulder lines crisp, showcasing workplace elite's capable aura." },
  { id: 12, prompt: "Have the model wear a high-count cotton white dress shirt, wrinkle-free, collar buttoned, hem neatly tucked into waistband, exuding professional rigor." },
  { id: 13, prompt: "Have the model change into a gray wool business suit set, including fitted blazer and knee-length pencil skirt, delicate fabric, showcasing professional woman's curves." },
  { id: 14, prompt: "Have the model wear a Chanel-style tweed jacket, black and white woven texture, metal button decoration, edge fringe details, socialite style." },
  { id: 15, prompt: "Have the model wear a camel double-faced cashmere coat, wide lapel design, dropped shoulder style, fabric surface with delicate fleece feel, warm and luxurious." },
  { id: 16, prompt: "Have the model change into a dark gray pinstriped suit vest, tailored fit, back adjustment buckle details, retro gentleman feel." },
  { id: 17, prompt: "Have the model change into a light gray pure cotton sweatsuit set (top + shorts), loose comfortable fit, casual homewear style." },
  { id: 18, prompt: "Have the model change into a brown teddy bear fleece coat, textured fleece clearly thick and heavy, looking very warm and cute." },
  { id: 19, prompt: "Have the model wear a purple functional windbreaker, with reflective strips and multiple ribbon designs, waterproof fabric texture, avant-garde tech feel." },
  { id: 20, prompt: "Have the model change into a red floral French tea dress, V-neck puff sleeves, cinched waist design, chiffon fabric light and flowing." },
  { id: 21, prompt: "Have the model wear dark blue denim overalls, striped T-shirt inside, metal strap buckle details, casual workwear style." },
  { id: 22, prompt: "Have the model change into a black lace sheer top, delicate floral texture, skin faintly visible, mysterious and charming." },
  { id: 23, prompt: "Have the model wear a rainbow tie-dye T-shirt, oversized fit, color bleeding natural, full street trend feel." },
  { id: 24, prompt: "Model wearing a glossy white short puffer jacket, filling full and fluffy, like bread, nylon fabric reflecting softly." },
  { id: 25, prompt: "Have the model change into an American varsity jacket, deep blue wool body with white leather sleeves, letter embroidery on chest, youthful campus style." },
  { id: 26, prompt: "Have the model wear a fluorescent yellow quick-dry running T-shirt, fabric lightweight and fitted, with reflective strip design, full of energy." },
  { id: 27, prompt: "Have the model change into a blue retro one-piece swimsuit, high-cut design, fabric tight and smooth, showcasing healthy beauty." },
  { id: 28, prompt: "Have the model wear a white linen shirt, two buttons undone, sleeves rolled up, fabric breathable with natural wrinkles." },
];

const scenarios = [
  {
    title: "Seasonal Promotions: Summer Island & Vacation Vibes",
    desc: "The AI model automatically adds strong top lighting effects to the model, simulating the hard light texture unique to beaches, while generating natural sunscreen oil sheen on the skin. The blue sky and white clouds in the background create a strong contrast with the product's vibrant colors, greatly stimulating consumers' vacation shopping impulse.",
    img1: "29-1.jpg", img2: "29-2.jpg", result: "result29.jpg",
  },
  {
    title: "Off-Season Testing & Pre-sales",
    desc: "No need to wait for sample garments to be completed. Use design drawings or initial sample images with prompts to generate high-quality on-body photos, test market reactions on social media in advance, and decide production quantities based on click-through rates, greatly reducing inventory risk.",
    img1: "30-1.jpg", img2: "30-2.jpg", result: "result30.jpg",
  },
  {
    title: "Influencer Street Style & OOTD",
    desc: "Simulate the hottest casual snapshot style on social media. AI automatically adds natural walking wrinkles to clothing and adjusts lighting to simulate outdoor natural light. This highly humanized and lifestyle-oriented photo typically has higher click-through rates and social engagement than refined studio photos.",
    img1: "31-1.jpg", img2: "31-2.jpg", result: "result31.jpg",
  },
  {
    title: "Surrealist Artistic Concepts",
    desc: "Elevate virtual try-on to artistic creation. The AI model seamlessly merges models with completely fictional artistic scenes, creating visual spectacles that traditional photography cannot achieve. These highly eye-catching images are perfect for brand website hero images or Instagram brand image films.",
    img1: "32-1.jpg", img2: "32-2.jpg", result: "result32.jpg",
  },
];

const whyItems = [
  {
    icon: "💰",
    title: "Ultimate Cost Control",
    desc: "Traditional clothing commercial photography involves: model fees ($100–500/hour), photographers, makeup artists, studio rental, and post-production retouching. With Cutout.pro, costs are only 1/10 or even lower than traditional photography. Upload images, enter prompts, and get results in seconds.",
  },
  {
    icon: "⚡",
    title: "All-in-One Model Aggregation",
    desc: "Cutout.pro aggregates multiple cutting-edge generative models in the background. The system intelligently dispatches the most suitable model based on your prompts and image types—whether you need high-precision face-swapping or highly creative outfit changing, enjoy industry-leading technology in one interface.",
  },
  {
    icon: "🚀",
    title: "Shortened New Product Launch Cycle",
    desc: "Traditional photography and retouching cycles usually take 1–2 weeks. Cutout.pro shortens this to 1–2 minutes. Designers create in the morning, operations generate posters and test listings in the afternoon. This ultimate agility lets you keep up with micro-trends on TikTok or Instagram.",
  },
  {
    icon: "🎯",
    title: "Physical Realism Rivaling Real Photography",
    desc: "Cutout.pro's algorithm deeply understands the physical relationship between light and objects. When you change the model's pose or ambient lighting through prompts, the wrinkles, shadow casting, and material reflections on clothing automatically adjust accordingly—effectively reducing return rates caused by image distortion.",
  },
];

function CompareCard({ item }) {
  const [sliderX, setSliderX] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setSliderX(pct);
  }, []);

  const handleMouseMove = (e) => { if (isDragging) handleMove(e.clientX); };
  const handleMouseDown = (e) => { setIsDragging(true); handleMove(e.clientX); };
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchMove = (e) => handleMove(e.touches[0].clientX);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, borderRadius: 12, overflow: "hidden", border: "1px solid var(--color-border-tertiary)", background: "var(--color-background-primary)" }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchStart={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleMouseUp}
        style={{ position: "relative", aspectRatio: "3/4", cursor: "ew-resize", userSelect: "none", overflow: "hidden" }}
      >
        {/* After image (right side) */}
        <img
          src={`${BASE}result${item.id}.jpg`}
          alt={`After ${item.id}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          draggable={false}
        />
        {/* Before image (left side, clipped) */}
        <div style={{ position: "absolute", inset: 0, width: `${sliderX}%`, overflow: "hidden" }}>
          <img
            src={`${BASE}${item.id}.jpg`}
            alt={`Before ${item.id}`}
            style={{ position: "absolute", inset: 0, width: `${10000 / sliderX}%`, maxWidth: "none", height: "100%", objectFit: "cover" }}
            draggable={false}
          />
        </div>
        {/* Divider line */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${sliderX}%`, width: 2, background: "white", transform: "translateX(-50%)", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 28, height: 28, borderRadius: "50%", background: "white", boxShadow: "0 1px 6px rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M4 7H10M4 7L2 5M4 7L2 9M10 7L12 5M10 7L12 9" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        {/* Labels */}
        <span style={{ position: "absolute", top: 8, left: 8, fontSize: 11, fontWeight: 600, color: "white", background: "rgba(0,0,0,0.55)", padding: "2px 7px", borderRadius: 4, pointerEvents: "none", opacity: sliderX > 20 ? 1 : 0, transition: "opacity 0.2s" }}>BEFORE</span>
        <span style={{ position: "absolute", top: 8, right: 8, fontSize: 11, fontWeight: 600, color: "white", background: "rgba(0,0,0,0.55)", padding: "2px 7px", borderRadius: 4, pointerEvents: "none", opacity: sliderX < 80 ? 1 : 0, transition: "opacity 0.2s" }}>AFTER</span>
      </div>
      <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
        <p style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5, margin: 0 }}>{item.prompt}</p>
        <button
          onClick={handleCopy}
          style={{ fontSize: 12, color: copied ? "var(--color-text-success)" : "var(--color-text-info)", background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}
        >
          {copied ? "✓ Copied!" : "Copy prompt"}
        </button>
      </div>
    </div>
  );
}

export default function VirtualTryOnPage() {
  return (
    <div style={{ fontFamily: "var(--font-sans)", color: "var(--color-text-primary)", maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>

      {/* ── Gallery Section ── */}
      <section style={{ padding: "64px 0 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <h2 style={{ fontSize: 28, fontWeight: 500, margin: "0 0 10px" }}>Ultimate Realism: AI Virtual Try-On Gallery</h2>
          <p style={{ fontSize: 15, color: "var(--color-text-secondary)", margin: 0, maxWidth: 580, marginInline: "auto" }}>
            From prompt to pixel-perfect reality — breaking the virtual-real boundary and redefining "what you see is what you get" visual standards
          </p>
          <p style={{ fontSize: 13, color: "var(--color-text-tertiary)", margin: "8px 0 0", fontStyle: "italic" }}>Drag the slider on each card to reveal Before / After</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16, marginTop: 32 }}>
          {galleryItems.map((item) => (
            <CompareCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "0.5px solid var(--color-border-tertiary)", margin: 0 }} />

      {/* ── Scenarios Section ── */}
      <section style={{ padding: "64px 0 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 28, fontWeight: 500, margin: "0 0 10px" }}>Limitless Scenarios, Infinite Creativity</h2>
          <p style={{ fontSize: 15, color: "var(--color-text-secondary)", margin: 0 }}>
            Unlock Multi-Dimensional AI Model Applications — break free from traditional photography constraints
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
          {scenarios.map((s, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 40,
                alignItems: "center",
              }}
            >
              {/* Images side */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto auto", gap: 8 }}>
                <img
                  src={`${BASE}${s.img1}`}
                  alt={`${s.title} input 1`}
                  style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", borderRadius: 10, border: "0.5px solid var(--color-border-tertiary)" }}
                />
                <img
                  src={`${BASE}${s.img2}`}
                  alt={`${s.title} input 2`}
                  style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", borderRadius: 10, border: "0.5px solid var(--color-border-tertiary)" }}
                />
                <img
                  src={`${BASE}${s.result}`}
                  alt={`${s.title} result`}
                  style={{ gridColumn: "1 / -1", width: "100%", aspectRatio: "16/9", objectFit: "cover", borderRadius: 10, border: "0.5px solid var(--color-border-tertiary)" }}
                />
              </div>

              {/* Text side */}
              <div style={{ padding: "0 8px" }}>
                <div style={{ display: "inline-block", fontSize: 12, fontWeight: 500, color: "var(--color-text-info)", background: "var(--color-background-info)", padding: "3px 10px", borderRadius: 20, marginBottom: 14 }}>
                  Scenario {i + 1}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 14px", lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "0.5px solid var(--color-border-tertiary)", margin: 0 }} />

      {/* ── Why Section ── */}
      {/* <section style={{ padding: "64px 0 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 28, fontWeight: 500, margin: "0 0 10px" }}>
            Why Cutout.pro is the Ultimate Cost-Reduction Tool for E-commerce Sellers?
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 20 }}>
          {whyItems.map((item, i) => (
            <div
              key={i}
              style={{
                background: "var(--color-background-primary)",
                border: "0.5px solid var(--color-border-tertiary)",
                borderRadius: 14,
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <h3 style={{ fontSize: 16, fontWeight: 500, margin: 0 }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section> */}

    </div>
  );
}