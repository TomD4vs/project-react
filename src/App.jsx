import "./App.css";
import Footer from "./components/Footer";
import Img from "./components/ImgUrl";
import Header from "./components/Header";
import BemVindo from "./components/BemVindo";

function App() {
  
  return (
    <>
      <div className="AplicationReact">
        <Header titulo="My daily Habits" descricao="Gerencie seus habitos diarios de forma simples e visual" />
        <Img />
        <BemVindo nomeUsuario="Tom" totalHabitos={2} />
        <Footer />
      </div>
    </>
  );
}

export default App;
