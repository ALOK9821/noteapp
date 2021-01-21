console.log("Welcome to my notes taking website");
// calling display funtion to initially display
displaynotes();
let count = Math.floor((Math.random() * 1000) + 1);
quote(count);
// process to add a node to the list 
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click",function(e){
    let addtxt = document.getElementById("addtxt");
    let notes = localStorage.getItem("notes");
    let date,time,alok;
    const options= { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    alok = new Date();
    date=alok.toLocaleDateString(undefined,options);
    time= alok.getHours() + ":"+ alok.getMinutes();
    if(notes == null){
        notesobj = [];
    }
    else{
        notesobj = JSON.parse(notes);
    }
    notesobj.push(addtxt.value + `<p style="font-size: 13px;"><br>Noted on :- ${date} <br> Time:- ${time}<p>`);
    localStorage.setItem("notes",JSON.stringify(notesobj));
    addtxt.value ="";
    console.log(notesobj);
    displaynotes();
})
// funtion to display all the nodes 
function displaynotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesobj = [];
    }
    else{
        notesobj = JSON.parse(notes);
    }
    let htm ="";
    notesobj.forEach(function(element,index) {
        
        htm += `
        <div class="card notecard my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="NOTE">NOTE NO. ${index+1}</h5>
          <p class="card-text">${element} </p>
          <button id="${index}" onclick="deletenote(this.id)" class="btn btn-primary">DELETE</button>
        </div>
        </div>
        `
    });
    let noteselm =document.getElementById("notes");
    if(noteselm.length !=0){
        noteselm.innerHTML=htm;
    }
}
// function to display all the nodes
function deletenote(index){
    // console.log('delte it mf');
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesobj = [];
    }
    else{
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesobj));
    displaynotes();
}
// process to search the notes
let search = document.getElementById('txtsearch');
search.addEventListener("input",function(){
    // console.log("input event fired");
    let inputvalue = search.value.toLowerCase();
    let notecard = document.getElementsByClassName('notecard');
    console.log(notecard);
    Array.from(notecard).forEach(function(element){
        let cardtxt = element.getElementsByTagName('p')[0].innerText;
        // console.log(cardtxt);
        if(cardtxt.includes(inputvalue)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})
// completed the initial programming of the website
// function to diaplay time on the jumbotron
distime();
function distime(){
let date,time,alok;
const options= { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
setInterval(() => {
    alok = new Date();
    date=alok.toLocaleDateString(undefined,options);
    time= alok.getHours() + ":"+ alok.getMinutes()+":"+alok.getSeconds();
    document.getElementById('writehere').innerHTML= time+" "+ date;
}, 1000);
}
function quote(count){
fetch("https://type.fit/api/quotes").then(function(response) {
    return response.json();
  }).then(function(data) {
      let myquote = JSON.stringify(data[count]);
    let quot= document.getElementById('quote');
    let ans = "";
    for(let i=8;i<myquote.length;i++){
        if(myquote[i]!= `"` && myquote[i]!= `}`){
            ans+=myquote[i];
        }
    }
    quot.innerHTML = `<b>${ans}</b>`;
   console.log(data[count]);
});
}
















