// js/distributed/handoff.js
// Mock implementation of HarmonyOS Distributed Softbus and Device Manager APIs
import { appStore } from '../core/store.js';
import { mockDevices } from '../core/data.js';

export class DistributedManager {
  static getAvailableDevices() {
    console.log('[DeviceManager] Scanning for nearby HarmonyOS devices...');
    return new Promise((resolve) => {
      setTimeout(() => {
        const onlineDevices = mockDevices.filter(d => d.status === 'online');
        resolve(onlineDevices);
      }, 800); // Simulate network scan delay
    });
  }

  static initiateHandoff(taskPayload, targetDeviceId) {
    console.log(`[DistributedSoftbus] Initiating task handoff to device: ${targetDeviceId}`);
    console.log('[DistributedSoftbus] Payload:', taskPayload);

    appStore.dispatch({
      type: 'START_DISTRIBUTED_TASK',
      payload: { task: taskPayload, targetDeviceId }
    });

    return new Promise((resolve, reject) => {
      // Simulate connection establishing
      setTimeout(() => {
        appStore.dispatch({
          type: 'UPDATE_DISTRIBUTED_STATUS',
          payload: { status: 'transferring' }
        });

        // Simulate data transfer
        setTimeout(() => {
          appStore.dispatch({
            type: 'UPDATE_DISTRIBUTED_STATUS',
            payload: { status: 'completed' }
          });
          console.log('[DistributedSoftbus] Handoff completed successfully.');
          
          // Trigger local event for UI updates
          const event = new CustomEvent('handoffCompleted', { 
            detail: { targetDeviceId, taskPayload } 
          });
          window.dispatchEvent(event);
          
          resolve({ success: true, sessionId: appStore.getState().distributedSession.sessionId });
        }, 1500);

      }, 1000);
    });
  }

  // This would be called on the receiving device (e.g., the TV)
  static receiveHandoff() {
    console.log('[DistributedSoftbus] Listening for incoming tasks...');
    // In a real app, this would use WebSockets or WebRTC to receive data
    // Here we read from localStorage to simulate cross-tab/cross-device state sharing
    const savedState = localStorage.getItem('harmony_distributed_payload');
    if (savedState) {
      return JSON.parse(savedState);
    }
    return null;
  }
}
