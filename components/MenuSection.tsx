"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { menuData, type MenuCategory, type MenuItem } from "@/lib/menuData";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface CartItem {
  name: string;
  price: string;
  qty: number;
  removed: string[];
  combo: boolean;
  comboDrink?: string;
  comboSauce?: string;
}

interface CustomerInfo {
  name: string;
  phone: string;
  location: string;
}

export default function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState("starters");
  const itemsRef = useRef<HTMLDivElement>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Item customization modal
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const [removed, setRemoved] = useState<string[]>([]);
  const [addCombo, setAddCombo] = useState(false);
  const [comboDrink, setComboDrink] = useState("");
  const [comboSauce, setComboSauce] = useState("");

  const comboDrinks = ["Pepsi", "Pepsi Diet", "7UP", "7UP Diet", "Miranda", "Ice Tea Peach", "Rim Sparkling Water"];
  const comboSauces = ["Buffalo", "BBQ", "Cheddar"];
  const comboCategories = ["sandwiches", "wraps", "kaaek", "salads"];

  // Checkout modal
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customer, setCustomer] = useState<CustomerInfo>({ name: "", phone: "+961 ", location: "" });

  const activeCategory: MenuCategory =
    menuData.find((c) => c.id === activeTab) ?? menuData[0];

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + (parseFloat(i.price) + (i.combo ? 5 : 0)) * i.qty, 0);

  // Open item modal
  const openItem = (item: MenuItem) => {
    setModalItem(item);
    setRemoved([]);
    setAddCombo(false);
    setComboDrink("");
    setComboSauce("");
  };

  // Toggle ingredient removal
  const toggleIngredient = (ing: string) => {
    setRemoved((prev) =>
      prev.includes(ing) ? prev.filter((x) => x !== ing) : [...prev, ing]
    );
  };

  // Add to cart from modal
  const confirmAdd = useCallback(() => {
    if (!modalItem) return;
    setCart((prev) => {
      const key = modalItem.name;
      const existing = prev.find((i) => i.name === key);
      if (existing) {
        return prev.map((i) =>
          i.name === key ? { ...i, qty: i.qty + 1, removed } : i
        );
      }
      return [...prev, { name: key, price: modalItem.price, qty: 1, removed: [...removed], combo: addCombo, comboDrink: addCombo ? comboDrink : undefined, comboSauce: addCombo ? comboSauce : undefined }];
    });
    setModalItem(null);
  }, [modalItem, removed, addCombo, comboDrink, comboSauce]);

  // Remove one from cart
  const removeFromCart = useCallback((name: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === name);
      if (!existing) return prev;
      if (existing.qty === 1) return prev.filter((i) => i.name !== name);
      return prev.map((i) => i.name === name ? { ...i, qty: i.qty - 1 } : i);
    });
  }, []);

  const getQty = (name: string) => cart.find((i) => i.name === name)?.qty ?? 0;

  // Send to WhatsApp
  const sendWhatsApp = () => {
    if (!customer.name.trim() || !customer.phone.trim() || !customer.location.trim()) return;
    const lines = cart.map((i) => {
      const itemTotal = (parseFloat(i.price) + (i.combo ? 5 : 0)) * i.qty;
      let base = `• ${i.qty}x ${i.name} — $${itemTotal.toFixed(2)}`;
      if (i.combo) base += `\n  🍟 + Combo (Fries, ${i.comboDrink || "Soft Drink"}, 3 Tenders, ${i.comboSauce || "Sauce"} Sauce)`;
      if (i.removed.length > 0) base += `\n  ❌ Remove: ${i.removed.join(", ")}`;
      return base;
    });
    const message = [
      "Hello Mayel! 🍔",
      "",
      `👤 Name: ${customer.name}`,
      `📞 Phone: ${customer.phone}`,
      `📍 Location: ${customer.location}`,
      "",
      "Here's my order:",
      "",
      lines.join("\n\n"),
      "",
      `💰 Total: $${totalPrice.toFixed(2)}`,
      "",
      "Please confirm my order! 🙏",
    ].join("\n");
    window.open(`https://wa.me/96179316188?text=${encodeURIComponent(message)}`, "_blank");
    setCheckoutOpen(false);
  };

  // Listen for gallery tab navigation
  useEffect(() => {
    const handler = (e: Event) => {
      const tab = (e as CustomEvent).detail;
      if (tab) setActiveTab(tab);
    };
    window.addEventListener("setMenuTab", handler);
    return () => window.removeEventListener("setMenuTab", handler);
  }, []);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".menu-section-label", {
        opacity: 0, y: 20, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: ".menu-section-label", start: "top 88%" },
      });
      gsap.from(".menu-section-heading", {
        opacity: 0, y: 30, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".menu-section-heading", start: "top 88%" },
      });
      gsap.from(".menu-tabs-wrap", {
        opacity: 0, y: 20, duration: 0.6,
        scrollTrigger: { trigger: ".menu-tabs-wrap", start: "top 90%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!itemsRef.current) return;
    itemsRef.current.style.opacity = "0";
    const t = requestAnimationFrame(() => {
      if (itemsRef.current) itemsRef.current.style.opacity = "1";
    });
    return () => cancelAnimationFrame(t);
  }, [activeTab]);

  const ingredients = modalItem?.desc
    ? modalItem.desc.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <>
    <section ref={sectionRef} id="menu" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(24,112,184,0.05) 0%, transparent 60%)" }} />

      {/* Marquee */}
      <div className="overflow-hidden mb-12 border-y border-dark-border py-3">
        <div className="marquee-track">
          {Array(8).fill(null).map((_, i) => (
            <span key={i} className="text-dark-border font-black uppercase tracking-widest mx-6 select-none"
              style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem" }}>
              MAYEL MENU &nbsp;·&nbsp; ORDER · EAT · REPEAT &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 max-w-lg mx-auto">
        <div className="menu-section-label flex items-center gap-3 mb-5">
          <div className="gold-divider" />
          <span className="section-label">The Menu</span>
        </div>

        <h2 className="menu-section-heading section-title mb-10">
          What are you<br />
          <span className="italic text-brand-blue">craving?</span>
        </h2>

        {/* Tabs */}
        <div className="menu-tabs-wrap mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {menuData.map((cat) => (
              <button key={cat.id} onClick={() => setActiveTab(cat.id)}
                className={`menu-tab flex-shrink-0 ${activeTab === cat.id ? "active" : ""}`}
                style={{ touchAction: "manipulation" }}>
                <span className="mr-1.5">{cat.icon}</span>{cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Items */}
        <div ref={itemsRef} className="space-y-3" style={{ transition: "opacity 0.15s" }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{activeCategory.icon}</span>
            <div>
              <h3 className="text-cream font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                {activeCategory.label}
              </h3>
              <p className="text-muted text-xs tracking-wider">{activeCategory.items.length} items</p>
            </div>
          </div>

          {activeCategory.items.map((item, i) => {
            const qty = getQty(item.name);
            return (
              <div
                key={`${activeTab}-${i}`}
                className="menu-item-card"
                style={{ touchAction: "manipulation", cursor: "pointer" }}
                onClick={() => openItem(item)}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-cream font-semibold text-sm leading-tight mb-1">{item.name}</h4>
                    {item.desc && (
                      <p className="text-muted text-xs leading-relaxed line-clamp-2">{item.desc}</p>
                    )}
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
                    <span className="text-brand-gold font-bold text-sm" style={{ fontFamily: "'Raleway', sans-serif" }}>
                      ${item.price}
                    </span>
                    {qty > 0 && (
                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => removeFromCart(item.name)}
                          className="w-7 h-7 rounded-full bg-white/5 border border-white/10 text-cream flex items-center justify-center text-base"
                          style={{ touchAction: "manipulation" }}>−</button>
                        <span className="text-brand-blue font-bold text-sm w-4 text-center">{qty}</span>
                        <button onClick={() => openItem(item)}
                          className="w-7 h-7 rounded-full bg-brand-blue text-white flex items-center justify-center text-base"
                          style={{ touchAction: "manipulation" }}>+</button>
                      </div>
                    )}
                    {qty === 0 && (
                      <div className="w-8 h-8 rounded-full border border-brand-blue/40 text-brand-blue flex items-center justify-center text-lg">
                        +
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-dark-border text-center">
          <p className="text-muted text-xs tracking-wide">All items freshly prepared daily</p>
        </div>
      </div>
    </section>

    {/* ── ITEM CUSTOMIZATION MODAL ── */}
    {modalItem && (
      <div className="fixed inset-0 z-[80] flex items-end" style={{ touchAction: "none" }}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70" onClick={() => setModalItem(null)} />

        {/* Sheet */}
        <div className="relative w-full max-w-lg mx-auto rounded-t-3xl overflow-hidden"
          style={{ background: "linear-gradient(160deg, #0d0e1a 0%, #06070f 100%)", border: "1px solid rgba(24,112,184,0.2)", borderBottom: "none" }}>

          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <div className="px-6 pb-8 pt-3">
            {/* Item header */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex-1">
                <h3 className="text-cream font-bold text-xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {modalItem.name}
                </h3>
                <span className="text-brand-gold font-bold text-lg" style={{ fontFamily: "'Raleway', sans-serif" }}>
                  ${modalItem.price}
                </span>
              </div>
              <button onClick={() => setModalItem(null)}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted"
                style={{ touchAction: "manipulation" }}>✕</button>
            </div>

            {/* Ingredients */}
            {ingredients.length > 0 ? (
              <>
                <p className="text-muted text-xs tracking-widest uppercase mb-3">
                  Tap to remove ingredients
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {ingredients.map((ing) => {
                    const isRemoved = removed.includes(ing);
                    return (
                      <button
                        key={ing}
                        onClick={() => toggleIngredient(ing)}
                        style={{ touchAction: "manipulation" }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 border ${
                          isRemoved
                            ? "bg-red-500/10 border-red-400/40 text-red-400 line-through opacity-60"
                            : "bg-brand-blue/10 border-brand-blue/30 text-cream"
                        }`}
                      >
                        {isRemoved ? "✕ " : ""}{ing}
                      </button>
                    );
                  })}
                </div>
                {removed.length > 0 && (
                  <p className="text-red-400/70 text-xs mb-4">
                    ❌ Removing: {removed.join(", ")}
                  </p>
                )}
              </>
            ) : (
              <p className="text-muted text-sm mb-6">No customizations available for this item.</p>
            )}

            {/* Combo add-on — only for sandwich/wrap/kaaek/salads */}
            {comboCategories.includes(activeTab) && (
              <div className="mb-4">
                <button
                  onClick={() => { setAddCombo(o => !o); setComboDrink(""); setComboSauce(""); }}
                  style={{ touchAction: "manipulation" }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border transition-all duration-150 ${
                    addCombo
                      ? "border-brand-gold/50 bg-brand-gold/10"
                      : "border-white/10 bg-white/3"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🍟</span>
                    <div className="text-left">
                      <p className="text-cream font-semibold text-sm">Add Combo <span className="text-brand-gold font-bold">+$5</span></p>
                      <p className="text-muted text-xs">Fries · Soft Drink · 3 Tenders · Sauce</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                    addCombo ? "bg-brand-gold border-brand-gold text-white" : "border-white/20 text-transparent"
                  }`} style={{ fontSize: "0.7rem" }}>✓</div>
                </button>

                {addCombo && (
                  <div className="mt-3 px-1 space-y-4">
                    {/* Drink picker */}
                    <div>
                      <p className="text-muted text-xs tracking-widest uppercase mb-2">Choose your soft drink</p>
                      <div className="flex flex-wrap gap-2">
                        {comboDrinks.map((drink) => (
                          <button
                            key={drink}
                            onClick={() => setComboDrink(drink)}
                            style={{ touchAction: "manipulation" }}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 border ${
                              comboDrink === drink
                                ? "bg-brand-blue border-brand-blue text-white"
                                : "bg-white/5 border-white/15 text-cream/70"
                            }`}
                          >
                            🥤 {drink}
                          </button>
                        ))}
                      </div>
                      {!comboDrink && <p className="text-brand-gold/70 text-xs mt-1.5">Pick a drink</p>}
                    </div>
                    {/* Sauce picker */}
                    <div>
                      <p className="text-muted text-xs tracking-widest uppercase mb-2">Choose your sauce</p>
                      <div className="flex flex-wrap gap-2">
                        {comboSauces.map((sauce) => (
                          <button
                            key={sauce}
                            onClick={() => setComboSauce(sauce)}
                            style={{ touchAction: "manipulation" }}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 border ${
                              comboSauce === sauce
                                ? "bg-brand-gold border-brand-gold text-white"
                                : "bg-white/5 border-white/15 text-cream/70"
                            }`}
                          >
                            🥫 {sauce}
                          </button>
                        ))}
                      </div>
                      {!comboSauce && <p className="text-brand-gold/70 text-xs mt-1.5">Pick a sauce</p>}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Add button */}
            <button
              onClick={confirmAdd}
              disabled={addCombo && (!comboDrink || !comboSauce)}
              style={{ touchAction: "manipulation", background: "linear-gradient(135deg, #1870b8, #0f4f85)", opacity: (addCombo && (!comboDrink || !comboSauce)) ? 0.4 : 1 }}
              className="w-full py-4 rounded-2xl text-white font-bold text-sm tracking-wide"
            >
              Add to Order — ${addCombo ? (parseFloat(modalItem.price) + 5).toFixed(2) : modalItem.price}
            </button>
          </div>
        </div>
      </div>
    )}

    {/* ── FLOATING CART BAR ── */}
    {totalItems > 0 && !modalItem && !checkoutOpen && (
      <div className="fixed bottom-6 left-4 right-4 z-50 max-w-lg mx-auto">
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(13,14,26,0.98)", border: "1px solid rgba(24,112,184,0.4)", boxShadow: "0 8px 40px rgba(24,112,184,0.25)" }}>

          <button onClick={() => setCartOpen((o) => !o)}
            className="w-full flex items-center justify-between px-5 py-4"
            style={{ touchAction: "manipulation" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center text-white text-xs font-bold">
                {totalItems}
              </div>
              <span className="text-cream font-semibold text-sm">
                {cartOpen ? "Your Order" : `${totalItems} item${totalItems > 1 ? "s" : ""} selected`}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-brand-gold font-bold">${totalPrice.toFixed(2)}</span>
              <span className="text-muted text-xs">{cartOpen ? "▲" : "▼"}</span>
            </div>
          </button>

          {cartOpen && (
            <div className="px-5 pb-3 space-y-2.5 max-h-48 overflow-y-auto border-t border-white/5 pt-3">
              {cart.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => removeFromCart(item.name)}
                          className="w-5 h-5 rounded-full bg-white/5 text-muted flex items-center justify-center text-xs"
                          style={{ touchAction: "manipulation" }}>−</button>
                        <span className="text-cream text-xs font-bold min-w-[14px] text-center">{item.qty}</span>
                        <button onClick={() => openItem({ name: item.name, price: item.price })}
                          className="w-5 h-5 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center text-xs"
                          style={{ touchAction: "manipulation" }}>+</button>
                      </div>
                      <span className="text-cream/80 text-xs truncate">{item.name}</span>
                    </div>
                    <span className="text-brand-gold text-xs font-semibold flex-shrink-0">
                      ${((parseFloat(item.price) + (item.combo ? 5 : 0)) * item.qty).toFixed(2)}
                    </span>
                  </div>
                  {item.removed.length > 0 && (
                    <p className="text-red-400/60 text-[0.6rem] ml-12 mt-0.5">
                      No: {item.removed.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="px-4 pb-4 pt-2">
            <button onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm text-white"
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", touchAction: "manipulation" }}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Order on WhatsApp — ${totalPrice.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    )}

    {/* ── CHECKOUT MODAL ── */}
    {checkoutOpen && (
      <div className="fixed inset-0 z-[80] flex items-end" style={{ touchAction: "none" }}>
        <div className="absolute inset-0 bg-black/70" onClick={() => setCheckoutOpen(false)} />
        <div className="relative w-full max-w-lg mx-auto rounded-t-3xl overflow-hidden"
          style={{ background: "linear-gradient(160deg, #0d0e1a 0%, #06070f 100%)", border: "1px solid rgba(24,112,184,0.2)", borderBottom: "none" }}>

          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <div className="px-6 pb-8 pt-3">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-cream font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Details
              </h3>
              <button onClick={() => setCheckoutOpen(false)}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted"
                style={{ touchAction: "manipulation" }}>✕</button>
            </div>

            <div className="space-y-4 mb-6">
              {/* Name */}
              <div>
                <label className="text-muted text-xs tracking-widest uppercase block mb-1.5">Your Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={customer.name}
                  onChange={(e) => setCustomer((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-xl text-cream text-sm placeholder-muted/40 outline-none focus:border-brand-blue/60"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-muted text-xs tracking-widest uppercase block mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => setCustomer((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-xl text-cream text-sm placeholder-muted/40 outline-none focus:border-brand-blue/60"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
              </div>

              {/* Location */}
              <div>
                <label className="text-muted text-xs tracking-widest uppercase block mb-1.5">Location / Address</label>
                <input
                  type="text"
                  placeholder="Your address"
                  value={customer.location}
                  onChange={(e) => setCustomer((p) => ({ ...p, location: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-xl text-cream text-sm placeholder-muted/40 outline-none focus:border-brand-blue/60"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
              </div>
            </div>

            {/* Order summary */}
            <div className="rounded-xl p-4 mb-5 space-y-1.5"
              style={{ background: "rgba(24,112,184,0.07)", border: "1px solid rgba(24,112,184,0.15)" }}>
              <p className="text-muted text-[0.6rem] tracking-widest uppercase mb-2">Order Summary</p>
              {cart.map((item) => (
                <div key={item.name} className="flex justify-between items-start gap-2">
                  <span className="text-cream/70 text-xs">{item.qty}x {item.name}{item.removed.length > 0 ? ` (no ${item.removed.join(", ")})` : ""}</span>
                  <span className="text-brand-gold text-xs font-semibold flex-shrink-0">${(parseFloat(item.price) * item.qty).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t border-white/5 mt-2">
                <span className="text-cream font-semibold text-sm">Total</span>
                <span className="text-brand-gold font-bold">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={sendWhatsApp}
              disabled={!customer.name.trim() || !customer.phone.trim() || !customer.location.trim()}
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", touchAction: "manipulation", opacity: (!customer.name.trim() || !customer.phone.trim() || !customer.location.trim()) ? 0.5 : 1 }}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm text-white"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Confirm Order on WhatsApp
            </button>

            {(!customer.name.trim() || !customer.phone.trim() || !customer.location.trim()) && (
              <p className="text-muted text-xs text-center mt-3">Please fill in all fields above</p>
            )}
          </div>
        </div>
      </div>
    )}
    </>
  );
}
