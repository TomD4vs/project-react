import "./App.css";
import Footer from "./components/Footer";
import Img from "./components/ImgUrl";
import Header from "./components/Header";
import BemVindo from "./components/BemVindo";
import SecaoHabitos from "./components/SecaoHabitos";
import HabitList from "./components/HabitList";

function App() {
  const habits = [
    { id: 1, titulo: "Drink Water", meta: 5, ativo: true, diasFeitos: 5 },
    { id: 2, titulo: "Exercise", meta: 1, ativo: false, diasFeitos: 3 },
    { id: 3, titulo: "Meditação", meta: 3, ativo: true, diasFeitos: 2 },
    { id: 4, titulo: "Hidratação", meta: 4, ativo: false, diasFeitos: 6 },
  ];

  return (
    <>
      <div className="AplicationReact">
        <Header
          titulo="My daily Habits"
          descricao="Gerencie seus habitos diarios de forma simples e visual"
        />
        <Img />
        <BemVindo nomeUsuario="Tom" totalHabitos={habits.length} />

        <SecaoHabitos titulo="Meus Habitos">
          <HabitList habits={habits} />
        </SecaoHabitos>
        <Footer />
      </div>
    </>
  );
}

export default App;
