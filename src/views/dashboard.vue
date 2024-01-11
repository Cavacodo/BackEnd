<template>
	<div>

		<el-dialog v-model="dialogVisible" title="文本" width="30%" :before-close="handleClose">
			<el-input id="input" v-model="input" placeholder="输入待办事项" clearable />
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="submit">
						保存
					</el-button>
				</span>
			</template>
		</el-dialog>


		<el-row :gutter="20">
			<el-col :span="8">
				<el-card shadow="hover" class="mgb20" style="height: 524px">
					<div class="user-info">
						<el-avatar :size="120" :src="imgurl" />
						<div class="user-info-cont">
							<div class="user-info-name">root</div>
							<div>{{ role }}</div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="16">
				<el-card shadow="hover" style="height: 524px">
					<template #header>
						<div class="clearfix">
							<span>待办事项</span>
							<el-button @click="dialogVisible = true" style="float: right; padding: 3px 0"
								text>添加</el-button>
						</div>
					</template>

					<el-table :show-header="false" :data="todoList.arr" style="width: 100%">
						<el-table-column width="40">
							<template #default="scope">
								<el-checkbox @click="changeState(scope.row.tdId, scope.row.tdState)"
									v-model="scope.row.tdState"></el-checkbox>
							</template>
						</el-table-column>
						<el-table-column>
							<template #default="scope">
								<div class="todo-item" :class="{
									'todo-item-del': scope.row.tdState
								}">
									{{ scope.row.td }}
								</div>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-card shadow="hover">
					<schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card shadow="hover">
					<schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="dashboard">
import Schart from 'vue-schart';
import { onMounted, reactive } from 'vue';
import imgurl from '../assets/img/img.jpg';

import { ref } from 'vue'
import axios from 'axios';

const dialogVisible = ref(false)
const input = ref('')
const handleClose = (done: () => void) => {
	done()
}
const submit = function () {

	dialogVisible.value = false
	const text = document.getElementById('input')
	const params = new URLSearchParams();
	if (text.value) {
		params.append('tdinfo', text.value);
		axios.post('http://127.0.0.1:8088/td/addTd', params).then((res) => {
			getForm();
		})
	}
	else{
		alert('不能输入空！')
	}

}

const name = localStorage.getItem('ms_username');
const role: string = '超级管理员'

const options = reactive({type: 'bar',
	title: {
		text: '文理科分数(Top5)'
	},
	xRorate: 10,
	labels: [''],
	datasets: [
		{
			label: '文科',
			data: [0, 0, 0, 0, 0]
		},
		{
			label: '理科',
			data: [0, 0, 0, 0, 0]
		}
	]})
const options2 = reactive({
	type: 'line',
	title: {
		text: '学校访问量Top(5)'
	},
	labels: [''],
	datasets: [
		{
			label: '每周访问次数',
			data: [0,0,0,0,0]
		}
	]
})
const fillOption1 = () => {
	axios.get('http://127.0.0.1:8088/recruit/getAllTop5').then((res) => {
		options.labels = res.data.data[1];
		options.datasets[0].data = res.data.data[0][0];
		options.datasets[1].data = res.data.data[0][1];
	})
}
const fileOption2 = () => {
	axios.get('http://127.0.0.1:8088/popularity/getWeekTop5').then((res) => {
		options2.labels = res.data.data[1];
		options2.datasets[0].data = res.data.data[0];
		// console.log(options2.labels);
		// console.log(options2.datasets[0].data);
		

		// console.log(res.data.data[1]);
		// console.log(res.data.data[0]);
	})
}
let todoList = reactive({
	arr: []
});
let datar = [{}];
const getForm = () => {
	axios.get('http://127.0.0.1:8088/td/getTd').then((res) => {
		todoList.arr = res.data.data;
		datar = res.data.data;
	})
}
const changeState = (tdId, tdState) => {
	const a = tdId.charAt(2)
	const params = new URLSearchParams();
	params.append('tdId', tdId);
	params.append('td', datar[a - 1].td);
	console.log(tdState);
	if (tdState === true) {
		console.log(111);

		tdState = false;
	}
	else if (tdState === false) {
		tdState = true;
	}
	params.append('tdState', tdState);
	axios.post('http://127.0.0.1:8088/td/changeState', params).then((res) => {
		getForm()
	})
}
onMounted(() => {
	getForm();
})
fillOption1();
fileOption2();
</script>

<style scoped>
.el-row {
	margin-bottom: 20px;
}

.grid-content {
	display: flex;
	align-items: center;
	height: 100px;
}

.grid-cont-right {
	flex: 1;
	text-align: center;
	font-size: 14px;
	color: #999;
}

.grid-num {
	font-size: 30px;
	font-weight: bold;
}

.grid-con-icon {
	font-size: 50px;
	width: 100px;
	height: 100px;
	text-align: center;
	line-height: 100px;
	color: #fff;
}

.grid-con-1 .grid-con-icon {
	background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
	color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
	background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
	color: rgb(100, 213, 114);
}

.grid-con-3 .grid-con-icon {
	background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
	color: rgb(242, 94, 67);
}

.user-info {
	padding-top: 45%;
	display: flex;
	align-items: center;
	padding-bottom: 20px;
	border-bottom: 2px solid #ccc;
	margin-bottom: 20px;
}

.user-info-cont {
	padding-left: 50px;
	flex: 1;
	font-size: 14px;
	color: #999;
}

.user-info-cont div:first-child {
	font-size: 30px;
	color: #222;
}

.user-info-list {
	font-size: 14px;
	color: #999;
	line-height: 25px;
}

.user-info-list span {
	margin-left: 70px;
}

.mgb20 {
	margin-bottom: 20px;
}

.todo-item {
	font-size: 14px;
}

.todo-item-del {
	text-decoration: line-through;
	color: #999;
}

.schart {
	width: 100%;
	height: 300px;
}
</style>
