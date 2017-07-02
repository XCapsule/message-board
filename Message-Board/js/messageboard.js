//====================================================添加楼层==================================================
      function sendM(){

        var params = $("#form1").serialize(); 
        var imgcode=parseInt(Math.random()*100+3);
        var pid=new Date().getTime();
        params=params+"&imgcode="+imgcode+"&pid="+pid;
              // alert(params.length); 
              if(params.length>100){



                $.ajax( {  
                  type : "POST",  
                  url : "http://139.224.132.164/LYB/WebService.asmx/CreatM",  
                  data : params,  
                  success : function(msg) {  
                    var mg="";
                    var na="";                   
                    mg=$("#XT").val();
                    na=$("#XN").val();
                    alert("留言成功!");
                    $("#XN").val("");
                    $("#XT").val("");
                    {Test(finalid)}
                  }  
                });
              }
              else
                alert("请留言，勿灌水！")  
      }
//+++++++++++++++++++++++++++++++++++++++++按钮回复留言+++++++++++++++++++++++++++++++++++++++         
          function ReplyMessage(parentid,rid,pid){
            var yname=prompt("请输入你的姓名");
            if(yname!=null&&yname!=""){
              var message=$("#inp"+pid).val();
              var pname="";
              var lid=rid;
              var npid=new Date().getTime();
              pname=$("#fon"+pid).text();
              if(message==""){
                message="楼主加油...";
              }
              if(parentid!=0){
                lid=parentid;
                message="@"+pname+"&nbsp;"+message;
              }
                    message=addTime(message);
                    var imgcode=0;

                    imgcode=parseInt(Math.random()*100+3);
                    $.post("http://139.224.132.164/LYB/WebService.asmx/CreatM",{
                      name:yname,
                      parentid:lid,
                      imgcode:imgcode,
                      zr:"false",
                      message:message,
                      pid:npid
                    },function(data){
                      var n="";
                      $(data).find('string').each(function(i){
                        n+=$(this).text();
                      });

                      if(n=="留言成功"){
                        alert("SUCCESS!");
                        $("#inp"+pid).val("");                
                        {Test(finalid)}

                      }
                    })
                  }
           }
//++++++++++++++++++++++++++++++++++++++++++控制留言下方回复输入框打开或关闭++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          function OpenMessage(pid){
            var inp=$("#test"+pid).css('display');
            if(inp=="none"){
              $("div.Ly").css('display','none'); 
              $("#test"+pid).css('display','block');
            }else{
              $("#test"+pid).css('display','none');
            }
          }
//++++++++++++++++++++++++++++++++++++++++++删除留言，通过jquery控制CSS()事件++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          function DeleteMessage(m){
            var choose=confirm("确定删除？")
            if (choose) {
              var pw=prompt("请输入管理员密码");
              if(pw=="66666666"){
                $.post("http://139.224.132.164/LYB/WebService.asmx/Delete",{pid:m},function(data){
                  var n="";
                  $(data).find('string').each(function(i){
                    n+=$(this).text();
                  });
                  if(n=="删除成功"){
                    alert(n+　"！你的ip我记了！"+returnCitySN["cip"]+','+returnCitySN["cname"]);
                    $("#row211"+m).remove();
                  }});
              }

            }
          }

          var m=0;



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++添加主留言+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
              function AddMainM(parentid,rid,imgcode,pid,name,message){

                $('#211').append("<div id='row211"+pid+"' class='row'><div class='col-md-1'></div><div class='col-md-10'><div class='media MainMedia'> <div class='media-left'><a href='#'><img class='media-object' src='image/(" +imgcode+ ").jpg' alt='TEST' style='width: 55px;height: 55px;'></a> </div>  <div id='"+rid+"' class='media-body MainMessage'  ><div class='media-body'><h4 class='media-heading'><font color='#ffa640' id='fon"+pid+"' >"+name+" </font><span class='label label-primary'>"+x+"楼</span></h4><p>"+message+"</p>   <div style class='btn-group pull-right' role='group' aria-label='Button group with nested dropdown'>  <button type='button' class='btn btn-warning '  onclick='OpenMessage("+pid+")'>回复</button> <button type='button' class='btn btn-danger ' onclick='DeleteMessage("+pid+")'>删除</button>   </div></div> <!-- 发送按钮，提交message --><div id='test"+pid+"' class='Ly'>          <div  class='input-group' >          <input id='inp"+pid+"' type='text' class='form-control' placeholder='楼主加油...'>          <span class='input-group-btn'>          <button id='but"+pid+"' class='btn btn-default' type='button' onclick='ReplyMessage("+parentid+","+rid+","+pid+")'>发送</button>          </span>          </div> </div></div></div><div class='col-md-1'></div></div>");
                x++;
                finalid=rid;
              }
            //+++++++++++++++++++++++++++++++++++++添加副留言++++++++++++++++++++++++++++++++++++++++++++
            function AddBM(parentid,imgcode,pid,name,message){
              $('#'+parentid).append("<div class='media replyMedia'   id=row211"+pid+"><div class='media-left' style='text-align:center;'><a href='#'><img class='media-object img-thumbnail smallHead' src='image/(" +(imgcode)+ ").jpg' alt='TEST' ></a><font color='#eee' id='fon"+pid+"' >"+name+" </font></div><div class='media-body replyMessage' ><p>"+message+"</p><div class='btn-group pull-right' role='group' aria-label='Button group with nested dropdown'> <button type='button' class='btn btn-sm  btn-warning 'onclick='OpenMessage("+pid+")'>回复</button> <button type='button' class='btn btn-sm  btn-danger ' onclick='DeleteMessage("+pid+")'>删除</button>   </div></div> <!-- 发送按钮，提交message --><div id='test"+pid+"' class='Ly'>          <div  class='input-group' >          <input id='inp"+pid+"' type='text' class='form-control' placeholder='楼主加油...'>          <span class='input-group-btn'>          <button id='but"+pid+"' class='btn btn-default' type='button' onclick='ReplyMessage("+parentid+",0,"+pid+")'>发送</button>          </span>          </div> </div></div></div></div>");
              finalid=rid;
            }
            //+++++++++++++++++++++++++++++++++++++ONLOAD(),可添加加载动画+++++++++++++++++++++++++++++++++++++++++++++
//=========================================================================回复留言加日期===============================================================================

              function addTime(message){
                var now=new Date();
                var year=now.getFullYear();
                var mon=now.getMonth()+1;
                var day=now.getDate();
                var hour=now.getHours();
                var minutes=now.getMinutes();
                message=message+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;---"+year+"&nbsp;"+mon+"月"+day+"日"+"&nbsp;"+hour+":"+minutes;
                return message;
              }


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++获取后台数据库留言，传入参数为当前页面最大的Id值（在后台比较取得大于当前页面最大Id值的值而获得更新数据）++++++++++++++++++++++++++++++++++++++++++++++++
                function  Test(finalid){

                  $.post('http://139.224.132.164/LYB/WebService.asmx/updateM',{id:finalid},function(data){
                       //查找所有的book节点
                       
                       $(data).find('LYB_X').each(function(i){
                        var imgcode=$(this).children('imgcode').text().split(" ")[0];
                        var id=$(this).children('id').text();
                        var pid=$(this).children('pid').text();
                        var parentid=$(this).children('parentid').text();
                        var name=$(this).children('name').text();
                        var message=$(this).children('message').text();
                        var zr=$(this).children('zr').text();

                        rid=parseInt(id);
                        if(zr=="true"){
                          {AddMainM(parentid,rid,imgcode,pid,name,message)}

                        }
                        else{
                          {AddBM(parentid,imgcode,pid,name,message)}
                        }

                      });


                     });
                }