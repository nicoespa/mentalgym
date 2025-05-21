"use client";
import { topics } from '@/data/topics';
import { TopicCard } from '@/components/TopicCard';
import { useRouter } from 'next/navigation';

export default function TopicsPage() {
  const router = useRouter();
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">Temas disponibles</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            title={topic.title}
            description={topic.description}
            icon={topic.icon}
            completed={topic.completed}
            onClick={() => router.push(`/session/${topic.id}`)}
          />
        ))}
      </div>
    </div>
  );
} 