// Independent helper functions
//------------------------------------------------------------------------------
// transfrom screen coordinate [0,1]x[0,1] to world coordinate
function screen2world(screenDot) {
    var dot = {
        'x': -27.5 + screenDot.x * 55,
        'y': -15 + screenDot.y * 36
    };
    return dot;
}

function screen2unitID(screenDot, num_xunit, num_yunit) {
    num_xunit = typeof num_xunit !== 'undefined' ? num_xunit : 6;
    num_yunit = typeof num_yunit !== 'undefined' ? num_yunit : 6;
    return { x: Math.floor(screenDot.x * num_xunit), y: Math.floor(screenDot.y * num_yunit) };
}

var action_array = [
    'move_down_bounce',
    'move_up',
    'move_up',
    'move_right',
    'move_down',
    'move_down',
    'move_down_bounce',
    'move_up',
    'move_up',
    'move_right',
    'move_down',
    'move_down',
    'move_down_bounce',
    'move_up',
    'move_up',
    'move_right_bounce',
    'move_down',
    'move_down',
    'move_down_bounce',
    'move_up',
    'move_up',
    'move_left',
    'move_down',
    'move_down',
    'move_down_bounce',
    'move_up',
    'move_up',
    'move_right_bounce',
    'move_down',
    'move_down',
    'move_down_bounce',
    'move_up',
    'move_up',
    'move_left',
    'move_down',
    'move_down',
    'move_down_bounce'
];


var action_counter = 0;
function next_action() {
    var fun = window[action_array[action_counter]];
    console.log(action_counter + '-->' + action_array[action_counter]);
    if (++action_counter >= action_array.length) { action_counter = 1; };
    return fun;
}
//return the position of the ball if:
//rebond to bottom in the MapUnit (x, y)
//the total time for the rebond is total_time
//the current time is a starting-from-zero count by time
//the size of the MapUnit is unit_size

var move_right = function (time, unit_x, unit_y, total_time, x_size, y_size, rebound) {

    // default value
    rebound = typeof rebound !== 'undefined' ? rebound : false;

    if (rebound && time > total_time / 2.0) {
        return move_right(total_time - time, unit_x, unit_y, total_time, x_size, y_size, rebound);
    }
    var current_x = unit_x * x_size + 0.5 * x_size;
    var current_y = unit_y * y_size + 0.5 * y_size;

    current_x += time / total_time * x_size;
    current_y += 0.5 * x_size * Math.sin(time / total_time * Math.PI);

    return { x: current_x, y: current_y };
};


var move_right_bounce = function (time, unit_x, unit_y, total_time, x_size, y_size) {
    return move_right(time, unit_x, unit_y, total_time, x_size, y_size, true);
};

var move_left = function (time, unit_x, unit_y, total_time, x_size, y_size, rebound) {

    // default value
    rebound = typeof rebound !== 'undefined' ? rebound : false;

    if (rebound && time > total_time / 2.0) {
        return move_left(total_time - time, unit_x, unit_y, total_time, x_size, y_size, rebound);
    }
    var current_x = unit_x * x_size + 0.5 * x_size;
    var current_y = unit_y * y_size + 0.5 * y_size;

    current_x -= time / total_time * x_size;
    current_y += 0.5 * y_size * Math.sin(time / total_time * Math.PI);

    return { x: current_x, y: current_y };
};

var move_left_bounce = function (time, unit_x, unit_y, total_time, x_size, y_size) {
    return move_left(time, unit_x, unit_y, total_time, x_size, y_size, true);
};

var move_down = function (time, unit_x, unit_y, total_time, x_size, y_size, rebound) {
    // default value
    rebound = typeof rebound !== 'undefined' ? rebound : false;

    if (rebound && time > total_time / 2.0) {
        return move_down(total_time - time, unit_x, unit_y, total_time, x_size, y_size, rebound);
    }
    var current_x = unit_x * x_size + 0.5 * y_size;
    var current_y = unit_y * x_size + 0.5 * y_size;

    current_y -= time / total_time * y_size;

    return { x: current_x, y: current_y };
};

var move_down_bounce = function (time, unit_x, unit_y, total_time, x_size, y_size) {
    return move_down(time, unit_x, unit_y, total_time, x_size, y_size, true);
};

var move_up = function (time, unit_x, unit_y, total_time, x_size, y_size) {
    var current_x = unit_x * x_size + 0.5 * x_size;
    var current_y = unit_y * y_size + 0.5 * y_size;

    current_y += time / total_time * y_size;

    return {
        x: current_x,
        y: current_y
    };
};