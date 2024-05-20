export default class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.messageListeners = [];
    this.connectedListeners = [];
    this.disconnectedListeners = [];
    this.errorListeners = [];
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      this.connectedListeners.forEach((listener) => listener());
    };

    this.ws.onmessage = (event) => {
      this.messageListeners.forEach((listener) => listener(event.data));
    };

    this.ws.onclose = () => {
      this.disconnectedListeners.forEach((listener) => listener());
    };

    this.ws.onerror = (error) => {
      this.errorListeners.forEach((listener) => listener(error));
    };
  }

  send(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      console.error("WebSocket is not open. ReadyState: ", this.ws.readyState);
    }
  }

  addEventListener(name, callback) {
    switch (name) {
      case "message":
        this.messageListeners.push(callback);
        break;
      case "connected":
        this.connectedListeners.push(callback);
        break;
      case "disconnected":
        this.disconnectedListeners.push(callback);
        break;
      case "error":
        this.errorListeners.push(callback);
        break;
      default:
        console.log(`Unknown event type: ${name}`);
        break;
    }
  }

  removeEventListener(name, callback) {
    switch (name) {
      case "message":
        this.messageListeners.pop(callback);
        break;
      case "connected":
        this.connectedListeners.pop(callback);
        break;
      case "disconnected":
        this.disconnectedListeners.pop(callback);
        break;
      case "error":
        this.errorListeners.pop(callback);
        break;
      default:
        console.log(`Unknown event type: ${name}`);
        break;
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}