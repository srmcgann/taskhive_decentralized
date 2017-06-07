init=()=>{
	
	var c = document.createElement("canvas");
	c.className = "headerCanvas";
	document.body.appendChild(c);
	c.width = c.clientWidth;
	c.height = c.clientHeight;
	window.addEventListener("resize", ()=>{
		c.width = c.clientWidth;
		c.height = c.clientHeight;
	}, true);
	var x = c.getContext("2d");
	var cx=c.width/2, cy=c.height/2;
	var v={},vx,vy;
	v.f=v.c=0;
	v.p=[];
	v.s="taskhive is decentralized.";
	for(var i=0;i<90;++i){
		vx=-.4+rand(i+1e3)*.8;
		vy=-.4+rand(i+2e3)*.8;
		v.p.push({x:-80+(cx*2+160)*rand(i),y:-80+(cy*2+160)*rand(i+3e3),vx,vy})
	}
	draw(c,x,v);
}

draw=(c,x,v)=>{
	
	x.fillStyle="#040410";
	x.fillRect(0,0,c.width,c.height);

	var cx=c.width/2, cy=c.height/2;
	var X1,Y1,X2,Y2;
	v.f+=.7;
	for(var i=0;i<cx*2+60;i+=15){
		x.strokeStyle=`hsla(${220},95%,60%,${i%60?.05:.10})`;
		X1=-60+i+v.f;
		Y1=0;
		X2=X1;
		Y2=cy*2;
		x.beginPath();
		x.moveTo(X1,Y1);
		x.lineTo(X2,Y2);
		x.stroke();
	}
	for(var i=0;i<cy*2+60;i+=15){
		x.strokeStyle=`hsla(${220},95%,60%,${.02+i%60/150})`;
		X1=0;
		Y1=-60+i;
		X2=cx*2;
		Y2=Y1;
		x.beginPath();
		x.moveTo(X1,Y1);
		x.lineTo(X2,Y2);
		x.stroke();
	}
	
	var t=0,a;
	for(var j=0;j<cx*2+60;j+=15){
		for(var i=0;i<cy*2+60;i+=15){
			a=rand(t-Math.round((cy*2+60)*4/15+2)*v.c);
			if(a&&a<.045){
				x.fillStyle=`hsla(${220},95%,60%,${a*3})`;
				X1=-60+j+v.f;
				Y1=-60+i;
				x.fillRect(X1,Y1,15,15);
			}
			t++;
		}
	}

	var d;
	for(var i=0;i<v.p.length;++i){
		v.p[i].x+=.7;
		v.p[i].x+=v.p[i].vx;
		v.p[i].y+=v.p[i].vy;
		if(v.p[i].x>cx*2+80)v.p[i].x=-80;
		if(v.p[i].y>cy*2+80)v.p[i].y=-80;
		if(v.p[i].x<-80)v.p[i].x=cx*2+80;
		if(v.p[i].y<-80)v.p[i].y=cy*2+80;
		x1=v.p[i].x;
		y1=v.p[i].y;
		for(var j=0;j<v.p.length;++j){
			if(i!=j){
				x2=v.p[j].x;
				y2=v.p[j].y;
				d=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
				if(d<150){
					x.beginPath();
					x.moveTo(x1,y1);
					x.lineTo(x2,y2);
					x.lineWidth=1+10/(1+d/10);
					x.strokeStyle=`hsla(${225},100%,60%,${1 - Math.pow(d / 150, .85)})`;
					x.stroke();
				}
			}
		}
	}
	x.lineWidth=1;
	
	for(var i=0;i<v.p.length;++i){
		x.beginPath();
		x.arc(v.p[i].x,v.p[i].y,6,0,Math.PI*2);
		x.fillStyle="#8cf";
		x.globalAlpha=.2;
		x.fill();
		x.beginPath();
		x.arc(v.p[i].x,v.p[i].y,3,0,Math.PI*2);
		x.globalAlpha=.8;
		x.fillStyle="#fff";
		x.fill();
	}
	x.filter = 'none';
	
	if(v.f>60){
		v.f=0;
		v.c++;
	}

	x.font="3vw Square721";
	x.lineWidth=4;
	x.globalAlpha=.5;
	x.strokeStyle="#ace";
	x.strokeText(v.s,30,80);
	x.globalAlpha=.8;
	x.fillStyle="#eef";
	x.fillText(v.s,30,80);
	x.lineWidth=1;	
	
	requestAnimationFrame(()=>{draw(c,x,v)});
}

rand=(s)=>{
	return parseFloat('0.'+Math.sin(s+3e4).toString().substr(6));
}

init();