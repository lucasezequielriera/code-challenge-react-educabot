import React from "react";
import { Card, CardContent, Stack, Box, Typography } from "@mui/material";
import { EnrollmentFilters } from "./EnrollmentFilters";
import { EnrollmentsTable } from "./EnrollmentsTable";
import type { Enrollment, EnrollmentStatus } from "../types/enrollment";

type EnrollmentsSectionProps = {
  /** Lista de inscripciones ya filtradas y ordenadas desde el hook */
  enrollments: Enrollment[];
  /** Filtro actual por estado */
  statusFilter: EnrollmentStatus | "all";
  /** Filtro actual de texto (nombre / email) */
  textFilter: string;
  /** Callback para actualizar el filtro por estado */
  onStatusFilterChange: (filter: EnrollmentStatus | "all") => void;
  /** Callback para actualizar el filtro de texto */
  onTextFilterChange: (text: string) => void;
  /** Acción para confirmar una inscripción */
  onConfirmEnrollment: (id: string) => void;
  /** Acción para cancelar una inscripción */
  onCancelEnrollment: (id: string) => void;
};

/**
 * Sección principal de inscripciones:
 * - Título
 * - Filtros (estado + texto)
 * - Tabla de inscripciones
 *
 * Encapsula la card completa para mantener App.tsx más simple y legible.
 */
export const EnrollmentsSection: React.FC<EnrollmentsSectionProps> = ({
  enrollments,
  statusFilter,
  textFilter,
  onStatusFilterChange,
  onTextFilterChange,
  onConfirmEnrollment,
  onCancelEnrollment,
}) => {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          {/* Encabezado con título y filtros alineados */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography variant="h6">Enrollments List</Typography>

            <EnrollmentFilters
              currentFilter={statusFilter}
              textFilter={textFilter}
              onFilterChange={onStatusFilterChange}
              onTextFilterChange={onTextFilterChange}
            />
          </Box>

          {/* Tabla de inscripciones */}
          <EnrollmentsTable
            enrollments={enrollments}
            onConfirm={onConfirmEnrollment}
            onCancel={onCancelEnrollment}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};


