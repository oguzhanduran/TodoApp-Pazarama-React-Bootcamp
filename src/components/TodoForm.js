import { useState, useEffect, useRef } from 'react'


function TodoForm( props ) {
    

    const [input, setInput] = useState(props.edit ? props.edit.value : ''); // input state'in değerini, setInput ise state'i güncelleyeceğimiz fonksiyonu temsil eder.

    const  inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    })

    // input değişikliği tetiklendiği anda value (state'e input olarak yazdığımız değer) yeni bir değer olarak set edilmesini sağlar. Yani handleChange fonsiyonunu yazdıktan hemen sonra console.log(input) dersek her girdide console güncellenir. Yani her girilen değeri value olarak alır diyebiliriz.
    const handleChange = event => { 
        setInput(event.target.value)  
    }

    //normalde varsayılan olarak form etiketi endpointe veri gönderir veya çeker bu durumu önlemek için "preventDefault()" kullanıyoruz. Oluşturduğumuz fonksiyonu form etiketine ekledik.
    const handleSubmit = event => { 
        event.preventDefault();

        // Burda class component kullanılsaydı aşağıdaki girilen nesne this.props.onSubmit olarak alınırdı. 
             props.add({
            id: Math.floor(Math.random() * 10000), // Props ile aldığımız objelere (0 -9999) arasında rastgele bir değer atadık. Amacımız her girdi için farklı bir id değeri oluşturmak.
            text: input // Eklenen her değeri o inputun ismi olarak atadık.
            });

         setInput("")  // Submit ettikten sonra inputun temizlenmesini sağladık.  
    };


    return (
         
            <form className="todo-form" onSubmit={handleSubmit}> 
            <input
            type="text" // Tek satırlık metin alanı tanımlar.
            placeholder='Add a todo'
            value={input} // state'de tanımladığımız değeri value olarak atadık.
            name='text' // <input> etiketinin adını belirtir.
            className='todo-input' 
            onChange={handleChange} // inputtaki metin değiştiği zaman handleChange fonksiyonun çalışmasını sağladık.
            ref={inputRef}
            />

            

            <button className='todo-button'> Submit </button> 
             </form>
             // input ve buton aynı form etiketinin içinde olduğu için direk butona tıkladığımızda inputu tetikler form etiketi kullanmasaydık onclick kullanmamız gerekirdi.
        
    )
}

export default TodoForm

    // </form> etiketinin varsayılan bir davranışı var formun gideceği bir endpoint olur veri oraya gider veya ordan veri çeker. Dolayısıyla burda bir sayfa yenilenme işlemi olur. Bizim varsayılan işlemi submit işlemi yapıldığında durdurmamız lazım. Onuda preverntDefault komutuyla durdurabiliriz.

    // <input name="text"/> <input> etiketinin adını belirtir.Name özelliği form gönderildikten sonra form verilerine başvurmak için yada Javascript ile forma ulaşmak için kullanılır.