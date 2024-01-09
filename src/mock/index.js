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
        console.log(body.data.new);
        const tmp = body.data.desc;
        console.log(tmp);
        return{
            desc: tmp
        }
    }
})
Mock.mock('/getToDo','get',{
        list:[{
            title: '今天要修复1000个bug',
            status: false
        },
        {
            title: '今天要修复100个bug',
            status: true
        },
        {
            title: '今天要写100行代码加几个bug吧',
            status: true
        }]
})
Mock.mock('/getDetail','get',function(data){
    console.log(data.body);
    return{
        "list": [{
            rId: '1',
            sName: '生活方式',
            sMajor: '发顺丰',
            rAverage: '阿斯顿发',
            rRank: '阿斯顿发',
            rYear: '是啥',
            rSubject: ' 阿斯顿发这种'
            },
            
        ],
        "pageTotal": 4
    }
})
