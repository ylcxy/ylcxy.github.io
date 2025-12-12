$(function(){
    var searchKeyWord="";

    $(".search_switch_btn").click(function(){
        var self=$(this);
        var searchurl=self.attr("data-href");
        var inputname=self.attr("data-inputname");
        var searchlogo=self.find("img").attr("src");
        var dataid=self.attr("data-id");
        $("#cy-search_keyword").attr("name",inputname);
        $("#search_main_frm").attr("action",searchurl);
        $("#cy-search-logo-main").attr("src",searchlogo);
        if(dataid==="se_baidu"){
            $("#cy-search_keyword").css("border","1px solid #38f");
            $("#cy-search_submit").css("background","#38f");
        }
        if(dataid==="se_360"){
            $("#cy-search_keyword").css("border","1px solid #3FB30E");
            $("#cy-search_submit").css("background","#3FB30E");
        }
        if(dataid==="se_bing"){
            $("#cy-search_keyword").css("border","1px solid #0d9071");
            $("#cy-search_submit").css("background","#0d9071");
        }
        if(dataid==="se_toutiao"){
            $("#cy-search_keyword").css("border","1px solid #ed4040");
            $("#cy-search_submit").css("background","#ed4040");
        }
    });

    /**
     * 执行搜索下拉选词
     */
    function searchHotWdlist(){
        var wd=$("#cy-search_keyword").val().trim();
        console.log("wd:"+wd);
        if(searchKeyWord!=wd){
            searchKeyWord=wd;
            var s = document.createElement('script');
            s.id = "search_baidu_su";
            s.src = 'https://www.baidu.com/su?wd=' + encodeURI(wd) + '&p=3&cb=funSearchSu';
            document.body.appendChild(s);
        }
    }
    /**
     * 搜索下拉选词上下箭头键盘事件
     * @param {Object} e
     */
    function keyUpDownSelectWd(e){
        //下键  e.keyCode == 39||
        if((e.keyCode == 40) && $(".hlinfo-search-ipt-hot").find("li").length>0){
            if($(".hlinfo-search-ipt-hot").find("li").hasClass("cycurrent")){
                var ipt_hot_obj = $(".hlinfo-search-ipt-hot").find("li.cycurrent");
                var ot="";
                if(ipt_hot_obj.parent().next().length == 0){
                    ipt_hot_obj.removeClass("cycurrent");
                    $(".hlinfo-search-ipt-hot").find("li").eq(0).addClass("cycurrent");
                    ot=$(".hlinfo-search-ipt-hot").find("li").eq(0).text();
                }else{
                    ipt_hot_obj.removeClass("cycurrent").parent().next().find("li").addClass("cycurrent");
                    ot=ipt_hot_obj.parent().next().find("li").text();
                }
                if(ot!=""){
                    $("#cy-search_keyword").val(ot);
                }
            }else{
                $(".hlinfo-search-ipt-hot").find("li").eq(0).addClass("cycurrent");
                if($(".hlinfo-search-ipt-hot").find("li").eq(0).hasClass("cycurrent")){
                    ot=$(".hlinfo-search-ipt-hot").find("li").eq(0).text();
                }
                if(ot!=""){
                    $("#cy-search_keyword").val(ot);
                }
            }
            //上键   ||e.keyCode == 37
        }else if((e.keyCode == 38) && $(".hlinfo-search-ipt-hot").find("li").length>0){
            if($(".hlinfo-search-ipt-hot").find("li").hasClass("cycurrent")){
                var ipt_hot_obj = $(".hlinfo-search-ipt-hot").find("li.cycurrent");
                var ot="";
                if(ipt_hot_obj.parent().prev().length == 0){
                    ipt_hot_obj.removeClass("cycurrent");
                    $(".hlinfo-search-ipt-hot").find("li").last().addClass("cycurrent");
                    ot=$(".hlinfo-search-ipt-hot").find("li").last().text();
                }else{
                    ipt_hot_obj.removeClass("cycurrent").parent().prev().find("li").addClass("cycurrent");
                    ot=ipt_hot_obj.parent().prev().find("li").text();
                }
                if(ot!=""){
                    $("#cy-search_keyword").val(ot);
                }
            }else{
                $(".hlinfo-search-ipt-hot").find("li").last().addClass("cycurrent");
                if($(".hlinfo-search-ipt-hot").find("li").last().hasClass("cycurrent")){
                    ot=$(".hlinfo-search-ipt-hot").find("li").last().text();
                }
                if(ot!=""){
                    $("#cy-search_keyword").val(ot);
                }
            }
        }
    }

    $("#cy-search_keyword").bind("keyup focus",function(e){
        if($(".hlinfo-search-ipt-hot").find("li").length<=0){
            searchHotWdlist();
        }
        $("#cy-search_keyword").bind("input propertychange",function(event){
            searchHotWdlist();
        });
        keyUpDownSelectWd(e);
    });
    $("#cy-search_keyword").blur(function(){
        //$(".hlinfo-search-ipt-hot").html('').addClass("hidden");
    });
    document.onclick = function(e) {
        if (e.target != document.getElementsByClassName("hlinfo-search-ipt-hot-li") && e.target != document.getElementById("cy-search_keyword")) {
            $(".hlinfo-search-ipt-hot").html('').addClass("hidden");
        }
    }

    //增加网址
    $(".hlinfo-bootstrap-switch").bootstrapSwitch();
    //$('[data-toggle="tooltip"]').tooltip();
    $(".hlinfo-addsite").bind("keyup focus",function(e){
        if($(this).val()!=""){$(this).parent().removeClass("has-error");}
    });
    $("#hlinfo-addsite-siteurl").bind("keyup blur input propertychange",function(e){
        if($(this).val()!=""){
           // var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
            //var reg = /^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})www\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
            var reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.%]+$/;
            if(reg.test($(this).val())){
                //console.log("输入成功:"+$(this).val());
                $.post(basePath+"home/index/getSiteTitle.html",{"siteurl":$(this).val()},function (rs) {
                    if(rs.success && rs.msg!=""){
                        $("#hlinfo-addsite-sitename").val(rs.msg);
                    }
                });
            }else{
                //console.log("网址ERROR："+$(this).val());
            }
        }
    });

    $("#hlinfo-addsite-siteurl").bind("blur",function(e){
        if($(this).val()!=""){
            // var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
            //var reg = /^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})www\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
            var reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.%]+$/;
            if(reg.test($(this).val())){
                //console.log("输入成功:"+$(this).val());
                $.post(basePath+"home/index/getFaviconApi.html",{"url":$(this).val()},function (rs) {
                    if(rs.success && rs.icourl!=""){
                        $("#hlinfo-addsite-icourl").val(rs.icourl);
                        $('#icoImgUploadimg').attr('src', rs.icourl);
                        $(".cy-upload-ico .layui-upload-list").removeClass("layui-hide");
                    }
                });
            }else{
                //console.log("网址ERROR："+$(this).val());
            }
        }
    });
    $("#hlinfo-addsite-submit").click(function () {
        if($("#hlinfo-addsite-siteurl").val()==""){
            $("#hlinfo-addsite-siteurl").attr("title","网址不能为空");
            $("#hlinfo-addsite-siteurl").parent().addClass("has-error");
            $('#hlinfo-addsite-siteurl').tooltip('show');
            setTimeout('hidetooltips($("#hlinfo-addsite-siteurl"))',5000);
            return false;
        }
        if($("#hlinfo-addsite-sitename").val()==""){
            $("#hlinfo-addsite-sitename").attr("title","请填写网址名称");
            $("#hlinfo-addsite-sitename").parent().addClass("has-error");
            $('#hlinfo-addsite-sitename').tooltip('show');
            setTimeout('hidetooltips($("#hlinfo-addsite-sitename"))',5000);
            return false;
        }
        var isPrivaceVal = $('#hlinfo-addsite-isprivate').bootstrapSwitch("state");
        var data = {
            siteurl:$("#hlinfo-addsite-siteurl").val(),
            sitename:$("#hlinfo-addsite-sitename").val(),
            icourl:$("#hlinfo-addsite-icourl").val(),
            isPrivace:isPrivaceVal?4:3
        };
        var $btn = $(this).button('loading');
        $.post(basePath+"home/index/addSiteSave.html",data,function (rs) {
            if(rs.success){
                showMsg(rs.msg,true);
                document.getElementById("hlinfo-addsite-form").reset();
                $('#icoImgUploadimg').attr('src', $('#icoImgUploadimg').attr("data-defico"));
                $btn.button('reset');
                setTimeout('removeMsg()',5000);
            }else{
                showMsg(rs.msg,false);
                $btn.button('reset');
            }
        },"json");
    });


    $('#addSiteInfo').on('hidden.bs.modal', function (e) {
        window.location.reload();
    });
    function showMsg(m,success){
        console.log("success;"+success);
        $("#hlinfo-addsite-msg .show-msg").html(m);
        if(success == true){
            $("#hlinfo-addsite-msg").removeClass().addClass("alert-dismissible alert alert-success").show();
        }else {
            $("#hlinfo-addsite-msg").removeClass().addClass("alert-dismissible alert alert-danger").show();
        }
    }
    function removeMsg(){
        $("#hlinfo-addsite-msg").hide();
    }

    $("a.cy-dh-a").click(function () {
        var _self = $(this);
        var baseUrl = basePath || false;
        if(baseUrl) {
            $.post(baseUrl + "home/index/addvisit.html", {sid: _self.data("sid")}, function (rs) {
                // add visit
            });
        }
        $("#hlinfo-site-target-blank-a").attr("href", _self.attr("data-href"));
        $("#hlinfo-site-target-blank").click();
        return false;
    });

    layui.use(['upload','layer'], function() {
        var $ = layui.jquery,layer = layui.layer
            , upload = layui.upload;
        //普通图片上传
        var uploadUrl = $("#icoImgUploadbtn").attr("data-uploadurl");
        var uploadInst = upload.render({
            elem: '#icoImgUploadbtn'
            ,url: uploadUrl
            ,field: 'uploadIcoImg'
            ,accept:'images'
            ,exts: 'ico|png'
            ,acceptMime:'image/png,image/x-icon'
            ,size:'50'
            ,before: function(obj){
                //预读本地文件示例，不支持ie8
                obj.preview(function(index, file, result){
                    $('#icoImgUploadimg').attr('src', result); //图片链接（base64）
                    $(".cy-upload-ico .layui-upload-list").removeClass("layui-hide");
                });
            }
            ,done: function(res){
                //上传成功
                if(res.success){
                    $("#hlinfo-addsite-icourl").val(res.url);
                    return layer.msg(res.msg);
                }
                // 如果上传失败
                $('#icoImgUploadimg').attr('src', $('#icoImgUploadimg').attr("data-defico"));
                $(".cy-upload-ico .layui-upload-list").addClass("layui-hide");
                return layer.msg(res.msg,function(){});
            }
            ,error: function(){
               layer.msg("上传失败，请重试");
            }
        });
    });

});
/**
 * 搜索下拉选词回调函数
 * @param {Object} data
 */
function funSearchSu(data){
    jQuery(".hlinfo-search-ipt-hot").html('');
    var d=[];
    var actionurl =  jQuery("#search_main_frm").attr("action") + "?" + jQuery("#cy-search_keyword").attr("name");
    data.s.forEach(function(item, index) {
        d.push('<a href="'+actionurl+'='+encodeURI(item)+'" target="_blank"><li class="list-group-item hlinfo-search-ipt-hot-li">'+item+'</li></a>');
    });
    jQuery(".hlinfo-search-ipt-hot").html(d.join("")).removeClass("hidden");
    var sobj=document.getElementById('search_baidu_su');
    document.body.removeChild(sobj);
}
function hlinfoMobileSearch() {
    var sipt = document.getElementById('mobile_search_ipt').value;
    if (sipt.trim() == '') {
        return false;
    }
    return true;
}
function hidetooltips(obj) {
    obj.tooltip("destroy");
    obj.attr("title","");
}
