/*
 *Filename: /home/codestax/statusPage/vite-project/src/lib/webSocketHelper.js  *
 *Path: /home/codestax/statusPage/vite-project                                 *
 *Created Date: Sunday, February 9th 2025, 8:12:44 am                          *
 *Author: Prakersharya                                                         *
 *                                                                             *
 *Copyright (c) 2025 Trinom Digital Pvt Ltd                                    *
 */

import store from "@/store";
import { updateIncident } from "@/store/reducers/incidentReducer";
import { updateServiceStage } from "@/store/reducers/serviceReducer";

// WebSocketManager.js

// import store from "@/store"; // Adjust the path based on your project structure

class WebSocketManager {
  constructor() {
    this.socket = null;
    this.heartbeatInterval = null;
    this.userID = null;
  }

  openConnection(orgnaizationID = "") {
    let userID = orgnaizationID || this.userID;
    this.userID = orgnaizationID;

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log("Already established");
      return;
    } else {
      console.log("Going to establish");
    }

    console.log("Opening WebSocket connection for userID:", userID);
    this.socket = new WebSocket('wss://2y9r5wqonk.execute-api.ap-south-1.amazonaws.com/production/');

    this.socket.onopen = () => {
      console.log("Connected to WebSocket");
      this.socket?.send(JSON.stringify({ action: "sendUserID", userID: userID }));
      
      this.heartbeatInterval = setInterval(() => {
        if (this.socket?.readyState === WebSocket.OPEN) {
          this.socket?.send(JSON.stringify({ action: "ping" }));
        }
      }, 5000);
    };

    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      console.log(data);

      if (data.type === "SERVICE_UPDATE") {
            store.dispatch(updateServiceStage(data));
      } else if (data.type === "INCIDENT_UPDATE") {
        store.dispatch(updateIncident(data));
      }
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed", userID);
      if (this.heartbeatInterval) {
        clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = null;
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  showNotification(message) {
    if (message.appointment_type === "OPD") {
      if (message.operation === "BOOKING") {
        message = `New OPD Booking Received for doctor ${message.doctor_name}`;
      } else {
        message = `OPD booking got cancelled for doctor ${message.doctor_name}`;
      }
    } else {
      if (message.operation === "BOOKING") {
        message = `Booking for ${message.package_name} package`;
      } else {
        message = "";
      }
    }

    if (Notification.permission === "granted") {
      new Notification("Hospital Notification", { body: message });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Hospital Notification", { body: message });
        }
      });
    }
  }

  sendToServiceWorker(data) {
    let message = "";

    if (navigator.serviceWorker.controller) {
      if (data.appointment_type === "OPD") {
        if (data.operation === "BOOKING") {
          message = `New OPD Booking Received for doctor ${data.doctor_name}`;
        } else {
          message = `OPD booking got cancelled for doctor ${data.doctor_name}`;
        }
      } else {
        if (data.operation === "BOOKING") {
          message = `Booking for ${data.package_name} package`;
        } else {
          message = "OPD booking got cancelled";
        }
      }

      navigator.serviceWorker.controller.postMessage({ message });
    }
  }

  closeConnection() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log("Closing WebSocket connection");
      this.socket.close();
    } else {
      console.log("WebSocket connection is already closed or not established.");
    }

    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  isConnected() {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}

export default new WebSocketManager();
