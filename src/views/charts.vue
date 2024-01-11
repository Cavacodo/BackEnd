<template>
	<div class="container">
		<!-- <div class="plugins-tips">
			vue-schart：vue.js封装sChart.js的图表组件。 访问地址：
			<a href="https://github.com/lin-xin/vue-schart" target="_blank">vue-schart</a>
		</div> -->
		<div class="schart-box">
			<div class="content-title">近三年录取最高分数</div>
			<schart class="schart" canvasId="bar" :options="options1"></schart>
		</div>
		<div class="schart-box">
			<div class="content-title">近三年录取分数情况</div>
			<schart class="schart" canvasId="line" :options="options2"></schart>
		</div>
		<div class="schart-box">
			<div class="content-title">前8省市大学数量</div>
			<schart class="schart" canvasId="pie" :options="options3"></schart>
		</div>
	</div>
</template>

<script setup lang="ts" name="basecharts">
import axios from 'axios';
import { reactive } from 'vue';
import Schart from 'vue-schart';

const options1 = reactive({
	type: 'bar',
	bgColor: '#fbfbfb',
	labels: ['2020','2021','2022'],
	datasets: [
		{
			label: '第一',
			fillColor: 'rgba(241, 49, 74, 0.5)',
			data: [0,0,0]
		},
		{
			label: '第二',
			data: [0,0,0]
		},
		{
			label: '第三',
			data: [0,0,0]
		}
	]
})
const options2 = reactive({
	type: 'line',
	bgColor: '#fbfbfb',
	labels: ['2020', '2021', '2022'],
	datasets: [
		{
			label: '平均分',
			data: [0,0,0]
		},
		{
			label: '最高分',
			data: [0,0,0]
		},
		{
			label: '最低分',
			data: [0,0,0]
		}
	]
})
const options3 = reactive({
	type: 'pie',
	legend: {
		position: 'left'
	},
	bgColor: '#fbfbfb',
	labels: [],
	datasets: [
		{
			data: []
		}
	]
})
const fileOption1 = () => {
	axios.get('http://127.0.0.1:8088/recruit/get3YearTop3').then((res) => {
		options1.datasets[0].data = res.data.data[0];
		options1.datasets[1].data = res.data.data[1];
		options1.datasets[2].data = res.data.data[2];
	})
}
fileOption1();
const fileOption2 = () => {
	axios.get('http://127.0.0.1:8088/recruit/get3YearLine').then((res) => {
		options2.datasets[0].data = res.data.data[1];
		options2.datasets[1].data = res.data.data[0];
		options2.datasets[2].data = res.data.data[2];
	})
}
fileOption2();
const fileOption3 = () => {
	axios.get('http://127.0.0.1:8088/universityCount/getProvinceUnivCount').then((res) => {
		options3.labels = res.data.data[0].slice(0,8);
		options3.datasets[0].data = res.data.data[1].slice(0,8);
	})
}
fileOption3();
</script>

<style scoped>
.schart-box {
	padding-left: 200px;
	display: inline-block;
	margin: 20px;
}
.schart {
	width: 600px;
	height: 400px;
}
.content-title {
	text-align: center;
	clear: both;
	font-weight: 400;
	line-height: 50px;
	margin: 10px 0;
	font-size: 22px;
	color: #1f2f3d;
}
</style>
