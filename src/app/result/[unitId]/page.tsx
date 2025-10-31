import { Suspense } from 'react';
import ResultPage from '@/components/ResultPage';

export default async function Page({ 
  params 
}: { 
  params: Promise<{ unitId: string }> 
}) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultPage params={resolvedParams} />
    </Suspense>
  );
}