import { useState } from 'react';
import './Autenticacao.css';

function Registo({ go }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const criarConta = event => {
    event.preventEvent?.();
    event.preventDefault();
    go('oferecer');
  };

  return <main className="auth-screen">
    <section className="auth-card">
      <div className="auth-brand"><span>ISTE</span><strong>ISTECaminho</strong></div>
      <h1>Criar conta</h1>
      <p>Preenche os dados para entrares na comunidade.</p>
      <form onSubmit={criarConta}>
        <label>Nome completo<input value={nome} onChange={e => setNome(e.target.value)} placeholder="João Martins" required /></label>
        <label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nome@istec.pt" required /></label>
        <label>Palavra-passe<input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Mínimo 6 caracteres" minLength="6" required /></label>
        <button className="auth-submit" type="submit">Criar conta</button>
      </form>
      <button className="auth-link" onClick={() => go('login')}>Já tens conta? <strong>Iniciar sessão</strong></button>
    </section>
  </main>;
}

export default Registo;
