export default function(params) {
  if (!!params[0]) {
    return params[1];
  } else {
    return params[2];
  }
};
