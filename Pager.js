// define( function(require, exports, module) {
    
    function Pager (options) {
        options          = this.config(options);

        this.listContent = options.listContent;                                                         // 列表容器
        this.btnList     = options.list;                                                                // 分页按钮容器
        this.aLi         = options.listContent.children;                                                // 列表项
        this.liLen       = this.aLi.length;                                                             // 列表项长度
        this.pageMax     = options.pageMax;                                                             // 单页最大项目数
        this.pageLen     = Math.ceil(this.liLen / this.pageMax);                                        // 页码长度
        this.Numnow      = parseInt(this.hashResolve(window.location.hash).pagenum) || options.Numnow;  // 当前页码
        this.pageArray   = [];                                                                          // 列表数组

        this.init();
    };

    Pager.prototype = {
        constructor: Pager,

        // 默认值
        defaulOptions: {
            pageMax: 8,
            Numnow: 1
        },

        /**
         * 合并默认值和用户预设值
         * @param  {object} options [用户预设值]
         * @return {object}         [合并后返回值]
         */
        config: function (options) {
            options = this.merge(this.defaulOptions, options);
            return options;
        },

        /**
         * 合并两个对象
         * @param  {object} obj1 [对象1（权值低）]
         * @param  {object} obj2 [对象2（权值高）]
         * @return {object}      [对象合并值]
         */
        merge: function (obj1, obj2) {
            var json = {};

            for (attr1 in obj1) {
                json[attr1] = obj1[attr1];
            }
            for (attr2 in obj2) {
                json[attr2] = obj2[attr2];
            }
            return json;
        },

        /**
         * 渲染单页
         * @param  {number} whichPage [页码数]
         * @return {null}           
         */
        showPage: function (whichPage) {
            $('.list-content').html('');
            for(i = (whichPage - 1) * this.pageMax; i < this.pageMax * whichPage ; i++){
                $('.list-content').append(this.pageArray[i]);
            }
        },

        /**
         * 渲染页码
         * @param {number} currentPage [当前页码]
         */
        addPageNum: function (currentPage) {
            var listItem = '';

            // 当前页码数大于1
            if(currentPage > 1){
                listItem += '<li><a href="#pagenum='+(this.Numnow - 1)+'">上一页</a></li>';
            }

            // 页码数大于5
            if (this.pageLen > 5){

                // 当前页码数小于等于3
                if (currentPage <= 3) {
                    for (var i=1; i < 5; i++){
                        listItem += currentPage == i ? '<li><a class="select" href="#pagenum='+i+'">'+i+'</a></li>' : '<li><a href="#pagenum='+i+'">'+i+'</a></li>';
                    }

                    // 最后一页按钮
                    listItem += '...<li><a href="#pagenum='+this.pageLen+'">'+this.pageLen+'</a></li>';
                }

                // 当前页码数大于等于总页码长度减2
                else if (currentPage >= this.pageLen-2) {

                    listItem += '<li><a href="#pagenum='+1+'">'+1+'</a></li>...';

                    for(var i=this.pageLen - 3; i < this.pageLen + 1; i++){

                        // 添加select类名高亮当前页
                        listItem += currentPage == i ? '<li><a class="select" href="#pagenum='+i+'">'+i+'</a></li>' : '<li><a href="#pagenum='+i+'">'+i+'</a></li>';
                    }
                }

                // 当前页码数小于总页码数
                else if (currentPage < this.pageLen) {
                    listItem += '<li><a href="#pagenum='+1+'">'+1+'</a></li>...';
                    listItem += '<li><a href="#pagenum='+(currentPage-1)+'">'+(currentPage-1)+'</a></li>';
                    listItem += '<li><a class="select" href="#pagenum='+currentPage+'">'+currentPage+'</a></li>';
                    listItem += '<li><a href="#pagenum='+(currentPage+1)+'">'+(currentPage+1)+'</a></li>...';
                    listItem += '<li><a href="#pagenum='+this.pageLen+'">'+this.pageLen+'</a></li>'; 
                }
            }

            // 页码数小于5
            else {
                for(var i=1; i < this.pageLen+1; i++){
                    // 添加select类名高亮当前页
                    listItem += currentPage == i ? '<li><a class="select" href="#pagenum='+i+'">'+i+'</a></li>' : '<li><a href="#pagenum='+i+'">'+i+'</a></li>';
                }
            }

            // 当前页码数小于总页码数
            if(currentPage < this.pageLen){
                listItem += '<li><a href="#pagenum='+ (this.Numnow + 1) +'">下一页</a></li>';
            }
            this.btnList.innerHTML = listItem;
        },

        /**
         * 解析传入的hash值
         * @param  {string} hash [URL hash值]
         * @return {object}      [解析到的json键值对]
         */
        hashResolve: function (hash) {
            var json = {};
            var arr  = hash.slice(1).split('&');
            for (var i = 0; i < arr.length; i++) {
                var newarr      = arr[i].split('=');
                json[newarr[0]] = newarr[1];
            }

            return json;
        },

        /**
         * 初始化方法
         * @return {null}
         */
        init: function () {

            // 存储当前作用域供事件监听函数内访问外部变量
            var _this = this;

            // 单页项目个数大于预设的单页项目个数时
            if (this.liLen > this.pageMax) {

                // 遍历li添加进数组
                for(var i = 0; i < this.aLi.length; i++){
                    this.pageArray.push(this.aLi[i]);
                }

                // 渲染单页
                this.showPage(this.Numnow);
                
                // 渲染页码
                this.addPageNum(this.Numnow);
            }
            
            // 添加点击事件
            $(this.btnList).delegate(
                'a','click',
                function (e) {
                    var target = $(e.target);

                    // 取出目标元素hash值设为当前页数
                    _this.Numnow = parseInt(_this.hashResolve(target.context.hash).pagenum);

                    // 渲染当前页面
                    _this.showPage(_this.Numnow);

                    // 渲染页码
                    _this.addPageNum(_this.Numnow);

                }
            );
        }
    };

    // module.exports = Pager;
// });

