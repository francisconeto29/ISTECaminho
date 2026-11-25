import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendario.css';

function Calendario() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  return (
    <section className="calendario" aria-label="Calendário">
      <h2>Calendário</h2>
      <Calendar
        locale="pt-PT"
        value={dataSelecionada}
        onChange={setDataSelecionada}
      />
      <p className="data-selecionada">
        Data selecionada: {dataSelecionada.toLocaleDateString('pt-PT')}
      </p>
    </section>
  );
}

export default Calendario;
