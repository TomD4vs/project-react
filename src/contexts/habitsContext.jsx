import { createContext, useContext, useState, useEffect } from "react";

const HabitsContext = createContext(null)

export function HabitsProvider({ children }) {
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

    const toggleAtivo = (id) => {
        setHabits(prev =>
            prev.map(h => h.id === id ? { ...h, ativo: !h.ativo } : h)
        )
    }

    useEffect(() => {
        localStorage.setItem('my-daily-habits', JSON.stringify(habits))
    }, [habits])

    const adicionarHabit = (novoHabit) => {
        setHabits(prev => [...prev, novoHabit])
    }

    const removerHabit = (id) => {
        setHabits(prev => prev.filter(h => h.id !== id))
    }

    const limparHabits = () => {
        setHabits([])
    }


    return (
        <HabitsContext.Provider value={{ habits, adicionarHabit, removerHabit, toggleAtivo, limparHabits }}>
            {children}
        </HabitsContext.Provider>
    )
}

export function useHabits() {
    return useContext(HabitsContext)
}