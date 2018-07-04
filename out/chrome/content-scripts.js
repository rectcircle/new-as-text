/**
 * 以utf8编码将content保存到文件系统中，文件名为fileName
 * @param {string} fileName 文件名
 * @param {String} content 文件内容
 */
function saveAsText(fileName, content) {
	blobOptions = {
		type: "text/plain;charset=utf-8"
	};

	//创建Blob对象
	var blob = new Blob([content], blobOptions);

	//使用a标签下载文件
	var a = document.createElement('a');

	//设置文件名
	a.innerHTML = fileName;
	a.download = fileName;

	//设置下载内容
	a.href = URL.createObjectURL(blob);

	//将此此节点放入body下
	document.body.appendChild(a);

	//触发点击事件
	var evt = document.createEvent("MouseEvents");
	evt.initEvent("click", false, false);
	a.dispatchEvent(evt);

	//删除标签
	document.body.removeChild(a);
}
//图标
var iconBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEFUlEQVR4Xu2az4scRRTH36teRBdkEDwqbH7swWDEixdPSk6awyaBzCYSwiLERYhR2OnqHuKPgRW6q3r3koSFKGKIImYTyA8UPHjJPxBBTRB/IMGTt70Nmp16oYaeMDSzM9U91ZlNuvq0y3S/et9Pf9+rHzMIFb+w4vrBAXAOqDgBVwKTNIAQ4hQibnDOL04qj4k5QAixDxF/TIW/xjm/OQkIEwMgpZwHgG+1aKXU0TAMu38/7MsBeNjEe+M5B7gScD3ANUE3C7hp0K0D3ELIrQTdUtjtBR6dzVCSJHMA8Jfv+7+Ou4coYy+QJMmLALDL9/3rpvkZ7wbjOK4zxi4R0SYRHQjD8HvTQQbdZxtAHMf7EfEaIk4ppebDMFw3yS83AB1UQ2CM1X3fv2oySNkAkiQ5qJRa1+LTsY5wzi+Z5GYMgIhQSnkeEU+kgTuIeLgoBFsO0OKJ6DIAeOnL+ZxzvoiIZBVAL5gQ4jMbEGwAGCQ+CIJ3TIT37jF2QH9QGxDGBWBDvNZUCIB+cFwI4wCI4/gIY+zrftvnffNjOWCrclBKHTM93CwKIBX/Te/lEdG5IAjey2P7/nsLO6APwllEPJn+T0qpt0wgFAFgW/xYJZDpCbkh5AVQhnhrANKekAtCHgBSyuMAcMGW7a2WQFEnmALIigeAFc65X7Tms8+N3QOyAaWUCQA0RvUEEwBli7daAv0gshAAYCH7BegoAFEU7fQ878++qdrqm7cyDQ6z4SgIOQGUIr40B/TADIMwCoCOsbKyskcp9STn/Jatmi+9B2QHEEK0EPGTXk/olYMJgLJElzYLbJWwlFI3Rd0c9aV3aQsA8F+lvhjJQiCiHxDxDU2kMr8PyEB4YJjKANCKB0GoFIBBELY1ACnlV0Q0xxh71cZpcM/3QoiTiHgWAPTR2ss2YydJsoOIviOijXa7/Xqr1fp/qwY9dCkspZwFgN/Thz/inH9qc2pKkuTY5ubm7Waz+ZPNuEKI04jYzZUx9kKj0fitEIA4jvcyxn7uzl1Ey0EQfGwz0bJiSSmXAeDDdIZ5KQzDXxyALQgMLQHnAFcCrgdUuwlGUbTb87w/0lngTBAE75fVuW3GlVKuAcC7Oman05ltNpv6YGXgNbQJtlqtJ6anpzcA4CkA+HtmZma2Xq93bCZrO1YURc8wxu4i4tMA0K7VarXFxcV7hQCky9YvAODt1AVXAGCNMWb0xaNtcaPiEdFeIvoAEXem+X4ZBEE398IAVldXn+90OvpE5tlRCWynz4no36mpqVeWlpb+GQuAflgI8RwiSgA4up1EDsnlLmPszUajcWdUvrmOxfXCyPO8Q0qpXM+NSsLW57o0lVK32+32jWEboP7xtqUQW0BM4jgAJpQe53ucAx7nt2uirfIOuA9jAw9ug6hl7AAAAABJRU5ErkJggg==";
/**
 * 添加一个下载按钮到页面
 */
function addButtonToBody() {
	var img = document.createElement('img');
	//指定id
	img.id = "__saveAsTextButton__"
	//指定图片
	img.src = iconBase64;
	//配置添加到页面的元素的样式
	img.style = "position:fixed; right:20px; bottom:20px; width:50px; " + //设置位置大小
		"z-index:2147483647; cursor:pointer; " + //设置在最上层，手型
		"border: 2px solid #999; border-radius: 70px; padding:10px; " + //边框
		"background-color:#222; opacity: 0.8;"; //颜色与透明度
	img.alt = "Save as Text";
	img.title = "Save as Text"
	//单击事件，保存当前页面
	img.onclick = function () {
		var fileName = document.title + ".txt";
		var content = document.body.innerText;
		saveAsText(fileName, content);
	};
	document.body.appendChild(img);
	return img
}

/**
 * 根据规则获取标题
 * @param {Object} rule 页面规则
 */
function selectTitle(rule){
	var fileName = "";
	if (rule === undefined) {
		fileName = document.title;
	} else {
		if (rule.titleSelector == "") {
			fileName = document.title;
		} else {
			var ele = document.querySelector(rule.titleSelector);
			if (ele != undefined) {
				fileName = ele.innerText;
			} else {
				fileName = document.title;
			}
		}
	}
	return fileName;
}

/**
 * 选取元素并保存
 * @param {Object} rule 选取元素规则
 * @param {Function} cb DOMElement -> String 将DOM元素转换为字符串的函数
 */
function handleSelectorAndSave(rule, suffix, cb) {
	var fileName = selectTitle(rule)+"."+suffix;
	var content = "";
	if (rule === undefined) {
		content = cb(document.body);
	} else {
		if (rule.contentSelector == "") {
			content = cb(document.body);
		} else {
			var elementList = document.querySelectorAll(rule.contentSelector);
			if (elementList.length != 0) {
				elementList.forEach(function (ele) {
					content += cb(ele);
				});
			} else {
				content = cb(document.body);
			}
		}
	}
	saveAsText(fileName, content);
}

function handleSelectorAndSaveTxt(rule) {
	handleSelectorAndSave(rule, "txt", function (ele) {
		return ele.innerText;
	});
}

//html转markdown工具
var turndownService = new TurndownService({
	codeBlockStyle: "fenced",
	emDelimiter: "*",
	headingStyle: "atx"
})

//添加表格<strike>, <s>, and <del>支持
var gfm = turndownPluginGfm.gfm
turndownService.use(gfm)

//修正链接的一系列问题：非锚链接使用绝对路径，title 对引号转义，content换行替换
turndownService.addRule('linkFix', {
	filter: function (node, options) {
		return (
			options.linkStyle === 'inlined' &&
			node.nodeName === 'A' &&
			node.getAttribute('href')
		)
	},
	replacement: function (content, node, options) {
		var href = node.getAttribute('href');
		if (!href.startsWith("#")){
			href = node.href;
		}
		var title = node.title;
		if(title) {
			title = title ? ' "' + title.replace(/"/g, '\\"') + '"' : '';
		}
		var replacement = '[' + content.replace('\n', ' ') + '](' + href + title + ')';;
		return replacement
	}
})

//修正图片链接和转义问题
turndownService.addRule('imgLinkFix', {
	filter: 'img',
	replacement: function (content, node) {
		var alt = node.alt || '';
		var src = node.src || '';
		var title = node.title || '';
		var titlePart = title ? ' "' + title.replace(/"/g, '\\"') + '"' : '';
		return src ? '![' + alt + ']' + '(' + src + titlePart + ')' : ''
	}
});


function handleSelectorAndSaveMd(rule) {
	handleSelectorAndSave(rule, "md",function (ele) {
		return turndownService.turndown(ele);
	})
}


function saveSelection(rule) {
	var fileName = selectTitle(rule)+".txt";
	var content = window.getSelection().toString();
	saveAsText(fileName, content);
}

function createCSSSelectorByEle(ele){
	var selector = ele.localName;
	if (ele.id != "") {
		selector += '#' + ele.id;
	}
	if (ele.className != "") {
		var classNames = ele.className.split(/\s+/);
		classNames.forEach(function (value) {
			selector += '.' +value;
		})
	}
	return selector;
}

function parseSelectionAsTitle() {
	var userSelection = window.getSelection();
	if (!userSelection.anchorNode) {
		return undefined;
	}
	var ele = userSelection.anchorNode.parentElement;
	var selector = createCSSSelectorByEle(ele);
	return selector;
}

function parseSelectionAsContent() {
	var userSelection = window.getSelection();
	if (!userSelection.anchorNode) {
		return undefined;
	}
	var ele = userSelection.anchorNode.parentElement;
	var endEle = userSelection.focusNode.parentElement;
	while (ele.contains(endEle) == 0 && ele != endEle) {
		ele = ele.parentElement;
	}
	var selector = createCSSSelectorByEle(ele)
	return selector;
}

//监听菜单发送的请求
chrome.extension.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.action === "save-as-text") {
			handleSelectorAndSaveTxt(request.rule);
		} else if (request.action === "save-as-md") {
			handleSelectorAndSaveMd(request.rule);
		} else if (request.action === "save-selection-as-text") {
			saveSelection(request.rule);
		} else if (request.action === "parse-selection-as-title-selector") {
			var selector = parseSelectionAsTitle()
			if (!selector) {
				alert("您没有选择任何内容");
			} else {
				alert("成功，可以通过插件设置查看或修改")
			}
			sendResponse({
				selector: selector
			});
		} else if (request.action === "parse-selection-as-content-selector"){
			var selector = parseSelectionAsContent()
			if (!selector) {
				alert("您没有选择任何内容");
			} else {
				alert("成功，可以通过插件设置查看或修改")
			}
			sendResponse({
				selector: selector
			});
		}
	}
);

//按钮处理
function handleButtonClick() {
	chrome.extension.sendRequest({
		action: "getRule",
		url: window.location.href
	}, function (response) {
		if(response.rule==undefined){
			handleSelectorAndSaveTxt(response.rule);
		} else {
			if (response.rule.buttonFeature == 'saveMarkdown') {
				handleSelectorAndSaveMd(response.rule);
			} else if (response.rule.buttonFeature == 'saveText') {
				handleSelectorAndSaveTxt(response.rule);
			}
		}
	});
}

//显示悬浮按钮
chrome.extension.sendRequest({
	action: "isShowButton"
}, function (response) {
	if (response.showButton=='true'){
		var button = addButtonToBody();
		button.onclick = handleButtonClick;
	}
});