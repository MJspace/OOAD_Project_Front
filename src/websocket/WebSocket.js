class WebSocketClient {
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

  onMessage(listener) {
    this.messageListeners.push(listener);
  }

  onConnected(listener) {
    this.connectedListeners.push(listener);
  }

  onDisconnected(listener) {
    this.disconnectedListeners.push(listener);
  }

  onError(listener) {
    this.errorListeners.push(listener);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

export default WebSocketClient;
