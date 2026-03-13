function HabitCard({
  titulo,
  meta,
  ativo = true,
  diasFeitos = 0,
  categoria = "Geral",
}) {
  const metaAtingida = diasFeitos >= meta;

  const mensagemMeta = metaAtingida
    ? `Meta da semana atingida`
    : `${diasFeitos} de ${meta} dias concluídos.`;

  return (
    <div className="habit-card">
      <h3>{titulo}</h3>
      <p>{mensagemMeta}</p>
      <p>Categoria: {categoria}</p>
      <span>Status: {ativo ? "Ativo" : "Pausado"}</span>

      {metaAtingida && (
        <p>🎉 Parabéns! Você manteve a sequência essa semana !🎉</p>
      )}
    </div>
  );
}

export default HabitCard;
