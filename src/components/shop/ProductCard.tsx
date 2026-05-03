"use client";
import { useState, useEffect } from "react";
import type { Product, ProductColor, ProductVariant } from "../../../content/shop";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );
  
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes && product.sizes.length === 1 ? product.sizes[0] : null
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  // Reset image index when color changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedColor]);

  // Zoom state for Lightbox
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [loading, setLoading] = useState(false);

  const selectedVariant = product.variants?.find(v => v.size === selectedSize && v.color === selectedColor?.name);
  const displayPrice = selectedVariant?.price || product.price;

  const currentImages: string[] = selectedColor?.images ?? [];
  
  const hasImages = currentImages.length > 0;

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
  };

  const handleCheckout = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    if (product.sizes?.length > 0 && !selectedSize) {
      alert("Bitte wähle zuerst eine Größe aus.");
      return;
    }

    if (!product.stripePriceId) {
      alert("Dieses Produkt ist noch nicht final konfiguriert (Fehlende stripePriceId).");
      return;
    }
    
    // Finde exakte Variante
    let variantId: number | undefined = undefined;
    if (product.variants && selectedColor && selectedSize) {
      const match = product.variants.find(v => v.color === selectedColor.name && v.size === selectedSize);
      if (match) {
        variantId = match.printfulSyncVariantId;
      } else {
        alert("Oh nein! Diese Farb-Größen-Kombination scheint es nicht mehr zu geben.");
        return;
      }
    }
    
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          color: selectedColor?.name,
          size: selectedSize,
          printfulSyncVariantId: variantId,
        }),
      });
      
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; 
      } else {
        alert("Fehler beim Öffnen der Kasse: " + data.error);
        setLoading(false);
      }
    } catch (err) {
      alert("Netzwerkfehler beim Verbinden mit der Kasse.");
      setLoading(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <>
      <div className="rounded-2xl shadow-md overflow-hidden bg-white group flex flex-col h-full border border-sky/10 hover:shadow-xl transition-all duration-300">
        
        {/* Product Image Area */}
        <div
          className="aspect-square relative overflow-hidden bg-white cursor-pointer"
          onClick={() => setLightboxOpen(true)}
          style={undefined}
        >
          {hasImages ? (
            <>
              <img
                src={currentImages[currentImageIndex]}
                alt={`${product.name} Preview`}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              />
              
              {/* Carousel Arrows */}
              {currentImages.length > 1 && (
                <>
                  <button onClick={handlePrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/70 backdrop-blur rounded-full text-ocean opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow">
                    <svg className="w-4 h-4 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button onClick={handleNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/70 backdrop-blur rounded-full text-ocean opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow">
                    <svg className="w-4 h-4 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </>
              )}
            </>
          ) : (
            <span className="flex items-center justify-center h-full text-ocean/40 font-heading text-lg z-10 font-medium tracking-wide">
              Foto kommt bald
            </span>
          )}
        </div>
        {/* Product Info */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="font-heading font-semibold text-ocean text-xl mb-2">
            {product.name}
          </h3>
          
          {/* Colors Selection (Dots) */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <span className="block text-[10px] font-bold text-ocean/50 mb-2 uppercase tracking-wide">Farbe: <span className="text-ocean">{selectedColor?.name}</span></span>
              <div className="flex gap-2 items-center flex-wrap">
                {product.colors.map((c) => (
                  <button 
                    key={c.name} 
                    onClick={(e) => { e.stopPropagation(); setSelectedColor(c); }}
                    className={`w-6 h-6 rounded-full border-2 border-white shadow-sm transition-all duration-200 ${
                      selectedColor?.name === c.name ? "ring-2 ring-offset-1 ring-ocean scale-110" : "ring-1 ring-ocean/20 hover:ring-ocean/50"
                    }`}
                    style={{ backgroundColor: c.hex }} 
                    title={c.name} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes Selection (Square Buttons) */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6 flex-grow">
              <span className="block text-[10px] font-bold text-ocean/50 mb-2 uppercase tracking-wide">Größe: {selectedSize || <span className="text-red-400">Bitte wählen</span>}</span>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => {
                  const variantObj = product.variants?.find(v => v.size === s && v.color === selectedColor?.name);
                  const isOut = variantObj?.isOutOfStock;
                  return (
                    <button
                      key={s}
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        if (!isOut) setSelectedSize(s); 
                      }}
                      disabled={isOut}
                      title={isOut ? "Zurzeit nicht auf Lager" : ""}
                      className={`px-3 py-1 text-sm border font-medium rounded transition-colors ${
                        selectedSize === s 
                        ? "border-ocean bg-ocean text-white" 
                        : isOut
                          ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed line-through relative overflow-hidden"
                          : "border-gray-200 text-gray-500 hover:border-ocean hover:text-ocean"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
          <div className="mt-auto">
            <p className="text-fish-orange font-bold text-xl mb-4">{displayPrice}</p>
            
            {/* Buy Button */}
            {(() => {
              const currentVariant = product.variants?.find(v => v.size === selectedSize && v.color === selectedColor?.name);
              const isOutOfStock = currentVariant?.isOutOfStock;
              const isDisabled = loading || (product.sizes?.length > 0 && !selectedSize) || isOutOfStock;
              
              return (
                <button
                  onClick={handleCheckout}
                  disabled={isDisabled}
                  className={`w-full text-center py-3 rounded-full font-heading font-semibold transition-colors duration-300 flex items-center justify-center gap-2 ${
                    isDisabled
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                      : "bg-sky-light text-ocean hover:bg-sky group-hover:bg-fish-gold group-hover:text-white"
                  }`}
                >
                  {loading ? "Kasse lädt..." : (isOutOfStock ? "Nicht auf Lager" : (product.sizes?.length > 0 && !selectedSize ? "Größe wählen" : "Jetzt einkaufen"))}
                  {!isDisabled && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </button>
              );
            })()}
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-ocean/90 flex items-center justify-center p-4 md:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-6xl w-full h-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Gallery Side */}
            <div className="w-full md:w-[60%] bg-white flex flex-col relative border-r border-gray-100">
              <div className="flex-1 relative flex items-center justify-center min-h-[300px] overflow-hidden">
                {hasImages ? (
                  <>
                    <div 
                      className={`relative w-full h-full flex items-center justify-center overflow-hidden transition-all ${isZoomed ? "cursor-zoom-out bg-white z-20" : ""}`}
                      onMouseMove={isZoomed ? handleMouseMove : undefined}
                      onClick={() => setIsZoomed(!isZoomed)}
                    >
                      <img 
                        src={currentImages[currentImageIndex]} 
                        alt={product.name}
                        className={`max-w-full max-h-full object-contain transition-transform duration-300`}
                        style={isZoomed ? { 
                          transform: "scale(2.5)", 
                          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` 
                        } : { transform: "scale(1)" }}
                      />
                    </div>
                    
                    {/* Zoom Button */}
                    {!isZoomed && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setIsZoomed(true); }}
                        className="absolute bottom-4 right-4 bg-white/80 backdrop-blur text-ocean p-2 rounded-full shadow-md hover:bg-white transition-all z-10"
                        title="Vergrößern"
                      >
                        <svg className="w-5 h-5 text-ocean/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </button>
                    )}
                  
                  {currentImages.length > 1 && !isZoomed && (
                    <>
                      <button 
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/70 backdrop-blur-md rounded-full shadow hover:bg-white flex items-center justify-center text-ocean transition-colors z-10"
                      >
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button 
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/70 backdrop-blur-md rounded-full shadow hover:bg-white flex items-center justify-center text-ocean transition-colors z-10"
                      >
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full aspect-square flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400 font-heading text-lg font-medium">Foto kommt bald</span>
                </div>
              )}
              </div>
              
              {/* Product Thumbnails (if multiple exist) */}
              {!isZoomed && currentImages.length > 0 && (
                <div className="h-24 bg-white border-t border-gray-100 flex items-center gap-4 px-6 overflow-x-auto">
                  {currentImages.map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                      className={`h-16 w-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-colors ${idx === currentImageIndex ? "border-ocean" : "border-transparent hover:border-gray-300"}`}
                    >
                      <img src={img} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Info Side */}
            <div className="w-full md:w-[40%] p-6 md:p-10 flex flex-col overflow-y-auto bg-white z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-bold tracking-widest text-ocean/50 uppercase mb-1 block">{(product as any).category || "Kollektion"}</span>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-ocean">{product.name}</h2>
                </div>
                <button onClick={() => setLightboxOpen(false)} className="bg-gray-100 p-2 hover:bg-gray-200 rounded-full transition-colors text-ocean/60 hover:text-ocean">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <p className="text-fish-orange font-bold text-3xl mb-8">{displayPrice}</p>
              
              {/* Product description if available */}
              {(product as any).description && (
                <div className="mb-8 pb-8 border-b border-gray-100">
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {(product as any).description}
                  </p>
                </div>
              )}
              
              {/* Product colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-8 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-semibold text-ocean">Farbe:</span>
                    <span className="text-gray-500">{selectedColor?.name || "Bitte wählen"}</span>
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    {product.colors.map((c) => (
                      <button 
                        key={c.name} 
                        onClick={(e) => { e.stopPropagation(); setSelectedColor(c); }}
                        className={`w-10 h-10 rounded-full border-2 border-white shadow-sm transition-all duration-200 cursor-pointer ${
                          selectedColor?.name === c.name ? "ring-2 ring-offset-2 ring-ocean scale-110" : "ring-1 ring-gray-300 hover:ring-ocean/50"
                        }`}
                        style={{ backgroundColor: c.hex }} 
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Product Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-8 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-semibold text-ocean">Größe:</span>
                    <span className="text-gray-500">{selectedSize || "Bitte wählen"}</span>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={(e) => { e.stopPropagation(); setSelectedSize(s); }}
                        className={`px-5 py-3 border text-sm font-semibold rounded-lg transition-all ${
                          selectedSize === s 
                          ? "border-ocean bg-ocean text-white shadow-md transform -translate-y-0.5" 
                          : "border-gray-200 text-gray-600 hover:border-ocean hover:text-ocean bg-white"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-auto pt-6">
                <button
                  onClick={handleCheckout}
                  disabled={loading || (product.sizes?.length > 0 && !selectedSize)}
                  className={`w-full text-center py-4 rounded-xl font-heading font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                    loading || (product.sizes?.length > 0 && !selectedSize)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-ocean text-white hover:bg-sky-deep hover:shadow-xl transform hover:-translate-y-0.5"
                  }`}
                >
                  {loading ? "Wird verarbeitet..." : (product.sizes?.length > 0 && !selectedSize ? "Größe wählen" : "Jetzt zur Kasse")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
