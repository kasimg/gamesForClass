$(document).ready(() => {
	//  获取每组的人数
	const memberCount = prompt('请输入每组的人数');

	/*
	 *  生成随机组员号码
	 */
	 function randomNum() {
	 	lotWindow.text(Math.ceil(Math.random() * memberCount));
	 }

	//  获取摇号窗口div
	const lotWindow = $('#lotWindow');

	//  定义timer用于控制interval
	let timer1 = null;  //  第一阶段的快速摇号
	let timer2 = null;  //  第二阶段的慢速摇号

	//  点击开始按钮
	$('#btn-start').bind('click', (e) => {
		// 不断生成1-memberCount 的随机数
		timer1 = setInterval(() => {
			randomNum();
		}, 50);

		//  点击开始之后必须点击结束才能接着点击开始,并解除结束按钮的不可用
		$('#btn-start').attr('disabled', 'disabled');
		$('#btn-end').attr('disabled', null);
	});

	//  点击结束按钮
	$('#btn-end').bind('click', (e) => {
		clearInterval(timer1);  //  结束快速摇号
		timer2 = setInterval(() => {
			randomNum();
		}, 400);
		setTimeout(() => {
			clearInterval(timer2);
			$('#btn-start').attr('disabled', null); // 开始变为可用
		}, 2500);

		//  结束变为不可用
		$('#btn-end').attr('disabled', 'disabled');
		
	})

	console.log($('#btn-end').attr('disabled'));
})