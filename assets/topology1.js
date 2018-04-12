// jtopo 数据回显
var imgPath = '../topology/assets/icons/',//图片文件地址
    lineStyle = {
    line10: {lw: 2, color: '51,51,51', text: '10Kwv', arrows: 0},
    line35: {lw: 2.5, color: '24,121,117', text: '35Kwv', arrows: 0},
    line60: {lw: 3, color: '36,129,201', text: '60Kwv', arrows: 8},
    line110: {lw: 3.5, color: '191,65,206', text: '110Kwv', arrows: 12},
    line220: {lw: 4, color: '224,45,45', text: '220Kwv', arrows: 12}},
    toolData = list = [{
        name: '电源', child: [
            {name: '供电电源', url: imgPath+'powerplant.png', type: 'node', dt: 'powerplant', drag: true}
        ]
    },
    {
        name: '线缆', child: [
            {name: '10Kwv', url: imgPath+'line0.png', type: 'line', dt: 'line10', drag: false},
            {name: '35Kwv', url: imgPath+'line1.png', type: 'line', dt: 'line35', drag: false},
            {name: '60Kwv', url: imgPath+'line2.png', type: 'line', dt: 'line60', drag: false},
            {name: '110Kwv', url: imgPath+'line3.png', type: 'line', dt: 'line110', drag: false},
            {name: '220Kwv', url: imgPath+'line4.png', type: 'line', dt: 'line220', drag: false}
        ]
    },
    {
        name: '结算单元', child: [
            {name: '基本信息', url: imgPath+'trans0.png', type: 'node', dt: 'unit', drag: true},
            {name: '转供信息', url: imgPath+'trans1.png', type: 'node', dt: 'unit', drag: true},
            {name: '电价执行信息', url: imgPath+'trans2.png', type: 'node', dt: 'unit', drag: true},
            {name: '线路与线损', url: imgPath+'trans3.png', type: 'node', dt: 'unit', drag: true},
            {name: '变压器与变损', url: imgPath+'trans0.png', type: 'node', dt: 'unit', drag: true},
            {name: '其他信息', url: imgPath+'trans1.png', type: 'node', dt: 'unit', drag: true}
        ]
    },{
        name: '电能表', child: [
            {name: '电能表', url: imgPath+'user.png', type: 'node', dt: 'energy', drag: true}
        ]
    },{
        name: '互感器', child: [
            {name: '互感器', url: imgPath+'user.png', type: 'node', dt: 'inductor', drag: true}
        ]
    }],
   /*  nodes1 ={
        "name": "210.27.48",
        "pt": {
            "x": 200,
            "y":200
        },
        "nodelist": [
            {
                "name": "210.27.48.30",
                "img": imgPath+'powerplant.png',
                "pt": {
                    "x": 300,
                    "y":200
                },
                "nodelist":[
                    {
                        "name": "210.27.48.30:1",
                        "img": imgPath+'user.png',
                        "nodelist":[],
                        "pt": {
                            "x": 400,
                            "y":200
                        },
                    }
                ]
            },
            {
                "name": "210.27.48.31",
                "img": imgPath+'user.png',
                "pt": {
                    "x": 300,
                    "y":260
                },
                "nodelist":[],
            },
            {
                "name": "210.27.48.32",
                "img": imgPath+'user.png',
                "pt": {
                    "x": 300,
                    "y":320
                },
                "nodelist":[],
            }
        ]
    }, */
    nodes = {
        "version": "0.4.8",
        "deviceNum": "20",
        "frames": 24,
        "wheelZoom": 0.95,
        "childs": [{
            "elementType": "scene",
            "backgroundColor": "255,255,255",
            "mode": "normal",
            "paintAll": false,
            "areaSelect": true,
            "translate": true,
            "translateX": 0,
            "translateY": 0,
            "alpha": 0,
            "visible": true,
            "scaleX": 1,
            "scaleY": 1,
            "childs": [{
                "elementType": "node",
                "x": 246,
                "y": 161,
                "width": 32,
                "height": 32,
                "visible": true,
                "alpha": 1,
                "rotate": 0,
                "scaleX": 1,
                "scaleY": 1,
                "strokeColor": "22,124,255",
                "fillColor": "22,124,255",
                "shadow": false,
                "shadowColor": "rgba(0,0,0,0.5)",
                "shadowOffsetX": 3,
                "shadowOffsetY": 6,
                "transformAble": true,
                "zIndex": 3,
                "dragable": true,
                "selected": false,
                "showSelected": true,
                "isMouseOver": false,
                "deviceId": "219980641086.6398",
                "remark": "",
                "dataType": "powerplant",
                "nodeImage": "powerplant.png",
                "text": "",
                "font": "12px Consolas",
                "fontColor": "#222",
                "textPosition": "Bottom_Center",
                "textOffsetX": 0,
                "textOffsetY": 0,
                "borderRadius": null
            }, {
                "elementType": "node",
                "x": 313,
                "y": 401,
                "width": 32,
                "height": 32,
                "visible": true,
                "alpha": 1,
                "rotate": 0,
                "scaleX": 1,
                "scaleY": 1,
                "strokeColor": "22,124,255",
                "fillColor": "22,124,255",
                "shadow": false,
                "shadowColor": "rgba(0,0,0,0.5)",
                "shadowOffsetX": 3,
                "shadowOffsetY": 6,
                "transformAble": true,
                "zIndex": 3,
                "dragable": true,
                "selected": false,
                "showSelected": true,
                "isMouseOver": false,
                "deviceId": "1482390965475.3909",
                "remark": "",
                "dataType": "unit",
                "nodeImage": "trans1.png",
                "text": "",
                "font": "12px Consolas",
                "fontColor": "#222",
                "textPosition": "Bottom_Center",
                "textOffsetX": 0,
                "textOffsetY": 0,
                "borderRadius": null
            }, {
                "elementType": "link",
                "x": 0,
                "y": 0,
                "width": 32,
                "height": 32,
                "visible": true,
                "alpha": 1,
                "rotate": 0,
                "scaleX": 1,
                "scaleY": 1,
                "strokeColor": "24,121,117",
                "fillColor": "22,124,255",
                "shadow": "false",
                "shadowColor": "rgba(0,0,0,0.5)",
                "shadowOffsetX": 3,
                "shadowOffsetY": 6,
                "transformAble": false,
                "zIndex": 2,
                "dragable": false,
                "selected": false,
                "showSelected": true,
                "isMouseOver": false,
                "deviceId": "1353486464906.0295",
                "deviceA": "219980641086.6398",
                "deviceZ": "1482390965475.3909",
                "lineType": "flexLine",
                "topoLineType": "line35",
                "text": "35Kwv",
                "font": "12px Consolas",
                "fontColor": "24,121,117",
                "lineWidth": 2.5,
                "lineJoin": "miter"
            }],
            "childsNode": [{
                "elementType": "node",
                "x": 246,
                "y": 161,
                "width": 32,
                "height": 32,
                "visible": true,
                "alpha": 1,
                "rotate": 0,
                "scaleX": 1,
                "scaleY": 1,
                "strokeColor": "22,124,255",
                "fillColor": "22,124,255",
                "shadow": false,
                "shadowColor": "rgba(0,0,0,0.5)",
                "shadowOffsetX": 3,
                "shadowOffsetY": 6,
                "transformAble": true,
                "zIndex": 3,
                "dragable": true,
                "selected": false,
                "showSelected": true,
                "isMouseOver": false,
                "deviceId": "219980641086.6398",
                "remark": "",
                "dataType": "powerplant",
                "nodeImage": "powerplant.png",
                "text": "",
                "font": "12px Consolas",
                "fontColor": "#222",
                "textPosition": "Bottom_Center",
                "textOffsetX": 0,
                "textOffsetY": 0,
                "borderRadius": null
            }, {
                "elementType": "node",
                "x": 313,
                "y": 401,
                "width": 32,
                "height": 32,
                "visible": true,
                "alpha": 1,
                "rotate": 0,
                "scaleX": 1,
                "scaleY": 1,
                "strokeColor": "22,124,255",
                "fillColor": "22,124,255",
                "shadow": false,
                "shadowColor": "rgba(0,0,0,0.5)",
                "shadowOffsetX": 3,
                "shadowOffsetY": 6,
                "transformAble": true,
                "zIndex": 3,
                "dragable": true,
                "selected": false,
                "showSelected": true,
                "isMouseOver": false,
                "deviceId": "1482390965475.3909",
                "remark": "",
                "dataType": "unit",
                "nodeImage": "trans1.png",
                "text": "",
                "font": "12px Consolas",
                "fontColor": "#222",
                "textPosition": "Bottom_Center",
                "textOffsetX": 0,
                "textOffsetY": 0,
                "borderRadius": null
            }],
            "childsList": [{
                "elementType": "link",
                "x": 0,
                "y": 0,
                "width": 32,
                "height": 32,
                "visible": true,
                "alpha": 1,
                "rotate": 0,
                "scaleX": 1,
                "scaleY": 1,
                "strokeColor": "24,121,117",
                "fillColor": "22,124,255",
                "shadow": "false",
                "shadowColor": "rgba(0,0,0,0.5)",
                "shadowOffsetX": 3,
                "shadowOffsetY": 6,
                "transformAble": false,
                "zIndex": 2,
                "dragable": false,
                "selected": false,
                "showSelected": true,
                "isMouseOver": false,
                "deviceId": "1353486464906.0295",
                "deviceA": "219980641086.6398",
                "deviceZ": "1482390965475.3909",
                "lineType": "flexLine",
                "topoLineType": "line35",
                "text": "35Kwv",
                "font": "12px Consolas",
                "fontColor": "24,121,117",
                "lineWidth": 2.5,
                "lineJoin": "miter"
            }]
        }]
    },
    canvas = null,
    scene = null;
// TODO 查询请求参数 后期修改为正确的数据
var ip = '10.0.1.254';
$(function () {
    /*设置页面进度栏名称 --end--*/

    /*渲染页面加载左边菜单 --start--*/
    toolData.forEach(function (it, i) {
        var mTpl = '<li><a data-title="title" href="javascript:;">{{name}}</a><ul class="nav topology-tools-item">'.replace(/{{(\w+)}}/g, function (a0, a1) {
                return it[a1] || 'test';
            });
        var tpl = '<li><div divType="{{type}}" data-type="{{dt}}" draggable="{{drag}}" class="topo-item"><img src="{{url}}"/><span>{{name}}</span></div></li>';
        it.child.forEach(function (t) {
            mTpl += tpl.replace(/{{(\w+)}}/g, function (a0, a1) {
                return t[a1] || '';
            });
        });
        $('#componentBox').append(mTpl + '</ul></li>');
    });

    /*渲染页面加载左边菜单 --end--*/
    /*注册页面点击事件 --start--*/
    setTimeout(function () {
        registerEvent();
    })
    /*注册页面点击事件 --end--*/

    //初始化画布
    // initScene();  
    //初始化画布
    initFunc()
});

/*注册页面点击事件 --start--*/
function registerEvent() {
    /*菜单栏事件 --start--*/
    $('#componentBox').on('click', function () {
        currentLineType = null;
        $('div[divtype]').removeClass('active');
        var tar = event.target || window.event.target;
        if(tar.tagName === 'A' || $(tar).siblings('a').length > 0) {
        } else {
            if(tar.tagName !== 'DIV') {
                tar = tar.parentNode;
                if(tar.tagName !== 'DIV') return 0;
            }
            if(tar.getAttribute('divtype') === 'line') {
                var lt = tar.getAttribute('data-type');
                currentLineType = lt;
            }
            $(tar).addClass('active');
        }
    });
    /*菜单栏事件 --end--*/

    /*全局事件注册 --start--*/
    $('#centerNode').on('click', function () {
        stage.centerAndZoom(0.85);
    });
    $('#fullScreen').on('click', function () {
        var method = 'RequestFullScreen';
        var usablePrefixMethod;
        ["webkit", "moz", "ms", "o", ""].forEach(function (prefix) {
                if (usablePrefixMethod) return;
                if (prefix === "") {
                    // 无前缀，方法首字母小写
                    method = method.slice(0, 1).toLowerCase() + method.slice(1);
                }
                var typePrefixMethod = typeof canvas[prefix + method];
                if (typePrefixMethod + "" !== "undefined") {
                    if (typePrefixMethod === "function") {
                        usablePrefixMethod = canvas[prefix + method]();
                    } else {
                        usablePrefixMethod = canvas[prefix + method];
                    }
                }
            }
        );
    });
    $('#clearNode').on('click', function () {
        stage.childs.forEach(function(n) {
            n.clear();
        })
    });
    $('#backNode').on('click', function () {
        var json = stage.toJson(20);
        json = eval("("+json+")");
        var node = json.childs[0].childs;
        var cacheNodes = sessionStorage.getItem('cacheNodes');
        if(!cacheNodes) {
            if(node.length > 0) {
                $('#confirmPromptBox').addClass('active');
            } else {
                window.location.reload();
            }
        } else {
            try {
                cacheNodes = JSON.parse(cacheNodes);
                var isModify = cacheNodes.length !== node.length;
                if(!isModify) {
                    nowFor: for(var i = 0;i < node.length;i ++) {
                        var obj = node[i];
                        for(var k = 0;k < cacheNodes.length;k ++) {
                            var _o = cacheNodes[k];
                            if(obj.deviceId === _o.deviceId) {
                                for(var name in obj) {
                                    isModify = obj[name] !== _o[name];
                                    if(isModify) break nowFor;
                                }
                            }
                        }
                    }
                }
                if(isModify) {
                    $('#confirmPromptBox').addClass('active');
                } else {
                    window.location.reload();
                }
            } catch (e) {
                window.location.reload();
            }
        }
    });
    $('#saveNode').on('click', function () {
        var json = stage.toJson(20);
        json = eval("("+json+")");
        var node = json.childs[0].childs;
        var cn = [], cl = [];
        for(var i = 0;i < node.length;i ++) {
            if(node[i].elementType === 'node') {
                cn.push(node[i]);
            } else {
                cl.push(node[i]);
            }
        }
        json.childs[0].childsNode = cn;
        json.childs[0].childsList = cl;
        var obj = {json: json, data: topologyInputParams};
        obj = JSON.stringify(obj);
        console.log(topologyPageMainCache)
        var saveObj = {
            createTime: topologyPageMainCache.createTime,
            updateTime: topologyPageMainCache.updateTime,
            legendDesc: topologyPageMainCache.legendDesc,
            legendName: topologyPageMainCache.legendName,
            legendJson: obj,
            createPerson: topologyPageMainCache.createPerson,
            legendCode: topologyPageMainCache.legendCode
        };
        syncData({
            url: saveTopology,
            type: 'POST',
            data: saveObj,
            callback: function (data) {
                if (data.code === 200) {
                    alert('成功'+data.code);
                    window.location.reload();
                } else {
                    alert('失败'+data.code);
                }
            }
        });
    });
    $('#removeNode').on('click', function () {
        scene.selectedElements.forEach(function (p1) {
            scene.remove(p1);
        });
    });
    $('#pickupNode').on('click', function () {
        currentLineType = null;
        $('div[divtype]').removeClass('active');
    });
    $('#zoomOutNode').on('click', function () {
        stage.zoomOut();
    });
    $('#zoomInNode').on('click', function () {
        stage.zoomIn();
    });
    /*全局事件注册 --end--*/
}
/*注册页面点击事件 --end--*/


var ip = '10.0.1.254';
var array = new Array();
var count = 1;

function createCloudNode(){ //绘制核心拓扑 
    var cloudNode = new JTopo.Node();//创建一个节点
    cloudNode.setSize(39,36);//设置节点宽和高
    cloudNode.setImage(imgPath+'powerplant.png');//设置节点图片
    cloudNode.setLocation(200,200);//设置节点在场景中的位置坐标(左上角）
    cloudNode.text=ip;//设置节点的名字（显示文本）
    cloudNode.font= "20px Consolas";//节点字体
    cloudNode.fontColor = "555,555,0";//字体颜色
    return cloudNode;
}
function initScene(){//初始化场景 
    canvas = document.getElementById('topoCanvas');
    canvas.width = $("#canvasBox").width();//canvas宽度
    canvas.height = $("#canvasBox").height();//canvas高度
    stage=new JTopo.Stage(canvas);//创建一个舞台对象
    //显示工具栏
    scene =new JTopo.Scene(stage);//创建一个场景对象
    scene.alpha=1;//场景的透明度
    scene.backgroundColor="#C8C8C8"; 
    var cloudNode;
    cloudNode=createCloudNode();// 创建一个节点,并设置node熟悉
    scene.add(cloudNode);//将node节点放入到场景中
    drawTopo(nodes1,cloudNode);//json1数据渲染格式
    // scene.addEventListener("click", eventHandler);
}
function compare(vv){ //扫描当前点击拓扑是否在数组中 
    var strV = vv.text.substring(0,vv.text.lastIndexOf("."))+".";
    var str = "";
    var flag = false;
    try{
        for(var m=0;m<array.length;m++){
            str += array[m].text;
        }
    }catch(e){
        
    }
    if(str.contains(strV)){
        flag = true;
    }
    return flag;
}
function eventHandler(){ //jtopo的点击事件 
    var node2 = scene.getDisplayedNodes();
    console.log(node2)
    var cnode ;
    var outlinksCount;
    for(var i=0;i<node2.length;i++){
        if(node2[i].selected){
            outlinksCount = node2[i].outLinks.length;
            count ++;
            cnode = node2[i];//得到选中的节点
        }
    }
    //如果数组不为空并且数组中存在该被选择节点所在网段的元素则恢复
    if(array != null&&array.length>=1&&compare(cnode) && count%2==0){
        if(outlinksCount == 0){
            //alert("add");
            //var node = window.sessionStorage.getItem("cloudenodetext");
            //window.sessionStorage.removeItem("cloudenodetext");    
            for(var m=0;m<array.length;m++){
                if(array[m] != m){
                    if(array[m].text.indexOf(cnode.text.substring(0,cnode.text.lastIndexOf("."))+".")!=-1){
                        //添加之前，需要先判断节点上是否有该网段的节点，如果没有，再添加。 
                            //将数组中存在的添加到节点上
                            scene.add(array[m]); 
                            scene.add(new JTopo.Link(cnode, array[m]));
                            //每次增加后需要删除该元素 
                            array[m] = m;
                    }
                }
            }    
            
        }
    }else{//如果为空或者被数组中不存在被选中的节点所在的网段的节点则进行删除
        for(var i=0;i<node2.length;i++){
            if(node2[i].selected){
                if(outlinksCount > 0){
                    debugger
                        for(var j=0;j<node2.length;j++){
                            console.log(node2[j].text)
                            console.log(node2[i].text.substring(0,node2[i].text.lastIndexOf(".")))
                            console.log(node2[i].text.substring(0,node2[i].text.lastIndexOf("."))+".")
                            if(node2[j].text.contains(node2[i].text.substring(0,node2[i].text.lastIndexOf("."))+".")){
                                debugger
                                if(node2[j]!=node2[i] && node2[j]!=null && node2[j]!=undefined && node2[j]!=""){
                                    if(isNotInArr(node2[j].text)){
                                        console.log(1111)
                                        console.log(node2[j])
                                        array.push(node2[j]);
                                    } 
                                    console(node2[j])
                                    scene.remove(node2[j]);
                                    window.sessionStorage.setItem("cloudenodetext",node2[i].text);
                                }
                                
                          }
                    }
                }
           }
       }
    }
}
//判断是否在数组中
function isNotInArr(node){
    //alert(".....is not node ");
    var str = "";
    var flag = false;
    if (array==null||array.length==0)
        return true;
    for(var i=0;i<array.length;i++){
        str += array[i].text;
    }
    if(!str.contains(node)){
        //alert("in here。。");
        flag = true;
    }
    return flag;
}

function addNode(name,x,y,cloudNode){ //将生产的单个拓扑加入到scence中 
    var node = new JTopo.Node();
    node.setSize(32, 32);
    node.setLocation(x,y);
    node.setImage(imgPath+'user.png');
    node.text=name;
    dragable:true;
    node.fontColor = "219,118,39";
    scene.add(node);
    var link = new JTopo.Link(cloudNode,node);
    link.strokeColor = "128,64,64";
    scene.add(link);
    return node;
}
function drawTopo(nodes,cloudNode){ // 绘制拓扑 
    for(var i=0;i<nodes.nodelist.length;i++){
        var nd = addNode(nodes.nodelist[i].name,nodes.nodelist[i].pt.x,nodes.nodelist[i].pt.y,cloudNode);
        // JTopo.layout.layoutNode(scene,cloudNode,true);
        drawTopo(nodes.nodelist[i],nd);
    }
}



function initFunc(){
    /*设置canvas初始属性 --start--*/
    canvas = document.getElementById('topoCanvas');
    canvas.width = $("#canvasBox").width();//canvas宽度
    canvas.height = $("#canvasBox").height();//canvas高度
    /*设置canvas初始属性 --end--*/
    stage = createStageFromJson(nodes);
    scene = stage.childs[0];
}
/*根据JSON渲染页面 --start--*/
function createStageFromJson(jsonObj) {
    var stage = new JTopo.Stage(canvas);
    for (var k in jsonObj) {
        if ("childs" != k) {
            stage[k] = jsonObj[k];
            if (k == "deviceNum" || k == "wheelZoom" || k == "frames" || k == "height" || k == "width") {
                stage[k] = parseFloat(stage[k]);
            }
        }
    }
    var scenes = jsonObj.childs;
    return scenes.forEach(function(a) {
            var b = new JTopo.Scene(stage);
            b.paintAll = false;
            b.areaSelect = true;
            b.translate = true;
            b.lastTranslatedX = undefined;
            b.lastTranslatedY = undefined;
            b.visible = true;
            /*判断全局是否有整个画布移动*/
            for (var c in a) {
                if ("childs" != c) {
                    if (a[c] == "undefined") {
                        b[c] = undefined
                    } else if (c == "translateX" || c == "translateY" || c == "scaleX" || c == "scaleY") {
                        b[c] = parseFloat(a[c]);
                    } else {
                        b[c] = a[c];
                    }
                }
            }
            /*遍历所有子节点画出Node元素*/
            var d = a.childs;
            d.forEach(function(a) {
                    var c = null
                        , d = a.elementType;
                    if ("node" == d) {
                        c = new JTopo.Node;
                        c.transformAble = true;
                        c.visible = true;
                        c.dragable = true;
                        c.selected = false;
                        c.showSelected = true;
                        c.isMouseOver = false
                    } else if ("CircleNode" == d) {
                        c = new JTopo.CircleNode;
                    } else if ("link" == d) {
                        return false;
                    } else if ("container" == d) {
                        return false;
                    }
                    for (var e in a) {
                        /*加载节点的图片*/
                        if (e == "nodeImage") {
                            /*设置具体的图片路径*/
                            c.setImage(imgPath + a[e]);
                        }
                        if (c) {
                            if (a[e] == "undefined") {
                                c[e] = undefined;
                                continue;
                            } else if (e == "rotate" || e == "scaleX" || e == "scaleY" || e == "zIndex" || e == "x" || e == "y"
                                || e == "width" || e == "height") {
                                c[e] = parseFloat(a[e]);
                            } else {
                                c[e] = a[e];
                            }
                        }
                    }
                    if (c)
                        b.add(c);
                }
            );

            /*遍历连线上的起始节点，并画出所有线条*/
            var nodes = b.getDisplayedNodes();
            d.forEach(function(a) {
                    var c = null
                        , d = a.elementType;
                    if ("link" != d && "container" != d) {
                        return false;
                    }
                    if ("link" == d) {
                        var nodeA, nodeZ;
                        /*找出连接点*/
                        if (a["deviceA"] && a["deviceZ"]) {
                            nodes.forEach(function(nodeEle) {
                                    if (nodeEle.elementType == "node") {
                                        if (nodeEle.deviceId == a["deviceA"])
                                            nodeA = nodeEle;
                                        if (nodeEle.deviceId == a["deviceZ"])
                                            nodeZ = nodeEle;
                                    }
                                }
                            );
                        }
                        if (nodeA && nodeZ) {
                            /*折线和直线绘制*/
                            if (a["lineType"] == "line")
                                c = new JTopo.Link(nodeA,nodeZ);
                            if (a["lineType"] == "foldLine") {
                                c = new JTopo.FoldLink(nodeA,nodeZ);
                            }
                            /*主要是画flexLine，以后如果要画其他的线条，需重新修改划线方法*/
                            if (a["lineType"] == "flexLine") {
                                c = new JTopo.FlexionalLink(nodeA,nodeZ);
                                c.lineWidth = lineStyle[a.topoLineType].lw;
                                c.bundleOffset = 60;
                                c.bundleGap = 20;
                                c.textOffsetY = 3;
                                c.strokeColor = lineStyle[a.topoLineType].color;
                                c.arrowsRadius = lineStyle[a.topoLineType].arrows;
                                c.fontColor = lineStyle[a.topoLineType].color;
                                c.direction = 'to';
                                c.lineType = "flexLine";
                            }
                            if (a["lineType"] == "curveLine")
                                c = new JTopo.CurveLink(nodeA,nodeZ);
                        }
                    } else if ("container" == d) {
                        if (a["childNodes"]) {
                            var temp = a["childNodes"].split(",");
                            if (temp && temp.length > 0) {
                                c = new JTopo.Container();
                                for (var ni = 0; ni < temp.length; ni++) {
                                    b.childs.forEach(function(n) {
                                            if (n instanceof JTopo.Node && n.deviceId == temp[ni]) {
                                                c.add(n);
                                            }
                                        }
                                    );
                                }
                            }
                        }
                    }

                    for (var e in a) {
                        if (c) {
                            if (a[e] == "undefined") {
                                c[e] = undefined;
                            } else if (e == "rotate" || e == "scaleX" || e == "scaleY" || e == "zIndex" || e == "x" || e == "y"
                                || e == "width" || e == "height") {
                                c[e] = parseFloat(a[e]);
                            } else {
                                c[e] = a[e];
                            }
                        }
                    }
                    if (c) b.add(c);
                }
            )
        }
    ),
        stage;
}
/*根据JSON渲染页面 --end--*/