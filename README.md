# page_controller
一个jQuery的简单分页插件
## 用法：
1.首先保证jQuery依赖

```
	<script type="text/javascript" src="./js/jQuery.min.js"></script>
```

2.引入插件

```
	<script type="text/javascript" src="./Pager.js"></script>
```

3.使用插件：

```
	<script type="text/javascript">
		new Pager(
			{
				listContent: $('.list-content')[0],
				list: $('.page-btn')[0], 
				pageMax:10
			}
		);
	</script>
```

4.说明：

listContent： 列表容器
	
list：页码按钮容器

pageMax：单页最多项目数(默认为8个)

注：需要用户自定义按钮样式，与选中样式，
添加选中样式时，选择器必须为.select
