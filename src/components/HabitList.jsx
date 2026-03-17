import { useEffect, useState } from "react";
import HabitCard from "./HabitCard";

function HabitList({ }) {

    const [habits, setHabits] = useState(() => {
        const stored = localStorage.getItem('my-daily-habits')
        
        if(!stored) return [
            { id: 1, nome: "Exercício", descricao: 'Treino de Força', meta: 5, ativo: true, diasFeitos: 5 },
            { id: 2, nome: "Leitura", descricao: 'Livro ou artigo', meta: 1, ativo: false, diasFeitos: 3 },
            { id: 3, nome: "Meditação", descricao: 'Respiração e foco', meta: 3, ativo: true, diasFeitos: 2 },
            { id: 4, nome: "Hidratação", descricao: 'Beber 2L de água', meta: 4, ativo: false, diasFeitos: 6 },
        ]

        //se há dados salvos - tenta fazer o parse
        try{
            return JSON.parse(stored)
        } catch {
            // se o json estiver corrompido volta para o array inicial
            return []
        }
    })

    const [novoNome, setNovoNome] = useState('')
    const [novaDescricao, setnovaDescricao] = useState('')
    const [novaMeta, setnovaMeta] = useState('')
    const [novaCategoria, setnovaCategoria] = useState('')

    //conceitos de useEffect
    useEffect(() => {
        localStorage.setItem('my-daily-habits', JSON.stringify(habits))
    }, [habits])


    const adicionarHabit = (event) => {
        event.preventDefault()

        if (!novoNome.trim()) {
            alert('Informe o nome para o habito.')
            return
        }

        const novoHabit = {
            id: Date.now(),
            nome: novoNome,
            descricao: novaDescricao,
            meta: novaMeta,
            ativo: true,
            diasFeitos: 0,
            categoria: novaCategoria || 'Geral',
        }

        setHabits([...habits, novoHabit])

        //Limpar os campos após add
        setNovoNome('')
        setnovaDescricao('')
        setnovaMeta('')
        setnovaCategoria('')
    }

    const removerHabit = (id) => {
        setHabits(habits.filter(habit => habit.id !== id))

    }

    const limparHistorico = () =>{
        localStorage.removeItem('my-daily-habits')
        setHabits([
            { id: 1, nome: "Exercício", descricao: 'Treino de Força', meta: 5, ativo: true, diasFeitos: 5 },
            { id: 2, nome: "Leitura", descricao: 'Livro ou artigo', meta: 1, ativo: false, diasFeitos: 3 },
        ])
    }

    return (
        
        <section>
            <form onSubmit={adicionarHabit} className="habit-form">
                <div>
                    <label>
                        Nome do hábito *
                        <input
                            type="text"
                            value={novoNome}
                            onChange={(e) => setNovoNome(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Descrição
                    </label>
                    <input
                        type="text"
                        value={novaDescricao}
                        onChange={(e) => setnovaDescricao(e.target.value)}
                    />
                </div>

                <div>
                    <label>
                        Meta
                    </label>
                    <input
                        type="number"
                        value={novaMeta}
                        onChange={(e) => setnovaMeta(e.target.value)}
                    />
                </div>

                <div>
                    <label>
                        Categoria

                        <input
                            type="text"
                            value={novaCategoria}
                            onChange={(e) => setnovaCategoria(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Adicionar hábito</button>
            </form>

            <ul>
                <button onClick={limparHistorico}>Limpar Historico</button>
                {habits.length === 0
                    ? <p>Nenhum hábito cadastrado ainda. Que tal começar?</p>
                    : <p>Você tem {habits.length} hábito(s) cadastrado(s).</p>
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
