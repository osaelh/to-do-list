//ADD new To do
const search = document.querySelector('.search input');

const list = document.querySelector('.todos');  

const addForm = document.querySelector('.add'); 
const btn = document.querySelector('.btn');     

const gPop = document.querySelector('.popup-wrapper');
const popup = document.querySelector('.popup'); 

gPop.style.display = "none";


/***************reusable function********************/

/* Function pour l'alert et le popup qui va etre afficher (time control)*/
function start(duree)
{
var o=document.getElementById("sp");
if(duree > 0)
{
o.innerHTML = duree;
gPop.style.display = "block";
setTimeout("start("+duree+" -1)", 1000);
}
else
{
   alert("enter a valid to do");
o.innerHTML ="Au revoir";
gPop.style.display="none";
popup.style.visibility ="hidden";

}};


/* Function Creation dynamique du POPUP */

function create(){
   const div = document.createElement('div');
   div.classList.add('popup-close');
   div.setAttribute('id','closing');
   const text = document.createTextNode('X');
   div.appendChild(text);
   popup.append(div);
   const div2 = document.createElement('div');
   div2.classList.add('popup-content');
   const html = `
   <span id="sp">1</span>
   <h2>Fill the Input</h2>
   <p>Don't forget</p>
   <a href="#">Return</a>`;
   div2.innerHTML=html;
   popup.append(div2); 
   
}

/* Function generation dynamique des TODOS */

const generateTemp = todo =>{
   const html = `
   <li class="list-group-item d-flex justify-content-between align-items-center">
             <span>${todo}</span>
             <i class="fas fa-trash delete"></i>
            </li>
   `;  
   list.innerHTML += html;
   localStorage[''] = list.innerHTML
};

if(localStorage['']){
   list.innerHTML = localStorage[''];
}


/* function pour controller l'evenement et pour ne pas etre repeté à chaque clique */
function onetime(node, type, callback) {

	node.addEventListener(type, function(e) {
	
		e.target.removeEventListener(e.type, arguments.callee);

		return callback(e);
	});
}

onetime(gPop,'click',handler);

    function handler(e){
         
      if(e.target.id='closing'){
   
         gPop.style.display ="none";
   }
}

/***************Fin reusable function********************/




/************* Adding TO DO**************/

//Eventlistner Add TODOS
btn.addEventListener('click',e =>{
   e.preventDefault();
   const add = addForm.add.value;
   const number = 3;
   if(document.querySelector('.popup-content') == null){
      create();
   }
   if (add == ''){
      start(number);
      popup.style.visibility = 'visible'
      
   }
   else{
   generateTemp(add);
   }

   
});

/************* Fin Adding TO DO**************/



/*************Deleting  TO DO**************/
list.addEventListener('click',e =>{

   if(e.target.tagName === 'I'){
      e.target.parentElement.remove();
      localStorage[''] = list.innerHTML
   }

});

/************* Fin Deleting  TO DO**************/




/************************************* SEARCH ITEM********************************************/
//filtering Todos :

//we will apply a class to the Todos that dont match and the that class will

// have keyup event 



const retrieve = (term) =>{

   //function pour faire un filtre i
   var filter, li, a, i, txtValue;
   filter = search.value.toUpperCase();
   li = list.getElementsByTagName("li");
   
   for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("span")[0];
      console.log(a);
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
         li[i].style.display = "";
      } else {
         li[i].style.setProperty('display', 'none', 'important');
         
      }
   }

};  


//evenement de recherche des mots clés 
search.addEventListener('keyup', () =>{

 retrieve();
  

})

/*************************************Fin SEARCH ITEM********************************************/
