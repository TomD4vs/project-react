function Info() {
  const name = "Tom";
  const newName = name.toUpperCase();
  
  return (
    <div className="Info">
      <h1>My daily Habits</h1>
      <p>Olá, {newName}!</p>
      <p>Gerencie seus habitos diarios de forma simplese visual</p>
    </div>
  );
}

export default Info;
