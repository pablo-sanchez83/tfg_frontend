import React from 'react';
import { useParams } from 'react-router-dom';

const Reserva: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Reservar Local</h1>
      <p>ID del Local: {id}</p>
      {/* Aquí puedes agregar más lógica para el proceso de reserva */}
    </div>
  );
};

export default Reserva;
