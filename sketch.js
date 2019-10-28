let initialState = [3, 3, 1];
let goalState = [0, 0, 0];
let state = [];
let killedState = [];
let iterator = true;
var intentos = 3;
let puntajeAsignado=0;

// create an object for individual state
class CreateState { 
  constructor() {
    this.value;
    this.parent;
    this.visited;
    this.x;
    this.y;
  }
}
// Creating a root node.
var  rootNode = new CreateState();
rootNode.value = initialState;
rootNode.parent = initialState;
rootNode.visited = false;


let imgInstruc;
let imgZorro;
let imgConejo;
let imgFondo;
let imgBarca;
let imgLose;
let imgWin;
let pantalla;
let cora;
let espacioVida;
let imgResumen;

function  preload(){

  imgBarca= loadImage('/img/barca.png');
  imgConejo= loadImage('/img/pollo.png');
  imgZorro= loadImage('/img/zorro.png');  
  imgFondo= loadImage('/img/fondo.png');
  imgInstruc= loadImage('/img/instruc.png');
   imgWin=loadImage('/img/win.png')
  imgLose=loadImage('/img/lose.png');
  cora=loadImage('/img/cora.png');
  espacioVida=loadImage('/img/espacioVida.png');
  imgResumen=loadImage('/img/resultados.png');

}

function setup() {
  frameRate(3);
  createCanvas(windowWidth, windowHeight - 100);
  // set x and y position of the root node.
  rootNode.x = windowWidth / 2;
  rootNode.y = 70;
  state.push(rootNode);
  while(iterator) {
    applyOperation(state[state.length - 1])
  }
  console.log("State:");
  console.log(state);
  console.log("Killed State:");
  console.log(killedState);
  
  imageMode(CENTER);

  pantalla=1;
}
function draw() {

  console.log('estoy en pantalla: '+pantalla);
  switch(pantalla){

    case 0:
    
    image(imgInstruc,width/2,height/2);

    break;

    case 1:
    image(imgFondo,width/2,height/2);

    image(espacioVida,width-400,100);
    for(let h=0; h<intentos; h++){
      image(cora,(width-400)+ h*40, 100);
    }

    // set boat position
    let x;
    if(tracker[2] == 1) {
       x = windowWidth / 2 - 80;
    }else if(tracker[2]==0) {
       x = windowWidth / 2 + 80;
    }
    //Barca
    image(imgBarca,x, height/2 +180);
  
  
    // MISSIONARIES
    //izquierda
    for(let i = 0; i < tracker[0]; i++) {
    
       image(imgConejo,width/2-300 +i*50, height/2+125);
    }
    for(let i = 0; i < 3 - tracker[0]; i++) {
     
     image(imgConejo,width/2+300 +i*50, height/2+125); 
    }
    for(let j = 0; j < tracker[1]; j++) {
      // CANNIBALS
      image(imgZorro, 280+j*60, height/2+130);
    }
    
    j = 0;
    for(let j = 0; j < 3 - tracker[1]; j++) {
      // CANNIBALS
      //derecha
      image(imgZorro,980+j*60, height/2+130);
    }

    break;
    case 2:
    image(imgLose,width/2,height/2);
    break;
    case 3:
    image(imgWin,width/2,height/2);
    break;
    case 4:
    image(imgResumen,width/2,height/2);
    break;

  }

  
    
}

function mouseClicked(){
 console.log(mouseX +","+ mouseY);
  if(pantalla == 0 && mouseX >= 689 && mouseX< 815 && mouseY >=550 && mouseY< 587 ){
    
    pantalla=1;
  }
 if(pantalla==2 && mouseY>=389 && mouseY<=429 && mouseX>697 && mouseX<832){
  pantalla=1; 
 }
 if(pantalla==3 && mouseY>=389 && mouseY<=429 && mouseX>697 && mouseX<832){
   //EL PARTICIPANTE GANO SI ESTA EN ESTA PANTALLA Y SE LE ASIGNA UN PUNTAJE DEPENDIENDO CUANTOS INTENTOS UTILIZO
   if(intentos==3){
    puntajeAsignado=100;
  }else if(intentos==2){
    puntajeAsignado=75;
  } else if(intentos==1){
    puntajeAsignado=50;
  }
//CAMBIAR DE PANTALLA 
  console.log('el puntaje asignado es: '+puntajeAsignado);

 }

 if(pantalla==4 && mouseY>=389 && mouseY<=429 && mouseX>697 && mouseX<832){
    
  //EL USUARIO PERDIO SI ESTA EN ESTA PANTALLA, PONER AQUI EL CAMBIO DE GAME
 
}


}

// Generate new states from parent state.
function applyOperation(tempState) {
    if(tempState.visited === true) {
      killedState.push(state[state.length - 1]);
      state.splice(state.length - 1, 1);
    }else {
    tempState.visited = true;
    boatPosition = tempState.value[2];
    // If Boat is at the left bank
    if(boatPosition === 1) {   
      // console.log("boat is going from Left to Right"); 
      
      // 2 Missionaries
      if(tempState.value[0] >= 2) {
        addState(tempState, [tempState.value[0] - 2, tempState.value[1] - 0, 0]);
      }       
      // 1 Missionary
      if(tempState.value[0] >= 1) {
        addState(tempState, [tempState.value[0] - 1, tempState.value[1] - 0, 0]);
      }  
      // 2 Cannibals
      if(tempState.value[1] >= 2) {
        addState(tempState, [tempState.value[0] - 0, tempState.value[1] - 2, 0]);
      }                      
      // 1 Missionary and 1 Cannibal
      if(tempState.value[0] >= 1 && tempState.value[1] >= 1) {
        addState(tempState, [tempState.value[0] - 1, tempState.value[1] - 1, 0]);
      }
      // 1 Cannibal
      if(tempState.value[1] >= 1) {
        addState(tempState, [tempState.value[0] - 0, tempState.value[1] - 1, 0]);
      }          
    } else if(boatPosition === 0) {
      // If Boat is at the right bank.
      // 1 Missionary and 1 Cannibal
      if(initialState[0] - tempState.value[0] > 0) {
        addState(tempState, [tempState.value[0] + 1, tempState.value[1] + 0, 1]);
      }
      // 1 Cannibal
      if(initialState[1] - tempState.value[1] > 0) {
        addState(tempState, [tempState.value[0] + 0, tempState.value[1] + 1, 1]);
      }
      // 2 Missionary
      if(initialState[0] - tempState.value[0] > 2) {
        addState(tempState, [tempState.value[0] + 2, tempState.value[1] + 0, 1]);
      }
      // 2 Cannibals
      if(initialState[1] - tempState.value[1] > 2) {
        addState(tempState, [tempState.value[0] + 0, tempState.value[1] + 2, 1]);
      }
      // 1 Missionary and 1 Cannibal
      if((initialState[0] - tempState.value[0] > 0) && (initialState[1] - tempState.value[1] > 0)) {
        addState(tempState, [tempState.value[0] + 1, tempState.value[1] + 1, 1]);
      }      
    }
  }
}
// Function to check and add/delete the newly generated states.
function addState(parent, value) {
  var temp = new CreateState();
  temp.value = value;
  temp.parent = parent.value;
  temp.visited = false;
  if(goalState[0] === value[0] && goalState[1] === value[1]) {
    state.push(temp);
    iterator = false;
  }else if((temp.value[0] === 0) || temp.value[0] >= temp.value[1]) {
    if((3 - temp.value[0] === 0) || (3 - temp.value[0] >= 3 - temp.value[1])){
      if(repetitionChecker(value)) {
        killedState.push(temp);
      } else {
        state.push(temp);
      }
    }else {
      killedState.push(temp);
    }
  }else if(temp.value[0] < temp.value[1]) {
    killedState.push(temp); 
  }
}
// Function to check whether a state already exists or not in the array
function repetitionChecker(value) {
  for(let i = 0; i < state.length; i++) {
    if(state[i].value[0] === value[0] && state[i].value[1] === value[1] && state[i].value[2] === value[2]) {
      return true;
    }
  }
  return false;
}

function getPantalla(){
  return pantalla;
}
