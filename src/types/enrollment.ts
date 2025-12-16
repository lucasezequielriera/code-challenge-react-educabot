/**
 * Tipo que representa el estado de una inscripción
 */
export type EnrollmentStatus = 'pending' | 'confirmed' | 'cancelled';

/**
 * Tipo que representa una inscripción completa
 */
export interface Enrollment {
  id: string;
  student_name: string;
  email: string;
  workshop: string;
  status: EnrollmentStatus;
  created_at: string;
}

