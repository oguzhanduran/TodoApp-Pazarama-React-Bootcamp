import './App.css';
import TodoList from "./components/TodoList"; // Tüm componentleri TodoList componentinde düzenledik ve app.js'e import ettik.


function App() {

  
  return (
    <div className="todo-app">
      <TodoList/>
    </div>
  );
}

export default App;
  
