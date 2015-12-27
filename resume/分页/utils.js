
var createXML = (function(){
    if("XMLHttpRequest" in window){
        return function(){
            return new XMLHttpRequest();
        }
    }
    if(new ActiveXObject("Microsoft.XMLHTTP")){
        return function () {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }
    }
    if(new ActiveXObject("Msxml2.XMLHTTP")){
        return function () {
            return new ActiveXObject("Msxml2.XMLHTTP")
        }
    }
    if(new ActiveXObject("Msxml3.XMLHTTP")){
        return function () {
            return new ActiveXObject("Msxml3.XMLHTTP")
        }
    }
})();
var utils = {
    toJson : function(str){
        return "JSON" in window?JSON.parse(str):eval("("+str+")");
    },
    ajax : function(url,callback){
        url+=url.indexOf("?")>-1?"&_="+Math.random:"?_="+Math.random();
        var _this = this;
        var xml = createXML();
        xml.open("get",url);
        xml.onreadystatechange = function(){
            if(xml.readyState ==4&&/^2\d{2}$/.test(this.status)){
                var val = this.responseText;
                val = _this.toJson(val);
                typeof callback ==="function"?callback(val):null;
            }
        }
        xml.send();
    }
}