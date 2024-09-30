import React from 'react';

interface Props {
  createdAt: string | number | Date;
}

export default function DateTimeDisplay({ createdAt }: Props) {
  const date = new Date(createdAt);
  
  // Usar una zona horaria específica, por ejemplo 'Europe/Madrid'
  const formatter = new Intl.DateTimeFormat('es-ES', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const formattedDate = formatter.format(date);

  return (
    <p className="text-sm">
      <span className="font-semibold">Date:</span> {formattedDate}
    </p>
  );
}