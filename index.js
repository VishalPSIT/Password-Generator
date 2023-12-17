const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-length]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const upperCaseCheck = document.querySelector("#uppercase");
const lowerCaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector("[data-createPassword]");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = "!@#$%&~"
let password="";
let passwordLength = 10 ;
let checkCount = 0 ; 

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}
handleSlider();

function setIndicator(color){
    indicator.style.backgroundColor = color;

}


function getRandomInteger(min , max){
    return Math.floor(Math.random() * (max - min))+min;
}


function generateRandomNumber(){
    return getRandomInteger(0,9);

}


function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}


function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}


function generateSymbol(){
    const randNumb= getRandomInteger(0 , symbols.length);
    return symbols.charAt(randNumb);
}



// to check strength of the password
function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (upperCaseCheck.checked) hasUpper =true;
    if (lowerCaseCheck.checked) hasLower = true;
    if (numberCheck.checked) hasNum = true;
    if (symbolCheck.checked) hasSym = true;
    if (hasLower && hasUpper && (hasNum || hasSym) && passwordLength <= 8 ){
        setIndicator("#0f0");
    }else if ((hasLower || hasUpper) && (hasNum ||hasSym) && passwordLength >= 6){
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
} 

//copy to clip board
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied" ; 

    }
    catch(e){
        copyMsg.innerText = "Failed";
    }
     ///to make copy span visible;
     copyMsg.classList.add("active");
     setTimeout(()=>{
        copyMsg.classList.remove("active");
     },2000);

}

//event listeners
//generating password
inputSlider.addEventListener('input' , (e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

copybtn.addEventListener('click' , ()=>{
    if (passwordDisplay.value)
        copyContent();
})
function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    })
}
allCheckBox.forEach( (checkbox)=> {
    checkbox.addEventListener('change',handleCheckBoxChange);
})

generateBtn.addEventListener('click' , () =>{
    //non of the checkbox are ticked
    if (checkCount <= 0) return;
    if (passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    

    //remove old password;
    password="";

    //creating new password
    // if (upperCaseCheck.checkbox){
    //     password += generateUpperCase(); 
    // }

    // if (lowerCaseCheck.checkbox){
    //     password += generateLowerCase(); 
    // }

    // if (numberCheck.checkbox){
    //     password += generateRandomNumber(); 
    // }

    // if (symbolCheck.checkbox){
    //     password += generateSymbol(); 
    // }/

    let funcArr=[];
    if (upperCaseCheck.checked){
        funcArr.push(generateUpperCase);
    }
    if (lowerCaseCheck.checked){
        funcArr.push(generateLowerCase);
    }
    if (numberCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if (symbolCheck.checked){
        funcArr.push(generateSymbol);
    }


    //compulsory addition
    for (let i=0 ; i<funcArr.length ; i++){
        password += funcArr[i]();

    }

    for (let i = 0 ; i<passwordLength-funcArr.length ; i++){
        let randIndex  = getRandomInteger(0 , funcArr.length);
        password += funcArr[randIndex]();

    }


    //shuffle
    function shufflePassword (array){
        //fisher Yates Method
        for (let i = array.length-1 ; i>0 ; i--){
            const j = Math.floor(Math.random()*(i+1));
            const temp = array[i];
            array[i]=array[j];
            array[j] =temp;

        }
        let str ="";
        array.forEach((el) => (str+=el));
        return str;

    }
    password = shufflePassword(Array.from(password));
    
    passwordDisplay.value = password;
    calcStrength();
    console.log("hello 1");

})