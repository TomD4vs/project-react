import "./App.css";
import Footer from "./components/Footer";
import Img from "./components/ImgUrl";
import Header from "./components/Header";
import BemVindo from "./components/BemVindo";
import SecaoHabitos from "./components/SecaoHabitos";
import HabitList from "./components/HabitList";

function App() {
  
  return (
    <>
      <div className="AplicationReact">
        <Header
          titulo="My daily Habits"
          descricao="Gerencie seus habitos diarios de forma simples e visual"
        />
        <Img />
        <BemVindo nomeUsuario="Tom" />

        <SecaoHabitos titulo="Meus Habitos">
          <HabitList/>
        </SecaoHabitos>
        <Footer />
      </div>
    </>
  );
}

export default App;
