'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TestimonialForm from '@/components/TestimonialForm';
import type { Testimonial } from '@/types';

export default function EditTestimonialPage() {
  const params = useParams();
  const id = params.id as string;
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/testimonials/${id}`)
      .then((r) => r.json())
      .then((data) => setTestimonial(data))
      .catch(() => setTestimonial(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (!testimonial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Testimonio no encontrado</p>
      </div>
    );
  }

  return <TestimonialForm mode="edit" initial={testimonial} testimonialId={id} />;
}
