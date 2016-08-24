function MapUnit(bottom,right,center)
{
	this.bottom=bottom;
	this.right=right;
	this.center=center;
	
}



function Map(id,exitx,exity,startx,starty,input)
{
	this.id=id;
	this.exitx=exitx;
	this.exity=exity;
	this.startx=startx;
	this.starty=starty;
	this.input=input;
	this.content=new Array(6);
	for(var i=0;i<6;i++)
	{
		content[i]=new Array(6);
		for(var j=0;j<6;j++)
			content[i][j]=new MapUnit(0,0,0);
	}
	this.showExit=false;
	this.initialize=initialize;
	function initiallize()
	{
		for(var i=0;i<6;i++)
			for(var j=0;j<6;j++)
			{
				content[i][j].bottom=this.input[3*(i*6+j)];
				content[i][j].right=this.input[3*(i*6+j)+1];
				content[i][j].center=this.input[3*(i*6+j)+2];
			}
	}
}