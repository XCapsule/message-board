# 留言板（JS异步获取后端xml数据）
- - - -
**留言板加载流程：**
1. 调用test(0)方法，向后端接口发起post请求，后端从数据库查询所有id>0数据反馈为xml文件
2. js逐个节点读取xml文件，判断zr是true或false，判断是否是楼主，从而执行AddMainM（parentid,rid,imgcode,pid,name,message）或AddBM(parentid,imgcode,pid,name,message)将数据加入至相应的div中（主楼或附楼）。例如在回复及删除按钮中加入当前留言的唯一标识符pid，onclick事件写为onclick=“Delete（pid）”，如此在点击按钮时可以可以传值给后台当前留言的pid从而方便删除和更改，而div中的input等组件同样需要和后台进行数据交互，故将这些组件的组件id设置为留言的pid或id。与此同时讲他们的id赋给全局变量finalid，从而记录当前页面中的最大id值，方便后续异步请求最新数据。
- - - -
**主留言过程：**
1. form表单提交，前端随机数生成imgcode产生留言者随机头像，生成当前时间作为用户唯一标识符pid传给后台。
2. 调用test（finalid）方法异步更新数据，并根据id获取留言input组件使组件内输入框为空。
- - - -
**副留言过程：**
1. 点击回复按钮调用方法OpenMessage（pid），使得命名为“#inp”+pid的输入框display=block；
2. 写入message后发送将会调用ReplyMessage(parentid,rid,pid)方法.其中parentid，rid，pid都已在加载时传入。
3. 该方法向后台发送post请求传入参数并调用test（finalid）方法异步更新数据。
