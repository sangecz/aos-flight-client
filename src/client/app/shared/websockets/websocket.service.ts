import { Constants } from '../config/app.constants';
import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ToastUtils } from '../util/util';

/**
 * Created by sange on 27/12/2016.
 */

@Injectable()
export class WebSocketService {

  websocket: WebSocket;
  connectedClientsCnt: number;

  constructor(private toast: ToastyService) {
    this.websocket = new WebSocket(Constants.wsUrl);

    this.websocket.onopen = this.onOpen.bind(this);
    this.websocket.onmessage = this.onMessage.bind(this);
    this.websocket.onerror = this.onError.bind(this);
  }

  private onOpen(e: any) {
    console.log("WS::onOpen");
  }

  private onMessage(e: any) {
    console.log("WS::onMessage", +e.data);
    this.connectedClientsCnt = +e.data;
  }

  private onError(e: any) {
    console.log("WS::onError");
    this.toast.error(ToastUtils.set('websocket error'));
  }

}

