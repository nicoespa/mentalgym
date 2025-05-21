import { topics } from '@/data/topics';
import ResultsClient from './ResultsClient';

export function generateStaticParams() {
  return topics.map((topic) => ({ topic: topic.id }));
}

export default function ResultsPage({ params, searchParams }: { params: { topic: string }, searchParams: { score?: string } }) {
  const topic = topics.find((t) => t.id === params.topic);
  if (!topic) return <div>Topic not found</div>;
  const score = searchParams?.score || '0';
  return <ResultsClient topic={topic} score={score} />;
} 