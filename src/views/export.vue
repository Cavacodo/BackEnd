<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" @click="exportXlsx">导出Excel</el-button>
            </div>
            <el-table :data="tableData" border class="table" header-cell-class-name="table-header">
                <el-table-column prop="rId" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="sName" label="姓名"></el-table-column>
                <el-table-column prop="sMajor" label="学号"></el-table-column>
                <el-table-column prop="rAverage" label="班级"></el-table-column>
                <el-table-column prop="rRank" label="年龄"></el-table-column>
                <el-table-column prop="rSubject" label="性别"></el-table-column>
                <el-table-column prop="rYear" label="性别"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts" name="export">
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import axios from 'axios';

interface TableItem {
	rId: string;
	sName: string;
	sMajor: string;
	rAverage: string;
	rRank: string;
	rSubject: string;
	rYear: string;
}

const tableData = ref<TableItem[]>([]);
// 获取表格数据
const getData = () => {
    const params = new URLSearchParams();
    params.append('id', 1 + '')
    axios.post('http://127.0.0.1:8088/recruit/getShow', params).then((res) => {        
        tableData.value = res.data.data;
    })
    console.log(tableData.value);
    
    // tableData.value = [
    //     {
    //         rId: '1',
    //         sName: '小明',
    //         sMajor: 'S001',
    //         rAverage: '一班',
    //         rRank: '10',
    //         rSubject: '男',
    //         rYear: '1'
    //     },
    // ];
};

getData();

const list = [['序号', '姓名', '学号', '班级', '年龄', '性别']];
const exportXlsx = () => {
    tableData.value.map((item: any, i: number) => {
        const arr: any[] = [i + 1];
        arr.push(...[item.name, item.sno, item.class, item.age, item.sex]);
        list.push(arr);
    });
    let WorkSheet = XLSX.utils.aoa_to_sheet(list);
    let new_workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(new_workbook, WorkSheet, '第一页');
    XLSX.writeFile(new_workbook, `表格.xlsx`);
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
}

.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #f56c6c;
}

.mr10 {
    margin-right: 10px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}</style>
