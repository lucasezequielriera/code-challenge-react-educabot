import { useState, useEffect } from 'react';
import { fetchEnrollments } from '../api/enrollments';
import type { Enrollment, EnrollmentStatus } from '../types/enrollment';

/**
 * Custom hook que maneja toda la lógica de datos de inscripciones
 * Incluye: carga inicial, filtrado por estado y texto, agregar y confirmar inscripciones
 */
export const useEnrollments = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [statusFilter, setStatusFilter] = useState<EnrollmentStatus | 'all'>('all');
  const [textFilter, setTextFilter] = useState<string>('');

  // Cargar inscripciones al montar el componente
  useEffect(() => {
    setLoading(true);
    fetchEnrollments()
      .then((data) => setEnrollments(data))
      .catch((err) => setError(err instanceof Error ? err : new Error('Failed to fetch enrollments')))
      .finally(() => setLoading(false));
  }, []);

  // Filtrar inscripciones según estado y texto
  const filteredEnrollments = enrollments
    .filter((enrollment) => {
      // Filtro por estado
      const matchesStatus = statusFilter === 'all' || enrollment.status === statusFilter;
      
      // Filtro por texto (nombre o email)
      const searchText = textFilter.toLowerCase();
      const matchesText = 
        enrollment.student_name.toLowerCase().includes(searchText) ||
        enrollment.email.toLowerCase().includes(searchText);
      
      return matchesStatus && matchesText;
    })
    // Ordenar por fecha: más reciente primero
    .slice() // evitamos mutar el array original
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA;
    });

  /**
   * Agrega una nueva inscripción al estado
   */
  const addEnrollment = (enrollment: Enrollment) => {
    setEnrollments([...enrollments, enrollment]);
  };

  /**
   * Confirma una inscripción cambiando su estado a 'confirmed'
   * Usa inmutabilidad para actualizar el estado correctamente
   */
  const confirmEnrollment = (id: string) => {
    setEnrollments(
      enrollments.map((enrollment) =>
        enrollment.id === id
          ? { ...enrollment, status: 'confirmed' as EnrollmentStatus }
          : enrollment
      )
    );
  };

  return {
    enrollments: filteredEnrollments,
    loading,
    error,
    statusFilter,
    textFilter,
    setStatusFilter,
    setTextFilter,
    addEnrollment,
    confirmEnrollment,
  };
};

