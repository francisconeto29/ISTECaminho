import { useState } from 'react';
import './Autenticacao.css';

function Registo({ go }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const criarConta = async event => {
    event.preventDefault();
    setErro('');

    try {
      const resposta = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha })
      });
      const dados = await resposta.json();
      if (!resposta.ok) throw new Error(dados.message);

      localStorage.setItem('istecaminho_token', dados.token);
      localStorage.setItem('istecaminho_user', JSON.stringify(dados.user));
      go('oferecer');
    } catch (error) {
      setErro(error.message);
    }
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
        {erro && <p className="auth-error">{erro}</p>}
        <button className="auth-submit" type="submit">Criar conta</button>
      </form>
      <button className="auth-link" onClick={() => go('login')}>Já tens conta? <strong>Iniciar sessão</strong></button>
    </section>
  </main>;
}

export default Registo;
