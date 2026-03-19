import "./App.css";
import Footer from "./components/Footer";
import Img from "./components/ImgUrl";
import Header from "./components/Header";
import BemVindo from "./components/BemVindo";
import SecaoHabitos from "./components/SecaoHabitos";
import HabitList from "./components/HabitList";
import { HabitsProvider } from "./contexts/habitsContext";

function App() {
  
  return (
    <HabitsProvider>
      <div className="AplicationReact" style={{ width: '100%' }}>
        <Header
          titulo="My daily Habits"
          descricao="Gerencie seus habitos diarios de forma simples e visual"
        />
        <Img />
        <BemVindo nomeUsuario="Tom"/>

        <SecaoHabitos titulo="Meus Habitos">
          <HabitList/>
        </SecaoHabitos>
        <Footer />
      </div>
    </HabitsProvider>
  );
}

export default App;
