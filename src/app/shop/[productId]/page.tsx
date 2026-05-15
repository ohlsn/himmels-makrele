import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTransition from "@/components/ui/PageTransition";
import ProductDetail from "@/components/shop/ProductDetail";
import { getProductById, getProductHeroImage } from "@/lib/shop";
import { shopData } from "../../../../content/shop";

export function generateStaticParams() {
  return shopData.map((product) => ({
    productId: product.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const product = getProductById(productId);

  if (!product) {
    return {
      title: "Produkt nicht gefunden",
    };
  }

  const image = getProductHeroImage(product);

  return {
    title: product.name,
    description:
      product.shortDescription ||
      `${product.name} im Himmels Makrele Shop ansehen.`,
    openGraph: {
      title: product.name,
      description:
        product.shortDescription ||
        `${product.name} im Himmels Makrele Shop ansehen.`,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <PageTransition>
      <ProductDetail product={product} />
    </PageTransition>
  );
}
