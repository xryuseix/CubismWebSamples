/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LAppDelegate } from "./lappdelegate";
import { LAppGlManager } from "./lappglmanager";

/**
 * ブラウザロード後の処理
 */
window.addEventListener(
  "load",
  (): void => {
    // Initialize WebGL and create the application instance
    if (
      !LAppGlManager.getInstance() ||
      !LAppDelegate.getInstance().initialize()
    ) {
      return;
    }

    LAppDelegate.getInstance().run();
  },
  { passive: true }
);

/**
 * 終了時の処理
 */
window.addEventListener(
  "beforeunload",
  (): void => LAppDelegate.releaseInstance(),
  { passive: true }
);

/**
 * Process when changing screen size.
 */
window.addEventListener(
  "resize",
  () => {
    LAppDelegate.getInstance().onResize();
  },
  { passive: true }
);

let port: MessagePort;
function onMessage(e: MessageEvent) {
  const data = e.data;
  try {
    port.postMessage('Message received by IFrame: "' + JSON.stringify(e.data) + '"');
  } catch (e) {
    console.error(e);
  }
}
function initPort(e: MessageEvent) {
  if (e.ports[0]) {
    port = e.ports[0];
    port.onmessage = onMessage;
  }
}
window.addEventListener("message", initPort);
