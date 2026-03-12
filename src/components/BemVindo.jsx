const BemVindo = ({ nomeUsuario, totalHabitos }) => {
  const nomeFormatado = nomeUsuario.toUpperCase();

  const mensagem =
    totalHabitos > 0
      ? `Você tem ${totalHabitos} hábitos cadastrados!`
      : `Nenhum hábito cadastrado ainda. Vamos criar o primeiro?`;

  return (
    <div>
      <h2>Olá, {nomeFormatado}!</h2>
      <p>{mensagem}</p>
      <p> Hoje são: {new Date().toLocaleDateString()} </p>
    </div>
  );
}

export default BemVindo;
