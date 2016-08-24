// JavaScript source code
function Ball_view(sr, x0, y0) {

    // arguments
    this.sr = sr; // radius (world coordinate)
    this.x0 = x0; // init-x (world coordinate)
    this.y0 = y0; // init-y (world coordinate)

    // default fields and methods
    this.unit_id = { x: 0, y: 0 };
    this.unit_sz = { x: 1 / 6, y: 1 / 6 };
    this.total_time = 2;
    this.traj = move_down_bounce;

    // initialize Ball (world coordinate)
    this.init = function (scene) {

        // creat ball (world coordinate)
        var sphereGeometry = new THREE.SphereGeometry(this.sr, 20, 20);
        var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
        this.obj = new THREE.Mesh(sphereGeometry, sphereMaterial);

        // position the sphere (world coordinate)
        this.obj.position.x = this.x0;
        this.obj.position.y = this.y0;
        this.obj.position.z = 0;
        this.obj.castShadow = true;
        this.traj = next_action();

        // maintain a time as field
        this.time = 0;

        // add the sphere to the scene
        scene.add(this.obj);

    }

    // move ball (world coordinate)
    this.move = function (speed) {
        // check time value
        this.time += speed;
        if (this.time > this.total_time) {
            // update time
            this.time -= this.total_time;
            this.unit_id = curr_unit_id;
            // update action
            this.traj = next_action();
        };
        // calculate coordinate in world coordinate
        var screenDot = this.traj
            (this.time, this.unit_id.x, this.unit_id.y, this.total_time, this.unit_sz.x, this.unit_sz.y);
        var worldDot = screen2world(screenDot);
        curr_unit_id = screen2unitID(screenDot);
        // position ball
        this.obj.position.x = worldDot.x;
        this.obj.position.y = 1.5 + worldDot.y;
        
    }

}

function Cube_view(sx, sy, x0, y0) {

    this.sx = sx; // x-size
    this.sy = sy; // y-size
    this.sz = 4;  // constant value
    this.x0 = x0; // init-x
    this.y0 = y0; // init-y

    // initialize MapUnit
    this.init = function (scene) {

        // creat an unit
        var cubeGeometry = new THREE.CubeGeometry(this.sx, this.sy, this.sz);
        var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        this.obj = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.obj.position.x = this.x0;
        this.obj.position.y = this.y0;
        this.obj.position.z = 0;
        this.obj.castShadow = true;

        // add the cube to the scene
        scene.add(this.obj);

    }

}