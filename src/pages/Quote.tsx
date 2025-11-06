// src/pages/Quote.tsx
// [신규] /quote & /quote/:symbol 대응 템플릿
import { useParams } from 'react-router-dom';

export default function Quote() {
  const { symbol } = useParams<{ symbol?: string }>();
  return <div>Quote Page {symbol ? `(symbol: ${symbol})` : ''}</div>;
}
