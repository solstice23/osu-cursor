const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
var style = "";
var cursorDefault = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATgAAAG6CAYAAACcB1q5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFEGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDUgNzkuMTY0NTkwLCAyMDIwLzEyLzA5LTExOjU3OjQ0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTAyLTA5VDE3OjMwKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wMi0wOVQxODowNjoyNSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wMi0wOVQxODowNjoyNSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5YjEwNTUzMS0wMGI3LTA0NDAt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";
var cursorAdditive = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATgAAAG6CAYAAACcB1q5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAGqmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDUgNzkuMTY0NTkwLCAyMDIwLzEyLzA5LTExOjU3OjQ0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTAyLTA5VDE3OjMwKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wMi0wOVQxODoyMTo0NSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wMi0wOVQxODoyMTo0NSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiYzNmNTBlOS0wNjcxLTljNDYtODMyOC0yNzg0YjlkNDg2M2QiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OWIxMDU1MzEtMDBiNy0wNDQwLWE1MmUtZTkwYjQ2YmIwNjNmIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OWIxMDU1MzEtMDBiNy0wNDQwLWE1MmUtZTkwYjQ2YmIwNjNmIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5YjEwNTUzMS0wMGI3LTA0NDAtYTUyZS1lOTBiNDZiYjA2M2YiIHN0RXZ0OndoZW49IjIwMjItMDItMDlUMTc6MzArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi4xIChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZGE5M2ZiYTctMDc2Yi1mMTQ2LWI1ZjEtMTUyYTk1NWIzMzhjIiBzdEV2dDp3aGVuPSIyMDIyLTAyLTA5VDE4OjIxOjIxKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmJjM2Y1MGU5LTA2NzEtOWM0Ni04MzI4LTI3ODRiOWQ0ODYzZCIgc3RFdnQ6d2hlbj0iMjAyMi0wMi0wOVQxODoyMTo0NSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjEgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PruGl4wAACeISURBVHic7d1/UFT3/e/x97q73SMadl1N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";
var styleSheet = "#osu-cursor{\n	position: fixed;\n	pointer-events: none;\n	z-index: 2147483647;\n	/*transition: transform .2s ease;*/\n}\n#osu-cursor > .cursor-inner {\n	position: relative;\n	/*transition: transform 0.15s cubic-bezier(1, 2.31, 0.49, -0.18);*/\n    will-change: transform;\n    transform-origin: left top;\n}\n#osu-cursor > .cursor-inner > img{\n	width: 30px;\n	top: 0;\n	left: 0;\n	position: absolute;\n}\n#osu-cursor > .cursor-inner > img.cursor-additive{\n	opacity: 0;\n	/*transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1);*/\n}\n\n#osu-cursor.active > .cursor-inner > img.cursor-additive{\n	/*opacity: 1;*/\n}\n\n#osu-cursor.active > .cursor-inner {\n    /*transform: scale(0.85);\n	transition: transform 0.5s cubic-bezier(0, 0, 0.2, 1);*/\n}";
var defaultInstanceSettings = {
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: "normal",
  autoplay: true,
  timelineOffset: 0
};
var defaultTweenSettings = {
  duration: 1e3,
  delay: 0,
  endDelay: 0,
  easing: "easeOutElastic(1, .5)",
  round: 0
};
var validTransforms = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"];
var cache = {
  CSS: {},
  springs: {}
};
function minMax(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
function stringContains(str, text) {
  return str.indexOf(text) > -1;
}
function applyArguments(func, args) {
  return func.apply(null, args);
}
var is = {
  arr: function(a) {
    return Array.isArray(a);
  },
  obj: function(a) {
    return stringContains(Object.prototype.toString.call(a), "Object");
  },
  pth: function(a) {
    return is.obj(a) && a.hasOwnProperty("totalLength");
  },
  svg: function(a) {
    return a instanceof SVGElement;
  },
  inp: function(a) {
    return a instanceof HTMLInputElement;
  },
  dom: function(a) {
    return a.nodeType || is.svg(a);
  },
  str: function(a) {
    return typeof a === "string";
  },
  fnc: function(a) {
    return typeof a === "function";
  },
  und: function(a) {
    return typeof a === "undefined";
  },
  nil: function(a) {
    return is.und(a) || a === null;
  },
  hex: function(a) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
  },
  rgb: function(a) {
    return /^rgb/.test(a);
  },
  hsl: function(a) {
    return /^hsl/.test(a);
  },
  col: function(a) {
    return is.hex(a) || is.rgb(a) || is.hsl(a);
  },
  key: function(a) {
    return !defaultInstanceSettings.hasOwnProperty(a) && !defaultTweenSettings.hasOwnProperty(a) && a !== "targets" && a !== "keyframes";
  }
};
function parseEasingParameters(string) {
  var match = /\(([^)]+)\)/.exec(string);
  return match ? match[1].split(",").map(function(p2) {
    return parseFloat(p2);
  }) : [];
}
function spring(string, duration) {
  var params = parseEasingParameters(string);
  var mass = minMax(is.und(params[0]) ? 1 : params[0], 0.1, 100);
  var stiffness = minMax(is.und(params[1]) ? 100 : params[1], 0.1, 100);
  var damping = minMax(is.und(params[2]) ? 10 : params[2], 0.1, 100);
  var velocity = minMax(is.und(params[3]) ? 0 : params[3], 0.1, 100);
  var w0 = Math.sqrt(stiffness / mass);
  var zeta = damping / (2 * Math.sqrt(stiffness * mass));
  var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
  var a = 1;
  var b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;
  function solver(t) {
    var progress = duration ? duration * t / 1e3 : t;
    if (zeta < 1) {
      progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress));
    } else {
      progress = (a + b * progress) * Math.exp(-progress * w0);
    }
    if (t === 0 || t === 1) {
      return t;
    }
    return 1 - progress;
  }
  function getDuration() {
    var cached = cache.springs[string];
    if (cached) {
      return cached;
    }
    var frame = 1 / 6;
    var elapsed = 0;
    var rest = 0;
    while (true) {
      elapsed += frame;
      if (solver(elapsed) === 1) {
        rest++;
        if (rest >= 16) {
          break;
        }
      } else {
        rest = 0;
      }
    }
    var duration2 = elapsed * frame * 1e3;
    cache.springs[string] = duration2;
    return duration2;
  }
  return duration ? solver : getDuration;
}
function steps(steps2) {
  if (steps2 === void 0)
    steps2 = 10;
  return function(t) {
    return Math.ceil(minMax(t, 1e-6, 1) * steps2) * (1 / steps2);
  };
}
var bezier = function() {
  var kSplineTableSize = 11;
  var kSampleStepSize = 1 / (kSplineTableSize - 1);
  function A(aA1, aA2) {
    return 1 - 3 * aA2 + 3 * aA1;
  }
  function B(aA1, aA2) {
    return 3 * aA2 - 6 * aA1;
  }
  function C(aA1) {
    return 3 * aA1;
  }
  function calcBezier(aT, aA1, aA2) {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
  }
  function getSlope(aT, aA1, aA2) {
    return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
  }
  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX, currentT, i = 0;
    do {
      currentT = aA + (aB - aA) / 2;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0) {
        aB = currentT;
      } else {
        aA = currentT;
      }
    } while (Math.abs(currentX) > 1e-7 && ++i < 10);
    return currentT;
  }
  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (var i = 0; i < 4; ++i) {
      var currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0) {
        return aGuessT;
      }
      var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }
  function bezier2(mX1, mY1, mX2, mY2) {
    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
      return;
    }
    var sampleValues = new Float32Array(kSplineTableSize);
    if (mX1 !== mY1 || mX2 !== mY2) {
      for (var i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
    }
    function getTForX(aX) {
      var intervalStart = 0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;
      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }
      --currentSample;
      var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;
      var initialSlope = getSlope(guessForT, mX1, mX2);
      if (initialSlope >= 1e-3) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      } else if (initialSlope === 0) {
        return guessForT;
      } else {
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
      }
    }
    return function(x) {
      if (mX1 === mY1 && mX2 === mY2) {
        return x;
      }
      if (x === 0 || x === 1) {
        return x;
      }
      return calcBezier(getTForX(x), mY1, mY2);
    };
  }
  return bezier2;
}();
var penner = function() {
  var eases = { linear: function() {
    return function(t) {
      return t;
    };
  } };
  var functionEasings = {
    Sine: function() {
      return function(t) {
        return 1 - Math.cos(t * Math.PI / 2);
      };
    },
    Circ: function() {
      return function(t) {
        return 1 - Math.sqrt(1 - t * t);
      };
    },
    Back: function() {
      return function(t) {
        return t * t * (3 * t - 2);
      };
    },
    Bounce: function() {
      return function(t) {
        var pow2, b = 4;
        while (t < ((pow2 = Math.pow(2, --b)) - 1) / 11) {
        }
        return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - t, 2);
      };
    },
    Elastic: function(amplitude, period) {
      if (amplitude === void 0)
        amplitude = 1;
      if (period === void 0)
        period = 0.5;
      var a = minMax(amplitude, 1, 10);
      var p2 = minMax(period, 0.1, 2);
      return function(t) {
        return t === 0 || t === 1 ? t : -a * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - p2 / (Math.PI * 2) * Math.asin(1 / a)) * (Math.PI * 2) / p2);
      };
    }
  };
  var baseEasings = ["Quad", "Cubic", "Quart", "Quint", "Expo"];
  baseEasings.forEach(function(name, i) {
    functionEasings[name] = function() {
      return function(t) {
        return Math.pow(t, i + 2);
      };
    };
  });
  Object.keys(functionEasings).forEach(function(name) {
    var easeIn = functionEasings[name];
    eases["easeIn" + name] = easeIn;
    eases["easeOut" + name] = function(a, b) {
      return function(t) {
        return 1 - easeIn(a, b)(1 - t);
      };
    };
    eases["easeInOut" + name] = function(a, b) {
      return function(t) {
        return t < 0.5 ? easeIn(a, b)(t * 2) / 2 : 1 - easeIn(a, b)(t * -2 + 2) / 2;
      };
    };
    eases["easeOutIn" + name] = function(a, b) {
      return function(t) {
        return t < 0.5 ? (1 - easeIn(a, b)(1 - t * 2)) / 2 : (easeIn(a, b)(t * 2 - 1) + 1) / 2;
      };
    };
  });
  return eases;
}();
function parseEasings(easing, duration) {
  if (is.fnc(easing)) {
    return easing;
  }
  var name = easing.split("(")[0];
  var ease = penner[name];
  var args = parseEasingParameters(easing);
  switch (name) {
    case "spring":
      return spring(easing, duration);
    case "cubicBezier":
      return applyArguments(bezier, args);
    case "steps":
      return applyArguments(steps, args);
    default:
      return applyArguments(ease, args);
  }
}
function selectString(str) {
  try {
    var nodes = document.querySelectorAll(str);
    return nodes;
  } catch (e) {
    return;
  }
}
function filterArray(arr, callback) {
  var len = arr.length;
  var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
  var result = [];
  for (var i = 0; i < len; i++) {
    if (i in arr) {
      var val = arr[i];
      if (callback.call(thisArg, val, i, arr)) {
        result.push(val);
      }
    }
  }
  return result;
}
function flattenArray(arr) {
  return arr.reduce(function(a, b) {
    return a.concat(is.arr(b) ? flattenArray(b) : b);
  }, []);
}
function toArray(o) {
  if (is.arr(o)) {
    return o;
  }
  if (is.str(o)) {
    o = selectString(o) || o;
  }
  if (o instanceof NodeList || o instanceof HTMLCollection) {
    return [].slice.call(o);
  }
  return [o];
}
function arrayContains(arr, val) {
  return arr.some(function(a) {
    return a === val;
  });
}
function cloneObject(o) {
  var clone = {};
  for (var p2 in o) {
    clone[p2] = o[p2];
  }
  return clone;
}
function replaceObjectProps(o1, o2) {
  var o = cloneObject(o1);
  for (var p2 in o1) {
    o[p2] = o2.hasOwnProperty(p2) ? o2[p2] : o1[p2];
  }
  return o;
}
function mergeObjects(o1, o2) {
  var o = cloneObject(o1);
  for (var p2 in o2) {
    o[p2] = is.und(o1[p2]) ? o2[p2] : o1[p2];
  }
  return o;
}
function rgbToRgba(rgbValue) {
  var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
  return rgb ? "rgba(" + rgb[1] + ",1)" : rgbValue;
}
function hexToRgba(hexValue) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var hex = hexValue.replace(rgx, function(m, r2, g2, b2) {
    return r2 + r2 + g2 + g2 + b2 + b2;
  });
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(rgb[1], 16);
  var g = parseInt(rgb[2], 16);
  var b = parseInt(rgb[3], 16);
  return "rgba(" + r + "," + g + "," + b + ",1)";
}
function hslToRgba(hslValue) {
  var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
  var h = parseInt(hsl[1], 10) / 360;
  var s = parseInt(hsl[2], 10) / 100;
  var l = parseInt(hsl[3], 10) / 100;
  var a = hsl[4] || 1;
  function hue2rgb(p3, q2, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p3 + (q2 - p3) * 6 * t;
    }
    if (t < 1 / 2) {
      return q2;
    }
    if (t < 2 / 3) {
      return p3 + (q2 - p3) * (2 / 3 - t) * 6;
    }
    return p3;
  }
  var r, g, b;
  if (s == 0) {
    r = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p2 = 2 * l - q;
    r = hue2rgb(p2, q, h + 1 / 3);
    g = hue2rgb(p2, q, h);
    b = hue2rgb(p2, q, h - 1 / 3);
  }
  return "rgba(" + r * 255 + "," + g * 255 + "," + b * 255 + "," + a + ")";
}
function colorToRgb(val) {
  if (is.rgb(val)) {
    return rgbToRgba(val);
  }
  if (is.hex(val)) {
    return hexToRgba(val);
  }
  if (is.hsl(val)) {
    return hslToRgba(val);
  }
}
function getUnit(val) {
  var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
  if (split) {
    return split[1];
  }
}
function getTransformUnit(propName) {
  if (stringContains(propName, "translate") || propName === "perspective") {
    return "px";
  }
  if (stringContains(propName, "rotate") || stringContains(propName, "skew")) {
    return "deg";
  }
}
function getFunctionValue(val, animatable) {
  if (!is.fnc(val)) {
    return val;
  }
  return val(animatable.target, animatable.id, animatable.total);
}
function getAttribute(el, prop) {
  return el.getAttribute(prop);
}
function convertPxToUnit(el, value, unit) {
  var valueUnit = getUnit(value);
  if (arrayContains([unit, "deg", "rad", "turn"], valueUnit)) {
    return value;
  }
  var cached = cache.CSS[value + unit];
  if (!is.und(cached)) {
    return cached;
  }
  var baseline = 100;
  var tempEl = document.createElement(el.tagName);
  var parentEl = el.parentNode && el.parentNode !== document ? el.parentNode : document.body;
  parentEl.appendChild(tempEl);
  tempEl.style.position = "absolute";
  tempEl.style.width = baseline + unit;
  var factor = baseline / tempEl.offsetWidth;
  parentEl.removeChild(tempEl);
  var convertedUnit = factor * parseFloat(value);
  cache.CSS[value + unit] = convertedUnit;
  return convertedUnit;
}
function getCSSValue(el, prop, unit) {
  if (prop in el.style) {
    var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    var value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || "0";
    return unit ? convertPxToUnit(el, value, unit) : value;
  }
}
function getAnimationType(el, prop) {
  if (is.dom(el) && !is.inp(el) && (!is.nil(getAttribute(el, prop)) || is.svg(el) && el[prop])) {
    return "attribute";
  }
  if (is.dom(el) && arrayContains(validTransforms, prop)) {
    return "transform";
  }
  if (is.dom(el) && (prop !== "transform" && getCSSValue(el, prop))) {
    return "css";
  }
  if (el[prop] != null) {
    return "object";
  }
}
function getElementTransforms(el) {
  if (!is.dom(el)) {
    return;
  }
  var str = el.style.transform || "";
  var reg = /(\w+)\(([^)]*)\)/g;
  var transforms = /* @__PURE__ */ new Map();
  var m;
  while (m = reg.exec(str)) {
    transforms.set(m[1], m[2]);
  }
  return transforms;
}
function getTransformValue(el, propName, animatable, unit) {
  var defaultVal = stringContains(propName, "scale") ? 1 : 0 + getTransformUnit(propName);
  var value = getElementTransforms(el).get(propName) || defaultVal;
  if (animatable) {
    animatable.transforms.list.set(propName, value);
    animatable.transforms["last"] = propName;
  }
  return unit ? convertPxToUnit(el, value, unit) : value;
}
function getOriginalTargetValue(target, propName, unit, animatable) {
  switch (getAnimationType(target, propName)) {
    case "transform":
      return getTransformValue(target, propName, animatable, unit);
    case "css":
      return getCSSValue(target, propName, unit);
    case "attribute":
      return getAttribute(target, propName);
    default:
      return target[propName] || 0;
  }
}
function getRelativeValue(to, from) {
  var operator = /^(\*=|\+=|-=)/.exec(to);
  if (!operator) {
    return to;
  }
  var u = getUnit(to) || 0;
  var x = parseFloat(from);
  var y = parseFloat(to.replace(operator[0], ""));
  switch (operator[0][0]) {
    case "+":
      return x + y + u;
    case "-":
      return x - y + u;
    case "*":
      return x * y + u;
  }
}
function validateValue(val, unit) {
  if (is.col(val)) {
    return colorToRgb(val);
  }
  if (/\s/g.test(val)) {
    return val;
  }
  var originalUnit = getUnit(val);
  var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
  if (unit) {
    return unitLess + unit;
  }
  return unitLess;
}
function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
function getCircleLength(el) {
  return Math.PI * 2 * getAttribute(el, "r");
}
function getRectLength(el) {
  return getAttribute(el, "width") * 2 + getAttribute(el, "height") * 2;
}
function getLineLength(el) {
  return getDistance({ x: getAttribute(el, "x1"), y: getAttribute(el, "y1") }, { x: getAttribute(el, "x2"), y: getAttribute(el, "y2") });
}
function getPolylineLength(el) {
  var points = el.points;
  var totalLength = 0;
  var previousPos;
  for (var i = 0; i < points.numberOfItems; i++) {
    var currentPos = points.getItem(i);
    if (i > 0) {
      totalLength += getDistance(previousPos, currentPos);
    }
    previousPos = currentPos;
  }
  return totalLength;
}
function getPolygonLength(el) {
  var points = el.points;
  return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
}
function getTotalLength(el) {
  if (el.getTotalLength) {
    return el.getTotalLength();
  }
  switch (el.tagName.toLowerCase()) {
    case "circle":
      return getCircleLength(el);
    case "rect":
      return getRectLength(el);
    case "line":
      return getLineLength(el);
    case "polyline":
      return getPolylineLength(el);
    case "polygon":
      return getPolygonLength(el);
  }
}
function setDashoffset(el) {
  var pathLength = getTotalLength(el);
  el.setAttribute("stroke-dasharray", pathLength);
  return pathLength;
}
function getParentSvgEl(el) {
  var parentEl = el.parentNode;
  while (is.svg(parentEl)) {
    if (!is.svg(parentEl.parentNode)) {
      break;
    }
    parentEl = parentEl.parentNode;
  }
  return parentEl;
}
function getParentSvg(pathEl, svgData) {
  var svg = svgData || {};
  var parentSvgEl = svg.el || getParentSvgEl(pathEl);
  var rect = parentSvgEl.getBoundingClientRect();
  var viewBoxAttr = getAttribute(parentSvgEl, "viewBox");
  var width = rect.width;
  var height = rect.height;
  var viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(" ") : [0, 0, width, height]);
  return {
    el: parentSvgEl,
    viewBox,
    x: viewBox[0] / 1,
    y: viewBox[1] / 1,
    w: width,
    h: height,
    vW: viewBox[2],
    vH: viewBox[3]
  };
}
function getPath(path, percent) {
  var pathEl = is.str(path) ? selectString(path)[0] : path;
  var p2 = percent || 100;
  return function(property) {
    return {
      property,
      el: pathEl,
      svg: getParentSvg(pathEl),
      totalLength: getTotalLength(pathEl) * (p2 / 100)
    };
  };
}
function getPathProgress(path, progress, isPathTargetInsideSVG) {
  function point(offset) {
    if (offset === void 0)
      offset = 0;
    var l = progress + offset >= 1 ? progress + offset : 0;
    return path.el.getPointAtLength(l);
  }
  var svg = getParentSvg(path.el, path.svg);
  var p2 = point();
  var p0 = point(-1);
  var p1 = point(1);
  var scaleX = isPathTargetInsideSVG ? 1 : svg.w / svg.vW;
  var scaleY = isPathTargetInsideSVG ? 1 : svg.h / svg.vH;
  switch (path.property) {
    case "x":
      return (p2.x - svg.x) * scaleX;
    case "y":
      return (p2.y - svg.y) * scaleY;
    case "angle":
      return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
  }
}
function decomposeValue(val, unit) {
  var rgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
  var value = validateValue(is.pth(val) ? val.totalLength : val, unit) + "";
  return {
    original: value,
    numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
    strings: is.str(val) || unit ? value.split(rgx) : []
  };
}
function parseTargets(targets) {
  var targetsArray = targets ? flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets)) : [];
  return filterArray(targetsArray, function(item, pos, self) {
    return self.indexOf(item) === pos;
  });
}
function getAnimatables(targets) {
  var parsed = parseTargets(targets);
  return parsed.map(function(t, i) {
    return { target: t, id: i, total: parsed.length, transforms: { list: getElementTransforms(t) } };
  });
}
function normalizePropertyTweens(prop, tweenSettings) {
  var settings = cloneObject(tweenSettings);
  if (/^spring/.test(settings.easing)) {
    settings.duration = spring(settings.easing);
  }
  if (is.arr(prop)) {
    var l = prop.length;
    var isFromTo = l === 2 && !is.obj(prop[0]);
    if (!isFromTo) {
      if (!is.fnc(tweenSettings.duration)) {
        settings.duration = tweenSettings.duration / l;
      }
    } else {
      prop = { value: prop };
    }
  }
  var propArray = is.arr(prop) ? prop : [prop];
  return propArray.map(function(v, i) {
    var obj = is.obj(v) && !is.pth(v) ? v : { value: v };
    if (is.und(obj.delay)) {
      obj.delay = !i ? tweenSettings.delay : 0;
    }
    if (is.und(obj.endDelay)) {
      obj.endDelay = i === propArray.length - 1 ? tweenSettings.endDelay : 0;
    }
    return obj;
  }).map(function(k) {
    return mergeObjects(k, settings);
  });
}
function flattenKeyframes(keyframes) {
  var propertyNames = filterArray(flattenArray(keyframes.map(function(key) {
    return Object.keys(key);
  })), function(p2) {
    return is.key(p2);
  }).reduce(function(a, b) {
    if (a.indexOf(b) < 0) {
      a.push(b);
    }
    return a;
  }, []);
  var properties = {};
  var loop = function(i2) {
    var propName = propertyNames[i2];
    properties[propName] = keyframes.map(function(key) {
      var newKey = {};
      for (var p2 in key) {
        if (is.key(p2)) {
          if (p2 == propName) {
            newKey.value = key[p2];
          }
        } else {
          newKey[p2] = key[p2];
        }
      }
      return newKey;
    });
  };
  for (var i = 0; i < propertyNames.length; i++)
    loop(i);
  return properties;
}
function getProperties(tweenSettings, params) {
  var properties = [];
  var keyframes = params.keyframes;
  if (keyframes) {
    params = mergeObjects(flattenKeyframes(keyframes), params);
  }
  for (var p2 in params) {
    if (is.key(p2)) {
      properties.push({
        name: p2,
        tweens: normalizePropertyTweens(params[p2], tweenSettings)
      });
    }
  }
  return properties;
}
function normalizeTweenValues(tween, animatable) {
  var t = {};
  for (var p2 in tween) {
    var value = getFunctionValue(tween[p2], animatable);
    if (is.arr(value)) {
      value = value.map(function(v) {
        return getFunctionValue(v, animatable);
      });
      if (value.length === 1) {
        value = value[0];
      }
    }
    t[p2] = value;
  }
  t.duration = parseFloat(t.duration);
  t.delay = parseFloat(t.delay);
  return t;
}
function normalizeTweens(prop, animatable) {
  var previousTween;
  return prop.tweens.map(function(t) {
    var tween = normalizeTweenValues(t, animatable);
    var tweenValue = tween.value;
    var to = is.arr(tweenValue) ? tweenValue[1] : tweenValue;
    var toUnit = getUnit(to);
    var originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
    var previousValue = previousTween ? previousTween.to.original : originalValue;
    var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
    var fromUnit = getUnit(from) || getUnit(originalValue);
    var unit = toUnit || fromUnit;
    if (is.und(to)) {
      to = previousValue;
    }
    tween.from = decomposeValue(from, unit);
    tween.to = decomposeValue(getRelativeValue(to, from), unit);
    tween.start = previousTween ? previousTween.end : 0;
    tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
    tween.easing = parseEasings(tween.easing, tween.duration);
    tween.isPath = is.pth(tweenValue);
    tween.isPathTargetInsideSVG = tween.isPath && is.svg(animatable.target);
    tween.isColor = is.col(tween.from.original);
    if (tween.isColor) {
      tween.round = 1;
    }
    previousTween = tween;
    return tween;
  });
}
var setProgressValue = {
  css: function(t, p2, v) {
    return t.style[p2] = v;
  },
  attribute: function(t, p2, v) {
    return t.setAttribute(p2, v);
  },
  object: function(t, p2, v) {
    return t[p2] = v;
  },
  transform: function(t, p2, v, transforms, manual) {
    transforms.list.set(p2, v);
    if (p2 === transforms.last || manual) {
      var str = "";
      transforms.list.forEach(function(value, prop) {
        str += prop + "(" + value + ") ";
      });
      t.style.transform = str;
    }
  }
};
function setTargetsValue(targets, properties) {
  var animatables = getAnimatables(targets);
  animatables.forEach(function(animatable) {
    for (var property in properties) {
      var value = getFunctionValue(properties[property], animatable);
      var target = animatable.target;
      var valueUnit = getUnit(value);
      var originalValue = getOriginalTargetValue(target, property, valueUnit, animatable);
      var unit = valueUnit || getUnit(originalValue);
      var to = getRelativeValue(validateValue(value, unit), originalValue);
      var animType = getAnimationType(target, property);
      setProgressValue[animType](target, property, to, animatable.transforms, true);
    }
  });
}
function createAnimation(animatable, prop) {
  var animType = getAnimationType(animatable.target, prop.name);
  if (animType) {
    var tweens = normalizeTweens(prop, animatable);
    var lastTween = tweens[tweens.length - 1];
    return {
      type: animType,
      property: prop.name,
      animatable,
      tweens,
      duration: lastTween.end,
      delay: tweens[0].delay,
      endDelay: lastTween.endDelay
    };
  }
}
function getAnimations(animatables, properties) {
  return filterArray(flattenArray(animatables.map(function(animatable) {
    return properties.map(function(prop) {
      return createAnimation(animatable, prop);
    });
  })), function(a) {
    return !is.und(a);
  });
}
function getInstanceTimings(animations, tweenSettings) {
  var animLength = animations.length;
  var getTlOffset = function(anim) {
    return anim.timelineOffset ? anim.timelineOffset : 0;
  };
  var timings = {};
  timings.duration = animLength ? Math.max.apply(Math, animations.map(function(anim) {
    return getTlOffset(anim) + anim.duration;
  })) : tweenSettings.duration;
  timings.delay = animLength ? Math.min.apply(Math, animations.map(function(anim) {
    return getTlOffset(anim) + anim.delay;
  })) : tweenSettings.delay;
  timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map(function(anim) {
    return getTlOffset(anim) + anim.duration - anim.endDelay;
  })) : tweenSettings.endDelay;
  return timings;
}
var instanceID = 0;
function createNewInstance(params) {
  var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
  var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
  var properties = getProperties(tweenSettings, params);
  var animatables = getAnimatables(params.targets);
  var animations = getAnimations(animatables, properties);
  var timings = getInstanceTimings(animations, tweenSettings);
  var id = instanceID;
  instanceID++;
  return mergeObjects(instanceSettings, {
    id,
    children: [],
    animatables,
    animations,
    duration: timings.duration,
    delay: timings.delay,
    endDelay: timings.endDelay
  });
}
var activeInstances = [];
var engine = function() {
  var raf;
  function play() {
    if (!raf && (!isDocumentHidden() || !anime.suspendWhenDocumentHidden) && activeInstances.length > 0) {
      raf = requestAnimationFrame(step);
    }
  }
  function step(t) {
    var activeInstancesLength = activeInstances.length;
    var i = 0;
    while (i < activeInstancesLength) {
      var activeInstance = activeInstances[i];
      if (!activeInstance.paused) {
        activeInstance.tick(t);
        i++;
      } else {
        activeInstances.splice(i, 1);
        activeInstancesLength--;
      }
    }
    raf = i > 0 ? requestAnimationFrame(step) : void 0;
  }
  function handleVisibilityChange() {
    if (!anime.suspendWhenDocumentHidden) {
      return;
    }
    if (isDocumentHidden()) {
      raf = cancelAnimationFrame(raf);
    } else {
      activeInstances.forEach(function(instance) {
        return instance._onDocumentVisibility();
      });
      engine();
    }
  }
  if (typeof document !== "undefined") {
    document.addEventListener("visibilitychange", handleVisibilityChange);
  }
  return play;
}();
function isDocumentHidden() {
  return !!document && document.hidden;
}
function anime(params) {
  if (params === void 0)
    params = {};
  var startTime = 0, lastTime = 0, now = 0;
  var children, childrenLength = 0;
  var resolve = null;
  function makePromise(instance2) {
    var promise = window.Promise && new Promise(function(_resolve) {
      return resolve = _resolve;
    });
    instance2.finished = promise;
    return promise;
  }
  var instance = createNewInstance(params);
  makePromise(instance);
  function toggleInstanceDirection() {
    var direction = instance.direction;
    if (direction !== "alternate") {
      instance.direction = direction !== "normal" ? "normal" : "reverse";
    }
    instance.reversed = !instance.reversed;
    children.forEach(function(child) {
      return child.reversed = instance.reversed;
    });
  }
  function adjustTime(time) {
    return instance.reversed ? instance.duration - time : time;
  }
  function resetTime() {
    startTime = 0;
    lastTime = adjustTime(instance.currentTime) * (1 / anime.speed);
  }
  function seekChild(time, child) {
    if (child) {
      child.seek(time - child.timelineOffset);
    }
  }
  function syncInstanceChildren(time) {
    if (!instance.reversePlayback) {
      for (var i = 0; i < childrenLength; i++) {
        seekChild(time, children[i]);
      }
    } else {
      for (var i$1 = childrenLength; i$1--; ) {
        seekChild(time, children[i$1]);
      }
    }
  }
  function setAnimationsProgress(insTime) {
    var i = 0;
    var animations = instance.animations;
    var animationsLength = animations.length;
    while (i < animationsLength) {
      var anim = animations[i];
      var animatable = anim.animatable;
      var tweens = anim.tweens;
      var tweenLength = tweens.length - 1;
      var tween = tweens[tweenLength];
      if (tweenLength) {
        tween = filterArray(tweens, function(t) {
          return insTime < t.end;
        })[0] || tween;
      }
      var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
      var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);
      var strings = tween.to.strings;
      var round = tween.round;
      var numbers = [];
      var toNumbersLength = tween.to.numbers.length;
      var progress = void 0;
      for (var n = 0; n < toNumbersLength; n++) {
        var value = void 0;
        var toNumber = tween.to.numbers[n];
        var fromNumber = tween.from.numbers[n] || 0;
        if (!tween.isPath) {
          value = fromNumber + eased * (toNumber - fromNumber);
        } else {
          value = getPathProgress(tween.value, eased * toNumber, tween.isPathTargetInsideSVG);
        }
        if (round) {
          if (!(tween.isColor && n > 2)) {
            value = Math.round(value * round) / round;
          }
        }
        numbers.push(value);
      }
      var stringsLength = strings.length;
      if (!stringsLength) {
        progress = numbers[0];
      } else {
        progress = strings[0];
        for (var s = 0; s < stringsLength; s++) {
          strings[s];
          var b = strings[s + 1];
          var n$1 = numbers[s];
          if (!isNaN(n$1)) {
            if (!b) {
              progress += n$1 + " ";
            } else {
              progress += n$1 + b;
            }
          }
        }
      }
      setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
      anim.currentValue = progress;
      i++;
    }
  }
  function setCallback(cb) {
    if (instance[cb] && !instance.passThrough) {
      instance[cb](instance);
    }
  }
  function countIteration() {
    if (instance.remaining && instance.remaining !== true) {
      instance.remaining--;
    }
  }
  function setInstanceProgress(engineTime) {
    var insDuration = instance.duration;
    var insDelay = instance.delay;
    var insEndDelay = insDuration - instance.endDelay;
    var insTime = adjustTime(engineTime);
    instance.progress = minMax(insTime / insDuration * 100, 0, 100);
    instance.reversePlayback = insTime < instance.currentTime;
    if (children) {
      syncInstanceChildren(insTime);
    }
    if (!instance.began && instance.currentTime > 0) {
      instance.began = true;
      setCallback("begin");
    }
    if (!instance.loopBegan && instance.currentTime > 0) {
      instance.loopBegan = true;
      setCallback("loopBegin");
    }
    if (insTime <= insDelay && instance.currentTime !== 0) {
      setAnimationsProgress(0);
    }
    if (insTime >= insEndDelay && instance.currentTime !== insDuration || !insDuration) {
      setAnimationsProgress(insDuration);
    }
    if (insTime > insDelay && insTime < insEndDelay) {
      if (!instance.changeBegan) {
        instance.changeBegan = true;
        instance.changeCompleted = false;
        setCallback("changeBegin");
      }
      setCallback("change");
      setAnimationsProgress(insTime);
    } else {
      if (instance.changeBegan) {
        instance.changeCompleted = true;
        instance.changeBegan = false;
        setCallback("changeComplete");
      }
    }
    instance.currentTime = minMax(insTime, 0, insDuration);
    if (instance.began) {
      setCallback("update");
    }
    if (engineTime >= insDuration) {
      lastTime = 0;
      countIteration();
      if (!instance.remaining) {
        instance.paused = true;
        if (!instance.completed) {
          instance.completed = true;
          setCallback("loopComplete");
          setCallback("complete");
          if (!instance.passThrough && "Promise" in window) {
            resolve();
            makePromise(instance);
          }
        }
      } else {
        startTime = now;
        setCallback("loopComplete");
        instance.loopBegan = false;
        if (instance.direction === "alternate") {
          toggleInstanceDirection();
        }
      }
    }
  }
  instance.reset = function() {
    var direction = instance.direction;
    instance.passThrough = false;
    instance.currentTime = 0;
    instance.progress = 0;
    instance.paused = true;
    instance.began = false;
    instance.loopBegan = false;
    instance.changeBegan = false;
    instance.completed = false;
    instance.changeCompleted = false;
    instance.reversePlayback = false;
    instance.reversed = direction === "reverse";
    instance.remaining = instance.loop;
    children = instance.children;
    childrenLength = children.length;
    for (var i = childrenLength; i--; ) {
      instance.children[i].reset();
    }
    if (instance.reversed && instance.loop !== true || direction === "alternate" && instance.loop === 1) {
      instance.remaining++;
    }
    setAnimationsProgress(instance.reversed ? instance.duration : 0);
  };
  instance._onDocumentVisibility = resetTime;
  instance.set = function(targets, properties) {
    setTargetsValue(targets, properties);
    return instance;
  };
  instance.tick = function(t) {
    now = t;
    if (!startTime) {
      startTime = now;
    }
    setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
  };
  instance.seek = function(time) {
    setInstanceProgress(adjustTime(time));
  };
  instance.pause = function() {
    instance.paused = true;
    resetTime();
  };
  instance.play = function() {
    if (!instance.paused) {
      return;
    }
    if (instance.completed) {
      instance.reset();
    }
    instance.paused = false;
    activeInstances.push(instance);
    resetTime();
    engine();
  };
  instance.reverse = function() {
    toggleInstanceDirection();
    instance.completed = instance.reversed ? false : true;
    resetTime();
  };
  instance.restart = function() {
    instance.reset();
    instance.play();
  };
  instance.remove = function(targets) {
    var targetsArray = parseTargets(targets);
    removeTargetsFromInstance(targetsArray, instance);
  };
  instance.reset();
  if (instance.autoplay) {
    instance.play();
  }
  return instance;
}
function removeTargetsFromAnimations(targetsArray, animations) {
  for (var a = animations.length; a--; ) {
    if (arrayContains(targetsArray, animations[a].animatable.target)) {
      animations.splice(a, 1);
    }
  }
}
function removeTargetsFromInstance(targetsArray, instance) {
  var animations = instance.animations;
  var children = instance.children;
  removeTargetsFromAnimations(targetsArray, animations);
  for (var c = children.length; c--; ) {
    var child = children[c];
    var childAnimations = child.animations;
    removeTargetsFromAnimations(targetsArray, childAnimations);
    if (!childAnimations.length && !child.children.length) {
      children.splice(c, 1);
    }
  }
  if (!animations.length && !children.length) {
    instance.pause();
  }
}
function removeTargetsFromActiveInstances(targets) {
  var targetsArray = parseTargets(targets);
  for (var i = activeInstances.length; i--; ) {
    var instance = activeInstances[i];
    removeTargetsFromInstance(targetsArray, instance);
  }
}
function stagger(val, params) {
  if (params === void 0)
    params = {};
  var direction = params.direction || "normal";
  var easing = params.easing ? parseEasings(params.easing) : null;
  var grid = params.grid;
  var axis = params.axis;
  var fromIndex = params.from || 0;
  var fromFirst = fromIndex === "first";
  var fromCenter = fromIndex === "center";
  var fromLast = fromIndex === "last";
  var isRange = is.arr(val);
  var val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
  var val2 = isRange ? parseFloat(val[1]) : 0;
  var unit = getUnit(isRange ? val[1] : val) || 0;
  var start = params.start || 0 + (isRange ? val1 : 0);
  var values = [];
  var maxValue = 0;
  return function(el, i, t) {
    if (fromFirst) {
      fromIndex = 0;
    }
    if (fromCenter) {
      fromIndex = (t - 1) / 2;
    }
    if (fromLast) {
      fromIndex = t - 1;
    }
    if (!values.length) {
      for (var index = 0; index < t; index++) {
        if (!grid) {
          values.push(Math.abs(fromIndex - index));
        } else {
          var fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
          var fromY = !fromCenter ? Math.floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
          var toX = index % grid[0];
          var toY = Math.floor(index / grid[0]);
          var distanceX = fromX - toX;
          var distanceY = fromY - toY;
          var value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          if (axis === "x") {
            value = -distanceX;
          }
          if (axis === "y") {
            value = -distanceY;
          }
          values.push(value);
        }
        maxValue = Math.max.apply(Math, values);
      }
      if (easing) {
        values = values.map(function(val3) {
          return easing(val3 / maxValue) * maxValue;
        });
      }
      if (direction === "reverse") {
        values = values.map(function(val3) {
          return axis ? val3 < 0 ? val3 * -1 : -val3 : Math.abs(maxValue - val3);
        });
      }
    }
    var spacing = isRange ? (val2 - val1) / maxValue : val1;
    return start + spacing * (Math.round(values[i] * 100) / 100) + unit;
  };
}
function timeline(params) {
  if (params === void 0)
    params = {};
  var tl = anime(params);
  tl.duration = 0;
  tl.add = function(instanceParams, timelineOffset) {
    var tlIndex = activeInstances.indexOf(tl);
    var children = tl.children;
    if (tlIndex > -1) {
      activeInstances.splice(tlIndex, 1);
    }
    function passThrough(ins2) {
      ins2.passThrough = true;
    }
    for (var i = 0; i < children.length; i++) {
      passThrough(children[i]);
    }
    var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
    insParams.targets = insParams.targets || params.targets;
    var tlDuration = tl.duration;
    insParams.autoplay = false;
    insParams.direction = tl.direction;
    insParams.timelineOffset = is.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration);
    passThrough(tl);
    tl.seek(insParams.timelineOffset);
    var ins = anime(insParams);
    passThrough(ins);
    children.push(ins);
    var timings = getInstanceTimings(children, params);
    tl.delay = timings.delay;
    tl.endDelay = timings.endDelay;
    tl.duration = timings.duration;
    tl.seek(0);
    tl.reset();
    if (tl.autoplay) {
      tl.play();
    }
    return tl;
  };
  return tl;
}
anime.version = "3.2.1";
anime.speed = 1;
anime.suspendWhenDocumentHidden = true;
anime.running = activeInstances;
anime.remove = removeTargetsFromActiveInstances;
anime.get = getOriginalTargetValue;
anime.set = setTargetsValue;
anime.convertPx = convertPxToUnit;
anime.path = getPath;
anime.setDashoffset = setDashoffset;
anime.stagger = stagger;
anime.timeline = timeline;
anime.easing = parseEasings;
anime.penner = penner;
anime.random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
class osuCursor {
  constructor(options) {
    var _a, _b;
    this.options = options || {};
    (_b = (_a = this.options).rotate) != null ? _b : _a.rotate = true;
    this.init();
  }
  injectHtml(html, el) {
    let div = document.createElement("div");
    div.innerHTML = html;
    while (div.children.length > 0) {
      el.appendChild(div.children[0]);
    }
    return el.lastChild;
  }
  init() {
    this.dragState = 0;
    this.visible = false;
    this.dragStartPos = { x: 0, y: 0 };
    this.rotateState = {
      isInAnimation: false,
      degrees: 0
    };
    this.isTouch = false;
    const style2 = document.createElement("style");
    style2.textContent = styleSheet;
    document.body.appendChild(style2);
    if (document.querySelector("#osu-cursor")) {
      return;
    }
    this.cursor = this.injectHtml(`
		<div class='osu-cursor' id='osu-cursor'>
			<div class='cursor-inner'>
			<img class='cursor-fg' src='${cursorDefault}'/>
			<img class='cursor-additive' src='${cursorAdditive}'/>
			</div>
		</div>`, document.body);
    this.cursor.style.display = "none";
    this.cursor.style.top = -500;
    this.cursor.style.left = -500;
    this.cursorInner = this.cursor.querySelector(".cursor-inner");
    this.cursorFg = this.cursor.querySelector(".cursor-fg");
    this.cursorAdditive = this.cursor.querySelector(".cursor-additive");
    this.mouseMoveFunc = this.mouseMove.bind(this);
    this.mouseOverFunc = this.mouseOver.bind(this);
    this.mouseDownFunc = this.mouseDown.bind(this);
    this.mouseUpFunc = this.mouseUp.bind(this);
    this.mouseLeaveFunc = this.mouseLeave.bind(this);
    this.dragFunc = this.drag.bind(this);
    this.dragEndFunc = this.dragEnd.bind(this);
    this.touchFunc = this.touch.bind(this);
    document.addEventListener("mousemove", this.mouseMoveFunc, { passive: true });
    document.addEventListener("mouseover", this.mouseOverFunc, { passive: true });
    document.addEventListener("mousedown", this.mouseDownFunc, { passive: true });
    document.addEventListener("touchstart", this.touchFunc, { passive: true });
    document.addEventListener("touchmove", this.touchFunc, { passive: true });
    document.addEventListener("mouseup", this.mouseUpFunc, { passive: true });
    document.addEventListener("mouseleave", this.mouseLeaveFunc, { passive: true });
    document.addEventListener("drag", this.dragFunc, { passive: true });
    document.addEventListener("dragend", this.dragEndFunc, { passive: true });
  }
  getCurrentCursorStyle(target) {
    if (target.hasAttribute("orig-cursor")) {
      return target.getAttribute("orig-cursor");
    }
    let cursorStyle = getComputedStyle(target).cursor;
    return cursorStyle;
  }
  mouseMove(e) {
    if (this.isTouch) {
      this.isTouch = false;
      return;
    }
    this.cursor.style.top = e.pageY - window.pageYOffset + "px";
    this.cursor.style.left = e.pageX - window.pageXOffset + "px";
    if ((this.dragState == 1 || this.dragState == 2) && this.options.rotate) {
      const deltaX = e.pageX - window.pageXOffset - this.dragStartPos.x;
      const deltaY = e.pageY - window.pageYOffset - this.dragStartPos.y;
      if (deltaX * deltaX + deltaY * deltaY > 30 * 30) {
        this.dragState = 2;
      } else {
        return;
      }
      let degrees = Math.atan2(-deltaX, deltaY) * 180 / Math.PI + 24.3;
      const diff = (degrees - this.rotateState.degrees) % 360;
      if (diff < -180)
        diff += 360;
      if (diff > 180)
        diff -= 360;
      this.rotateState.degrees += diff;
      anime.remove(this.cursor);
      this.cursor.style.transition = `transform 0.15s`;
      this.cursor.style.transform = `rotate(${this.rotateState.degrees}deg)`;
    }
  }
  mouseDown(e) {
    if (this.isTouch) {
      this.isTouch = false;
      return;
    }
    if (this.visible) {
      this.dragStartPos.x = e.pageX - window.pageXOffset;
      this.dragStartPos.y = e.pageY - window.pageYOffset;
      this.rotateState.degrees = 0;
      this.cursor.classList.add("active");
      anime.remove(this.cursorInner);
      anime({
        targets: this.cursorInner,
        scale: 0.9,
        duration: 800,
        easing: function() {
          return function(t) {
            return (t - 1) * (t - 1) * (t - 1) + 1;
          };
        }
      });
      anime.remove(this.cursorAdditive);
      anime({
        targets: this.cursorAdditive,
        opacity: this.dragState == 3 ? 1 : [0, 1],
        duration: 800,
        easing: function() {
          return function(t) {
            return (t - 1) * (t - 1) * (t - 1) * (t - 1) * (t - 1) + 1;
          };
        }
      });
      this.dragState = 1;
    }
  }
  mouseUp(e) {
    if (this.visible) {
      if (this.dragState == 2) {
        anime.remove(this.cursor);
        this.rotateState.isInAnimation = true;
        this.cursor.style.removeProperty("transition");
        anime({
          targets: this.cursor,
          rotate: 0,
          duration: 600 * (1 + Math.abs(this.rotateState.degrees / 720)),
          easing: function() {
            return function(t) {
              return Math.pow(2, -10 * t) * Math.sin((0.5 * t - 0.075) * 20.943951023931955) + 1 - 4882812499999998e-19 * t;
            };
          },
          complete: () => {
            this.rotateState.isInAnimation = false;
            new Event("click");
          }
        });
        this.rotateState.degrees = 0;
      }
      this.dragState = 0;
      this.cursor.classList.remove("active");
      anime.remove(this.cursorInner);
      anime({
        targets: this.cursorInner,
        scale: 1,
        duration: 500,
        easing: function() {
          return function(t) {
            return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * 20.943951023931955) + 1 - 48828125e-11 * t;
          };
        }
      });
      anime.remove(this.cursorAdditive);
      anime({
        targets: this.cursorAdditive,
        opacity: [1, 0],
        duration: 500,
        easing: function() {
          return function(t) {
            return (t - 1) * (t - 1) * (t - 1) * (t - 1) * (t - 1) + 1;
          };
        }
      });
    }
  }
  mouseLeave(e) {
    this.visible = false;
    document.documentElement.style.removeProperty("cursor");
    this.cursor.style.display = "none";
  }
  mouseOver(e) {
    if (this.dragState == 1 || this.dragState == 2) {
      return;
    }
    const currentCursor = this.getCurrentCursorStyle(e.target);
    if (["default", "auto", "none"].includes(currentCursor)) {
      this.visible = true;
      document.documentElement.style.cursor = "none";
      e.target.style.removeProperty("cursor");
      this.cursor.style.display = "block";
      if (this.dragState == 3) {
        this.dragState = 0;
        anime.remove(this.cursor);
        this.cursor.style.transition = `transform 0.15s`;
        this.cursor.style.transform = "rotate(0)";
        anime.remove(this.cursorAdditive);
        anime({
          targets: this.cursorAdditive,
          opacity: 0,
          duration: 200,
          easing: function() {
            return function(t) {
              return (t - 1) * (t - 1) * (t - 1) * (t - 1) * (t - 1) + 1;
            };
          }
        });
      }
    } else if (currentCursor == "pointer") {
      this.visible = true;
      document.documentElement.style.cursor = "none";
      e.target.setAttribute("orig-cursor", currentCursor);
      e.target.style.cursor = "none";
      this.cursor.style.display = "block";
      if (this.dragState == 0 && !this.rotateState.isInAnimation) {
        this.dragState = 3;
        anime.remove(this.cursor);
        this.cursor.style.transition = `transform 0.15s`;
        this.cursor.style.transform = "rotate(24.3deg)";
        anime.remove(this.cursorAdditive);
        anime({
          targets: this.cursorAdditive,
          opacity: 1,
          duration: 200,
          easing: function() {
            return function(t) {
              return (t - 1) * (t - 1) * (t - 1) * (t - 1) * (t - 1) + 1;
            };
          }
        });
      }
    } else {
      this.visible = false;
      document.documentElement.style.removeProperty("cursor");
      this.cursor.style.display = "none";
    }
  }
  drag(e) {
    this.visible = false;
    document.documentElement.style.removeProperty("cursor");
    this.cursor.style.display = "none";
    this.dragState = -1;
  }
  dragEnd(e) {
    document.documentElement.style.cursor = "none";
    this.cursor.style.display = "block";
    this.cursor.classList.remove("active");
    anime.remove(this.cursorAdditive);
    this.cursorAdditive.style.opacity = 0;
    anime.remove(this.cursor);
    this.cursor.style.transform = "rotate(0)";
    anime.remove(this.cursorInner);
    this.cursorInner.style.transform = "scale(1)";
    this.visible = true;
    this.dragState = 0;
  }
  touch(e) {
    this.isTouch = true;
  }
  stop() {
    document.removeEventListener("mousemove", this.mouseMoveFunc);
    document.removeEventListener("mouseover", this.mouseOverFunc);
    document.removeEventListener("mousedown", this.mouseDownFunc);
    document.removeEventListener("touchstart", this.touchFunc);
    document.removeEventListener("touchmove", this.touchFunc);
    document.removeEventListener("mouseup", this.mouseUpFunc);
    document.removeEventListener("mouseleave", this.mouseLeaveFunc);
    document.removeEventListener("drag", this.dragFunc);
    document.removeEventListener("dragend", this.dragEndFunc);
    if (this.cursor) {
      this.cursor.remove();
      this.cursor = null;
    }
  }
}
window["osuCursor"] = osuCursor;
var index_html_htmlProxy_index_1 = "";
