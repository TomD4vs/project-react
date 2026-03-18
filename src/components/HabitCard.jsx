function HabitCard({
    nome,
    descricao = '',
    meta,
    ativo = true,
    diasFeitos = 0,
    categoria,
    onRemover
}) {
    const metaAtingida = diasFeitos >= meta;

    const mensagemMeta = metaAtingida
        ? `🏆 Meta da semana atingida`
        : `${diasFeitos} de ${meta} dias concluídos.`;

    return (
        <li className="habit-card">
            <h3>{nome}</h3>
            {descricao && <p>{descricao}</p>}
            <div className="card-meta">
                <span className="card-badge">{categoria}</span>
                <span className="card-status">{ativo ? '✅ Ativo' : '⏸️ Pausado'}</span>
                <span className="card-status">{mensagemMeta}</span>
            </div>
            {metaAtingida && <p>🎉 Parabéns! Você manteve a sequência essa semana!</p>}
            {onRemover && (
                <button type="button" onClick={onRemover}>
                    Remover
                </button>
            )}
        </li>
    );
}

export default HabitCard;
