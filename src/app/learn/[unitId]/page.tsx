import LearnPage from '@/components/LearnPage';

export default async function Page({ 
  params 
}: { 
  params: Promise<{ unitId: string }> 
}) {
  const resolvedParams = await params;
  return <LearnPage params={resolvedParams} />;
}