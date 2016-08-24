// 
function Ball(m = NULL) 
{
	// status initialization
	this.level = 0;
	this.score = 0;
	this.life  = 1;
	this.x = 0;
	this.y = 0;
	this.current_dir = 'down';
	this.toolbox = [];
	this.map = m;
	this.move = move;
	this.go_up = go_up;
	this.go_down = go_down;
	this.go_left = go_left;
	this.go_right = go_right;
	this.get_tool = get_tool;
	this.check_life = check_life;
	this.init_status = init_status;

	function init_status()
	{
		this.x = this.map.startx;
		this.y = this.map.starty;
	}

	function move(next_dir)
	{
		if (this.current_dir == 'up')
		{
			switch (next_dir)
			{
				case 'up':
					return go_up();

				case 'left':
					return go_left();

				case 'right':
					return go_right();

				default:
					return go_down();
			}
		}
		else
		{
			return go_down();
		}
	}

	function go_up(this.map)
	{
		if (this.y>=5)
			this.current_dir = 'down';
			return go_down();
		else if (this.map.content[x][y+1].bottom == "normal")
		{
			this.current_dir = 'down';
			return go_down();
		}
		else
		{
			this.current_dir = 'up';
			this.y++;
			return 'up';
		}
	}
	
	function go_down() 
	{
		if (this.map.content[x][y].bottom=='empty')
		{
			this.current_dir='down';
			this.y--;
			return 'down';
		}
		else
		{
			this.current_dir='up';
			return 'down_bounce';
		}
	}

	function go_left() {
		if (this.x<=0)
		{
			this.current_dir = 'down';
			return 'left_bounce';
		}
		else if (this.map.content[x-1][y].right=='normal')
		{
			this.current_dir = 'down';
			return 'left_bounce';
		}
		else
		{
			this.current_dir='down';
			this.x--;
			return 'left';
		}
	}

	function go_right() 
	{
		if (this.map.content[x][y].right=='empty' && x<5 )
		{
			this.current_dir='down';
			this.x++;
			return 'right';
		}
		else
		{
			this.current_dir='down';
			return 'right_bounce';
		}
	}

	function get_tool (tool)
	{
		this.toolbox.push(tool);
	}

	function check_life()
	{
		if (this.y<=0)
			--this.life;
		if (this.life<0)
			return false;
		else
		{
			return true;
		}
	}
}