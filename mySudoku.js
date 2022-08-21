var puzzleBoard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solveButton')
//console.log(puzzleBoard)
const squares = 81
var data = []
var count = 1;
for(let i = 0; i < squares ; i++){
    const buttonInput = document.createElement('input')
    buttonInput.setAttribute('type', 'number')
    buttonInput.setAttribute('min',1)
    buttonInput.setAttribute('max',9)
    puzzleBoard.appendChild(buttonInput)
}

function collectData(){
    const place = document.querySelectorAll("input")
    place.forEach((item) =>{
        if(item.value){
            data.push(Number(item.value));
        }
        else{
            data.push(0);
        }
    })  
}

function solve(){
    data = []
    collectData();
    console.log(data);
    const options = {
      method: 'POST',
      url: 'https://sudoku-solver3.p.rapidapi.com/sudokusolver/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '582db29a52mshf48e68f0442df61p1eb657jsnb332d6e0df76',
        'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com'
      },
      data: {
        "input":data}
    };
    
    axios.request(options).then(function (response) {
        console.log(response.data.answer);
        //fillData(response.data)
        
        const allInputs = document.querySelectorAll("input")
        response.data.answer.forEach((item,i)=>{
            allInputs[i].value = item

        })
        
    }).catch(function (error) {
       // console.error(error);
    });
}

function fillData(arr){
    const allInputs = document.querySelectorAll("input")
    for(let i=0; i<allInputs.length;i++){
        allInputs[i].value = arr[i]
    }
}

function test(data){
    data.forEach(i =>{
        document.write(i)
    })

}

solveButton.addEventListener('click',solve);

