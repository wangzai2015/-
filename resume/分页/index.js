
var total = 0,totalPage=1,pageNum = 10,curPage = 1;
var page = document.getElementById("page");
var list = document.getElementById("list");
var pagelist = document.getElementById("pagelist");

utils.ajax("data.txt",function(data){
    total = data.length;
    totalPage=Math.ceil(total/pageNum);
    bindData(curPage,data);
    bindPage(curPage,totalPage);

    page.onclick = function(e){
        e=e||window;
        var tar = e.target|| e.srcElement;

        if(tar.tagName.toUpperCase()=="LI"){
            var page = Number(tar.innerHTML);
            curPage = page;
        }else if(tar.id=="first"){
            curPage=1;
        }else if(tar.id=="prev"){
            if(curPage==1){
                return;
            }
            curPage--;
        }else if(tar.id=="next"){
            if(curPage==totalPage){
                return;
            }
            curPage++;
        }else if(tar.id=="last"){
            curPage=totalPage;
        }else if(tar.id="search"){
            return;
        }
        bindData(curPage,data);
        changeBg();
    }
    var search = document.getElementById("search");
    search.onkeyup=function(e){
        if(e.keyCode==13){
            var val = this.value.replace(/(^ +| $)/g,"");
            if(/^(\d|([1-9]\d+))$/.test(val)){
                if(val <1||val>totalPage){
                    val = totalPage;
                    this.value = totalPage;
                }
                curPage = val;
                bindData(curPage,data);
                changeBg();
            }else{
                this.value="";
                this.focus();

            }

        }
    }
});

function bindData(curPage,data){
    var sIndex = (curPage-1)*pageNum;
    var eIndex = curPage*pageNum-1;
    var str="";
    for(var i=sIndex;i<=eIndex;i++){
        var c = i%2===1?"even":"";
        str+="<li class='"+c+"'>";
        var obj = data[i];
        for(var key in obj){
            obj[key]= key==="sex"?obj["sex"]===1?"男":"女":obj[key];
            str+="<span>"+obj[key]+"</span>";
        }
        str+="</li>";
    }
    list.innerHTML=str;
}
function bindPage(curPage,totalPage){
    var str="";
    for(var i=curPage;i<=totalPage;i++){
        var c = i===curPage?"select":"";
        str+="<li class='"+c+"'>"+i+"</li>";
    }
    pagelist.innerHTML=str;
}
function changeBg(){
    var oLis = pagelist.getElementsByTagName("li");
    for(var i=0;i<oLis.length;i++){
        oLis[i].className= i==curPage-1?"select":"";
    }
}