/**
 * Created by mshuang on 2017/6/10.
 */
window.onload = function(){
//eventUtil�����ʹ��
    var EventUtil = {
        addHandler:function(element,type,handler){
            //�������֧��addeventListener:����addeventListener�����click�¼�
            if(element.addEventListener){
                element.addEventListener(type,handler,false);
            }else if(element.attachEvent){
                element.attachEvent("on"+type,handler);
            }else{
                //���������ַ�������֧�֣�����Ĭ�Ϸ������onclick�¼�
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
    var timer = null; //��ʱ��
    var targetNode = null; //Ҫ�������ı��ڵ�

    //������ȱ���
    function dfs(node){
        if(node != null){
            order.push(node);
            for(var i=0; i<node.children.length; i++){
                dfs(node.children[i]);
            }
        }
    }

    //������ȱ���
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
        //��һ��ƥ�䵽
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
                        alert("δ���������ַ�");
                    }
                }
            },500)
        }
    }

    //��ʼ��
    function init(){
        index = 0;
        order = [];
        clearInterval(timer);
        var divList = document.getElementsByTagName("div");
        for(var i=0; i<divList.length; i++){
            divList[i].style.backgroundColor = '#fff';
        }
    }

    //��ӽڵ�
    function add_node(txt){
        var parent_node = this;
        var new_node = document.createElement('div');
        new_node.innerText = txt;
        new_node.className = 'newNode';
        new_node.style.backgroundColor = '#fff';
        new_node.style.border = '1px solid black';

        parent_node.appendChild(new_node);

    }

    //ɾ���ڵ�
    function del_node(){
        var parent_node = this.parentNode;
        parent_node.removeChild(this);
        targetNode = null;
    }

    //ѡ�еĽڵ������ʾ
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

    //Ϊ��ť���¼�
    //������ȱ���
    EventUtil.addHandler(dftBtn,"click", function () {
        init();
        dfs(root);
        changeColor();
        targetNode = null;
    });

    //������ȱ���
    EventUtil.addHandler(bftBtn,"click", function () {
        init();
        bfs();
        changeColor();
        targetNode = null;
    });

    //�¼ӽڵ�
    EventUtil.addHandler(addBtn,"click",function (event) {
        if(targetNode != null){
            var txt = document.getElementById('target').value;
            if(txt != ""){
                var txtArray = [].concat(txt);
                add_node.apply(targetNode,txtArray);
                highlight();
                txt = "";
            }else{
                alert("����������ӵĽڵ�����");
            }
        }else{
            alert("����ѡ��ڵ�");
        }
    });

    //ɾ���ڵ�
    EventUtil.addHandler(delBtn,"click",function () {
        if(targetNode != null){
            var divList = document.getElementsByTagName('div');
            if(divList.length>1){
                del_node.call(targetNode);
            }else{
                alert("�ڵ���ĿΪ1���벻Ҫɾ��");
            }
        }else{
            alert("��ѡ�нڵ�");
        }
    });

    highlight();

}
