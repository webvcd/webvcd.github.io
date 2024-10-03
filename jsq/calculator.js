var txt = document.getElementById("txt");
//鼠标移开滚条移到最下部
function show(){
    txt.scrollTop = txt.scrollHeight;    
}
//数字键函数
function num(obj){
    txt.value = txt.value + obj.innerHTML;
}
//运算符号函数
function operator(obj){
    if(txt.value.charAt(txt.value.length-2) != '+' && 
    txt.value.charAt(txt.value.length-2) != '-' && 
    txt.value.charAt(txt.value.length-2) != '*' && 
    txt.value.charAt(txt.value.length-2) != '/'){
        txt.value = txt.value + '\n' + obj.innerHTML + ' ';
    }
    else{
        txt.value = txt.value.substring(0,txt.value.length-2) + obj.innerHTML + ' ';        
    }
}
//归零函数
function zero(){
    if(txt.value.indexOf('_')!=-1){
        txt.value = txt.value.substring(0,txt.value.lastIndexOf('_')+2);
    }
    else{
        txt.value = '';
    }
}
//删除函数
function dele(){
    if(txt.value.charAt(txt.value.length-2)!='+' &&
    txt.value.charAt(txt.value.length-2)!='-' &&
    txt.value.charAt(txt.value.length-2)!='*' &&
    txt.value.charAt(txt.value.length-2)!='/'){
        if(txt.value.charAt(txt.value.length-2)!='_'){
            txt.value = txt.value.substring(0,txt.value.length-1);
        }
    }
}
//显示时间函数
function timeshow(){
    var time = new Date();
        var time0 = "      "+time.getFullYear()+"年"+(time.getMonth()+1)+"月"+time.getDate()+"日"+
        '\n'+"       "+time.getHours()+"时"+time.getMinutes()+"分"+time.getSeconds()+"秒"+
        '\n'+" - - - - - - - - - - - - - - - - - "+
        '\n'+"= "+time.getTime()+"毫秒";
        document.getElementById("clock").value = time0;
}
var int = setInterval(timeshow,0.000001);
//转换显示面板函数
var transnum = 0;
function trans(){
    if(transnum%2==0){
        txt.className = "disshow";
        document.getElementById("clock").className = "txt form-control";
    }
    else{
        txt.className = "txt form-control";
        document.getElementById("clock").className = "disshow";
    }
    transnum++;
}
//等号函数
function equa(){
//拿到参与计算的运算符号
    var startplace = txt.value.lastIndexOf('_');
    var str = txt.value.substring(startplace+1);
    var operatorstr = [];
    var j=0;
    for(i=0;i<str.length;i++){
        if(str[i]=='+' || str[i]=='-' || str[i]=='*' || str[i]=='/'){
            operatorstr[j] = str[i];
            j++;
        }
    }
//拿到每个参与计算的数值数组
    str = str.replace(/\n/g,'');
    str = str.replace(/\ /g,'');
    str = str.replace(/\+/g,',');
    str = str.replace(/\-/g,',');
    str = str.replace(/\*/g,',');
    str = str.replace(/\//g,',');
    var numstr = str.split(',');
//%的计算和输入多个%的bug处理
    for(i=0;i<numstr.length;i++){
        if(numstr[i].indexOf('%')!=-1){
            if(numstr[i].indexOf('%')!=numstr[i].length-1){
                operatorstr[operatorstr.length] = ' ';
            }
            else{
                numstr[i] = parseFloat(numstr[i].substring(0,numstr[i].length-1)) / 100;
            }
        }
    }
//输入多个.的bug处理
    var sums = 0;
    for(i=0;i<numstr.length;i++){
        for(j=0;j<numstr[i].length;j++){
            if(numstr[i].charAt(j)=='.'){
                sums = sums + 1;
            }
        }
        if(sums>1){
            operatorstr[operatorstr.length] = ' ';
            break;
        }
        else{
            sums = 0;
        }
    }
//直接按等号的bug处理
    for(i=0;i<numstr.length;i++){
        if(numstr[i]=="undefined" || numstr[i]==' ' || numstr[i]==''){
            numstr[i] = '0';
        }
    }
//先计算乘除
    for(i=0;i<operatorstr.length;i++){
        if(operatorstr[i]=='*' || operatorstr[i]=='/'){
            switch(operatorstr[i]){
                case '*': numstr[i] = parseFloat(numstr[i]) * parseFloat(numstr[i+1]);break;
                case '/': numstr[i] = parseFloat(numstr[i]) / parseFloat(numstr[i+1]);break; 
            }
            operatorstr.splice(i,1);
            numstr.splice(i+1,1);
            i--;
        }
    }
//再计算加减
    for(i=0;i<operatorstr.length;i++){
        switch(operatorstr[i]){
            case '+':numstr[i+1] = parseFloat(numstr[i]) + parseFloat(numstr[i+1]);break;
            case '-':numstr[i+1] = parseFloat(numstr[i]) - parseFloat(numstr[i+1]);break; 
            case ' ' : numstr[i+1] = "计算错误！";alert("输入有误！");
        }
    }
    txt.value =txt.value + '\n' + '=' + ' ' + numstr[numstr.length-1];
    txt.value = txt.value + '\n' + "_ _ _ _ _ _ _ _ _ _ _ _ _ _ _"+ '\n';
    
}
//按钮添加函数
var btns = document.getElementsByTagName("button");
for(var i=0;i<btns.length;i++){
    btns[i].setAttribute("onmouseout","show()");
    switch(i){
        case 0: btns[i].setAttribute("onclick","zero()");break;
        case 1: btns[i].setAttribute("onclick","dele()");break;
        case 3: btns[i].setAttribute("onclick","trans()");break;
        case 4: btns[i].setAttribute("onclick","operator(this)");break;
        case 8: btns[i].setAttribute("onclick","operator(this)");break;
        case 12: btns[i].setAttribute("onclick","operator(this)");break;
        case 16: btns[i].setAttribute("onclick","operator(this)");break;
        case 19: btns[i].setAttribute("onclick","equa()");break;
        default:btns[i].setAttribute("onclick","num(this)");break;
    }
}