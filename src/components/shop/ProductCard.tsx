"use client";
import { useState, useEffect } from "react";
import type { Product } from "../../../content/shop";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [modalImgIndex, setModalImgIndex] = useState(0);
  
  // Zoom state for Lightbox
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (!product.images || product.images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images!.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [product.images]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const hasImages = product.images && product.images.length > 0;

  return (
    <>
      <div className="rounded-2xl shadow-md overflow-hidden bg-white group flex flex-col h-full border border-sky/10 hover:shadow-xl transition-all duration-300">
        {/* Product Image Area */}
        <div
          className="aspect-square flex items-center justify-center relative overflow-hidden bg-gray-100 cursor-pointer"
          onClick={() => {
            if (hasImages) setModalImgIndex(0);
            setLightboxOpen(true);
          }}
          style={(!hasImages) ? { background: product.placeholderImage } : undefined}
        >
          {hasImages ? (
            <>
              {product.images!.map((img, idx) => (
                <img
                  key={img}
                  src={img}
                  alt={`${product.name} Preview ${idx + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    idx === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </>
          ) : (
            <span className="text-white/60 font-heading text-lg z-10 font-medium tracking-wide">
              Foto kommt bald
            </span>
          )}
          <div className="absolute inset-0 bg-ocean/0 group-hover:bg-ocean/10 transition-all duration-300 pointer-events-none" />
          
          <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-white/80 rounded-full p-2 text-ocean shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="font-heading font-semibold text-ocean text-xl mb-2">
            {product.name}
          </h3>
          
          {product.shortDescription && (
            <p className="text-sm text-ocean/70 mb-4 flex-grow line-clamp-2">
              {product.shortDescription}
            </p>
          )}
          
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <span className="block text-[10px] font-bold text-ocean/50 mb-2 uppercase tracking-wide">Erhältlich in folgenden Farben</span>
              <div className="flex gap-2 items-center">
                {product.colors.map((c) => (
                  <div 
                    key={c.name} 
                    className="w-5 h-5 rounded-full border-2 border-white ring-1 ring-ocean/20 shadow-sm" 
                    style={{ backgroundColor: c.hex }} 
                    title={c.name} 
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-auto">
            <p className="text-fish-orange font-bold text-xl mb-4">{product.price}</p>
            
            {/* Buy Button */}
            <a
              href={product.printifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 rounded-full bg-sky-light text-ocean font-heading font-semibold hover:bg-sky transition-colors duration-300 flex items-center justify-center gap-2 group-hover:bg-fish-gold group-hover:text-white"
            >
              Jetzt einkaufen
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-ocean/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden shadow-2xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Image Area */}
            <div className="w-full md:w-2/3 bg-gray-100 relative flex items-center justify-center min-h-[300px]">
              {hasImages ? (
                <>
                  <div 
                    className={`relative w-full h-full overflow-hidden ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                    onMouseMove={handleMouseMove}
                    onClick={() => setIsZoomed(!isZoomed)}
                  >
                    <img 
                      src={product.images![modalImgIndex]} 
                      alt={product.name}
                      className={`absolute inset-0 w-full h-full object-contain transition-transform duration-200`}
                      style={isZoomed ? { 
                        transform: "scale(2.5)", 
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` 
                      } : { transform: "scale(1)" }}
                    />
                  </div>
                  
                  {product.images!.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalImgIndex((prev) => (prev === 0 ? product.images!.length - 1 : prev - 1));
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/50 backdrop-blur-md rounded-full shadow hover:bg-white flex items-center justify-center text-ocean transition-colors z-10"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalImgIndex((prev) => (prev + 1) % product.images!.length);
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/50 backdrop-blur-md rounded-full shadow hover:bg-white flex items-center justify-center text-ocean transition-colors z-10"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                      <div className="absolute bottom-4 flex gap-2 z-10">
                        {product.images!.map((_, idx) => (
                          <div key={idx} className={`w-2 h-2 rounded-full ${idx === modalImgIndex ? "bg-ocean" : "bg-ocean/30"}`} />
                        ))}
                      </div>
                    </>
                  )}
                  {/* Hint Overlay */}
                  <div className="absolute top-4 right-4 bg-white/70 backdrop-blur text-xs px-2 py-1 rounded-md text-ocean/80 pointer-events-none shadow-sm">
                    Hover für Lupe
                  </div>
                </>
              ) : (
                <div className="w-full aspect-square flex items-center justify-center" style={{ background: product.placeholderImage }}>
                  <span className="text-white/60 font-heading text-lg font-medium">Foto kommt bald</span>
                </div>
              )}
            </div>
            
            {/* Lightbox Details Area */}
            <div className="w-full md:w-1/3 p-8 flex flex-col overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-heading text-2xl font-bold text-ocean">{product.name}</h2>
                <button onClick={() => setLightboxOpen(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors text-ocean/50 hover:text-ocean">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              
              <p className="text-fish-orange font-bold text-2xl mb-6">{product.price}</p>
              
              {product.shortDescription && (
                <p className="text-ocean/80 mb-6 leading-relaxed">
                  {product.shortDescription}
                </p>
              )}
              
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <span className="block text-[10px] font-bold text-ocean/50 mb-3 uppercase tracking-wide">Erhältlich in folgenden Farben</span>
                  <div className="flex gap-3">
                    {product.colors.map((c) => (
                      <div 
                        key={c.name} 
                        className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-ocean/20 shadow-sm cursor-help" 
                        style={{ backgroundColor: c.hex }} 
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-auto pt-6">
                <a
                  href={product.printifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-4 rounded-xl bg-ocean text-white font-heading font-semibold hover:bg-sky-deep transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Jetzt Größe wählen
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <p className="text-xs text-center text-ocean/40 mt-3">Sichere Abwicklung über unseren Partner Printify.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
