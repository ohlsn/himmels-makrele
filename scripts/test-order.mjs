/**
 * 🧪 TESTSKRIPT: Simuliert eine echte Printful-Bestellung
 * 
 * Dieses Skript umgeht Stripe und sendet direkt eine Bestellung an Printful,
 * genau so wie unser Webhook-Handler es im Echtsystem tut.
 * 
 * Ausführen: node scripts/test-order.mjs
 */
import fs from 'fs/promises';

// Env laden
const envContent = await fs.readFile('.env.local', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) env[match[1]] = match[2].trim();
});

const PRINTFUL_KEY = env.PRINTFUL_API_KEY;
if (!PRINTFUL_KEY) {
  console.error('❌ PRINTFUL_API_KEY fehlt in .env.local!');
  process.exit(1);
}

// Shop-Daten laden
const shopRaw = await fs.readFile('./content/shop.ts', 'utf-8');
const jsonMatch = shopRaw.match(/export const shopData: Product\[\] = (\[[\s\S]+\]);/);
if (!jsonMatch) {
  console.error('❌ Konnte shop.ts nicht parsen!');
  process.exit(1);
}
const shopData = JSON.parse(jsonMatch[1]);

// Produkt auswählen (erstes Produkt, erste Farbe, erste Größe)
const product = shopData[0];
const firstVariant = product.variants.find(v => !v.isOutOfStock);

console.log('\n🐟 HIMMELS MAKRELE – TEST-BESTELLUNG\n');
console.log(`Produkt:  ${product.name}`);
console.log(`Farbe:    ${firstVariant.color}`);
console.log(`Größe:    ${firstVariant.size}`);
console.log(`VariantID: ${firstVariant.printfulSyncVariantId}`);
console.log('\n📦 Sende Bestellung an Printful (als DRAFT)...\n');

const orderPayload = {
  // confirm: false bedeutet DRAFT - wird nicht wirklich gedruckt oder berechnet!
  confirm: false,
  recipient: {
    name: "Max Mustermann (TEST)",
    address1: "Musterstraße 1",
    city: "Berlin",
    state_code: "",
    country_code: "DE",
    zip: "10115",
    email: "test@himmels-makrele.de",
  },
  items: [
    {
      sync_variant_id: firstVariant.printfulSyncVariantId,
      quantity: 1,
    },
  ],
};

try {
  const response = await fetch("https://api.printful.com/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${PRINTFUL_KEY}`,
    },
    body: JSON.stringify(orderPayload),
  });

  const data = await response.json();

  if (response.ok && data.code === 200) {
    console.log('✅ ERFOLG! Bestellung wurde als DRAFT in Printful angelegt!\n');
    console.log(`  Order ID:     #${data.result.id}`);
    console.log(`  Status:       ${data.result.status}`);
    console.log(`  Empfänger:    ${data.result.recipient.name}`);
    console.log(`  Produkt:      ${data.result.items[0]?.name}`);
    console.log(`  Retail Preis: ${data.result.retail_costs?.total} ${data.result.retail_costs?.currency}`);
    console.log('\n👉 Jetzt in deinem Printful-Backend unter "Bestellungen" nachschauen!');
    console.log('   Die Bestellung hat Status DRAFT und kostet nichts.\n');
  } else {
    console.error('❌ Printful hat einen Fehler zurückgegeben:');
    console.error(JSON.stringify(data, null, 2));
  }
} catch (err) {
  console.error('❌ Netzwerkfehler:', err.message);
}
