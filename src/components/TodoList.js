import { useState, useEffect} from 'react'
import TodoForm from "./TodoForm"; // Componentleri import ederken oluşturacağımız değişken büyük harfli olmalı.
import Todo from './Todo';
import axios from 'axios';

// TodoList Componentini doğrudan App.js'e import ettiğimiz için bu componenti ana component gibi düşünebiliriz yani diğer tüm componentleri bu componente import edip altta istediğimiz sırada return ettik. // listeleme işlemi yapacağımız için "[]" kullandık.
    function TodoList( ) {

    const [todos, setTodos] = useState([]); 

    /*Daha sonra local stroge'a gönderdiğimiz veriyi almalıyız bunu da getItem methoduyla yapıyoruz ve getItem methodu sadece key parametresi alır. Daha önce stringe çevirdiğimiz için verileri bu şekilde aldığımızda string olarak gelir ve biz bunu kendi uygulamamızda kullanabilmemiz için objeye çevirmemiz gerekiyor, bunuda JSON.parse methoduyla yaptık. Yani JSON.parse string ifadeleri objeye çevirir. */
    useEffect(() => {
    const todos = localStorage.getItem("todos")
    setTodos(JSON.parse(todos))
    }, [])

    /* Local Storage'da setItem methodu 2 parametre alır key ve value olarak. Aşağıda value parametresini todos yazsaydım o nesne olarak giderdi ancak biz web sunucuya verileri gönderirken onları string olarak göndeririz o yüzden biz JSON.stringify methodunu kullanarak nesneyi stringe çevirdik. */
    useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
    })

    const baseUrl = "https://61c458fef1af4a0017d994c8.mockapi.io/Crud"

    const getData = async () => {
        return await axios.get(`${baseUrl}`)
    }

    // useEffect(() => {
    //      axios.get(`${baseUrl}/`)
    //      .then((res) => {
    //      console.log("Getting from MockApi :", res.data);
    //      setTodos(res.data)
    //      }).catch(err => console.log(err))
    //  }, []);
    
        // 3 karekterden az veya sadece (+,-,*,?,!) gibi girdilerden oluşmuyorsa girdiyi dön aksi halde dönme demiş olduk.
    const addTodo = async (todo) => {
        await axios.post(`${baseUrl}/`, todo)
        if(!/(.*[a-z]){3}/i.test(todo.text)) {
         return;
        }
        
    getData().then(r=>setTodos(r.data))
    const newTodos = [ todo, ...todos  ]; 
        setTodos(newTodos);
        };
 
    const updateTodo = (todoId, newValue) => {
        // axios.put(`${baseUrl}${todoId}`, newValue.text)
         if(!/(.*[a-z]){3}/i.test(newValue.text)) {
                return;
        }
        

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item  ))) 
    // Üzerine tıklandıysa yani submit edildiyse editlenen değeri tıklanmadıysa önceki değeri dön dedik.
        }

        // Mevcut todo listesini filtreledik ve dedik ki üstüne tıklanmayanlar kalsın daha sonrada değişikliği set ettik.
    const removeTodo =  (id) => {
         axios.delete(`${baseUrl}/${id}`)
      
    const removeArr = [...todos].filter(todo => todo.id !== id)
        setTodos(removeArr);
  }

    // Burda listedeki taskların id'si ile completeTodo'nun id'si eşleşirse, yani üzerine tıklanırsa mevcut durumun tersini olusmasını sağladık yani true ise false false ise true gibi, sonrasında da bu yaptığımız değişikli setTodos ile set ettik. 
    const completeTodo = id => { 
        let updatedTodos = todos.map( todo => {
            if (todo.id === id ) {
                todo.completed = !todo.completed
            }
            return todo
        })
        setTodos(updatedTodos)
    }
    return ( 
        <div>
            <h1> What's the Plan for 2022?</h1>
            <TodoForm 
            add={addTodo} 
            />  
            <Todo
            todos={todos}
            completeTodo={completeTodo} 
            removeTodo={removeTodo}
            updateTodo={updateTodo}
            />
        </div>
        
    )
}

export default TodoList

// Oluşturduğumuz fonksiyonları propslar aracılığı ile diğer componentler tarafından kullanılabilecek hale getirdik. Mesela {addTodo} fonksiyonunu add ismiyle TodoForm componentine yolladık. Onu orada kullanmak için propsları al anlamında önce TodoForm componentinin içine props yazdık, sonra ise props.add diyerek aşağıda kullandık.

// Diğer yöntem ise direk TodoForm componentinin ana fonksiyonuna alacağımız fonksiyonun ismini yazıp direk kullanmak, bunu yaparken süslü parantezi kullanmayı unutmamak lazım. Yani TodoForm'dan ilgili props'u alırken function TodoForm( {add} ) olarak almalıyız.



