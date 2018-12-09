var userName;
var inputField=document.getElementsByTagName("input");
function btnClicked(){
    if(inputField[0].value.trim() !=""){
        inputField[0].classList.remove('error');
        userName=inputField[0].value.trim();
        window.location.href ="arbaaz-khan.github.io/gameOn.html"+"?user="+userName;
    }else{
        inputField[0].classList.add('error');
    }
}
