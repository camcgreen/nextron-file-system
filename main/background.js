import { app, protocol } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  protocol.registerFileProtocol('media-loader', (request, callback) => {
    let requestedPath = request.url.replace('media-loader://', '')
    callback({ path: requestedPath })
  })

  const mainWindow = createWindow('main', {
    width: 1280,
    height: 720,
    //   fullscreen: true,
    // autoHideMenuBar: true,
    // titleBarOverlay: {
    //     color: '#1D4F48',
    //     symbolColor: 'white',
    //     height: 0,
    // },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})
