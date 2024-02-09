const addBtn = document.querySelector("#btn");
const main  = document.querySelector('#main');

addBtn.addEventListener(
    "click" ,
    function(){
        addNote();
    }
)
const saveNote = ()=> {
    const notes =document.querySelectorAll(".note textarea");
    const data =[];
    
    notes.forEach(
        (note) =>{
           data.push(note.value);
        }
    )
    if (data.length===0) {
        localStorage.removeItem("notes");
    }
    else{
        localStorage.setItem("notes",JSON.stringify(data))
    }
    
}
const addNote = (text = " ") =>{
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
            <i class=" trash fa fa-trash"></i>
            <i class=" save fa fa-save"></i>
        </div>
        <textarea>${text}</textarea>
    
        `
        note.querySelector(".trash").addEventListener(
            "click",
            function(){
                note.remove();
                saveNote();
                
            }
        )
        note.querySelector(".save").addEventListener(
            "click",
            function(){
               saveNote();
            }
        )
        note.addEventListener(
            "focusout",
            function(){
               saveNote();
            }
        )

    main.appendChild(note);
    saveNote();
}

(
    function(){
    const lsNotes = JSON.parse(localStorage.getItem("notes"));
    // console.log(lsNotes)
    if(lsNotes===null){
        addNote();
    }
    else{
        lsNotes.forEach(
            (lsNotes)=>{
              addNote(lsNotes)
            }
        )
    }
    
     }
)()