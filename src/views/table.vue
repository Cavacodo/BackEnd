<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-select v-model="query.address" placeholder="类型" class="handle-select mr10">
					<el-option key="1" label="理科" value="理科"></el-option>
					<el-option key="2" label="文科" value="文科"></el-option>
				</el-select>
				<el-input v-model="query.name" placeholder="输入具体校名" class="handle-input mr10"></el-input>
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
				<!-- <el-button type="primary" :icon="Plus">新增</el-button> -->
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="rId" label="ID" width="55" align="center"></el-table-column>
				<el-table-column prop="sName" label="大学名称" align="center"></el-table-column>
				<el-table-column prop="sMajor" label="专业" align="center">
				</el-table-column>
				<el-table-column prop="rAverage" label="平均分" align="center">
				</el-table-column>
				<el-table-column prop="rRank" label="排名" align="center"></el-table-column>
				<el-table-column prop="rYear" label="年份" align="center">
				</el-table-column>

				<el-table-column prop="rSubject" label="文/理科" align="center"></el-table-column>
				<el-table-column label="操作" width="220" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">
							编辑
						</el-button>
						<el-button text :icon="Delete" class="red" @click="handleDelete(scope.row)" v-permiss="16">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background layout="total, prev, pager, next" :current-page=query.pageIndex
					:page-size=query.pageSize :total=pageTotal @current-change="handlePageChange"></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" v-model="editVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="大学名称">
					<el-input v-model="form.sName"></el-input>
				</el-form-item>
				<el-form-item label="专业">
					<el-input v-model="form.sMajor"></el-input>
				</el-form-item>
				<el-form-item label="平均分">
					<el-input v-model="form.rAverage"></el-input>
				</el-form-item>
				<el-form-item label="排名">
					<el-input v-model="form.rRank"></el-input>
				</el-form-item>
				<el-form-item label="年份">
					<el-input v-model="form.rYear"></el-input>
				</el-form-item>
				<el-form-item label="文理科">
					<el-input v-model="form.rSubject"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
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

const query = reactive({
	address: '',
	name: '',
	pageIndex: 1,
	pageSize: 7
});
const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
	const params = new URLSearchParams();
	params.append('id', query.pageIndex + '')
	console.log(query.pageIndex);
	axios.post('http://127.0.0.1:8088/recruit/getShow', params).then((res) => {
		tableData.value = res.data.data;
		pageTotal.value = res.data.code || 50;
	})
};
getData();

// 查询操作
const handleSearch = () => {
	console.log(query.address);
	console.log(query.name);
	const params = new URLSearchParams();
	params.append('Type', query.address);
	params.append('sName', query.name);
	params.append('idx', query.pageIndex + '')
	if (query.address == '' && query.name == '') alert('输入有效数据！！！');
	else {
		axios.post('http://127.0.0.1:8088/recruit/searchByTypeName', params).then((res) => {
			if (res.data.data === '该学校不存在') alert('无相关数据！！！')
			else {
				tableData.value = res.data.data;
				pageTotal.value = res.data.code || 50;
			}
		})
	}
};
// 分页导航
const handlePageChange = (val: number) => {
	query.pageIndex = val;
	console.log(query.pageIndex);
	if (query.address === '' && query.name === '') getData();
	else {
		handleSearch()
	}
};



// 表格编辑时弹窗和保存
const editVisible = ref(false);
let form = reactive({
	rId: '',
	sName: '',
	sMajor: '',
	rAverage: '',
	rRank: '',
	rYear: '',
	rSubject: ''
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	idx = index;
	form.rId = row.rId;
	form.sName = row.sName;
	form.sMajor = row.sMajor;
	form.rAverage = row.rAverage;
	form.rRank = row.rRank;
	form.rSubject = row.rSubject;
	form.rYear = row.rYear;
	editVisible.value = true;
};
// 删除操作
const handleDelete = (row: any) => {
	form.rId = row.rId;
	form.sName = row.sName;
	form.sMajor = row.sMajor;
	form.rAverage = row.rAverage;
	form.rRank = row.rRank;
	form.rSubject = row.rSubject;
	form.rYear = row.rYear;
	// 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	})
		.then(() => {
			const params = new URLSearchParams();
			params.append('id', form.rId);
			axios.post('http://127.0.0.1:8088/recruit/delShow', params).then((res) => {
				if(res.data.data === true) alert('删除成功')
				getData();
			})
		})
		.catch(() => { });
};
const saveEdit = () => {
	editVisible.value = false;
	const params = new URLSearchParams();
	params.append('rId', form.rId);
	params.append('sName', form.sName);
	params.append('sMajor', form.sMajor);
	params.append('rAverage', form.rAverage);
	params.append('rRank', form.rRank);
	params.append('rSubject', form.rSubject);
	params.append('rYear', form.rYear);
	axios.post('http://127.0.0.1:8088/recruit/setShow', {
		rId: form.rId,
		sName: form.sName,
		sMajor: form.sMajor,
		rAverage: form.rAverage,
		rRank: form.rRank,
		rSubject: form.rSubject,
		rYear: form.rYear
	}).then((res) => {
		if (res.data.data !== true) alert(res.data.data);
	})
	ElMessage.success(`修改第 ${form.rId + 1} 行成功`);
	getData()
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
	color: #F56C6C;
}

.mr10 {
	margin-right: 10px;
}

.table-td-thumb {
	display: block;
	margin: auto;
	width: 40px;
	height: 40px;
}
</style>
