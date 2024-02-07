// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

contextBridge.exposeInMainWorld('latexloader', {
  send: (latexPath: any) => ipcRenderer.send('latex:import', latexPath),
  fromSearch: (sqList: any, xList: any, opList: any) =>
    ipcRenderer.send('latex:from-search', sqList, xList, opList),
  on: () =>
    ipcRenderer.on('latex:done', () => {
      console.log(`Uploaded To Database Successfully!`);
    }),
  getProblem: () => ipcRenderer.send('latex:get-problem'),
  receiveProblem: () => {
    return new Promise((resolve) => {
      ipcRenderer.once('latex:return-problem', (event, data) => {
        resolve(data);
      });
    });
  },
  receiveResult: () => {
    return new Promise((resolve) => {
      ipcRenderer.once('latex:search-result', (event, data) => {
        resolve(data);
      });
    });
  },
});

export type ElectronHandler = typeof electronHandler;
