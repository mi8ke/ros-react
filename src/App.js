import React, { useEffect, useState } from 'react';
import ROSLIB from 'roslib';

const RosInfoDisplay = () => {
  const [velocity, setVelocity] = useState(null);

  useEffect(() => {
    // ROS connection setup
    const ros = new ROSLIB.Ros();
    const topic = new ROSLIB.Topic({
      ros: ros,
      name: '/velocity_topic', // Replace with your actual ROS topic name
      messageType: 'geometry_msgs/Twist' // Replace with your actual message type
    });

    ros.connect('ws://localhost:9090'); // Replace with your actual ROS WebSocket server URL

    // Subscribe to the ROS topic
    topic.subscribe(message => {
      // Update the velocity state with the received message
      setVelocity(message);
    });

    // Cleanup on component unmount
    return () => {
      topic.unsubscribe();
      ros.close();
    };
  }, []);

  return (
    <div>
      {velocity ? (
        <div>
          <h2>Velocity</h2>
          <p>Linear X: {velocity.linear.x}</p>
          <p>Linear Y: {velocity.linear.y}</p>
          <p>Linear Z: {velocity.linear.z}</p>
          <p>Angular X: {velocity.angular.x}</p>
          <p>Angular Y: {velocity.angular.y}</p>
          <p>Angular Z: {velocity.angular.z}</p>
        </div>
      ) : (
        <p>No velocity data available</p>
      )}
    </div>
  );
};

export default RosInfoDisplay;
