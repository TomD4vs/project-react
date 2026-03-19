function Info() {
  const name = "Tom";
  const newName = name.toUpperCase();
  
  return (
    <div className="Info">
      <h1>Meus Habitos diários</h1>
      <p>Olá, {newName}!</p>
      <p>Gerencie seus habitos diarios de forma simples e visual</p>
    </div>
  );
}

export default Info;
