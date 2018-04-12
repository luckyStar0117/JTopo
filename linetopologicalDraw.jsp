 
<%@ page language='java' pageEncoding='UTF-8'%>
<%@taglib uri='http://www.jxtech.net/judp' prefix='judp' %>
<%@taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@taglib prefix='fmt' uri='http://java.sun.com/jsp/jstl/fmt' %>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="能信科技拓扑编辑器"/>
<%-- <link href="${pageContext.request.contextPath}/busicomps/line/content/linetopological/assets/bootstrap.min.css" type="text/css" rel="stylesheet" />
 --%><link href="${pageContext.request.contextPath}/busicomps/line/content/linetopological/assets/topology.css" type="text/css" rel="stylesheet" />
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/line/js/serviceapi/LineTopologicalService.js'></script>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/line/js/serviceapi/LineTopologicalService.js'></script>

<div>
<div class="main-sandbox">
            <!--内容区域-->
            <div class="topology-box">
                <!--工具栏区域-->
                <div class="topology-header">
                    <div class="box border-right">
                        <span id="saveNode" class="item">保存</span><span id="backNode" class="item back">返回</span><span id="clearNode" class="item clear">清空</span>
                    </div><div class="box border-right">
                        <span id="zoomOutNode" class="item bigger">放大</span><span id="zoomInNode" class="item smaller">缩小</span><span id="centerNode" class="item center">居中</span><span id="fullScreen" class="item fullscreen">全屏</span>
                    </div><div class="box">
                        <span id="pickupNode" class="item pick">选择</span><span id="removeNode" class="item remove">删除</span>
                    </div>
                </div>
                <!--工具栏区域-->
                <!--绘制区域-->
                <div class="topology-content">
                    <div class="canvas-box" id="canvasBox">
                        <canvas id="topoCanvas"  class="mapContext"></canvas>
                    </div>
                    <div class="progress-tool"><span id="pageMainName"></span></div>
                </div>
                <!--绘制区域-->
                <!--组件区域-->
                <div class="topology-tools">
                    <div class="title"><span class="sub-title">元件库</span></div>
                    <ul class="nav topology-tools-nav" id="componentBox">
                        <!--组件区域-->
                    </ul>
                </div>
                <!--组件区域-->
            </div>
            <!--内容区域-->
            <!--元件弹出框-->
            <div id="promptBox" class="topo-prompt">
                <div class="layer"></div>
                <div class="box">
                    <div class="title">编辑用户信息</div>
                    <ul class="topo-promptlist">
                        <li>
                            <p>用户</p>
                            <select class="form-control" onchange="selectEvent('user')">
                                <!--动态加载数据-->
                            </select>
                        </li>
                        <li>
                            <p>用户名</p>
                            <input name="name" class="form-control" placeholder="备注"/>
                        </li>
                        <li class="button-row">
                            <button onclick="promptEvt('cancel')" class="btn btn-default pull-right">取消</button>
                            <button onclick="promptEvt('sure')" class="btn btn-default pull-right">确定</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="powerPromptBox" class="topo-prompt">
                <div class="layer"></div>
                <div class="box">
                    <div class="title">编辑发电厂信息</div>
                    <ul class="topo-promptlist">
                        <li>
                            <p>电厂</p>
                            <select class="form-control" onchange="selectEvent('power')">
                                <!--动态加载数据-->
                            </select>
                        </li>
                        <li>
                            <p>电厂名</p>
                            <input name="name" class="form-control" placeholder="备注"/>
                        </li>
                        <li>
                            <p>最小输出</p>
                            <input name="min" class="form-control" placeholder="备注"/>
                        </li>
                        <li>
                            <p>最大输出</p>
                            <input name="max" class="form-control" placeholder="备注"/>
                        </li>
                        <li class="button-row">
                            <button onclick="promptEvt('cancel')" class="btn btn-default pull-right">取消</button>
                            <button onclick="promptEvt('sure')" class="btn btn-default pull-right">确定</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="transPromptBox" class="topo-prompt">
                <div class="layer"></div>
                <div class="box h476">
                    <div class="title">编辑变电站信息<span onclick="promptEvt('cancel')">&#935;</span></div>
                    <ul class="topo-promptlist">
                        <li class="w100">
                            <p>变电站名称<i class="important-point">&#42;</i></p>
                            <input name="name" class="form-control" placeholder="变电站名称"/>
                        </li>
                        <li class="w100">
                            <p>变电站地址</p>
                            <input name="addr" class="form-control" placeholder="变电站地址"/>
                        </li>
                        <li>
                            <p>主变台数</p>
                            <input name="attr0" class="form-control" placeholder="主变台数"/>
                        </li>
                        <li>
                            <p>主变容量</p>
                            <input name="attr1" class="form-control" placeholder="主变容量"/>
                        </li>
                        <li>
                            <p>变电站管理单位</p>
                            <input name="attr2" class="form-control" placeholder="变电站管理单位"/>
                        </li>
                        <li>
                            <p>变电站电压等级</p>
                            <input name="level" class="form-control" placeholder="变电站电压等级" readonly/>
                        </li>
                        <li>
                            <p>变电站运行状态</p>
                            <select class="form-control" name="status">
                                <option value="0">停运</option>
                                <option value="1">运行</option>
                                <option value="2">拆除</option>
                            </select>
                        </li>
                        <li class="button-row text-center">
                            <button onclick="promptEvt('sure')" class="btn btn-default">确定</button>
                            <button onclick="promptEvt('cancel')" class="btn btn-default">取消</button>
                        </li>
                    </ul>
                </div>
            </div>
            <!--元件弹出框-->
            <!--线路弹出框-->
            <div id="linePromptBox" class="topo-prompt">
                <div class="layer"></div>
                <div class="box">
                    <div class="title">编辑元素信息<span onclick="linePromptEvt('cancel')">&#935;</span></div>
                    <ul class="topo-promptlist">
                        <li class="w100">
                            <p>线路名称</p>
                            <input name="name" class="form-control" placeholder="名称"/>
                        </li>
                        <li>
                            <p>线路长度</p>
                            <div style="position: relative">
                                <input name="length" class="form-control" placeholder=""/>
                                <span class="unit">KM</span>
                            </div>
                        </li>
                        <li>
                            <p>额定输送容量</p>
                            <div style="position: relative">
                                <input name="val4" class="form-control" placeholder=""/>
                                <span class="unit">KM</span>
                            </div>
                        </li>
                        <li class="w100">
                            <p>线路状态</p>
                            <select class="form-control" name="status">
                                <option value="0">停运</option>
                                <option value="1">运行</option>
                                <option value="2">拆除</option>
                            </select>
                        </li>
                        <li>
                            <p>线路电压</p>
                            <input name="voltage" class="form-control" placeholder="" readonly/>
                        </li>
                        <li>
                            <p>几何均距</p>
                            <input name="distance" class="form-control" placeholder=""/>
                        </li>
                        <li>
                            <p>有功线损计算值</p>
                            <input name="val0" class="form-control" placeholder=""/>
                        </li>
                        <li>
                            <p>无功线损计算值</p>
                            <input name="val1" class="form-control" placeholder=""/>
                        </li>
                        <li>
                            <p>单位长度线路电阻</p>
                            <input name="val2" class="form-control" placeholder=""/>
                        </li>
                        <li>
                            <p>单位长度线路电抗</p>
                            <input name="val3" class="form-control" placeholder=""/>
                        </li>
                        <li class="button-row text-center">
                            <button onclick="linePromptEvt('sure')" class="btn btn-default">确定</button>
                            <button onclick="linePromptEvt('cancel')" class="btn btn-default" style="margin: 0;">取消</button>
                        </li>
                    </ul>
                </div>
            </div>
            <!--线路弹出框-->
            <!--退出确认框-->
            <div id="confirmPromptBox" class="topo-prompt">
                <div class="layer"></div>
                <div class="box warning-box">
                    <div class="title"><span onclick="confPromptEvt('back')">&#935;</span></div>
                    <ul class="topo-promptlist">
                        <li class="w100">
                            <img class="warning-img" src="assets/icons/warning.png">
                            <span class="warning-txt">当前图例已发生变化，是否放弃保存当前图例？</span>
                        </li>
                        <li class="button-row text-center">
                            <button onclick="confPromptEvt('cancel')" class="btn btn-default">放弃</button>
                            <button onclick="confPromptEvt('sure')" class="btn btn-default">保存</button>
                        </li>
                    </ul>
                </div>
            </div>
            <!--退出确认框-->
            <!--修改输入框-->
            <textarea class="topo-modify" placeholder="输入名称。。。" id="modifyBox"></textarea>
            <!--修改输入框-->
            <!--双击详细信息提示框-->
            <ul id="dbFloatBox" class="topo-db-float">
                <!--自动填充内容-->
            </ul>
            <!--双击详细信息提示框-->
        </div>

</div>

<%-- <script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/line/content/linetopological/assets/jquery.min.js'></script> --%>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/line/content/linetopological/assets/jtopo-0.4.8-min.js'></script>
<script type='text/javascript'  src='${pageContext.request.contextPath}/busicomps/line/content/linetopological/assets/topology.js?v=1.0.1'></script>

