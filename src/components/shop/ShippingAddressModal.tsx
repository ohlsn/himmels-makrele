"use client";

import { useState } from "react";

export type ShippingAddress = {
  name: string;
  street: string;
  postalCode: string;
  city: string;
  country: "DE" | "NL";
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (address: ShippingAddress) => void | Promise<void>;
  productSummary: string;
  submitting: boolean;
};

export default function ShippingAddressModal({
  open,
  onClose,
  onSubmit,
  productSummary,
  submitting,
}: Props) {
  const [address, setAddress] = useState<ShippingAddress>({
    name: "",
    street: "",
    postalCode: "",
    city: "",
    country: "DE",
  });

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !address.name.trim() ||
      !address.street.trim() ||
      !address.postalCode.trim() ||
      !address.city.trim()
    ) {
      return;
    }
    await onSubmit(address);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-ocean/80 flex items-center justify-center p-4"
      onClick={() => !submitting && onClose()}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-heading text-2xl font-bold text-ocean mb-2">
          Wohin soll&apos;s gehen?
        </h3>
        <p className="text-sm text-ocean/60 mb-5">
          {productSummary}. Damit wir dir die echten Versandkosten zeigen können,
          brauchen wir kurz deine Adresse.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-ocean mb-1">
              Land
            </label>
            <select
              value={address.country}
              onChange={(e) =>
                setAddress({
                  ...address,
                  country: e.target.value as ShippingAddress["country"],
                })
              }
              disabled={submitting}
              className="w-full px-4 py-2.5 rounded-xl border border-sky/30 focus:border-sky focus:ring-2 focus:ring-sky/20 outline-none transition-colors bg-white"
            >
              <option value="DE">Deutschland</option>
              <option value="NL">Niederlande</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ocean mb-1">
              Name
            </label>
            <input
              type="text"
              value={address.name}
              onChange={(e) =>
                setAddress({ ...address, name: e.target.value })
              }
              disabled={submitting}
              required
              autoComplete="name"
              placeholder="Vor- und Nachname"
              className="w-full px-4 py-2.5 rounded-xl border border-sky/30 focus:border-sky focus:ring-2 focus:ring-sky/20 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ocean mb-1">
              Straße + Hausnummer
            </label>
            <input
              type="text"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              disabled={submitting}
              required
              autoComplete="street-address"
              placeholder="Beispielstraße 12"
              className="w-full px-4 py-2.5 rounded-xl border border-sky/30 focus:border-sky focus:ring-2 focus:ring-sky/20 outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-ocean mb-1">
                PLZ
              </label>
              <input
                type="text"
                value={address.postalCode}
                onChange={(e) =>
                  setAddress({ ...address, postalCode: e.target.value })
                }
                disabled={submitting}
                required
                autoComplete="postal-code"
                placeholder={address.country === "DE" ? "12345" : "1234 AB"}
                className="w-full px-4 py-2.5 rounded-xl border border-sky/30 focus:border-sky focus:ring-2 focus:ring-sky/20 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ocean mb-1">
                Stadt
              </label>
              <input
                type="text"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                disabled={submitting}
                required
                autoComplete="address-level2"
                placeholder="Berlin"
                className="w-full px-4 py-2.5 rounded-xl border border-sky/30 focus:border-sky focus:ring-2 focus:ring-sky/20 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 py-2.5 rounded-full bg-gray-100 text-ocean font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2.5 rounded-full bg-fish-gold text-ocean font-heading font-semibold hover:bg-fish-orange transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Hole Versand…" : "Weiter zur Bezahlung"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
