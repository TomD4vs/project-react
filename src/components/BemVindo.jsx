import { useHabits } from '../contexts/HabitsContext'

function BemVindo({ nomeUsuario }) {
  const { habits } = useHabits()

  const totalHabitos = habits.length
  const habitosAtivos = habits.filter(h => h.ativo).length

  return (
    <div>
      <h2>Olá, {nomeUsuario.toUpperCase()}!</h2>
      <p>Você tem <strong>{totalHabitos}</strong> hábito(s) cadastrado(s).</p>
      <p><strong>{habitosAtivos}</strong> ativo(s) no momento.</p>
    </div>
  )
}

export default BemVindo
