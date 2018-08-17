export const objectToQueryString = a => {
  var prefix, s, add, name, r20, output;
  s = [];
  r20 = /%20/g;
  add = function(key, value) {
    // If value is a function, invoke it and return its value
    value = typeof value === "function" ? value() : value == null ? "" : value;
    s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
  };
  if (a instanceof Array) {
    for (name in a) {
      add(name, a[name]);
    }
  } else {
    for (prefix in a) {
      buildParams(prefix, a[prefix], add);
    }
  }
  output = s.join("&").replace(r20, "+");
  return output;
};
function buildParams(prefix, obj, add) {
  var name, i, l, rbracket;
  rbracket = /\[\]$/;
  if (obj instanceof Array) {
    for (i = 0, l = obj.length; i < l; i++) {
      if (rbracket.test(prefix)) {
        add(prefix, obj[i]);
      } else {
        buildParams(
          prefix + "[" + (typeof obj[i] === "object" ? i : "") + "]",
          obj[i],
          add
        );
      }
    }
  } else if (typeof obj === "object") {
    // Serialize object item.
    for (name in obj) {
      buildParams(prefix + "[" + name + "]", obj[name], add);
    }
  } else {
    // Serialize scalar item.
    add(prefix, obj);
  }
}

export const queryStringToObject = url => {
  var obj = {};

  function arr_vals(arr) {
    if (arr.indexOf(",") > 1) {
      var vals = arr.slice(1, -1).split(",");
      var arr = [];
      for (var i = 0; i < vals.length; i++) arr[i] = vals[i];
      return arr;
    } else return arr.slice(1, -1);
  }

  function eval_var(avar) {
    if (avar[1].indexOf("[") == 0) obj[avar[0]] = arr_vals(avar[1]);
    else obj[avar[0]] = avar[1];
  }

  if (url.indexOf("?") > -1) {
    var params = url.split("?")[1];
    if (params.indexOf("&") > 2) {
      var vars = params.split("&");
      for (var i in vars) eval_var(vars[i].split("="));
    } else eval_var(params.split("="));
  }

  return obj;
};
