var topologyPageMainCache = null;
var canvas = document.getElementById('canvas'); 
var stage = new JTopo.Stage(canvas); // 创建一个舞台对象
var scene = new JTopo.Scene(stage); // 创建一个场景对象

showJTopoToobar(stage)//调用toolbar

var nodeFrom = new JTopo.Node("from");	// 创建一个节点
nodeFrom.setLocation(200,200);	// 设置节点坐标					
scene.add(nodeFrom); // 放入到场景中

var nodeTo = new JTopo.Node("To");
nodeTo.setLocation(300,200);
scene.add(nodeTo);

var link = new JTopo.Link(nodeFrom, nodeTo); // 增加连线
scene.add(link);

console.log(scene.getBound())//得到舞台中所有元素位置确定的边界大小（left、top、right、bottom、height、width）
console.log(nodeFrom.getBound())//获取节点坐标、宽、高
console.log(nodeTo.getBound())//获取节点坐标、宽、高

$('#saveButton').click(function(){
    var json = stage.toJson(20);
    json = eval("("+json+")");
    console.log(json)
    var node = json.childs[0].childs;
    console.log(node)
});