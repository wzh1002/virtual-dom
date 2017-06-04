import h from './h';
import diff from './diff';
import patch from './patch';

const vd = {
  h,
  diff,
  patch,
};

window && (window.vd = vd);

export default vd;
export {
    h,
    diff,
    patch,
};
