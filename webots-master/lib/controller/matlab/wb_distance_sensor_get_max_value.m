function result = wb_distance_sensor_get_max_value(tag)
% Usage: wb_distance_sensor_get_max_value(tag)
% Matlab API for Webots
% Online documentation is available <a href="https://www.cyberbotics.com/doc/reference/distancesensor">here</a>

result = calllib('libController', 'wb_distance_sensor_get_max_value', tag);
