import { useState } from 'react';
import './App.css';
import Calendario from './calendario/Calendario';
import Login from './autenticacao/Login';
import Registo from './autenticacao/Registo';

const routes = [
  { id: 'oferecer', label: 'Oferecer boleia', icon: '+' },
  { id: 'perfil', label: 'Minha conta', icon: '♙' },
];

function Icon({ name }) {
  const icons = {
    pin: '⌖', arrow: '›', car: '▰', clock: '◷', seat: '♙' , home: '⌂' , search: '⌕' , plus: '+' , user: '♙' , bag: '◫' , calendar: '□' , check: '✓' , close: '×'
  };
  return <span className="icon" aria-hidden="true">{icons[name] || ''}</span>;
}

function Brand() {
  return <div className="brand"><span className="brand-mark">ISTE</span><span>ISTECaminho</span></div>;
}

function BottomNav({ active, onChange }) {
  return <nav className="bottom-nav" aria-label="Navegação principal">
    {routes.map(item => <button key={item.id} className={active === item.id ? 'active' : ''} onClick={() => onChange(item.id)}>
      <span className="nav-icon">{item.icon}</span><span>{item.label}</span>
    </button>)}
  </nav>;
}

function TopBar({ title, onBack }) {
  return <header className="topbar">
    {onBack ? <button className="back-button" onClick={onBack} aria-label="Voltar">‹</button> : <div />}
    <strong>{title}</strong><span className="profile-dot">RM</span>
  </header>;
}

function Confirmation({ go }) {
  return <section className="screen">
    <TopBar title="Confirmação de reserva" onBack={() => go('oferecer')} />
    <div className="screen-content confirm-content">
      <div className="success-mark"><Icon name="check" /></div>
      <h1>Boleia oferecida!</h1>
      <p className="subtitle">A tua boleia ficou disponível para os passageiros.</p>
      <h3>Detalhes da boleia</h3>
      <div className="trip-summary"><div><span className="avatar">RM</span><span><strong>João Martins</strong><small>Condutor · 5 viagens</small></span></div><strong>08:30</strong></div>
      <div className="compact-route"><span /><div><strong>Residência do ISTEC</strong><small>08:30</small></div></div>
      <div className="compact-route destination"><span /><div><strong>ISTEC Barreiro</strong><small>08:43</small></div></div>
      <button className="primary-button" onClick={() => go('oferecer')}>Voltar às boleias</button>
    </div>
  </section>;
}

function Offer({ go }) {
  const [hora, setHora] = useState('08:30');
  const [horaAberta, setHoraAberta] = useState(false);
  const [repeticao, setRepeticao] = useState('Qualquer dia');
  const [repeticaoAberta, setRepeticaoAberta] = useState(false);
  const horas = ['00:00','00:30','01:00','01:30','02:00','02:30','03:00','03:30','04:00','04:30','05:00','05:30','06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00','23:30'];
  const repeticoes = ['Qualquer dia', 'Todos os dias', 'Dias úteis'];

  return <section className="screen">
    <TopBar title="Oferecer boleia" />
    <div className="screen-content offer-content">
      <h1>O teu caminho para o campus</h1>
      <Calendario />
      <div className="repeat-picker">
        <button type="button" onClick={() => setRepeticaoAberta(aberta => !aberta)}>
          <span><Icon name="calendar" /></span>
          <span><strong>Repetição</strong><small>{repeticao}</small></span>
          <span className="time-chevron">⌄</span>
        </button>
        {repeticaoAberta && <div className="repeat-options">
          {repeticoes.map(opcao => <button type="button" key={opcao} className={repeticao === opcao ? 'selected' : ''} onClick={() => { setRepeticao(opcao); setRepeticaoAberta(false); }}>
            {opcao}{repeticao === opcao && <span>✓</span>}
          </button>)}
        </div>}
      </div>
      <div className="ride-options">
        <button type="button"><Icon name="pin" /><span><strong>Local de partida</strong><small>Residência ISTEC</small></span></button>
        <div className="time-picker-wrap">
          <button type="button" className="time-picker" onClick={() => setHoraAberta(aberta => !aberta)}>
            <span><Icon name="clock" /></span>
            <span><strong>Hora de partida</strong><small className="hora-selecionada">{hora}</small></span>
            <span className="time-chevron">⌄</span>
          </button>
          {horaAberta && <div className="time-options">
            {horas.map(opcao => <button type="button" key={opcao} className={hora === opcao ? 'selected' : ''} onClick={() => { setHora(opcao); setHoraAberta(false); }}>
              {opcao}{hora === opcao && <span>✓</span>}
            </button>)}
          </div>}
        </div>
        <button type="button"><Icon name="seat" /><span><strong>Lugares disponíveis</strong><small>3 lugares</small></span></button>
      </div>
      <button className="primary-button" onClick={() => go('confirmacao')}>Partilhar boleia às {hora} <Icon name="arrow" /></button>
    </div>
  </section>;
}

function Profile({ go }) {
  return <section className="screen"><TopBar title="Minha conta" /><div className="screen-content profile-content"><div className="large-avatar">RM</div><h1>João Martins</h1><p className="subtitle">ISTEC Barreiro</p><div className="profile-list"><button><span>Minhas viagens</span><Icon name="arrow" /></button><button><span>Pagamentos</span><Icon name="arrow" /></button><button><span>Definições</span><Icon name="arrow" /></button></div><button className="primary-button logout-button" onClick={() => go('login')}>Terminar sessão</button></div></section>;
}

export default function App() {
  const [screen, setScreen] = useState('login');
  const navigate = id => setScreen(id);

  if (screen === 'login') return <Login go={navigate} />;
  if (screen === 'registo') return <Registo go={navigate} />;

  const mobileScreens = ['oferecer','perfil'];
  return <main className="app-shell">
    <aside className="desktop-sidebar">
      <Brand />
      <nav>{routes.map(item => <button key={item.id} className={screen === item.id ? 'active' : ''} onClick={() => navigate(item.id)}><span>{item.icon}</span>{item.label}</button>)}</nav>
    </aside>
    <div className="app-content">
      {screen === 'confirmacao' && <Confirmation go={navigate} />}
      {screen === 'oferecer' && <Offer go={navigate} />}
      {screen === 'perfil' && <Profile go={navigate} />}
    </div>
    {mobileScreens.includes(screen) && <BottomNav active={screen} onChange={navigate} />}
  </main>;
}
