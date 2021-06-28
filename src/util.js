export const delay = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
};

export const fillProperty = (data, property, obj) => {
  if (!data) return obj;
  property.map((item) => {
    if (data.hasOwnProperty(item)) {
      obj[item] = data[item];
    }
  });

  return obj;
};

export const fillExceptionProperty = (data, status, ecp) => {
  const property = ["data", "errorCode", "message"];
  ecp.status = status;
  ecp = fillProperty(data, property, ecp);

  return ecp;
};
