var userName;
var inputField=document.getElementsByTagName("input");
function btnClicked(){
    if(inputField[0].value.trim() !=""){
        inputField[0].classList.remove('error');
        userName=inputField[0].value.trim();
        // Open the Game page to play
        window.location.href ="gameOn.html"+"?user="+userName;
    }else{
        inputField[0].classList.add('error');
    }
}
