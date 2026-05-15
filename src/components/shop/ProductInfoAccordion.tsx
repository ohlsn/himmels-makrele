"use client";

import { useState } from "react";
import type { Product } from "../../../content/shop";

type Item = {
  title: string;
  body: React.ReactNode;
};

type Props = {
  product: Product;
};

function fitCopy(product: Product) {
  const name = product.name.toLowerCase();
  if (name.includes("hoodie")) {
    return "Klassischer Hoodie-Schnitt mit weichem Innenfutter. Für lockeren Sitz eher eine Nummer größer wählen.";
  }
  if (name.includes("sweatshirt")) {
    return "Gerader Sweatshirt-Schnitt. Bequem über T-Shirt, nicht körpernah geschnitten.";
  }
  if (name.includes("baby")) {
    return "Babygrößen orientieren sich am Alter. Für längere Tragezeit lieber etwas großzügiger wählen.";
  }
  if (name.includes("kids") || name.includes("youth")) {
    return "Kindergrößen fallen nach Alters-/Körpergrößenlogik aus. Bei Wachstumsschub lieber die nächste Größe nehmen.";
  }
  return "Klassischer T-Shirt-Schnitt. Wenn du zwischen zwei Größen liegst, nimm für mehr Bewegungsfreiheit die größere.";
}

function materialCopy(product: Product) {
  const name = product.name.toLowerCase();
  if (name.includes("hoodie") || name.includes("sweatshirt")) {
    return "Baumwoll-Polyester-Mix mit weicher Innenseite. Die genaue Zusammensetzung kann je nach Farbe und Rohling leicht variieren.";
  }
  if (name.includes("organic")) {
    return "Bio-Baumwolle, weich und für Kinderhaut angenehm. Melierte Varianten können einen kleinen Polyesteranteil enthalten.";
  }
  return "Weiche Baumwollqualität. Melierte Farben können einen Polyesteranteil enthalten.";
}

export default function ProductInfoAccordion({ product }: Props) {
  const [openIndex, setOpenIndex] = useState(0);

  const items: Item[] = [
    {
      title: "Beschreibung und Passform",
      body: (
        <div className="space-y-4">
          <p>{fitCopy(product)}</p>
          {product.description && (
            <p className="whitespace-pre-wrap">{product.description}</p>
          )}
        </div>
      ),
    },
    {
      title: "Materialien",
      body: <p>{materialCopy(product)}</p>,
    },
    {
      title: "Pflegehinweise",
      body: (
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Auf links waschen, damit der Druck länger sauber bleibt.</li>
          <li>Schonwaschgang und niedrige Temperatur verwenden.</li>
          <li>Nicht direkt über den Druck bügeln.</li>
          <li>Nicht bleichen.</li>
        </ul>
      ),
    },
    {
      title: "Lieferung und Bezahlung",
      body: (
        <div className="space-y-3">
          <p>
            Bezahlt wird sicher über Stripe. Je nach Land und Verfügbarkeit sind
            Karte, iDEAL und Klarna möglich.
          </p>
          <p>
            Die Versandkosten werden erst im Checkout anhand deiner Lieferadresse
            berechnet und angezeigt.
          </p>
        </div>
      ),
    },
    {
      title: "Produktion und Versand",
      body: (
        <p>
          Jedes Teil wird nach Bestellung produziert und direkt an dich
          verschickt. Druck und Versand dauern typischerweise etwa 1-2 Wochen.
        </p>
      ),
    },
  ];

  return (
    <div className="border-t border-sky/15">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <section key={item.title} className="border-b border-sky/15">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : index)}
              className="w-full py-5 flex items-center justify-between gap-4 text-left"
              aria-expanded={open}
            >
              <span className="font-heading font-semibold text-ocean">
                {item.title}
              </span>
              <span
                className={`text-2xl text-ocean/40 transition-transform ${
                  open ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {open && (
              <div className="pb-5 text-sm leading-relaxed text-ocean/70">
                {item.body}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
