"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { upsertOnboarding } from '@/app/actions/profile';

interface OnboardingForm {
  country?: string;
  education_system?: string;
  curriculum?: string;
  grade?: number;
  subjects: string[];
  learning_goals?: string;
}

const OnboardingPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<OnboardingForm>({
    country: '',
    education_system: '',
    curriculum: '',
    grade: undefined,
    subjects: [],
    learning_goals: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const set = new Set(prev.subjects);
      if (checked) set.add(value);
      else set.delete(value);
      return { ...prev, subjects: Array.from(set) };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const payload = {
        country: formData.country || undefined,
        education_system: formData.education_system || undefined,
        curriculum: formData.curriculum || undefined,
        grade: formData.grade ? Number(formData.grade) : undefined,
        subjects: formData.subjects.length ? formData.subjects : undefined,
        learning_goals: formData.learning_goals || undefined,
      };
      await upsertOnboarding(payload);
      router.push('/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome! Let’s set up your learning profile</h1>
      {error && <p className="text-red-600 mb-2" role="alert">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="country" className="block font-medium">Country</label>
          <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label htmlFor="education_system" className="block font-medium">Education System</label>
          <select id="education_system" name="education_system" value={formData.education_system} onChange={handleChange} className="w-full border rounded p-2">
            <option value="">Select…</option>
            <option value="NEB">NEB</option>
            <option value="CEE">CEE</option>
            <option value="IOE">IOE</option>
          </select>
        </div>
        <div>
          <label htmlFor="curriculum" className="block font-medium">Curriculum</label>
          <input type="text" id="curriculum" name="curriculum" value={formData.curriculum} onChange={handleChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label htmlFor="grade" className="block font-medium">Grade / Level</label>
          <input type="number" id="grade" name="grade" min="1" max="12" value={formData.grade ?? ''} onChange={handleChange} className="w-full border rounded p-2" />
        </div>
        <fieldset>
          <legend className="font-medium">Subjects of Interest (optional)</legend>
          {['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English'].map(sub => (
            <label key={sub} className="mr-4 inline-flex items-center">
              <input type="checkbox" value={sub} checked={formData.subjects.includes(sub)} onChange={handleSubjectsChange} className="mr-1" />
              {sub}
            </label>
          ))}
        </fieldset>
        <div>
          <label htmlFor="learning_goals" className="block font-medium">Learning Goals (optional)</label>
          <textarea id="learning_goals" name="learning_goals" value={formData.learning_goals} onChange={handleChange} rows={3} className="w-full border rounded p-2" />
        </div>
        <button type="submit" disabled={submitting} className="button button-primary">
          {submitting ? 'Saving…' : 'Save & Continue'}
        </button>
      </form>
    </main>
  );
};

export default OnboardingPage;
