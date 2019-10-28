let missionaryCount;
let cannibalCount;
let tracker = [3, 3, 1];
let parent;


document.querySelector('#oneMissionary').addEventListener('click', () => play(1, 0));
document.querySelector('#oneCannibal').addEventListener('click', () => play(0, 1));
document.querySelector('#twoMissionaries').addEventListener('click', () => play(2, 0));
document.querySelector('#twoCannibals').addEventListener('click', () => play(0, 2));
document.querySelector('#oneMissionaryOneCannibal').addEventListener('click', () => play(1, 1));

var buttonGo= document.querySelector('#go');

buttonGo.style.visibility='hidden';

    // take pollito and zorro count and apply appropriate operation

    
const play = (M, C) => {
    missionaryCount = M;
    cannibalCount = C;
    buttonGo.style.visibility='visible';
 //   applyMove(missionaryCount, cannibalCount);
   
}
selectGo();
function selectGo(){

    buttonGo.addEventListener('click', function(){
        applyMove(missionaryCount, cannibalCount);
        buttonGo.style.visibility='hidden';

    });
    
}
// main function 
function applyMove(M, C) {
    parent = tracker;
    // check boat is at right or left bank
    if (tracker[2] == 1) {
        // check Total person in a boat
        if (M + C <= 2) {
            // User Input cannot be greater than available Missionaries and Cannibals.
            if (M > tracker[0] || C > tracker[1]) {
                console.log("Invalid Move");
            } else {
                tracker[0] = tracker[0] - M;
                tracker[1] = tracker[1] - C;
                if (tracker[2] == 1 ? tracker[2] = 0 : tracker[2] = 1);
                console.log(tracker);
                if (tracker[0] == 0 && tracker[1] == 0 && tracker[2] == 0) {
                    console.log("YOU WON");

                    pantalla=3;
                     
                    //Logica de cambiar pantalla
                   
                    

                } else if (checkfromState()) {
                    console.log("Acceptable State");
                } else {
                    tracker = [3, 3, 1];

                    console.log("GAME OVER");

                    //Logica de cambiar pantalla
                    intentos -= 1;
                    if (intentos <= 0) {
                              pantalla=4;

                    }else if(intentos>=1){

                    console.log("ja manga de putitos" + intentos);
                    //  location.reload();
                    console.log("GAME OVER");
                    pantalla=2;
                    }
                }
            }
        } else {
            console.log("Cannot accomodate more than two person in a boat");
        }
    } else {
        // Boat is the right bank case.
        if (M > (3 - tracker[0]) || C > (3 - tracker[1])) {
            console.log("This means invalid input");
        } else {
            tracker[0] = tracker[0] + M;
            tracker[1] = tracker[1] + C;
            (tracker[2] == 1 ? tracker[2] = 0 : tracker[2] = 1);
            console.log(tracker);
            if (tracker[0] == 0 && tracker[1] == 0 && tracker[2] == 0) {
                console.log("YOU WON");
            } else if (checkfromState()) {
                console.log("Acceptable State");
            } else {
                console.log("Game Over");
            }
        }
    }
}
// to check if a state is acceptable or not from the 'state' array
function checkfromState() {
    for (let i = 0; i < state.length; i++) {
        if (state[i].value[0] == tracker[0] && state[i].value[1] == tracker[1] && state[i].value[2] == tracker[2]) {
            return true;
        }
    }
    return false;
}