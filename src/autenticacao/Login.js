import { useState } from 'react';
import './Autenticacao.css';

function Login({ go }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const entrar = event => {
    event.preventDefault();
    go('oferecer');
  };

  return <main className="auth-screen">
    <section className="auth-card">
      <div className="auth-brand"><span>ISTE</span><strong>ISTECaminho</strong></div>
      <h1>Bem-Vindo</h1>
      <p>Inicia sessão para encontrar ou oferecer boleias.</p>
      <form onSubmit={entrar}>
        <label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nome@my.istec.pt" required /></label>
        <label>Palavra-passe<input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="••••••••" required /></label>
        <button className="auth-submit" type="submit">Iniciar sessão</button>
      </form>
      <button className="auth-link" onClick={() => go('registo')}>Ainda não tens conta? <strong>Criar conta</strong></button>
    </section>
  </main>;
}

export default Login;
