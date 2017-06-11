/**
 * Created by mshuang on 2017/6/10.
 */
window.onload = function(){
//eventUtil对象的使用
    var EventUtil = {
        addHandler:function(element,type,handler){
            //若浏览器支持addeventListener:则用addeventListener来添加click事件
            if(element.addEventListener){
                element.addEventListener(type,handler,false);
            }else if(element.attachEvent){
                element.attachEvent("on"+type,handler);
            }else{
                //若以上两种方法都不支持，则用默认方法添加onclick事件
                element["on"+ type] = handler;
            }
        }
    };

    var root = document.getElementById("root");
    var dftBtn = document.getElementsByTagName("button")[0];
    var bftBtn = document.getElementsByTagName("button")[1];
    var addBtn = document.getElementsByTagName("button")[2];
    var delBtn = document.getElementsByTagName("button")[3];

    var order = [];
    var timer = null; //定时器
    var targetNode = null; //要搜索的文本节点

    //深度优先遍历
    function dfs(node){
        if(node != null){
            order.push(node);
            for(var i=0; i<node.children.length; i++){
                dfs(node.children[i]);
            }
        }
    }

    //广度优先遍历
    function bfs(node){
        if(node!=null){
            order.push(node);
            bfs(node.nextElementSibling);
            node = order[index++];
            bfs(node.firstElementChild);
        }
    }

    function changeColor(txt){
        var i=0;
        //第一次匹配到
        if(order[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g,"") == txt){
            order[i].style.backgroundColor = '#00f';
        }else{
            order[i].style.backgroundColor = '#f00';
            timer = setInterval(function(){
                i++;
                if(i<order.length){
                    order[i-1].style.backgroundColor = '#fff';
                    if(order[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g,"") == txt){
                        order[i].style.backgroundColor = '#00f';
                        clearInterval(timer);
                    }else{
                        order[i].style.backgroundColor = '#f00';
                    }
                }else{
                    clearInterval(timer);
                    order[order.length-1].style.backgroundColor = "#fff";
                    if(txt != null){
                        alert("未搜索到该字符");
                    }
                }
            },500)
        }
    }

    //初始化
    function init(){
        index = 0;
        order = [];
        clearInterval(timer);
        var divList = document.getElementsByTagName("div");
        for(var i=0; i<divList.length; i++){
            divList[i].style.backgroundColor = '#fff';
        }
    }

    //添加节点
    function add_node(txt){
        var parent_node = this;
        var new_node = document.createElement('div');
        new_node.innerText = txt;
        new_node.className = 'newNode';
        new_node.style.backgroundColor = '#fff';
        new_node.style.border = '1px solid black';

        parent_node.appendChild(new_node);

    }

    //删除节点
    function del_node(){
        var parent_node = this.parentNode;
        parent_node.removeChild(this);
        targetNode = null;
    }

    //选中的节点高亮显示
    function highlight(){
        var divList = document.getElementsByTagName('div');
        for(var i=0; i<divList.length;i++){
            EventUtil.addHandler(divList[i],"click", function (event) {
                init();
                this.style.backgroundColor = '#0f0';
                event.stopPropagation();
                targetNode = this;
            });
        }
    }

    //为按钮绑定事件
    //深度优先遍历
    EventUtil.addHandler(dftBtn,"click", function () {
        init();
        dfs(root);
        changeColor();
        targetNode = null;
    });

    //广度优先遍历
    EventUtil.addHandler(bftBtn,"click", function () {
        init();
        bfs();
        changeColor();
        targetNode = null;
    });

    //新加节点
    EventUtil.addHandler(addBtn,"click",function (event) {
        if(targetNode != null){
            var txt = document.getElementById('target').value;
            if(txt != ""){
                var txtArray = [].concat(txt);
                add_node.apply(targetNode,txtArray);
                highlight();
                txt = "";
            }else{
                alert("请输入想添加的节点内容");
            }
        }else{
            alert("请先选择节点");
        }
    });

    //删除节点
    EventUtil.addHandler(delBtn,"click",function () {
        if(targetNode != null){
            var divList = document.getElementsByTagName('div');
            if(divList.length>1){
                del_node.call(targetNode);
            }else{
                alert("节点数目为1，请不要删除");
            }
        }else{
            alert("请选中节点");
        }
    });

    highlight();

}
