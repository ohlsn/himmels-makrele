"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product, ProductColor } from "../../../content/shop";
import ShippingAddressModal, { type ShippingAddress } from "./ShippingAddressModal";
import ProductInfoAccordion from "./ProductInfoAccordion";
import SizeGuideDrawer from "./SizeGuideDrawer";

type Props = {
  product: Product;
};

export default function ProductDetail({ product }: Props) {
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product.colors[0] ?? null,
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null,
  );
  const [imageIndex, setImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentImages = selectedColor?.images ?? [];
  const selectedVariant = product.variants.find(
    (variant) =>
      variant.color === selectedColor?.name && variant.size === selectedSize,
  );
  const displayPrice = selectedVariant?.price || product.price;
  const isOutOfStock = selectedVariant?.isOutOfStock;

  const availableSizesForColor = useMemo(
    () =>
      new Set(
        product.variants
          .filter((variant) => variant.color === selectedColor?.name)
          .map((variant) => variant.size),
      ),
    [product.variants, selectedColor?.name],
  );

  const handleColorSelect = (color: ProductColor) => {
    setSelectedColor(color);
    setImageIndex(0);
    const hasCurrentSize = product.variants.some(
      (variant) => variant.color === color.name && variant.size === selectedSize,
    );
    if (!hasCurrentSize) {
      setSelectedSize(product.sizes.length === 1 ? product.sizes[0] : null);
    }
  };

  const handleCheckout = () => {
    setErrorMessage(null);
    if (!selectedColor || !selectedSize) {
      setErrorMessage("Bitte wähle zuerst Farbe und Größe aus.");
      return;
    }
    if (!selectedVariant) {
      setErrorMessage("Diese Farb-Größen-Kombination gibt es leider nicht.");
      return;
    }
    if (selectedVariant.isOutOfStock) {
      setErrorMessage("Diese Größe ist gerade nicht auf Lager.");
      return;
    }
    setAddressModalOpen(true);
  };

  const handleAddressSubmit = async (address: ShippingAddress) => {
    if (!selectedColor || !selectedSize || !selectedVariant) return;

    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          color: selectedColor.name,
          size: selectedSize,
          printfulSyncVariantId: selectedVariant.printfulSyncVariantId,
          shippingAddress: address,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setErrorMessage(
          "Die Kasse ließ sich nicht öffnen: " + (data.error ?? "Unbekannter Fehler"),
        );
        setLoading(false);
        setAddressModalOpen(false);
      }
    } catch {
      setErrorMessage("Netzwerkfehler beim Verbinden mit der Kasse.");
      setLoading(false);
      setAddressModalOpen(false);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
        <Link
          href="/shop"
          className="inline-flex items-center text-sm font-semibold text-ocean/60 hover:text-ocean mb-8"
        >
          <span className="mr-2">&larr;</span>
          Zurück zum Shop
        </Link>

        <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(380px,0.8fr)] gap-10 lg:gap-14 items-start">
          <section>
            <div className="bg-white border border-sky/10 rounded-2xl overflow-hidden shadow-sm">
              <div className="aspect-square bg-white flex items-center justify-center relative">
                {currentImages[imageIndex] ? (
                  <Image
                    src={currentImages[imageIndex]}
                    alt={`${product.name} in ${selectedColor?.name ?? "Farbe"}`}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-contain"
                    priority
                  />
                ) : (
                  <span className="font-heading text-ocean/35 text-xl">
                    Foto kommt bald
                  </span>
                )}
              </div>
            </div>

            {currentImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4">
                {currentImages.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setImageIndex(index)}
                    className={`aspect-square bg-white rounded-xl border overflow-hidden transition-all ${
                      index === imageIndex
                        ? "border-ocean shadow-md"
                        : "border-sky/10 hover:border-sky"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} Ansicht ${index + 1}`}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="lg:sticky lg:top-8">
            <div className="bg-white rounded-2xl border border-sky/10 shadow-sm p-6 sm:p-8">
              <p className="text-xs uppercase tracking-wide font-bold text-ocean/45 mb-2">
                {product.category}
              </p>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-ocean mb-3">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-fish-orange mb-1">
                {displayPrice}
              </p>
              <p className="text-sm text-ocean/50 mb-8">
                Preis inkl. BTW, zzgl. Versand im Checkout.
              </p>

              <div className="space-y-8">
                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <h2 className="font-heading font-semibold text-ocean">
                      Farbe
                    </h2>
                    <span className="text-sm text-ocean/55">
                      {selectedColor?.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => handleColorSelect(color)}
                        className={`w-10 h-10 rounded-full border-2 border-white shadow-sm transition-all ${
                          selectedColor?.name === color.name
                            ? "ring-2 ring-offset-2 ring-ocean scale-105"
                            : "ring-1 ring-ocean/20 hover:ring-ocean/50"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={`Farbe ${color.name} wählen`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <h2 className="font-heading font-semibold text-ocean">
                      Größe
                    </h2>
                    <button
                      type="button"
                      onClick={() => setSizeGuideOpen(true)}
                      className="text-sm font-semibold text-sky-deep hover:underline"
                    >
                      Größentabelle
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {product.sizes.map((size) => {
                      const variant = product.variants.find(
                        (item) =>
                          item.size === size && item.color === selectedColor?.name,
                      );
                      const disabled =
                        !availableSizesForColor.has(size) || variant?.isOutOfStock;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => !disabled && setSelectedSize(size)}
                          disabled={disabled}
                          className={`min-h-14 rounded-xl border px-3 py-2 text-sm font-semibold transition-all ${
                            selectedSize === size
                              ? "bg-ocean text-white border-ocean shadow-md"
                              : disabled
                                ? "bg-gray-50 text-gray-300 border-gray-100 line-through cursor-not-allowed"
                                : "bg-white text-ocean border-sky/20 hover:border-ocean"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-ocean/45 mt-3">
                    Durchgestrichene Größen sind für die gewählte Farbe gerade
                    nicht verfügbar.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={
                    loading ||
                    !selectedColor ||
                    !selectedSize ||
                    !selectedVariant ||
                    isOutOfStock
                  }
                  className={`w-full rounded-full py-4 font-heading font-semibold text-lg transition-all ${
                    loading ||
                    !selectedColor ||
                    !selectedSize ||
                    !selectedVariant ||
                    isOutOfStock
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-fish-gold text-ocean hover:bg-fish-orange shadow-lg hover:-translate-y-0.5"
                  }`}
                >
                  {loading
                    ? "Kasse lädt..."
                    : isOutOfStock
                      ? "Nicht auf Lager"
                      : !selectedSize
                        ? "Größe wählen"
                        : "Weiter zur Bezahlung"}
                </button>

                {errorMessage && (
                  <div
                    role="alert"
                    className="rounded-xl border border-fish-orange/30 bg-fish-orange/10 px-4 py-3 text-sm text-ocean"
                  >
                    {errorMessage}
                  </div>
                )}

                <ProductInfoAccordion product={product} />
              </div>
            </div>
          </section>
        </div>
      </div>

      <SizeGuideDrawer
        product={product}
        open={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />

      <ShippingAddressModal
        open={addressModalOpen}
        onClose={() => !loading && setAddressModalOpen(false)}
        onSubmit={handleAddressSubmit}
        productSummary={`${product.name}${selectedColor ? `, ${selectedColor.name}` : ""}${selectedSize ? `, Größe ${selectedSize}` : ""}`}
        submitting={loading}
      />
    </>
  );
}
