import TestPage from '@/components/TestPage';

export default async function Page({ 
  params 
}: { 
  params: Promise<{ unitId: string }> 
}) {
  const resolvedParams = await params;
  return <TestPage params={resolvedParams} />;
}