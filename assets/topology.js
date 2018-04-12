var imgPath = '../topology/assets/icons/',
    getTopology = location.origin + '/api/getTopology',
    saveTopology = "../topology/assets/123.json",
    getPowerplant = "../topology/assets/powerList.json",
    getPowerPlantInfo = "../topology/assets/powerInfo.json",
    getUserList = "../topology/assets/userList.json",
    getUserInfo = "../topology/assets/userInfo.json",
    topologyPageMainCache = null,
    topologyInputParams = [],
    isNewPage = location.search.indexOf('search=') < 0,
    itemWidth = 32,
    itemHeight = 32,
    modeIdIndex = 0,
    fontColor = '#222',
    currentNode = null,
    currentEvent = {x: 0, y: 0},
    currentLineType = null,
    stage = null,
    modifyBox = null,
    linkStartNode = null,
    linkEndNode = null,
    linkNode = null,
    dragNodeName = '',
    dbPromptCont = {
        line: {'attr0': '线路名称', 'attr1': '线路状态', 'attr2': '线路电压', 'attr9': '额定输送容量', 'attr3': '线路长度', 'attr4': '几何均距', 'attr5': '有功线损计算值', 'attr6': '无功线损计算值', 'attr8': '单位长度线路电抗', 'attr7': '单位长度线路电阻'},
        trans: {'attr0': '变电站名称', 'attr1': '变电站电压等级', 'attr2': '变电站地址', 'attr3': '主变台数', 'attr4': '主变容量', 'attr05': '变电站管理单位', 'attr6': '变电站运行状态'},
        power: {'attr0': '变电站', 'attr1': '线路', 'attr2': '台区', 'attr3': '电源名称', 'attr4': '电源编号', 'attr5': '电源类型', 'attr5': '电源相数', 'attr6': '供电容量'},
        user: {'attr0': '用户ID', 'attr1': '用户名'},
        energy:{'attr0': '表计型号', 'attr1': '线相类型','attr2': '线路相序', 'attr3': '表计用途','attr4': '额定电压','attr5': '额定电流'},
        inductor:{'attr0': '互感器类型', 'attr1': '设备型号','attr2': '电压变化', 'attr3': '电流变化','attr4': '线路相序'}
    },
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
    /* {
        name: '变电站', child: [
            {name: '35kv变电站', url: imgPath+'trans0.png', type: 'node', dt: 'trans35', drag: true},
            {name: '60kv变电站', url: imgPath+'trans1.png', type: 'node', dt: 'trans60', drag: true},
            {name: '110kv变电站', url: imgPath+'trans2.png', type: 'node', dt: 'trans110', drag: true},
            {name: '220kv变电站', url: imgPath+'trans3.png', type: 'node', dt: 'trans220', drag: true}
        ]
    }, */
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
    },
   /*  {
        name: '用户', child: [
            {name: '结算单元', url: imgPath+'user.png', type: 'node', dt: 'user', drag: true}
        ]
    } */
    ],
    canvas = null,
    scene = null;
// TODO 查询请求参数 后期修改为正确的数据
var getTopologyId = '1496817427002';
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

    modifyBox = $('#dbFloatBox');
    /*渲染页面加载左边菜单 --end--*/

    /*初始化页面 --start--*/
    if(isNewPage) {//新建
        topologyPageMainCache = sessionStorage.getItem('topologyPageMainCache');
        try {
            topologyPageMainCache = JSON.parse(topologyPageMainCache);
            /*设置页面进度栏名称 --start--*/
            $('#pageMainName').text(topologyPageMainCache.legendName);
        } catch (e) {}
        initFunc(false);
    } else {
        syncData({
            url: getTopology,
            data: {id: getTopologyId},
            callback: function (data) {
                if (data.code === 200 && data.data) {
                    try {
                        topologyPageMainCache = data.data;
                        /*设置页面进度栏名称 --start--*/
                        $('#pageMainName').text(topologyPageMainCache.legendName);
                        var topologyData = eval("("+topologyPageMainCache.legendJson+")");
                        /*设置读取的时候数据缓存*/
                        sessionStorage.setItem('cacheNodes', JSON.stringify(topologyData.json.childs[0].childs));
                        /*设置回显原件提示信息内容*/
                        topologyInputParams = topologyData.data;
                        /*获取新建页面或*/
                        initFunc(true, topologyData.json);
                    } catch (e) {
                        initFunc(false);
                    }
                } else {
                    initFunc(false);
                }
            }
        });
    }
    /*初始化页面 --end--*/

    /*初始化加载数据 --start--*/
    /*syncData({
        url: getPowerplant,
        data: {queryType: "page",
            queryName: "queryList",
            filterQuery: true,
            refCols: "elecusage.annualPowerConsumption,elecusage.voltage",
            customerType: "POWER",
            timestamp: Date.now(),
            rows: 25,
            draw: 1,
            page: 1,
            start: 0,
            length: 25},
        callback: function (data) {
            var node = $('#powerPromptBox').find('select');
            for(var i = 0;i < data.length;i ++) {
                node.append('<option value="'+data[i].id+'">'+data[i].name+'</option>');
            }
        }
    });*/
    /*syncData({
        url: getUserList,
        data: {id: ''},
        callback: function (data) {
            var node = $('#promptBox').find('select');
            for(var i = 0;i < data.length;i ++) {
                node.append('<option value="'+data[i].id+'">'+data[i].name+'</option>');
            }
        }
    });*/
    /*初始化加载数据 --end--*/

    /*注册页面点击事件 --start--*/
    setTimeout(function () {
        registerEvent();
    })
    /*注册页面点击事件 --end--*/
});

/*下拉选择事件 --start--*/
function selectEvent(type) {
    syncData({
        url: type === 'power' ? getPowerPlantInfo : getUserInfo,
        data: {id: ''},
        callback: function (data) {
            if(type === 'power') {
                $('#powerPromptBox').find('input[name="name"]').val(data.name);
                $('#powerPromptBox').find('input[name="min"]').val(data.min);
                $('#powerPromptBox').find('input[name="max"]').val(data.max);
            } else {
                $('#promptBox').find('input[name="name"]').val(data.name);
            }
        }
    });
}
/*下拉选择事件 --start--*/

/*初始化方法 --start--*/
function initFunc(isRender, data) {
    /*设置canvas初始属性 --start--*/
    canvas = document.getElementById('topoCanvas');
    canvas.width = $("#canvasBox").width();//canvas宽度
    canvas.height = $("#canvasBox").height();//canvas高度
    /*设置canvas初始属性 --end--*/

    if (isRender) {
        stage = createStageFromJson(data, canvas);
        scene = stage.childs[0];
    } else {
        stage = new JTopo.Stage(canvas);//创建一个舞台对象
        stage.topoLevel = 1;
        stage.parentLevel = 0;
        modeIdIndex = 1;
        scene = new JTopo.Scene(this.stage);//创建一个场景对象
        scene.totalLevel = 1;
    }

    /*注册画布事件 --start--*/
    registerEvt(canvas);
    /*注册画布事件 --end--*/
}
/*初始化方法 --end--*/

/*注册页面点击事件 --start--*/
function registerEvent() {
    /*菜单栏事件 --start--*/
    $('#componentBox').on('click', function () {
        currentLineType = null;
        $('div[divtype]').removeClass('active');
        var tar = event.target || window.event.target;
        if(tar.tagName === 'A' || $(tar).siblings('a').length > 0) {
            /*if(tar.tagName === 'IMG') tar = $(tar).siblings('a').eq(0);
            var ul = $(tar).parent('li').find('ul.nav');
            if (ul.hasClass('hidden-cls')) {
                ul.removeClass('hidden-cls');
                ul.siblings('img').addClass('active');
            } else {
                ul.addClass('hidden-cls');
                ul.siblings('img').removeClass('active');
            }*/
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
        debugger
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

/*注册画布事件 --start--*/
function registerEvt(canvas) {
    /*添加拖拽事件 --start--*/
    addDragEvent(canvas);
    /*添加拖拽事件 --end--*/

    /*添加缩放功能 --start--*/
    stage.wheelZoom = 0.95;//启动鼠标滚轮缩放 缩放比例为0.95
    stage.eagleEye.visible = false;//隐藏鹰眼
    /*添加缩放功能 --end--*/

    /*添加元素双击显示详情事件 --start--*/
    scene.click(function () {
        if(modifyBox.hasClass('active')) {
            modifyBox.removeClass('active');
        }
    });
    scene.mouseover(function(event){
        if(event.target == null) return;
        var e = event.target;
        modifyBox.empty();
        modifyBox.css({
            top: event.pageY + e.height,
            left: event.pageX - e.width/2
        });
        var nowData = null;
        for(var i = 0;i < topologyInputParams.length;i ++) {
            nowData = topologyInputParams[i];
            if(nowData.deviceId === e.deviceId) {
                break;
            }
        }
        if(nowData) {
            var type = nowData.type;
            type = type.indexOf('line') > -1 ? 'line' : type;
            for(var name in nowData) {
                var val = dbPromptCont[type][name];
                if(val) {
                    if((type === 'line' && name === 'attr1') || (type === 'trans' && name === 'attr6')) {
                        nowData[name] = nowData[name]*1 === 1 ? '停运' : nowData[name]*1 === 2 ? '运行' : '拆除';
                    }
                    modifyBox.append('<li><span class="name">'+val+'</span><span class="txt">'+nowData[name]+'</span></li>');
                }
            }
        }
        modifyBox.addClass('active');
    });
    /*添加元素双击显示详情事件 --end--*/

    /*添加元素连线事件 --start--*/
    lineLineEvt();
    /*添加元素连线事件 --end--*/

}
/*注册画布事件 --end--*/

/*添加拖拽事件 --start--*/
function addDragEvent(canvas) {
    var nodes = $('#componentBox').find("div[divType='node']");
    var len = nodes.length;
    for (var i = 0; i < len; i++) {
        nodes[i].datatype = nodes[i].getAttribute("data-type");
        var text = $(nodes[i]).find("span").eq(0).text();
        dragEvt(nodes[i], canvas, text);
    }
}
/*添加拖拽事件 --end--*/

/*为元素添加拖拽功能 --start--*/
function dragEvt(node, canvas, text) {
    if(!text) text = '';
    var me = this;
    //开始拖拽
    node.ondragstart = function (e) {
        e = e || window.event;
        dragNodeName = e.target.tagName;
        var backImg = $(this).find("img").eq(0).attr("src");
        backImg = backImg.substring(backImg.lastIndexOf('/') + 1);
        var datatype = $(this).attr("data-type");
        console.log('dragParams:', backImg + ";" + text + ";" + datatype)
        sessionStorage.setItem('dragParams', backImg + ";" + text + ";" + datatype);
    };
    //阻止默认事件
    canvas.ondragover = function (e) {
        e.preventDefault();
        return false;
    };
    //创建节点
    canvas.ondrop = function (e) {
        e = e || window.event;
        if(dragNodeName === '') return 0;
        currentEvent.x = (e.layerX ? e.layerX : e.offsetX) - scene.translateX - itemWidth / 2;
        currentEvent.y = (e.layerY ? e.layerY : e.offsetY) - scene.translateY - itemHeight / 2;
        var data = sessionStorage.getItem('dragParams').split(';');
        var id = data[2];
        if(id === 'powerplant') {
            $('#powerPromptBox').addClass('active');
        } else if (id === 'user') {
            $('#promptBox').addClass('active');
        } else if(id === 'energy'){
            $('#energyPromptBox').addClass('active');
        } else if(id === 'inductor'){
            $('#inductorPromptBox').addClass('active');
        } else {
            $('#transPromptBox').addClass('active').find('input[name="level"]').val(data[1]);
        }
        if (e.preventDefault()) e.preventDefault();
        if (e.stopPropagation()) e.stopPropagation();
        dragNodeName = '';
    }
}
/*为元素添加拖拽功能 --end--*/

/*当页面发生改动后，清空或返回弹出框 --start--*/
function confPromptEvt(flag) {
    if(flag === 'sure') {
        $('#saveNode').trigger('click');
    } else if(flag === 'back') {
        $('#confirmPromptBox').removeClass('active');
    } else {
        location.reload();
    }
}
/*当页面发生改动后，清空或返回弹出框 --end--*/

/*弹出框事件 --start--*/
function promptEvt(flag) {
    if(flag === 'sure') {
        var data = sessionStorage.getItem('dragParams');
        var img, datatype;
        if (data) {
            var datas = data.split(";");
            if (datas && datas.length == 3) {
                img = datas[0];
                datatype = datas[2];
                var node = new JTopo.Node();
                node.fontColor = fontColor;
                node.setBound( currentEvent.x, currentEvent.y, itemWidth, itemHeight);
                //设备图片
                node.setImage(imgPath + img);
                var cuurId = "" + Date.now() * Math.random();
                node.deviceId = cuurId;
                node.dataType = datatype;
                node.nodeImage = img;
                node.remark = "";
                var box = null;
                if(datatype === 'user') {
                    box = $('#promptBox');
                    topologyInputParams.push({
                        deviceId: cuurId,
                        type: "user",
                        attr0: box.find('select').val(),
                        attr1: box.find('input[name="name"]').val(),
                        attr2: '',
                        attr3: '',
                        attr4: '',
                        attr5: '',
                        attr6: '',
                        attr7: '',
                        attr8: '',
                        attr9: ''
                    });
                }else if(datatype === 'energy'){
                    box = $('#energyPromptBox');
                    topologyInputParams.push({
                        deviceId: cuurId,
                        type: "energy",
                        attr0: box.find('select').val(),
                        attr1: box.find('input[name="name"]').val(),
                        attr2: '',
                        attr3: '',
                        attr4: '',
                        attr5: '',
                    });
                }else if(datatype === 'inductor'){
                    box = $('#inductorPromptBox');
                    topologyInputParams.push({
                        deviceId: cuurId,
                        type: "inductor",
                        attr0: box.find('select').val(),
                        attr1: box.find('input[name="name"]').val(),
                        attr2: '',
                        attr3: '',
                        attr4: '',
                    });
                }else if (datatype === 'powerplant') {
                    box = $('#powerPromptBox');
                    topologyInputParams.push({
                        deviceId: cuurId,
                        type: "power",
                        attr0: box.find('select').val(),
                        attr1: box.find('input[name="name"]').val(),
                        attr2: box.find('input[name="min"]').val(),
                        attr3: box.find('input[name="max"]').val(),
                        attr4: '',
                        attr5: '',
                        attr6: '',
                        attr7: '',
                        attr8: ''
                    });
                } else {
                    box = $('#transPromptBox');
                    topologyInputParams.push({
                        deviceId: cuurId,
                        type: "trans",
                        attr0: box.find('input[name="name"]').val(),
                        attr1: box.find('input[name="level"]').val(),
                        attr2: box.find('input[name="addr"]').val(),
                        attr3: box.find('input[name="attr0"]').val(),
                        attr4: box.find('input[name="attr1"]').val(),
                        attr5: box.find('input[name="attr2"]').val(),
                        attr6: box.find('select[name="status"]').val(),
                        attr7: '',
                        attr8: '',
                        attr9: ''
                    });
                }
                node.text = box.find('input[name="name"]').eq(0).val();
                scene.add(node);
                currentNode = node;
            }
        }
    }
    $('#promptBox').removeClass('active');
    $('#powerPromptBox').removeClass('active');
    $('#energyPromptBox').removeClass('active');
    $('#inductorPromptBox').removeClass('active');
    $('#transPromptBox').removeClass('active');
}
/*弹出框事件 --end--*/

/*添加元素连线事件 --start--*/
function lineLineEvt() {
    var tempNodeA = new JTopo.Node('tempA');//创建一个节点tempA
    tempNodeA.setSize(1, 1);//设置节点宽和高
    var tempNodeZ = new JTopo.Node('tempZ');//创建一个节点tempZ
    tempNodeZ.setSize(1, 1);//设置节点宽和高
    linkNode = new JTopo.Link(tempNodeA, tempNodeZ);//增加连线
    scene.mouseup(function(e){
        if(!currentLineType) return 0;
        if(e.button == 2){
            scene.remove(linkNode);
            return;
        }
        if(e.target != null && e.target instanceof JTopo.Node){
            if(linkStartNode == null){
                linkStartNode = e.target;
                scene.add(linkNode);
                tempNodeA.setLocation(e.x, e.y);
                tempNodeZ.setLocation(e.x, e.y);
            }
            else if(linkStartNode !== e.target){
                linkEndNode = e.target;
                $('#linePromptBox').find('input[name="voltage"]').val(lineStyle[currentLineType].text);
                var l = new JTopo.FlexionalLink(linkStartNode, linkEndNode, lineStyle[currentLineType].text);
                var deviceId = Date.now()*Math.random()+'';
                l.lineWidth = lineStyle[currentLineType].lw;
                l.bundleOffset = 60;
                l.bundleGap = 20;
                l.textOffsetY = 3;
                l.strokeColor = lineStyle[currentLineType].color;
                l.arrowsRadius = lineStyle[currentLineType].arrows;
                l.fontColor = lineStyle[currentLineType].color;
                l.direction = 'to';
                l.lineType = "flexLine";
                l.shadow = "false";
                l.topoLineType = currentLineType;
                l.deviceId = deviceId;
                l.deviceA = linkStartNode.deviceId;
                l.deviceZ = linkEndNode.deviceId;
                scene.add(l);//添加对象到当前场景中
                linkStartNode = null;
                linkEndNode = null;
                scene.remove(linkNode);
            }
            else{
                linkStartNode = null;
            }
        }else{
            scene.remove(linkNode);
        }
    });

    scene.mousedown(function(e){
        if(!currentLineType) return 0;
        if(e.target == null || e.target === linkStartNode || e.target === linkNode){
            scene.remove(linkNode);
        }
    });
    scene.mousemove(function(e){
        if(!currentLineType) return 0;
        tempNodeZ.setLocation(e.x, e.y);
    });
}
/*添加元素连线事件 --end--*/

/*线路弹出框处理方法 --start--*/
/* function linePromptEvt(type) {
    if(type === 'sure') {
        var l = new JTopo.FlexionalLink(linkStartNode, linkEndNode, lineStyle[currentLineType].text);
        var deviceId = Date.now()*Math.random()+'';
        l.lineWidth = lineStyle[currentLineType].lw;
        l.bundleOffset = 60;
        l.bundleGap = 20;
        l.textOffsetY = 3;
        l.strokeColor = lineStyle[currentLineType].color;
        l.arrowsRadius = lineStyle[currentLineType].arrows;
        l.fontColor = lineStyle[currentLineType].color;
        l.direction = 'to';
        l.lineType = "flexLine";
        l.shadow = "false";
        l.topoLineType = currentLineType;
        l.deviceId = deviceId;
        l.deviceA = linkStartNode.deviceId;
        l.deviceZ = linkEndNode.deviceId;
        var node = $('#linePromptBox');
        topologyInputParams.push({
            deviceId: deviceId,
            type: currentLineType,
            attr0: node.find('input[name="name"]').val(),
            attr1: node.find('select').val(),
            attr2: node.find('input[name="voltage"]').val(),
            attr3: node.find('input[name="length"]').val(),
            attr4: node.find('input[name="distance"]').val(),
            attr5: node.find('input[name="val0"]').val(),
            attr6: node.find('input[name="val1"]').val(),
            attr7: node.find('input[name="val2"]').val(),
            attr8: node.find('input[name="val3"]').val(),
            attr9: node.find('input[name="val4"]').val()
        });
        scene.add(l);
        linkStartNode = null;
        linkEndNode = null;
        scene.remove(linkNode);
    }
    $('#linePromptBox').removeClass('active');
} */
/*线路弹出框处理方法 --end--*/

/*获取异步数据方法 --start--*/
function syncData(ops) {
    $.ajax({
        url: ops.url,
        async: false,
        type: ops.type || "GET",
        dataType: "json",
        data: ops.data || {},
        error: function (e) {
            throw Error(e);
        },
        success: function (data) {
            ops.callback && ops.callback(data);
        }
    });
}
/*获取异步数据方法 --end--*/

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