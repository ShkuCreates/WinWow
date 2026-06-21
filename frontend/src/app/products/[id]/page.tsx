import ProductClient from './ProductClient';

// Generate static params for export
export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
}

export default function ProductPage() {
  return <ProductClient />;
}
