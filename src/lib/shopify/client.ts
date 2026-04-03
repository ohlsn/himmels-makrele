// Shopify Storefront API client — Phase 2
// Activate once you have your Shopify store and Storefront API token

import type { ShopifyProduct, ShopifyCart } from "./types";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || "";

const endpoint = `https://${domain}/api/2024-10/graphql.json`;

interface ShopifyResponse<T> {
  data: T;
  errors?: { message: string }[];
}

export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  if (!domain || !storefrontToken) {
    throw new Error(
      "Shopify is not configured. Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN in .env.local"
    );
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const json: ShopifyResponse<T> = await response.json();

  if (json.errors) {
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }

  return json.data;
}

// Helper to extract nodes from Shopify edges
export function extractNodes<T>(edges: { node: T }[]): T[] {
  return edges.map((edge) => edge.node);
}

// Convenience functions (uncomment when ready)
// import { GET_PRODUCTS, GET_PRODUCT_BY_HANDLE, GET_FEATURED_PRODUCTS } from "./queries";
//
// export async function getProducts(first = 20): Promise<ShopifyProduct[]> {
//   const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>({
//     query: GET_PRODUCTS,
//     variables: { first },
//   });
//   return extractNodes(data.products.edges);
// }
//
// export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
//   const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
//     query: GET_PRODUCT_BY_HANDLE,
//     variables: { handle },
//   });
//   return data.product;
// }
//
// export async function getFeaturedProducts(): Promise<ShopifyProduct[]> {
//   const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>({
//     query: GET_FEATURED_PRODUCTS,
//   });
//   return extractNodes(data.products.edges);
// }
