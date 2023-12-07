# Webots ROS2 TurtleBot3 Simulation

This package is a modied package of Cyberbotics' repository [webots_ros2_turtlebot](https://github.com/cyberbotics/webots_ros2/tree/master/webots_ros2_turtlebot). 
It includes the following changes:
- Navigation2 and SLAM tools in ROS Iron
- Additional sensors in the robot's model

If using ROS Humble, Navigation2 and SLAM tutorials can be followed in Cyberbotics' [documentation](https://github.com/cyberbotics/webots_ros2/wiki/Examples), the first step was designed to be able to work with ROS Iron.

## Prerequisites

Install Webots following the steps provided in their [Official Page](https://cyberbotics.com/doc/guide/installation-procedure).
After the installation, make sure there's a folder called projects in your workspace where there should be allocated all the webots objects models files.
If not, proceed to download the folder [webots-master](https://github.com/LuciaEchevarria99/ROS2_simulations/tree/main/webots-master) from the main branch and place it in your local environment.
To have access to all the resources in this folder run the following command on every terminal you run the simulation:

```
export WEBOTS_HOME=<path/to/webots-master/folder>
```

