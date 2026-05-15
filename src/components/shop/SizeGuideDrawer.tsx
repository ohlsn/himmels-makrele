"use client";

import type { Product, ProductSizeGuideTable } from "../../../content/shop";
import {
  getEverydaySizeRows,
  getProductSizeFamily,
  getSizeFamilyLabel,
} from "../../../content/sizeGuides";

type Props = {
  product: Product;
  open: boolean;
  onClose: () => void;
};

function tableTitle(table: ProductSizeGuideTable) {
  const label = table.title || table.type;
  if (!label) return "Produktmaße";

  const normalized = label.toLowerCase().replace(/[_-]/g, " ").trim();
  if (normalized === "measure yourself") return "Produktmaße";
  if (normalized === "product measurements") return "Produktmaße";
  if (normalized === "body measurements") return "Körpermaße";

  return label.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function rowLabel(label: string) {
  const normalized = label.toLowerCase().trim();
  const labels: Record<string, string> = {
    length: "Länge",
    chest: "Brustbreite",
    "sleeve length": "Ärmellänge",
    width: "Breite",
    waist: "Taille",
    hips: "Hüfte",
  };

  return labels[normalized] ?? label;
}

function formatMeasurement(value: string) {
  if (!value || value === "-") return "-";
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return value;
  return numericValue.toLocaleString("de-DE", {
    maximumFractionDigits: 1,
  });
}

function visibleRows(table: ProductSizeGuideTable) {
  return table.rows.filter((row) =>
    row.values.some((cell) => cell.value && cell.value !== "-"),
  );
}

function measuringSteps(family: ReturnType<typeof getProductSizeFamily>) {
  if (family === "baby") {
    return [
      {
        title: "Körpergröße",
        body: "Vom Scheitel bis zur Ferse messen. Am einfachsten liegt das Baby dabei flach auf einer Decke.",
      },
      {
        title: "Brustumfang",
        body: "Locker an der breitesten Stelle der Brust messen. Das Maßband soll anliegen, aber nicht drücken.",
      },
      {
        title: "Gewicht",
        body: "Als Zusatzcheck nutzen. Wenn Alter und Körpergröße nicht zusammenpassen, ist Körpergröße meist hilfreicher.",
      },
      {
        title: "Bewegungsraum",
        body: "Bodysuits brauchen Platz für Windel und Bewegung. Bei Unsicherheit die größere Größe wählen.",
      },
    ];
  }

  if (family === "kids") {
    return [
      {
        title: "Körpergröße",
        body: "Barfuß vom Boden bis zum Scheitel messen. Das ist bei Kindergrößen meist der beste Ausgangspunkt.",
      },
      {
        title: "Brustumfang",
        body: "Einmal waagerecht um die stärkste Stelle der Brust messen, locker über einem dünnen Shirt.",
      },
      {
        title: "Taille",
        body: "An der schmalsten Stelle des Oberkörpers messen. Nicht den Bauch einziehen lassen.",
      },
      {
        title: "Wachstumsspielraum",
        body: "Wenn das Kind nah am oberen Ende einer Größe liegt, ist die nächste Größe oft sinnvoller.",
      },
    ];
  }

  return [
    {
      title: "Brustumfang am Körper",
      body: "Waagerecht um die stärkste Stelle der Brust messen. Das Maßband soll gerade verlaufen und nicht einschneiden.",
    },
    {
      title: "Breite am Lieblingsstück",
      body: "Ein gut sitzendes Shirt oder Hoodie flach hinlegen und von Achsel zu Achsel messen. Verdopple den Wert für den Umfang.",
    },
    {
      title: "Länge",
      body: "Vom höchsten Schulterpunkt bis zum unteren Saum messen. So siehst du, ob das Teil eher kurz oder länger fällt.",
    },
    {
      title: "Ärmellänge",
      body: "Von der Schulternaht bis zum Ärmelende messen. Bei Hoodies und Sweatshirts besonders relevant.",
    },
  ];
}

export default function SizeGuideDrawer({ product, open, onClose }: Props) {
  if (!open) return null;

  const family = getProductSizeFamily(product);
  const everydayRows = getEverydaySizeRows(product);
  const guide = product.sizeGuide;
  const tables = guide?.tables ?? [];
  const firstUsefulTable = tables.find((table) => visibleRows(table).length > 0);

  return (
    <div
      className="fixed inset-0 z-50 bg-ocean/75 flex justify-end"
      onClick={onClose}
    >
      <aside
        className="h-full w-full max-w-2xl bg-white shadow-2xl overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
        aria-label={`Größentabelle für ${product.name}`}
      >
        <div className="sticky top-0 z-10 bg-white border-b border-sky/15 px-5 sm:px-8 py-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide font-bold text-ocean/45">
              Größentabelle
            </p>
            <h2 className="font-heading text-2xl font-bold text-ocean">
              {product.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 rounded-full border border-ocean/15 text-ocean hover:bg-sky-light transition-colors flex items-center justify-center"
            aria-label="Größentabelle schließen"
          >
            <span className="text-3xl leading-none">&times;</span>
          </button>
        </div>

        <div className="px-5 sm:px-8 py-8 space-y-8">
          <section>
            <div className="mb-4">
              <p className="text-xs uppercase tracking-wide font-bold text-ocean/45 mb-2">
                Größenempfehlung
              </p>
              <h3 className="font-heading text-2xl font-semibold text-ocean">
                {getSizeFamilyLabel(product)}
              </h3>
              <p className="text-sm text-ocean/60 mt-2">
                Starte mit diesen Standardgrößen. Die Angaben sind als
                Orientierung gedacht. Bei Kindern ist die Körpergröße meist
                wichtiger als der Brustumfang.
              </p>
            </div>

            {everydayRows.length > 0 ? (
              <div className="overflow-x-auto border border-sky/15 rounded-xl">
                <table className="w-full min-w-[620px] text-left bg-white">
                  <thead>
                    <tr className="border-b border-sky/15 bg-cloud">
                      <th className="py-3 px-4 font-heading text-ocean">
                        Größe
                      </th>
                      {family === "adult" ? (
                        <>
                          <th className="py-3 px-4 font-heading text-ocean">
                            EU-Größe
                          </th>
                          <th className="py-3 px-4 font-heading text-ocean">
                            Brustumfang
                          </th>
                        </>
                      ) : family === "baby" ? (
                        <>
                          <th className="py-3 px-4 font-heading text-ocean">
                            Alter
                          </th>
                          <th className="py-3 px-4 font-heading text-ocean">
                            Körpergröße
                          </th>
                          <th className="py-3 px-4 font-heading text-ocean">
                            Gewicht
                          </th>
                        </>
                      ) : (
                        <>
                          <th className="py-3 px-4 font-heading text-ocean">
                            Alter
                          </th>
                          <th className="py-3 px-4 font-heading text-ocean">
                            Körpergröße
                          </th>
                          <th className="py-3 px-4 font-heading text-ocean">
                            Brust/Taille
                          </th>
                        </>
                      )}
                      <th className="py-3 px-4 font-heading text-ocean">
                        Passformhinweis
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {everydayRows.map((row) => (
                      <tr
                        key={row.size}
                        className="border-b border-sky/10 last:border-b-0"
                      >
                        <th className="py-4 px-4 font-semibold text-ocean">
                          {row.size}
                        </th>
                        {family === "adult" ? (
                          <>
                            <td className="py-4 px-4 text-ocean/70">
                              {row.euSize}
                            </td>
                            <td className="py-4 px-4 text-ocean/70">
                              {row.chest}
                            </td>
                          </>
                        ) : family === "baby" ? (
                          <>
                            <td className="py-4 px-4 text-ocean/70">
                              {row.age}
                            </td>
                            <td className="py-4 px-4 text-ocean/70">
                              {row.height}
                            </td>
                            <td className="py-4 px-4 text-ocean/70">
                              {row.weight}
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="py-4 px-4 text-ocean/70">
                              {row.age}
                            </td>
                            <td className="py-4 px-4 text-ocean/70">
                              {row.height}
                            </td>
                            <td className="py-4 px-4 text-ocean/70">
                              {[row.chest, row.waist].filter(Boolean).join(" / ")}
                            </td>
                          </>
                        )}
                        <td className="py-4 px-4 text-ocean/70">{row.fit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="border border-dashed border-sky/35 rounded-xl p-5 text-sm text-ocean/65">
                Für diese Größen gibt es noch keine lokale Alltagstabelle.
              </div>
            )}
          </section>

          <section>
            <details className="group">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 border-y border-sky/15 py-4">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-ocean">
                    Exakte Produktmaße
                  </h3>
                  <p className="text-sm text-ocean/55">
                    Kleidungsstück-Maße zur Kontrolle der Passform.
                  </p>
                </div>
                <span className="text-2xl text-ocean/40 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>

              {firstUsefulTable ? (
                <div className="pt-5">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
                    <div>
                      <h4 className="font-heading text-lg font-semibold text-ocean">
                        {tableTitle(firstUsefulTable)}
                      </h4>
                      <p className="text-sm text-ocean/55">
                        Einheit: {firstUsefulTable.unit || "cm"} · flach am
                        Kleidungsstück gemessen
                      </p>
                    </div>
                    {guide?.source && (
                      <span className="text-xs uppercase tracking-wide text-ocean/40 font-bold">
                        Produktmaße
                      </span>
                    )}
                  </div>

                  <div className="overflow-x-auto border border-sky/15 rounded-xl">
                    <table className="w-full min-w-[560px] text-left bg-white">
                      <thead>
                        <tr className="border-b border-sky/15 bg-cloud">
                          <th className="py-3 px-4 font-heading text-ocean">
                            Maß
                          </th>
                          {firstUsefulTable.sizes.map((size) => (
                            <th
                              key={size}
                              className="py-3 px-4 font-heading text-ocean text-center"
                            >
                              {size}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {visibleRows(firstUsefulTable).map((row) => (
                          <tr
                            key={row.label}
                            className="border-b border-sky/10 last:border-b-0"
                          >
                            <th className="py-4 px-4 font-semibold text-ocean align-top">
                              {rowLabel(row.label)}
                            </th>
                            {row.values.map((cell) => (
                              <td
                                key={`${row.label}-${cell.size}`}
                                className="py-4 px-4 text-center text-ocean/75"
                              >
                                {formatMeasurement(cell.value)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="pt-5 border border-dashed border-sky/35 rounded-xl p-5 text-sm text-ocean/65 mt-5">
                  Exakte Produktmaße sind für dieses Produkt noch nicht
                  hinterlegt.
                </div>
              )}
            </details>
          </section>

          <section>
            <details className="group">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 border-y border-sky/15 py-4">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-ocean">
                    So misst du
                  </h3>
                  <p className="text-sm text-ocean/55">
                    Sekundär, wenn du zwischen zwei Größen liegst.
                  </p>
                </div>
                <span className="text-2xl text-ocean/40 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="pt-5 space-y-5 text-sm text-ocean/75">
                <p className="text-sm text-ocean/60 mb-4">
                  Miss nur nach, wenn die Standardgrößen nicht eindeutig sind
                  oder du zwischen zwei Größen liegst.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {measuringSteps(family).map((step) => (
                    <div
                      key={step.title}
                      className="rounded-xl border border-sky/15 bg-cloud/60 p-4"
                    >
                      <h4 className="font-heading font-semibold text-ocean mb-1">
                        {step.title}
                      </h4>
                      <p className="leading-relaxed">{step.body}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-sky-light/45 border border-sky/15 p-4">
                  <h4 className="font-heading font-semibold text-ocean mb-1">
                    Faustregel
                  </h4>
                  <p className="leading-relaxed">
                    Wenn du zwischen zwei Größen liegst, entscheide nach
                    gewünschter Passform: kleiner für näher am Körper, größer
                    für mehr Bewegungsfreiheit und längere Nutzungsdauer.
                  </p>
                </div>
              </div>
            </details>
          </section>
        </div>
      </aside>
    </div>
  );
}
