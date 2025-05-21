import { topics } from '@/data/topics';
import SessionClient from './SessionClient';

export function generateStaticParams() {
  return topics.map((topic) => ({ topic: topic.id }));
}

export default function SessionPage({ params }: { params: { topic: string } }) {
  const topic = topics.find((t) => t.id === params.topic);
  if (!topic) return <div>Topic not found</div>;
  return <SessionClient topic={topic} />;
}
