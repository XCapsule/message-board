# 留言板（JS异步获取后端xml数据）

留言板加载流程：1.调用test(0)方法，向后端接口发起post请求，后端从数据库查询所有id>0数据反馈为xml文件，js逐个节点读取xml文件，判断zr是true或false，判断是否是楼主，从而执行AddMainM（parentid,rid,imgcode,pid,name,message）或AddBM(parentid,imgcode,pid,name,message)将数据加入至相应的div中（主楼或附楼）。
