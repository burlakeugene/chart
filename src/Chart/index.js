Date.prototype.formatting = function (format) {
  var yyyy = this.getFullYear().toString();
  format = format.replace(/yyyy/g, yyyy);
  var mm = (this.getMonth() + 1).toString();
  format = format.replace(/mm/g, mm[1] ? mm : '0' + mm[0]);
  var dd = this.getDate().toString();
  format = format.replace(/dd/g, dd[1] ? dd : '0' + dd[0]);
  var hh = this.getHours().toString();
  format = format.replace(/hh/g, hh[1] ? hh : '0' + hh[0]);
  var ii = this.getMinutes().toString();
  format = format.replace(/ii/g, ii[1] ? ii : '0' + ii[0]);
  var ss = this.getSeconds().toString();
  format = format.replace(/ss/g, ss[1] ? ss : '0' + ss[0]);
  return format;
};

const generateDate = (time, format = 'hh:ii:ss') => {
  let result = '';
  time = new Date(time);
  result = time.formatting(format);
  return result;
};

const deepMerge = (obj1, obj2) => {
  for (var p in obj2) {
    try {
      if (obj2[p].constructor == Object) {
        obj1[p] = deepMerge(obj1[p], obj2[p]);
      } else {
        obj1[p] = obj2[p];
      }
    } catch (e) {
      obj1[p] = obj2[p];
    }
  }
  return obj1;
};

const addEventListeners = (element, events, func) => {
  events.forEach((event) => {
    element.addEventListener(event, func);
  });
};
export default class Chart {
  constructor({
    canvas = false,
    data = [],
    settings = {},
    offset = {
      left: 30,
      right: 50,
      top: 20,
      bottom: 40,
    },
    actions = {},
  }) {
    this.actions = actions;
    this.canvas = {
      element: canvas,
      context: canvas.getContext('2d'),
      isCanvas:
        (canvas instanceof Element || canvas instanceof HTMLDocument) &&
        canvas.tagName.toLowerCase() === 'canvas',
    };
    this.data = data;
    this.settings = {
      data: {
        offset: 0,
        limit: {
          value: 100,
          min: 10,
        },
      },
      offset: { ...offset },
      indicator: {
        enable: true,
        styles: {
          color: '#27ca5d',
          width: 3,
        },
        animation: {
          time: 1000,
          scaleTo: 5,
        },
      },
      line: {
        styles: {
          color: '#ffffff',
          width: 2,
          lineGradient: {
            points: [
              {
                color: '#954ce9',
              },
              {
                color: '#24c1ed',
              },
            ],
            enable: true,
          },
          backgroundGradient: {
            points: [
              {
                color: 'rgba(149, 76, 233, 0.17)',
              },
              {
                color: 'rgba(149, 76, 233, 0)',
              },
            ],
            enable: true,
          },
        },
        offset: { ...offset },
      },
      view: {
        styles: {
          background: '#1a1e30',
        },
      },
      target: {
        enable: true,
        coords: {
          x: 0,
          y: 0,
        },
        styles: {
          line: {
            color: '#6f7dab',
            width: 1,
            horizontal: {
              enable: true,
            },
            vertical: {
              enable: true,
            },
          },
          panel: {
            background: '#6f7dab',
            color: '#fff',
          },
          points: [
            {
              width: 10,
              background: 'transparent',
              strokeColor: '#6f7dab',
              strokeWidth: 1,
            },
            {
              width: 4,
              background: '#24c1ed',
              strokeColor: 'transparent',
            },
          ],
        },
      },
      grid: {
        enable: true,
        steps: {
          x: 10,
          y: 5,
        },
        styles: {
          background: '',
          color: '#2b2a49',
          width: 1,
        },
      },
      timeLine: {
        enable: true,
        resize: true,
        mousewheel: {
          enable: true,
          speed: 1,
        },
        count: 5,
        styles: {
          color: '#6f7dab',
        },
      },
      valuesLine: {
        enable: true,
        position: 'right',
        resize: {
          enable: true,
          topMin: 80,
          bottomMin: 80,
        },
        count: 10,
        digits: 2,
        styles: {
          color: '#6f7dab',
        },
        overflowValues: false,
      },
      timeFormat: {
        line: 'hh:ii:ss',
        current: 'hh:ii:ss',
      },
      timeStamp: +new Date(),
    };
    this.setSettings(settings);
    this.init();
  }
  setSettings(newSettings = {}) {
    if (newSettings.offset) {
      newSettings.line = {};
      newSettings.line.offset = newSettings.offset;
    }
    deepMerge(this.settings, newSettings);
    this.setPointsLimit(false, false);
  }
  getSettings() {
    return this.settings;
  }
  setData(data) {
    this.data = data;
  }
  getData() {
    return this.data;
  }
  getLast() {
    let last = this.getPoints('last');
    return last;
  }
  newPoint({ value = false, time = false } = {}) {
    let { points } = this.getPoints('all'),
      { settings } = this,
      { data } = settings,
      lastPoint = points[points.length - 1],
      prevValue = lastPoint ? lastPoint.value : 0,
      randomValue = Math.random() * (Math.random() > 0.5 ? -1 : 1),
      currentTime = +new Date();
    time = time || currentTime;
    value = parseFloat(value) || value === 0 ? value : prevValue + randomValue;
    if (data.offset) data.offset++;
    points.push({
      value,
      time,
    });
  }
  setPoint(index, { value, time }) {
    let { points } = this.getPoints('all');
    if (!points[index]) return;
    points[index].value = value || points[index].value;
    points[index].time = time || points[index].time;
  }
  init() {
    this.listeners();
    this.render();
  }
  resize() {}
  render() {
    this.drawBackground();
    this.drawGrid();
    this.drawLine();
    this.drawValues();
    this.drawTime();
    this.drawTarget();
    this.drawIndicator();
    requestAnimationFrame(this.render.bind(this));
  }
  getPoints(type) {
    let { settings } = this,
      { data } = settings,
      all = this.data,
      draw = [...this.data];
    if (data.offset) {
      let rest = draw.length - data.offset,
        moreThenLimit = rest > data.limit.value;
      if (!moreThenLimit) {
        data.offset = draw.length - data.limit.value;
      }
      draw = draw.slice(0, moreThenLimit ? rest : data.limit.value);
    }
    if (draw.length > data.limit.value) {
      draw = draw.slice(draw.length - data.limit.value, draw.length);
    }
    let drawMax = draw.length ? draw[0].value : 0,
      drawMin = draw.length ? draw[0].value : 0,
      max = data.length ? data[0].value : 0,
      min = data.length ? data[0].value : 0;
    for (let i = 0; i <= all.length - 1; i++) {
      let { value } = all[i];
      if (value > max) max = value;
      if (value < min) min = value;
    }
    for (let i = 0; i <= draw.length - 1; i++) {
      let { value } = draw[i];
      if (value > drawMax) drawMax = value;
      if (value < drawMin) drawMin = value;
    }
    draw = this.calcPointsCoords(draw, drawMin, drawMax);
    let result = {
      all: {
        points: all,
        max,
        min,
      },
      draw: {
        points: draw,
        max: drawMax,
        min: drawMin,
      },
      last: all[all.length - 1],
      first: all[0],
    };
    return type && result[type] ? result[type] : result;
  }
  calcPointsCoords(points, min, max) {
    let {
        lineStart,
        lineEnd,
        lineView,
        lineTop,
        lineBottom,
        lineHeight,
      } = this.getLineDrawCoords(),
      lineLastPoint = lineStart,
      pointsLength = points.length - 1;
    for (let i = pointsLength; i >= 0; i--) {
      let point = points[i],
        value = point.value,
        partWidth = lineView / pointsLength;
      point.x = lineLastPoint;
      point.y =
        lineTop +
        lineHeight -
        lineHeight * (((value - min) * 100) / (max - min) / 100);
      if (!point.y) point.y = lineHeight / 2 + lineTop;
      lineLastPoint -= partWidth;
    }
    return points;
  }
  getIndicatorCoords() {
    let { canvas, settings } = this,
      { indicator, line } = settings,
      { offset } = line,
      { element } = canvas,
      { styles, animation } = indicator,
      { draw, last } = this.getPoints(),
      {
        lineStart,
        lineEnd,
        lineTop,
        lineBottom,
        lineHeight,
      } = this.getLineDrawCoords(),
      y,
      x = element.clientWidth - (offset.right || 0);
    if (last) {
      y =
        lineTop +
        lineHeight -
        lineHeight *
          (((last.value - draw.min) * 100) / (draw.max - draw.min) / 100);
      if (!y) y = lineHeight / 2 + lineTop;
      if (y > lineBottom) y = lineBottom;
      if (y < lineTop) y = lineTop;
    }
    return {
      x,
      y,
    };
  }
  drawIndicator() {
    let { x, y } = this.getIndicatorCoords(),
      { settings, canvas } = this,
      { indicator } = settings,
      { styles, animation, enable } = indicator,
      { context } = canvas;
    if (!enable) return;
    context.strokeStyle = 'transparent';
    context.save();
    if (!this.indicatorAnimatedState || this.indicatorAnimatedState >= 1)
      this.indicatorAnimatedState = 0;
    context.globalAlpha = 1 - this.indicatorAnimatedState;
    context.beginPath();
    context.arc(
      x,
      y,
      styles.width * this.indicatorAnimatedState * animation.scaleTo,
      0,
      2 * Math.PI
    );
    context.fillStyle = styles.color;
    context.fill();
    context.stroke();
    this.indicatorAnimatedState += 1 / 60 / (animation.time / 1000);
    context.restore();

    context.beginPath();
    context.arc(x, y, styles.width, 0, 2 * Math.PI);
    context.fillStyle = styles.color;
    context.fill();
    context.stroke();
  }
  drawBackground() {
    let { canvas, settings } = this,
      { view } = settings,
      { context, element } = canvas,
      { background } = view.styles,
      ratio = window.devicePixelRatio || 1;
    element.width = element.clientWidth * ratio;
    element.height = element.clientHeight * ratio;
    context.scale(ratio, ratio);
    context.fillStyle = background;
    context.fillRect(0, 0, element.width, element.height);
  }
  getLineDrawCoords() {
    let { canvas, settings } = this,
      { line, grid } = settings,
      { offset } = line,
      { element } = canvas,
      lineStart = element.clientWidth - offset.right,
      lineEnd = offset.left,
      lineView = lineStart - lineEnd,
      lineTop = offset.top + line.styles.width,
      lineBottom = element.clientHeight - offset.bottom - line.styles.width,
      lineHeight = lineBottom - lineTop;
    return {
      lineStart,
      lineEnd,
      lineView,
      lineTop,
      lineBottom,
      lineHeight,
    };
  }
  findPointByX(x) {
    let draw = this.getPoints('draw'),
      points = [...draw.points],
      currentPoint = false;
    for (let i = 0; i <= points.length - 1; i++) {
      let point = points[i],
        pointNext = points[i + 1],
        currentX = Math.round(point.x),
        nextX = pointNext ? Math.round(pointNext.x) : 0;
      if ((nextX || nextX === 0) && x >= currentX && x <= nextX) {
        currentPoint = (nextX + currentX) / 2 <= x ? pointNext : point;
      }
    }
    return currentPoint;
  }
  drawTime() {
    let {
        lineStart,
        lineEnd,
        lineView,
        lineTop,
        lineBottom,
        lineHeight,
      } = this.getLineDrawCoords(),
      { canvas, settings } = this,
      { timeLine, timeStamp, offset, timeFormat } = settings,
      { enable, count, styles } = timeLine,
      { element, context } = canvas;
    if (!enable) return;
    let start = lineEnd,
      end = lineStart,
      width = (end - start) / count;
    width += width / (count - 1);
    for (let i = 0; i < count; i++) {
      let x = start + width * i,
        point = this.findPointByX(x);
      context.font = '100 12px arial';
      context.fillStyle = styles.color;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(
        generateDate(
          point && point.time ? point.time : timeStamp,
          timeFormat.line
        ),
        x ? x : 0,
        element.clientHeight - offset.bottom / 2
      );
    }
  }
  drawValues() {
    let { max, min } = this.getPoints('draw'),
      {
        lineStart,
        lineEnd,
        lineView,
        lineTop,
        lineBottom,
        lineHeight,
      } = this.getLineDrawCoords(),
      { canvas, settings } = this,
      { valuesLine, line, offset, view } = settings,
      { count, enable, digits, styles, overflowValues, position } = valuesLine,
      { element, context } = canvas,
      valuesArray = [];
    if (!enable) return;
    let yStep = lineHeight / (count - 1),
      yStart = lineTop + yStep,
      yMiddle =
        (element.clientHeight + line.offset.top - line.offset.bottom) / 2;
    if (min === max) {
      valuesArray.push({
        text: max,
        y: yMiddle,
      });
      let topCount = (yMiddle - line.offset.top) / yStep,
        bottomCount = (yMiddle - line.offset.top) / yStep;
      for (let i = 1; i <= topCount; i++) {
        valuesArray.push({
          text: max + max * i,
          y: yMiddle - yStep * i,
        });
      }
      for (let i = 1; i <= bottomCount; i++) {
        valuesArray.push({
          text: max - max * i,
          y: yMiddle + yStep * i,
        });
      }
    } else {
      valuesArray.push({
        text: max,
        y: lineTop,
      });
      let valueStep = (max - min) / (count - 1);
      for (let i = 1; i <= count - 2; i++) {
        valuesArray.push({
          text: max - valueStep * i,
          y: yStart,
        });
        yStart += yStep;
      }
      valuesArray.push({
        text: min,
        y: lineBottom,
      });
    }
    if (
      overflowValues &&
      (line.offset.top > offset.top || line.offset.bottom < offset.bottom)
    ) {
      let valueStep = (max - min) / (count - 1),
        topValue = Math.max.apply(
          null,
          valuesArray.map((val) => val.text)
        ),
        topY = Math.min.apply(
          null,
          valuesArray.map((val) => val.y)
        ),
        bottomValue = Math.min.apply(
          null,
          valuesArray.map((val) => val.text)
        ),
        bottomY = Math.max.apply(
          null,
          valuesArray.map((val) => val.y)
        ),
        topCount = Math.round((line.offset.top - offset.top) / yStep),
        bottomCount = Math.round((line.offset.bottom - offset.bottom) / yStep);
      if (max === min) {
        valueStep = max;
      }
      for (let i = 1; i <= topCount; i++) {
        valuesArray.push({
          text: topValue + valueStep * i,
          y: topY - yStep * i,
        });
      }
      for (let i = 1; i <= bottomCount; i++) {
        valuesArray.push({
          text: bottomValue - valueStep * i,
          y: bottomY + yStep * i,
        });
      }
    }
    for (let i = 0; i <= valuesArray.length - 1; i++) {
      let value = valuesArray[i];
      context.font = '100 12px arial';
      context.fillStyle = styles.color;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(
        value.text.toFixed(digits),
        position === 'left'
          ? offset.left / 2
          : element.clientWidth - offset.right / 2,
        value.y
      );
    }
    if (overflowValues) {
      context.fillStyle = view.styles.background;
      context.strokeStyle = 'transparent';
      context.beginPath();
      context.rect(0, 0, element.clientWidth, offset.top - 5);
      context.fill();
      context.stroke();
      context.fillStyle = view.styles.background;
      context.strokeStyle = 'transparent';
      context.beginPath();
      context.rect(
        0,
        element.clientHeight - offset.bottom + 5,
        element.clientWidth,
        element.clientHeight
      );
      context.fill();
      context.stroke();
    }
  }
  drawLine() {
    let { canvas, settings } = this,
      { line, grid, offset, view } = settings,
      { backgroundGradient, lineGradient, color, width } = line.styles,
      { context, element } = canvas,
      { lineStart, lineEnd, lineTop, lineBottom } = this.getLineDrawCoords(),
      draw = this.getPoints('draw'),
      { points, min, max } = draw;
    context.beginPath();
    context.lineWidth = width;
    context.strokeStyle = color;
    context.lineJoin = 'round';
    if (lineGradient.enable) {
      let fill = context.createLinearGradient(lineEnd, 0, lineStart, 0),
        gradientPoints = lineGradient.points || [];
      if (gradientPoints.length === 1) gradientPoints.push(gradientPoints[0]);
      gradientPoints.forEach((gradientPoint, index) => {
        let { stop, color } = gradientPoint;
        if (!stop && stop !== 0)
          stop = (1 / (gradientPoints.length - 1)) * index;
        fill.addColorStop(stop, color);
      });
      context.strokeStyle = fill;
    }
    for (let i = points.length - 1; i >= 0; i--) {
      let point = points[i];
      context.lineTo(point.x, point.y);
    }
    context.stroke();
    if (backgroundGradient.enable && points.length > 1) {
      context.beginPath();
      context.lineWidth = 0;
      context.strokeStyle = 'transparent';
      let fill = context.createLinearGradient(0, lineTop, 0, lineBottom),
        gradientPoints = backgroundGradient.points || [];
      if (gradientPoints.length === 1) gradientPoints.push(points[0]);
      gradientPoints.forEach((gradientPoint, index) => {
        let { stop, color } = gradientPoint;
        if (!stop && stop !== 0)
          stop = (1 / (gradientPoints.length - 1)) * index;
        fill.addColorStop(stop, color);
      });
      context.fillStyle = fill;
      context.lineTo(lineStart, lineBottom);
      for (let i = points.length - 1; i >= 0; i--) {
        let point = points[i];
        context.lineTo(point.x, point.y);
      }
      context.lineTo(lineEnd, lineBottom);
      context.fill();
      context.stroke();
    }
    if (grid.enable) {
      context.beginPath();
      context.lineJoin = 'miter';
      context.lineWidth = width;
      context.strokeStyle = view.styles.background;
      context.lineTo(0 + offset.left - width / 2, 0 + offset.top - width / 2);
      context.lineTo(
        0 + offset.left - width / 2,
        element.clientHeight - offset.bottom + width / 2
      );
      context.lineTo(
        element.clientWidth - offset.right + width / 2,
        element.clientHeight - offset.bottom + width / 2
      );
      context.lineTo(
        element.clientWidth - offset.right + width / 2,
        0 + offset.top - width / 2
      );
      context.closePath();
      context.stroke();
      context.beginPath();
      context.lineJoin = 'miter';
      context.lineWidth = grid.styles.width;
      context.strokeStyle = grid.styles.color;
      context.lineTo(0 + offset.left, 0 + offset.top);
      context.lineTo(0 + offset.left, element.clientHeight - offset.bottom);
      context.lineTo(
        element.clientWidth - offset.right,
        element.clientHeight - offset.bottom
      );
      context.lineTo(element.clientWidth - offset.right, 0 + offset.top);
      context.closePath();
      context.stroke();
    }
  }
  drawTarget() {
    let { canvas, settings, actions } = this,
      { target, offset, valuesLine, timeStamp, timeFormat } = settings,
      { styles, coords } = target,
      { x, y } = coords,
      { element, context } = canvas;
    if (!target.enable || !x || !y) return;
    let currentPoint = this.findPointByX(x),
      maxPointWidth = 0;
    if (!currentPoint) return;
    if (actions.mouseOverPoint) actions.mouseOverPoint(currentPoint);
    //draw point
    styles.points.forEach((point) => {
      context.beginPath();
      context.strokeStyle = point.strokeColor;
      context.lineWidth = point.strokeWidth;
      context.fillStyle = point.background;
      context.arc(currentPoint.x, currentPoint.y, point.width, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
      if (point.width && point.width > maxPointWidth)
        maxPointWidth = point.width;
    });

    context.lineWidth = styles.line.width;
    context.strokeStyle = styles.line.color;

    let horizontalEnable =
        !styles.line.horizontal || styles.line.horizontal.enable,
      verticalEnable = !styles.line.vertical || styles.line.vertical.enable;

    if (horizontalEnable) {
      context.beginPath();
      context.moveTo(0 + offset.left, currentPoint.y);
      context.lineTo(currentPoint.x - maxPointWidth, currentPoint.y);
      context.stroke();
      context.beginPath();
      context.moveTo(currentPoint.x + maxPointWidth, currentPoint.y);
      context.lineTo(element.clientWidth - offset.right, currentPoint.y);
      context.stroke();
    }

    if (verticalEnable) {
      context.beginPath();
      context.moveTo(currentPoint.x, 0 + offset.top);
      context.lineTo(currentPoint.x, currentPoint.y - maxPointWidth);
      context.stroke();
      context.beginPath();
      context.moveTo(currentPoint.x, currentPoint.y + maxPointWidth);
      context.lineTo(currentPoint.x, element.clientHeight - offset.bottom);
      context.stroke();
    }

    //draw panels
    let panels = {};
    if (horizontalEnable) {
      panels.right = {
        background: styles.panel.background,
        color: styles.panel.color,
        width: valuesLine.position === 'left' ? offset.left : offset.right,
        height: 20,
        x:
          valuesLine.position === 'left'
            ? 0
            : element.clientWidth - offset.right,
        y: currentPoint.y - 20 / 2,
        text: currentPoint.value.toFixed(valuesLine.digits || 2),
      };
    }
    if (verticalEnable) {
      let date = generateDate(
          currentPoint && currentPoint.time ? currentPoint.time : timeStamp,
          timeFormat.current
        ),
        width = date.length * 6 + 20,
        x = currentPoint.x - width / 2;
      if (x < 0) {
        x = 0;
      }
      if (x + width > element.clientWidth) {
        x = element.clientWidth - width;
      }
      panels.bottom = {
        background: styles.panel.background,
        color: styles.panel.color,
        width,
        height: offset.bottom,
        x,
        y: element.clientHeight - offset.bottom,
        text: date,
      };
    }

    Object.values(panels).forEach((panel) => {
      context.strokeStyle = context.fillStyle = panel.background;
      context.beginPath();
      context.rect(panel.x, panel.y, panel.width, panel.height);
      context.fill();
      context.stroke();
      context.font = '100 12px arial';
      context.fillStyle = panel.color;
      context.textAlign = panel.textAlign;
      context.textBaseline = 'middle';
      context.fillText(
        panel.text,
        panel.x + panel.width / 2,
        panel.y + panel.height / 2
      );
    });
  }
  drawGrid() {
    let { canvas, settings } = this,
      { grid, offset } = settings,
      { element, context } = canvas,
      { enable, steps, styles, type } = grid;
    if (!enable) return;
    let left = 0 + offset.left,
      right = element.clientWidth - offset.right - offset.left,
      top = 0 + offset.top,
      bottom = element.clientHeight - offset.bottom - offset.top;
    context.lineWidth = styles.width;
    context.strokeStyle = styles.color;
    context.fillStyle = styles.background;
    context.rect(left, top, right, bottom);
    context.fill();

    let xArray = [],
      yArray = [],
      isPx = type === 'px',
      xStep = (element.clientWidth - offset.right - offset.left) / steps.x,
      xStart = 0 + offset.left,
      yStep = (element.clientHeight - offset.top - offset.bottom) / steps.y,
      yStart = 0 + offset.top;
    if (isPx) {
      for (let i = 1; i < xStep; i++) {
        let x = xStart + i * steps.x;
        xArray.push(x);
      }
      for (let i = 1; i < yStep; i++) {
        let y = yStart + i * steps.y;
        yArray.push(y);
      }
    } else {
      for (let i = 1; i < steps.x; i++) {
        let x = xStart + i * xStep;
        xArray.push(x);
      }
      for (let i = 1; i < steps.y; i++) {
        let y = yStart + i * yStep;
        yArray.push(y);
      }
    }
    for (let i = 0; i <= xArray.length - 1; i++) {
      context.beginPath();
      context.lineTo(xArray[i], 0 + offset.top);
      context.lineTo(xArray[i], element.clientHeight - offset.bottom);
      context.stroke();
    }
    for (let i = 0; i <= yArray.length - 1; i++) {
      context.beginPath();
      context.lineTo(0 + offset.left, yArray[i]);
      context.lineTo(element.clientWidth - offset.right, yArray[i]);
      context.stroke();
    }
  }
  setPointsLimit(limit, resize = true) {
    let { settings } = this,
      { data } = settings,
      { points } = this.getPoints('all');
    if (!limit) limit = data.limit.value;
    data.limit.value = (() => {
      if (data.limit.min && limit < data.limit.min) {
        return data.limit.min;
      } else if (data.limit.max && limit > data.limit.max) {
        return data.limit.max;
      } else if (resize && points.length < limit) {
        return points.length;
      } else if (limit <= 2) {
        return 2;
      } else {
        return limit;
      }
    })();
  }
  listeners() {
    let { canvas, settings, actions } = this,
      { target } = settings,
      { element } = canvas,
      pushed = false,
      x = 0,
      y = 0,
      targetClear = () => {
        target.coords = {
          x: false,
          y: false,
        };
      },
      stopFunc = (e) => {
        pushed = false;
        x = 0;
        y = 0;
        delete this.prevPinchDistance;
      },
      isTouch = 'ontouchstart' in document.documentElement;

    document.addEventListener('gesturestart', function (e) {
      e.preventDefault();
    });

    window.addEventListener('resize', (e) => {
      let { settings } = this,
        { line, offset, valuesLine } = settings,
        elementOffset = element.getBoundingClientRect(),
        maxTop =
          (elementOffset.height + offset.top - offset.bottom) / 2 -
          (valuesLine.resize.topMin || 0),
        maxBottom =
          (elementOffset.height + offset.bottom - offset.top) / 2 -
          (valuesLine.resize.bottomMin || 0);
      if (line.offset.top > maxTop) {
        line.offset.top = maxTop;
      }
      if (line.offset.top < offset.top) {
        line.offset.top = offset.top;
      }
      if (line.offset.bottom > maxBottom) {
        line.offset.bottom = maxBottom;
      }
      if (line.offset.bottom < offset.bottom) {
        line.offset.bottom = offset.bottom;
      }
      this.resize();
    });

    // desktop
    if (!isTouch) {
      element.addEventListener('mouseup', () => {
        stopFunc();
      });
      element.addEventListener('mouseleave', () => {
        stopFunc();
        targetClear();
      });
      element.addEventListener('mousedown', (e) => {
        x = e.clientX;
        y = e.clientY;
        pushed = {
          x,
          y,
        };
      });
      element.addEventListener('mousewheel', (e) => {
        let up = e.deltaY,
          { data, timeLine } = settings,
          { mousewheel } = timeLine,
          nextLimit = data.limit.value + up;
        if (!mousewheel.enable) return false;
        if (mousewheel && mousewheel.speed) {
          nextLimit =
            data.limit.value +
            (up > 0 ? mousewheel.speed : mousewheel.speed * -1);
        }
        this.setPointsLimit(nextLimit);
      });
      element.addEventListener('mousemove', (e) => {
        let { settings } = this,
          { valuesLine, timeLine, data, line, offset } = settings,
          { points } = this.getPoints('all'),
          elementOffset = element.getBoundingClientRect();
        targetClear();
        element.style.cursor = 'default';
        //target point
        if (
          e.clientX >= elementOffset.left + offset.left + 1 &&
          e.clientX <=
            elementOffset.left + elementOffset.width - offset.right &&
          e.clientY >= elementOffset.top + offset.top &&
          e.clientY <= elementOffset.bottom - offset.bottom
        ) {
          if (target.enable) {
            element.style.cursor = 'crosshair';
          }
          target.coords = {
            x: e.clientX - elementOffset.left,
            y: e.clientY - elementOffset.top,
          };
        }

        //line view
        if (
          e.clientX >= elementOffset.left + line.offset.left &&
          e.clientX <=
            elementOffset.left + elementOffset.width - line.offset.right &&
          e.clientY >= elementOffset.top + offset.top &&
          e.clientY <= elementOffset.bottom - offset.bottom
        ) {
          if (pushed) {
            let nextOffset = data.offset + e.clientX - x;
            if (nextOffset < 0) nextOffset = 0;
            if (nextOffset > points.length - data.limit.value)
              nextOffset = points.length - data.limit.value;
            data.offset = nextOffset;
          }
          if (actions.mouseEnterLine && !this.enterLineBool) {
            this.leaveLineBool = false;
            this.enterLineBool = true;
            actions.mouseEnterLine();
          }
        } else {
          if (actions.mouseLeaveLine && !this.leaveLineBool) {
            this.enterLineBool = false;
            this.leaveLineBool = true;
            actions.mouseLeaveLine();
          }
        }

        //values panel
        if (
          valuesLine.enable &&
          valuesLine.resize.enable &&
          (valuesLine.position === 'left'
            ? e.clientX < offset.left
            : e.clientX >=
              elementOffset.left + elementOffset.width - offset.right)
        ) {
          element.style.cursor = 'row-resize';
          if (pushed) {
            let nextTop = y - e.clientY,
              nextBottom = e.clientY - y,
              zoomIn = e.clientY > y,
              zoomOut = e.clientY < y;
            if (zoomIn) {
              let maxTop =
                  (elementOffset.height + offset.top - offset.bottom) / 2 -
                  (valuesLine.resize.topMin || 0),
                maxBottom =
                  (elementOffset.height + offset.bottom - offset.top) / 2 -
                  (valuesLine.resize.bottomMin || 0);
              line.offset.top = (() => {
                if (line.offset.top - nextTop < maxTop) {
                  return line.offset.top - nextTop;
                } else {
                  return maxTop;
                }
              })();
              line.offset.bottom = (() => {
                if (line.offset.bottom + nextBottom < maxBottom) {
                  return line.offset.bottom + nextBottom;
                } else {
                  return maxBottom;
                }
              })();
            }
            if (zoomOut) {
              line.offset.top = (() => {
                if (line.offset.top - nextTop > offset.top) {
                  return line.offset.top - nextTop;
                } else {
                  return offset.top;
                }
              })();
              line.offset.bottom = (() => {
                if (line.offset.bottom + nextBottom > offset.bottom) {
                  return line.offset.bottom + nextBottom;
                } else {
                  return offset.bottom;
                }
              })();
            }
          }
          if (line.offset.top < offset.top) {
            line.offset.top = offset.top;
          }
          if (line.offset.bottom < offset.bottom) {
            line.offset.bottom = offset.bottom;
          }
        }

        // time panel
        if (
          timeLine.enable &&
          timeLine.resize &&
          e.clientX >= elementOffset.left + line.offset.left &&
          e.clientX <=
            elementOffset.left + elementOffset.width - line.offset.right &&
          e.clientY >= elementOffset.bottom - offset.bottom
        ) {
          element.style.cursor = 'col-resize';
          if (pushed) {
            let nextLimit = data.limit.value + e.clientX - x;
            this.setPointsLimit(nextLimit);
          }
        }
        if (pushed) {
          x = e.clientX;
          y = e.clientY;
        }
      });
    }
    //mobile
    else {
      element.addEventListener('touchend', () => {
        stopFunc();
        targetClear();
      });
      element.addEventListener('touchstart', (e) => {
        let touches = e.touches,
          elementOffset = element.getBoundingClientRect(),
          touch = touches[0];
        if (touches.length === 1) {
          target.coords = {
            x: touch.clientX - elementOffset.left,
            y: touch.clientY - elementOffset.top,
          };
        }
        x = touch.clientX;
        y = touch.clientY;
        pushed = {
          x,
          y,
        };
      });
      element.addEventListener('touchmove', (e) => {
        let { settings } = this,
          { valuesLine, timeLine, data, line, offset } = settings,
          { points } = this.getPoints('all'),
          elementOffset = element.getBoundingClientRect(),
          touches = e.touches,
          touch = touches[0];
        targetClear();
        if (touches.length === 1) {
          //target point
          if (
            touch.clientX >= elementOffset.left + offset.left + 1 &&
            touch.clientX <=
              elementOffset.left + elementOffset.width - offset.right &&
            touch.clientY >= elementOffset.top + offset.top &&
            touch.clientY <= elementOffset.bottom - offset.bottom
          ) {
            target.coords = {
              x: touch.clientX - elementOffset.left,
              y: touch.clientY - elementOffset.top,
            };
          }
          //line view
          if (
            touch.clientX >= elementOffset.left + line.offset.left &&
            touch.clientX <=
              elementOffset.left + elementOffset.width - line.offset.right &&
            touch.clientY >= elementOffset.top + offset.top &&
            touch.clientY <= elementOffset.bottom - offset.bottom
          ) {
            if (pushed) {
              let nextOffset = data.offset + touch.clientX - x;
              if (nextOffset < 0) nextOffset = 0;
              if (nextOffset > points.length - data.limit.value)
                nextOffset = points.length - data.limit.value;
              data.offset = nextOffset;
            }
          }
        }
        if (touches.length === 2) {
          let first = touches[0],
            second = touches[1],
            pinchDistance = Math.hypot(
              first.clientX - second.clientX,
              first.clientY - second.clientY
            );
          if (!this.prevPinchDistance) {
            this.prevPinchDistance = pinchDistance;
            return;
          }
          let pinchDiff = this.prevPinchDistance - pinchDistance;
          this.prevPinchDistance = pinchDistance;
          let nextLimit = data.limit.value + pinchDiff;
          this.setPointsLimit(nextLimit);
        }
        if (pushed) {
          x = touch.clientX;
          y = touch.clientY;
        }
      });
    }
  }
}
