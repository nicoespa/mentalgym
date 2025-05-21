import { Achievements, Achievement } from '@/components/Achievements';

const achievements: Achievement[] = [
  { id: '1', title: 'Primer día', description: 'Completá tu primer sesión', icon: '🎉', unlocked: true },
  { id: '2', title: 'Racha 3 días', description: '3 días seguidos', icon: '🔥', unlocked: true },
  { id: '3', title: '100 XP', description: 'Alcanza 100 XP', icon: '💡', unlocked: false },
];

export default function ProfilePage() {
  // Datos de ejemplo, reemplaza por datos reales del usuario
  const user = { name: 'Usuario', avatar: '🧑‍💻', level: 1, xp: 350 };

  return (
    <div className="py-6 max-w-md mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-5xl bg-gray-100 rounded-full p-4">{user.avatar}</div>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <div className="text-sm text-gray-600">Nivel {user.level} · {user.xp} XP</div>
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-2">Logros destacados</h2>
      <Achievements achievements={achievements.filter(a => a.unlocked)} />
    </div>
  );
} 