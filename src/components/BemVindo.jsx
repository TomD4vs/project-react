const BemVindo = ({ nomeUsuario }) => {
  const nomeFormatado = nomeUsuario.toUpperCase();

  return (
    <div>
      <h2>Olá, {nomeFormatado}!</h2>
    </div>
  );
}

export default BemVindo;