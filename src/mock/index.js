// src/mock/index.js
import Mock from 'mockjs'  //导入mockjs

//使用Mock下面提供的mock方法进行需要模拟数据的封装
//参数1，是需要拦截的完整请求地址，参数2，是请求方式，参数3，是请求的模拟数据

Mock.mock('/getData', 'get', {
    status: 200, //请求成功状态码
    dataList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] //模拟的请
})
Mock.mock('/isValid', 'post', function (res) {
    let body = JSON.parse(res.body)
    const isTruem = body.account === 'root' && body.passwd === 'root';
    return {
        isTrue: isTruem
    }
})
Mock.mock('/updateDesc','post', function(data){
    let body = JSON.parse(data.body)
    if(body){
        const tmp = body.data.desc;
        console.log(tmp);
        return{
            desc: tmp
        }
    }
})
Mock.mock('/getDetail','get',function(data){
    console.log(data.body);
    return{
        "list": [{
                "id": 1,
                "name": "张三",
                "money": 123,
                "address": "广东省东莞市长安镇",
                "state": "成功",
                "date": "2019-11-1",
                "thumb": "https://lin-xin.gitee.io/images/post/wms.png"
            },
            {
                "id": 2,
                "name": "李四",
                "money": 456,
                "address": "广东省广州市白云区",
                "state": "成功",
                "date": "2019-10-11",
                "thumb": "https://lin-xin.gitee.io/images/post/node3.png"
            },
            {
                "id": 3,
                "name": "王五",
                "money": 789,
                "address": "湖南省长沙市",
                "state": "失败",
                "date": "2019-11-11",
                "thumb": "https://lin-xin.gitee.io/images/post/parcel.png"
            },
            {
                "id": 4,
                "name": "赵六",
                "money": 1011,
                "address": "福建省厦门市鼓浪屿",
                "state": "成功",
                "date": "2019-10-20",
                "thumb": "https://lin-xin.gitee.io/images/post/notice.png"
            },
            {
                "id": 5,
                "name": "赵六",
                "money": 1011,
                "address": "福建省厦门市鼓浪屿",
                "state": "成功",
                "date": "2019-10-20",
                "thumb": "https://lin-xin.gitee.io/images/post/notice.png"
            },
            {
                "id": 6,
                "name": "赵六",
                "money": 1011,
                "address": "福建省厦门市鼓浪屿",
                "state": "成功",
                "date": "2019-10-20",
                "thumb": "https://lin-xin.gitee.io/images/post/notice.png"
            },
            {
                "id": 7,
                "name": "赵六",
                "money": 1011,
                "address": "福建省厦门市鼓浪屿",
                "state": "成功",
                "date": "2019-10-20",
                "thumb": "https://lin-xin.gitee.io/images/post/notice.png"
            },
            {
                "id": 8,
                "name": "赵六",
                "money": 1011,
                "address": "福建省厦门市鼓浪屿",
                "state": "成功",
                "date": "2019-10-20",
                "thumb": "https://lin-xin.gitee.io/images/post/notice.png"
            }
        ],
        "pageTotal": 8
    }
})
