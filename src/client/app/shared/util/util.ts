import { ToastOptions } from 'ng2-toasty';
/**
 * Created by sange on 06/11/2016.
 */

export class Util {

  static getISODatetimeString(datetime: string): string {
    if (!datetime) {
      return '';
    }

    let d = new Date(datetime);
    const dateWoutTZ = d.toISOString().slice(0, d.toISOString().length - 5);
    let tzOffset = d.getTimezoneOffset() / -60;
    const tzSign = tzOffset > 0 ? '+' : '-';
    const tz = ('0' + tzOffset).slice(-2);

    return `${dateWoutTZ}${tzSign}${tz}:00`;
  }
}

const toastOpts = {
  limit: 3,
  showClose: false,
  position: 'up-right',
  timeout: 5000,
  theme: 'material'
};

export class ToastUtils {

  static set(...content: string[]): ToastOptions {
    // ToastConfig ocekava minimalne msg a title
    const title = content.length === 2 ? content[1] : '';
    let opts: ToastOptions = {msg: content[0], title};
    Object.assign(opts, toastOpts);
    return opts;
  }
}
