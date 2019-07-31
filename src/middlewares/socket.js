// @flow

import {
  setChartConnection,
  setNewData,
} from '../actions/chart';

import {
  setChatConnection,
  setMessage,
  sendMessageToSocket,
} from '../actions/chat';

import {
  removeConnections,
} from '../actions/login';

const websocketInit = (url, next, callbackAction) => {
  const socket = new WebSocket(url);

  socket.onmessage = (event) => {
    let parsedData;

    try {
      parsedData = JSON.parse(event.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('parse JSON error');
    }

    if (parsedData) {
      next(callbackAction(parsedData));
    }
  };

  return socket;
};

let chartSocket;
let chatSocket;

/* it's strange - use String() for redux-action's library action objects,
* but i have no idea how to fix it without downgrade from redux-actions
* i should to refactor this middleware soon
 */

// eslint-disable-next-line
const socketMiddleWare = store => next => action => {
  switch (action.type) {
    case String(setChartConnection):
      if (!chartSocket) {
        chartSocket = websocketInit('ws://localhost:8080/chart', next, setNewData);
      }
      break;
    case String(setChatConnection):
      if (!chatSocket) {
        chatSocket = websocketInit('ws://localhost:8080/chat', next, setMessage);
      }
      break;
    case String(sendMessageToSocket):
      if (chatSocket) {
        try {
          chatSocket.send(JSON.stringify(action.payload));
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log('parse JSON error');
        }
      }
      break;
    case String(removeConnections):
      if (chartSocket) {
        chartSocket.close();
        chartSocket = null;
      }

      if (chatSocket) {
        chatSocket.close();
        chatSocket = null;
      }

      break;
    default:
      next(action);
  }
};

export default socketMiddleWare;
