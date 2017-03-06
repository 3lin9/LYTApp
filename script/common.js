/*function openWin(name, url) {
 api.openWin({
 name : name,
 url : url,
 vScrollBarEnabled : false,
 hScrollBarEnabled : false,
 animation : {
 type : "push", //动画类型（详见动画类型常量）
 subType : "from_right", //动画子类型（详见动画子类型常量）
 duration : 300 //动画过渡时间，默认300毫秒
 },
 progress : {
 type : "default", //加载进度效果类型，默认值为default，取值范围为default|page，default等同于showProgress参数效果；为page时，进度效果为仿浏览器类型，固定在页面的顶部
 title : "加载中", //type为default时显示的加载框标题
 text : "请等候", //type为default时显示的加载框内容
 color : "#45C01A" //type为page时进度条的颜色，默认值为#45C01A，支持#FFF，#FFFFFF，rgb(255,255,255)，rgba(255,255,255,1.0)等格式
 },
 delay : 100
 });

 }*/

function openWin(jsonParam) {
	if (!jsonParam) {
		//参数不合法
		return;
	}
	var name, url;
	var delay = 100;
	var bounces = false;
	var reload = false;
	var pageParam = {};
	if (jsonParam) {
		if ( typeof (jsonParam.name) != undefined) {
			name = jsonParam.name;
		}
		if ( typeof (jsonParam.url) != undefined) {
			url = jsonParam.url;
		}
		if ( typeof (jsonParam.bounces) != undefined) {
			bounces = jsonParam.bounces;
		}
		if ( typeof (jsonParam.reload) != undefined) {
			reload = jsonParam.reload;
		}
		if ( typeof (jsonParam.delay) != undefined) {
			delay = jsonParam.delay;
		}
		if ( typeof (jsonParam.pageParam) != undefined) {
			pageParam = jsonParam.pageParam;
		}
	}

	api.openWin({
		name : name,
		url : url,
		vScrollBarEnabled : true,
		hScrollBarEnabled : false,
		reload : reload,
		bounces : bounces,
		pageParam : pageParam,
		/*animation : {
			type : "push", //动画类型（详见动画类型常量）
			subType : "from_right", //动画子类型（详见动画子类型常量）
			duration : 300 //动画过渡时间，默认300毫秒
		},*/
		progress : {
			type : "default", //加载进度效果类型，默认值为default，取值范围为default|page，default等同于showProgress参数效果；为page时，进度效果为仿浏览器类型，固定在页面的顶部
			title : "加载中", //type为default时显示的加载框标题
			text : "请等候", //type为default时显示的加载框内容
			color : "#45C01A" //type为page时进度条的颜色，默认值为#45C01A，支持#FFF，#FFFFFF，rgb(255,255,255)，rgba(255,255,255,1.0)等格式
		},
		delay : 100
	});

}

function closeWin() {
	api.closeWin();
}

/**
 * Created by Administrator on 2014/12/17.
 */
/**
 *
 *  Secure Hash Algorithm (SHA1)
 *  http://www.webtoolkit.info/
 *
 **/

function SHA1(msg) {

	function rotate_left(n, s) {
		var t4 = (n << s ) | (n >>> (32 - s));
		return t4;
	};

	function lsb_hex(val) {
		var str = "";
		var i;
		var vh;
		var vl;

		for ( i = 0; i <= 6; i += 2) {
			vh = (val >>> (i * 4 + 4)) & 0x0f;
			vl = (val >>> (i * 4)) & 0x0f;
			str += vh.toString(16) + vl.toString(16);
		}
		return str;
	};

	function cvt_hex(val) {
		var str = "";
		var i;
		var v;

		for ( i = 7; i >= 0; i--) {
			v = (val >>> (i * 4)) & 0x0f;
			str += v.toString(16);
		}
		return str;
	};

	function Utf8Encode(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	};

	var blockstart;
	var i, j;
	var W = new Array(80);
	var H0 = 0x67452301;
	var H1 = 0xEFCDAB89;
	var H2 = 0x98BADCFE;
	var H3 = 0x10325476;
	var H4 = 0xC3D2E1F0;
	var A, B, C, D, E;
	var temp;

	msg = Utf8Encode(msg);

	var msg_len = msg.length;

	var word_array = new Array();
	for ( i = 0; i < msg_len - 3; i += 4) {
		j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 | msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
		word_array.push(j);
	}

	switch (msg_len % 4) {
		case 0:
			i = 0x080000000;
			break;
		case 1:
			i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
			break;

		case 2:
			i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
			break;

		case 3:
			i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
			break;
	}

	word_array.push(i);

	while ((word_array.length % 16) != 14)
	word_array.push(0);

	word_array.push(msg_len >>> 29);
	word_array.push((msg_len << 3) & 0x0ffffffff);

	for ( blockstart = 0; blockstart < word_array.length; blockstart += 16) {

		for ( i = 0; i < 16; i++)
			W[i] = word_array[blockstart + i];
		for ( i = 16; i <= 79; i++)
			W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

		A = H0;
		B = H1;
		C = H2;
		D = H3;
		E = H4;

		for ( i = 0; i <= 19; i++) {
			temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}

		for ( i = 20; i <= 39; i++) {
			temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}

		for ( i = 40; i <= 59; i++) {
			temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}

		for ( i = 60; i <= 79; i++) {
			temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}

		H0 = (H0 + A) & 0x0ffffffff;
		H1 = (H1 + B) & 0x0ffffffff;
		H2 = (H2 + C) & 0x0ffffffff;
		H3 = (H3 + D) & 0x0ffffffff;
		H4 = (H4 + E) & 0x0ffffffff;

	}

	var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

	return temp.toLowerCase();

}

/****************服务器信息配置*************/
/***广州移动生产机配置***/
//数据接口服务器IP和端口

var dataInterfaceServerIP = '120.198.246.6';
//var dataInterfaceServerIP = '10.244.81.130';
var dataInterfaceServerPort = '80';
//数据接口虚拟目录
var dataInterfaceVDir = '/jk/scservlet';
//文件接口服务器IP和端口
var fileInterfaceServerIP = dataInterfaceServerIP;
var fileInterfaceServerPort = '80';
//文件接口虚拟目录
var fileInterfaceVDir = '/jk/BP/scService!UpFile.action';

/********向葵测试机***********/
/*
//数据接口服务器IP和端口
var dataInterfaceServerIP = '192.168.14.251';
//var dataInterfaceServerIP = '192.168.15.198';

//var dataInterfaceServerIP = '10.251.133.206';
var dataInterfaceServerPort = '8081';
//数据接口虚拟目录
var dataInterfaceVDir = '/JiaKuanSupport/scservlet';
//文件接口服务器IP和端口
var fileInterfaceServerIP = dataInterfaceServerIP;
var fileInterfaceServerPort = '8081';
//文件接口虚拟目录
var fileInterfaceVDir = '/JiaKuanSupport/BP/scService!UpFile.action';
*/

/*******亚信内网测试机*******/
/*
var dataInterfaceServerIP = '172.16.1.146';
var dataInterfaceServerPort = '8081';
//数据接口虚拟目录
var dataInterfaceVDir = '/JiaKuanSupport/scservlet';
//文件接口服务器IP和端口
var fileInterfaceServerIP = dataInterfaceServerIP;
var fileInterfaceServerPort = '8081';
//文件接口虚拟目录
var fileInterfaceVDir = '/JiaKuanSupport/BP/scService!UpFile.action';
*/
/*******亚信外网测试机*******/
/*
var dataInterfaceServerIP = '120.236.174.74';
var dataInterfaceServerPort = '18081';
//数据接口虚拟目录
var dataInterfaceVDir = '/JiaKuanSupport/scservlet';
//文件接口服务器IP和端口
var fileInterfaceServerIP = dataInterfaceServerIP;
var fileInterfaceServerPort = '18081';
//文件接口虚拟目录
var fileInterfaceVDir = '/JiaKuanSupport/BP/scService!UpFile.action';
*/
//文件接口服务器IP
//var fileInterfaceServerIP = '183.238.56.78';//亚信测试机
//var fileInterfaceServerIP = '192.168.13.170';
//var fileInterfaceServerIP = '172.16.1.146';

//文件接口服务器端口
//var fileInterfaceServerPort = '8081';
//var fileInterfaceServerPort = '18081';//亚信测试机端口

//文件接口虚拟目录
//var fileInterfaceVDir = '/jk/BP/jkService!UpFile.action';

var downloadFileFolderName = 'download'

//统一请求接口
var restfulUrl = 'http://' + dataInterfaceServerIP + ':' + dataInterfaceServerPort + dataInterfaceVDir;
//文件上传下载
var restfulUrl_file = 'http://' + fileInterfaceServerIP + ':' + fileInterfaceServerPort + fileInterfaceVDir;
/****************************************/

function ajaxRequest(part_url, method, bodyParam, pic, callBack) {
	//
	var request_url = 'http://' + dataInterfaceServerIP + ':' + interfaceServerPort + '/' + dataInterfaceVDir + '/' + part_url;
	//var appId = 'A6901115457559';
	//var key = '7F836F04-CAAC-52C8-2332-CF337134FA6F';
	//var now = Date.now();
	//var appKey = SHA1(appId + "UZ" + key + "UZ" + now) + "." + now;
	api.ajax({
		url : request_url,
		method : method,
		cache : false,
		timeout : 20,
		headers : {
			"Content-type" : "application/json;charset=UTF-8"//,
			//"X-APICloud-AppId": appId,
			//"X-APICloud-AppKey": appKey
		},
		data : {
			body : bodyParam,
			files : {
				'pic' : pic
			}
		}
	}, function(ret, err) {
		callBack(ret, err);
	});
}

//下载文件
function downloadFile(fileName, callBack) {
	//var fileUrl = 'http://' + fileInterfaceServerIP + ':' + fileInterfaceServerPort + '/' + fileInterfaceVDir + '?MethodName=downFile&FileName=' + fileName;
	var savePath = api.cacheDir + '/' + downloadFileFolderName + '/' + fileName;
	var fileUrl = restfulUrl + '?MethodName=downFile&FileName=' + fileName;
	api.download({
		url : fileUrl,
		savePath : savePath,
		report : true,
		cache : true,
		allowResume : true
	}, function(ret, err) {
		callBack(ret, err);
	});
}


//下载文件
function downloadFile2(fileName, img, callBack) {
	//var fileUrl = 'http://' + fileInterfaceServerIP + ':' + fileInterfaceServerPort + '/' + fileInterfaceVDir + '?MethodName=downFile&FileName=' + fileName;
	var savePath = api.cacheDir + '/' + downloadFileFolderName + '/' + fileName;
	var fileUrl = restfulUrl + '?MethodName=downFile&FileName=' + fileName;
	var tmp_img = img;
	
	api.download({
		url : fileUrl,
		savePath : savePath,
		report : true,
		cache : true,
		allowResume : true
	}, function(ret, err) {
		callBack(tmp_img, ret, err);
	});
}



//获取服务端数据
function ajaxRequestData(values, callBack) {
	//alert(restfulUrl);
	api.ajax({
		url : '' + restfulUrl + '',
		method : 'post',
		data : {
			values : values
		},
		cache : false,
		dataType : 'json'
	}, function(ret, err) {
		callBack(ret, err);
	});
}

function upload(bodyParam, picName, callBack) {

	//alert(JSON.stringify(bodyParam));
	//alert(picName);
	//var appId = 'A6901115457559';
	//var key = '7F836F04-CAAC-52C8-2332-CF337134FA6F';
	//var now = Date.now();
	//var appKey = SHA1(appId + "UZ" + key + "UZ" + now) + "." + now;
	
	//var requestFileUrl = restfulUrl_file + '?MethodName=' + bodyParam.MethodName + '&LinkName=' + bodyParam.LinkName 
	// + '&FieldName=' + bodyParam.FieldName + '&OrderId=' + bodyParam.OrderId + '&FileType=' + bodyParam.FileType + '&LoginId=' + bodyParam.LoginId;
	//alert(requestFileUrl);
	//requestFileUrl = 'http://192.168.1.106/appService/FileService.ashx';
	api.ajax({
		url : '' + restfulUrl_file + '',
		method : 'post',
		cache : false,
		dataType : 'json',
		returnAll : false,
		timeout : 120,
		report : true,
		data : {
			values : bodyParam,
			files : {
				'pic' : picName
			}
		}
	}, function(ret, err) {
		callBack(ret, err);
	});
}