import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import HabitCard from "./HabitCard";
import { useHabits } from "../contexts/HabitsContext";

function HabitList() {
    const { habits, adicionarHabit, removerHabit, toggleAtivo, limparHabits } = useHabits()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        novoNome: '',
        novaDescricao: '',
        novaMeta: '',
        novaCategoria: '',
    })

    const nomeInputRef = useRef(null)
    const metaInputRef = useRef(null)

    const [erroNome, setErroNome] = useState('')
    const [erroMeta, setErroMeta] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))

        if (name === 'novoNome') {
            if (value.length > 0 && value.length < 3) {
                setErroNome('o nome deve ter pelo menos 3 caracteres.')
            } else {
                setErroNome('')
            }
        }

        if (name === 'novaMeta') {
            const num = Number(value)
            if (!value || Number.isNaN(num) || num < 1 || num > 7) {
                setErroMeta('Meta deve ser entre 1 e 7 dias.')
            } else {
                setErroMeta('')
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!form.novoNome.trim() || erroNome) {
            nomeInputRef.current?.focus()
            return
        }

        if (erroNome || erroMeta) {
            if (erroNome) {
                nomeInputRef.current?.focus()
            } else {
                metaInputRef.current?.focus()
            }
            return
        }

        const novoHabit = {
            id: Date.now(),
            nome: form.novoNome,
            descricao: form.novaDescricao,
            meta: Number(form.novaMeta),
            ativo: true,
            diasFeitos: 0,
            categoria: form.novaCategoria || 'Geral',
        }

        adicionarHabit(novoHabit)
        setForm({ novoNome: '', novaDescricao: '', novaMeta: '', novaCategoria: '' })
        setErroNome('')
        setErroMeta('')
        nomeInputRef.current?.focus()
    }

    const limparHistorico = () => {
        localStorage.removeItem('my-daily-habits')
        limparHabits()
    }

    return (
        <section>
            <form onSubmit={handleSubmit} className="habit-form">
                <div className="form-grid">
                    <div className="full-width">
                        <label>Nome do hábito *</label>
                        <input type="text" name="novoNome" value={form.novoNome} onChange={handleChange} ref={nomeInputRef} />
                        {erroNome && <p style={{ color: 'red', fontSize: '0.8rem' }}>{erroNome}</p>}
                    </div>
                    <div className="full-width">
                        <label>Descrição</label>
                        <input type="text" name="novaDescricao" value={form.novaDescricao} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Meta (dias por semana)</label>
                        <input type="number" name="novaMeta" min="1" max="7" value={form.novaMeta} ref={metaInputRef} onChange={handleChange} />
                        {erroMeta && <p style={{ color: 'red', fontSize: '0.8rem' }}>{erroMeta}</p>}
                    </div>
                    <div>
                        <label>Categoria</label>
                        <input type="text" name="novaCategoria" value={form.novaCategoria} onChange={handleChange} />
                    </div>
                </div>
                <button type="submit">Adicionar hábito</button>
            </form>

            <ul>
                <button className="btn-limpar" onClick={limparHistorico}>Limpar Histórico</button>
                {habits.length === 0
                    ? <p>Nenhum hábito cadastrado ainda. Que tal começar?</p>
                    : <p className="habits-count">Você tem {habits.length} hábito(s) cadastrado(s).</p>
                }

                {habits.map((habit) => (
                    <HabitCard
                        key={habit.id}
                        id={habit.id}
                        nome={habit.nome}
                        descricao={habit.descricao}
                        meta={habit.meta}
                        ativo={habit.ativo}
                        categoria={habit.categoria}
                        diasFeitos={habit.diasFeitos}
                        onRemover={() => removerHabit(habit.id)}
                        onToggle={() => toggleAtivo(habit.id)}
                    />
                ))}
            </ul>
        </section>
    )
}

export default HabitList;