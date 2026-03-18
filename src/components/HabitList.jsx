import { useEffect, useState, useRef } from "react";
import HabitCard from "./HabitCard";

function HabitList({ }) {

    const [habits, setHabits] = useState(() => {
        const stored = localStorage.getItem('my-daily-habits')

        if (!stored) return [
            { id: 1, nome: "Exercício", descricao: 'Treino de Força', meta: 5, ativo: true, diasFeitos: 5 },
            { id: 2, nome: "Leitura", descricao: 'Livro ou artigo', meta: 1, ativo: false, diasFeitos: 3 },
            { id: 3, nome: "Meditação", descricao: 'Respiração e foco', meta: 3, ativo: true, diasFeitos: 2 },
            { id: 4, nome: "Hidratação", descricao: 'Beber 2L de água', meta: 4, ativo: false, diasFeitos: 6 },
        ]

        try {
            return JSON.parse(stored)
        } catch {
            return []
        }
    })


    useEffect(() => {
        localStorage.setItem('my-daily-habits', JSON.stringify(habits))
    }, [habits])


    const nomeInputRef = useRef(null)
    const metaInputRef = useRef(null)
    const [form, setForm] = useState({
        novoNome: '',
        novaDescricao: '',
        novaMeta: '',
        novaCategoria: '',
    })


    //const { novoNome, novaDescricao, novaMeta, novaCategoria } = form

    const [erroNome, setErroNome] = useState('')
    const [erroMeta, setErroMeta] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target

        // atualiza o objeto `form` (sem precisar de vários useState separados)
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


    const adicionarHabit = (event) => {
        event.preventDefault()

        if (!form.novoNome.trim()) {
            alert('Informe o nome para o habito.')
            return
        }

        // Bloqueia se há erro de validação (qualquer um)
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
            meta: form.novaMeta,
            ativo: true,
            diasFeitos: 0,
            categoria: form.novaCategoria || 'Geral',
        }

        setHabits(prev => [...prev, novoHabit])
        setForm({
            novoNome: '',
            novaDescricao: '',
            novaMeta: '',
            novaCategoria: '',
        })

        // Devolve o foco para o campo nome — useRef em ação
        nomeInputRef.current?.focus()
    }


    const removerHabit = (id) => {
        setHabits(habits.filter(habit => habit.id !== id))
    }


    const limparHistorico = () => {
        localStorage.removeItem('my-daily-habits')
        setHabits([])
    }


    return (

        <section>
            <form onSubmit={adicionarHabit} className="habit-form">
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
                        <label>Meta</label>
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
                        nome={habit.nome}
                        descricao={habit.descricao}
                        meta={habit.meta}
                        ativo={habit.ativo}
                        categoria={habit.categoria}
                        diasFeitos={habit.diasFeitos}
                        onRemover={() => removerHabit(habit.id)}
                    />
                ))}
            </ul>
        </section>
    );
}
export default HabitList;
