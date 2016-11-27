/**
 * Created by sange on 06/11/2016.
 */

export class Util {

  static getISODatetimeString(datetime: string): string {
    if(!datetime) {
      return '';
    }

    let d = new Date(datetime);
    const dateWoutTZ = d.toISOString().slice(0, d.toISOString().length - 5);
    let tzOffset = d.getTimezoneOffset() / -60;
    const tzSign = tzOffset > 0 ? '+' : '-';
    const tz = ('0' + tzOffset).slice(-2);

    return  `${dateWoutTZ}${tzSign}${tz}:00`;
  }
}
