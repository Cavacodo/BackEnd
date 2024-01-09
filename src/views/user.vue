<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-card shadow="hover">
					<template #header>
						<div class="clearfix">
							<span>基础信息</span>
						</div>
					</template>
					<div style="height: 540px;">
						<div class="info" style="padding-top: 120px;">
							<div class="info-image">
								<el-avatar :size="100" :src="avatarImg" />
							</div>
							<div class="info-name">root</div>
							<div class="info-desc" id="desc">{{ form.desc }}</div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card shadow="hover" style="height: 639px;">
					<template #header>
						<div class="clearfix">
							<span>账户编辑</span>
						</div>
					</template>
					<div style="padding-top: 120px;">
						<el-form label-width="90px">
							<el-form-item label="用户名："> root </el-form-item>
							<el-form-item label="旧密码：">
								<el-input type="password" v-model="form.old"></el-input>
							</el-form-item>
							<el-form-item label="新密码：">
								<el-input type="password" v-model="form.new"></el-input>
							</el-form-item>
							<el-form-item label="个人简介：">
								<el-input v-model="form.desc"></el-input>
							</el-form-item>
							<el-form-item class="button">
								<el-button type="primary" @click="onSubmit">保存</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="user">
import { onMounted, reactive, ref } from 'vue';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import avatar from '../assets/img/img.jpg';
import axios from 'axios';

const name = localStorage.getItem('ms_username');
const form = reactive({
	old: '',
	new: '',
	desc: ''
});
const onSubmit = () => {
	const params = new URLSearchParams();
	params.append('oldpswd', form.old);
	params.append('newpswd', form.new);
	params.append('intro', form.desc);
	axios.post('http://127.0.0.1:8088/user/changeUser', params).then((res) => {
		const t = res.data.data;
		if(t !== '111') alert(t);
		if(form.desc && t === '111'){
			 alert('个人简介修改成功！')
		}
	})
};
const getIntro = () => {
	axios.get('http://127.0.0.1:8088/user/getIntro').then((res) => {
		let con = res.data.data	
		console.log(con);
		
		form.desc = con
	})
}
onMounted(() => {
	getIntro()
})
const avatarImg = ref(avatar);
const imgSrc = ref('');
const cropImg = ref('');
const dialogVisible = ref(false);
const cropper: any = ref();

const showDialog = () => {
	dialogVisible.value = true;
	imgSrc.value = avatarImg.value;

};

const setImage = (e: any) => {
	const file = e.target.files[0];
	if (!file.type.includes('image/')) {
		return;
	}
	const reader = new FileReader();
	reader.onload = (event: any) => {
		dialogVisible.value = true;
		imgSrc.value = event.target.result;
		cropper.value && cropper.value.replace(event.target.result);
	};
	reader.readAsDataURL(file);
};

const cropImage = () => {
	cropImg.value = cropper.value.getCroppedCanvas().toDataURL();
};

const saveAvatar = () => {
	avatarImg.value = cropImg.value;
	dialogVisible.value = false;
};
</script>

<style scoped>
.info {
	text-align: center;
	padding: 35px 0;
}

.button {
	padding-left: 170px;
}

.info-image {
	position: relative;
	margin: auto;
	width: 100px;
	height: 100px;
	background: #f8f8f8;
	border: 1px solid #eee;
	border-radius: 50px;
	overflow: hidden;
}

.info-edit {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	opacity: 0;
	transition: opacity 0.3s ease;
}

.info-edit i {
	color: #eee;
	font-size: 25px;
}

.info-image:hover .info-edit {
	opacity: 1;
}

.info-name {
	margin: 15px 0 10px;
	font-size: 24px;
	font-weight: 500;
	color: #262626;
}

.crop-demo-btn {
	position: relative;
}

.crop-input {
	position: absolute;
	width: 100px;
	height: 40px;
	left: 0;
	top: 0;
	opacity: 0;
	cursor: pointer;
}
</style>
