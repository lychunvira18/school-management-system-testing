import moment from 'moment'
// functin to assign nested key to object
export function assign(obj, keyPath, value) {
    const lastKeyIndex = keyPath.length - 1;
    for (var i = 0; i < lastKeyIndex; ++i) {
      let key = keyPath[i];
      if (!(key in obj)) obj[key] = {};
      obj = obj[key];
    }
    obj[keyPath[lastKeyIndex]] = value;
}

export const sortSession = (a, b) => moment(a.split('-')[0], 'h:mma') - moment(b.split('-')[0], 'h:mma')
