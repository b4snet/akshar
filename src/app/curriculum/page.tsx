// src/app/curriculum/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { getSupabaseConfig } from '@/lib/supabase/config';

type EducationLevel = {
  id: string;
  name: string;
  display_order?: number;
};

export default function CurriculumHome() {
  const config = getSupabaseConfig();
  const supabase = createSupabaseBrowserClient(config)!;

  const [levels, setLevels] = useState<EducationLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLevels = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('education_levels')
          .select('id, name, display_order')
          .order('display_order', { ascending: true });
        if (error) throw error;
        setLevels(data as EducationLevel[]);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('Failed to load education levels');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchLevels();
  }, [supabase]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Curriculum</h1>
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {levels.map((lvl) => (
          <Link
            key={lvl.id}
            href={`/curriculum/${lvl.id}`}
            className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-medium text-gray-800">{lvl.name}</h2>
            {lvl.display_order !== undefined && (
              <p className="text-sm text-gray-500">Order: {lvl.display_order}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
