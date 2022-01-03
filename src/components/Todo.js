import { useState } from 'react'
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from "react-icons/ri"; 
import { TiEdit } from "react-icons/ti";

// Bu componentle genel olarak editleme, silme, ekleme, üstünü çizme gibi işlevleri kazandırdık.

const  Todo = ({todos, completeTodo, removeTodo, updateTodo}) => {

    // Editleyeceğimiz zaman id ve value değerinin tamamen sıfırlanmasını sağladık. Aslında sadece varsayılanın nesne olduğunu belirtsek değişen bir şey olmazdı, çünkü yeni id ve value kısmını zaten edit kısmında veriyoruz ama alaşılması için bu şekilde yaptık.
const [edit, setEdit] = useState({
    id: null,
    value: ""
})

const submitUpdate = value => {
    updateTodo(edit.id, value)
    setEdit({
        id: null, 
        value: ""
    })
}

 if(edit.id) {
         return <TodoForm edit={edit} add={submitUpdate} />
 }
    //  console.log(todos)
     // React'de map methodunu uygularken her div'in özgün bir key'i olması gerekiyor, o yüzden index'i ekledik ve yapacağımız işlemler tüm todo listesi için geçerli olacağından TodoList componentinden propslar aracılığı ile aldığımız todos state'ini ortak bir parantezde mapledik.
    return todos.map((todo, index) => ( 
        <div className={todo.completed ? "complete todo-row " : "todo-row"} 
        key={index} 
        > 
        {/* yukardaki kod basitçe toggle gibi davranarak classlarımızın üzerine tıklayınca değişmesini sağladı*/}
    
       <div key={todo.id} onClick={() => completeTodo(todo.id)}> 
         {todo.text} 
        </div> 
        {/* Yukarda döndürdüğümüz obje içinde id değerinin unique olduğunu bildiğimiz için direk todo.id dedik. Submit butonuna basınca inputa yazdığımız yazının "{todo.text}" kaydedilmesini sağladık. Burda hangi item'a basıldığını anladık */}

        <div className="icons">
            <RiCloseCircleLine // Seçtiğimiz icon'un ismini girdik.
                onClick={() => removeTodo(todo.id)}
                className="delete-icon"
            />
            <TiEdit
            onClick={() =>
            setEdit({id: todo.id, value: todo.text})} // Yeni bir id değeri ve girilen değeri set ettik.
            className="edit-icon"
            />
        </div>
    </div>
    ))
}

export default Todo

// terminalde "npm install react-icons" yazarak react icons bağımlılığını indirdik, react-iconsun sitesinden istediğimiz icon'u seçtik.
