import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useHabits } from '../contexts/HabitsContext'

function PaginaDetalhes() {
    const { id } = useParams()
    const { habits, removerHabit, editarHabit } = useHabits()
    const navigate = useNavigate()

    const habit = habits.find(h => h.id === Number(id))

    const [editando, setEditando] = useState(false)
    const [form, setForm] = useState({})
    const [erroNome, setErroNome] = useState('')
    const [erroMeta, setErroMeta] = useState('')

    if (!habit) {
        return (
            <main className="pagina-detalhes">
                <h1>Hábito não encontrado</h1>
                <button onClick={() => navigate('/habitos')}>← Voltar para a lista</button>
            </main>
        )
    }

    const metaAtingida = habit.diasFeitos >= habit.meta

    const handleRemover = () => {
        removerHabit(habit.id)
        navigate('/habitos')
    }

    const handleEditarAbrir = () => {
        setForm({
            nome: habit.nome,
            descricao: habit.descricao,
            meta: habit.meta,
            categoria: habit.categoria || 'Geral',
        })
        setErroNome('')
        setErroMeta('')
        setEditando(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))

        if (name === 'nome') {
            setErroNome(value.length > 0 && value.length < 3 ? 'O nome deve ter pelo menos 3 caracteres.' : '')
        }
        if (name === 'meta') {
            const num = Number(value)
            setErroMeta(!value || Number.isNaN(num) || num < 1 || num > 7 ? 'Meta deve ser entre 1 e 7 dias.' : '')
        }
    }

    const handleSalvar = (e) => {
        e.preventDefault()
        if (!form.nome.trim() || erroNome || erroMeta) return

        editarHabit(habit.id, {
            nome: form.nome.trim(),
            descricao: form.descricao.trim(),
            meta: Number(form.meta),
            categoria: form.categoria.trim() || 'Geral',
        })
        setEditando(false)
    }

    return (
        <main className="pagina-detalhes">
            <button onClick={() => navigate(-1)} className="btn-voltar">← Voltar</button>

            <div className="detalhe-card">
                {!editando ? (
                    <>
                        <div className="detalhe-topo">
                            <h1>{habit.nome}</h1>
                            <button onClick={handleEditarAbrir} className="btn-editar">Editar</button>
                        </div>

                        <p>{habit.descricao}</p>

                        <ul className="detalhe-info">
                            <li><strong>Categoria:</strong> {habit.categoria || 'Geral'}</li>
                            <li><strong>Meta semanal:</strong> {habit.meta} dias</li>
                            <li><strong>Dias feitos:</strong> {habit.diasFeitos}</li>
                            <li>
                                <strong>Status:</strong>{' '}
                                <span style={{ color: habit.ativo ? '#16a34a' : '#9ca3af' }}>
                                    {habit.ativo ? '✅ Ativo' : '⏸️ Pausado'}
                                </span>
                            </li>
                            {metaAtingida && <li>🏆 Meta da semana atingida!</li>}
                        </ul>

                        <button onClick={handleRemover} className="btn-remover">Remover hábito</button>
                    </>
                ) : (
                    <>
                        <div className="detalhe-topo">
                            <h1>Editar hábito</h1>
                        </div>

                        <form onSubmit={handleSalvar} className="habit-form detalhe-form">
                            <div className="form-grid">
                                <div className="full-width">
                                    <label>Nome *</label>
                                    <input
                                        type="text"
                                        name="nome"
                                        value={form.nome}
                                        onChange={handleChange}
                                        autoFocus
                                    />
                                    {erroNome && <p style={{ color: 'red', fontSize: '0.8rem', margin: '4px 0 0' }}>{erroNome}</p>}
                                </div>
                                <div className="full-width">
                                    <label>Descrição</label>
                                    <input
                                        type="text"
                                        name="descricao"
                                        value={form.descricao}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Meta (dias por semana)</label>
                                    <input
                                        type="number"
                                        name="meta"
                                        min="1"
                                        max="7"
                                        value={form.meta}
                                        onChange={handleChange}
                                    />
                                    {erroMeta && <p style={{ color: 'red', fontSize: '0.8rem', margin: '4px 0 0' }}>{erroMeta}</p>}
                                </div>
                                <div>
                                    <label>Categoria</label>
                                    <input
                                        type="text"
                                        name="categoria"
                                        value={form.categoria}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="detalhe-form-acoes">
                                <button type="submit" className="btn-salvar">Salvar alterações</button>
                                <button type="button" className="btn-cancelar" onClick={() => setEditando(false)}>Cancelar</button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </main>
    )
}

export default PaginaDetalhes