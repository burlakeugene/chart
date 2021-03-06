import { deepMerge, deepClone, isFunction, colorChangeTone } from '../common';
import commonDefaultSettings from './commonDefaultSettings';
export default class Chart {
  constructor(props) {
    let {
      canvas = false,
      data = {},
      defaultSettings = {},
      settings = {},
      actions = {},
      type,
    } = props;
    this.type = type;
    this.actions = actions;
    this.canvas = {
      element: canvas,
      context: canvas.getContext('2d'),
      isCanvas:
        (canvas instanceof Element || canvas instanceof HTMLDocument) &&
        canvas.tagName.toLowerCase() === 'canvas',
    };
    this.cursor = { x: 0, y: 0 };
    this.settings = deepMerge(
      deepClone(commonDefaultSettings),
      deepClone(defaultSettings)
    );
    this.timeStamp = +new Date();
    this.setSettings(settings);
    this.state = {
      loading: this.settings.animated ? 0 : 1,
    };
    this.data = this.prepareData(data);
    this.commonInit();
  }
  prepareData(data) {
    return data;
  }
  setSettings(newSettings = {}) {
    deepMerge(this.settings, newSettings);
    this.render({
      from: 'setSettings',
    });
  }
  getSettings() {
    return this.settings;
  }
  setData(data) {
    this.data = this.prepareData(data);
    this.render({
      from: 'setData',
    });
  }
  getData() {
    return this.data;
  }
  setRatio() {
    let { canvas } = this,
      { context, element } = canvas,
      ratio = window.devicePixelRatio || 1;
    element.width = element.clientWidth * ratio;
    element.height = element.clientHeight * ratio;
    context.scale(ratio, ratio);
  }
  clearCanvas() {
    let { canvas } = this,
      { context, element } = canvas;
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  loading() {
    if (this.state.loading >= 1) return;
    setTimeout(() => {
      this.state.loading += 60 / 2000;
      this.state.loading = this.state.loading > 1 ? 1 : this.state.loading;
      this.render({
        from: 'loading',
      });
      this.loading();
    }, 1000 / 60);
  }
  commonInit() {
    this.render({
      from: 'commonInit',
    });
    this.loading();
    this.commonListeners();
  }
  commonListeners() {
    let { canvas } = this,
      { context, element } = canvas;
    window.addEventListener('resize', () => {
      this.render({
        from: 'resize',
      });
    });
    element.addEventListener('mousemove', (e) => {
      let { settings } = this,
        elementOffset = element.getBoundingClientRect(),
        x = e.clientX - elementOffset.left,
        y = e.clientY - elementOffset.top;
      this.cursor = {
        x,
        y,
      };
      this.render({
        from: 'mousemove',
      });
    });
    element.addEventListener('mouseout', (e) => {
      this.cursor = {
        x: 0,
        y: 0,
      };
      this.render({
        from: 'mouseout',
      });
    });
  }
  drawTooltip({ title = '', panels = [], x, y, render } = {}) {
    let { canvas, settings, data = [], cursor } = this,
      { element, context } = canvas,
      { tooltip } = settings,
      { styles } = tooltip;
    if (!x) x = cursor.x;
    if (!y) y = cursor.y;
    if (tooltip && tooltip.enable) {
      context.font = '100 ' + styles.fontSize + 'px arial';
      context.textAlign = 'left';
      context.textBaseline = 'middle';
      let { width, height } = (() => {
          let width = 0,
            height = 0;
          if (title && title.text) {
            title.width =
              context.measureText(title.text).width +
              styles.padding.left +
              styles.padding.right +
              styles.borderWidth;
            title.height =
              styles.padding.top * 2 +
              styles.fontSize * 1.286 +
              styles.borderWidth / 2;
            title.x = styles.padding.left + styles.borderWidth / 2;
            title.y = title.height / 2 + styles.borderWidth / 2;
          } else {
            title = {
              width: 0,
              height: 0,
            };
          }
          if (panels.length) {
            panels.forEach((panel, index) => {
              panel.width = 0;
              panel.height = 0;
              panel.x = (() => {
                let prevWidth = 0;
                for (let i = index - 1; i >= 0; i--) {
                  prevWidth += panels[i].width;
                }
                return prevWidth;
              })();
              panel.y = title.height;
              if (panel.colorPanel && panel.colorPanel.color) {
                panel.colorPanel.height = 3;
                panel.colorPanel.x = styles.borderWidth / 2;
                panel.colorPanel.y = 0;
                panel.height += panel.colorPanel.height;
              }
              if (panel.texts) {
                panel.texts.forEach((text, index) => {
                  if (text.text) {
                    let currentWidth =
                      context.measureText(text.text).width + styles.borderWidth;
                    if (panel.width < currentWidth) panel.width = currentWidth;
                    text.height = styles.fontSize * 1.286;
                    text.x = styles.padding.left + styles.borderWidth / 2;
                    text.y = panel.height + text.height / 2;
                    if (!index) {
                      text.height += styles.padding.top;
                      text.y += styles.padding.top;
                    }
                    if (index === panel.texts.length - 1) {
                      text.height += styles.padding.bottom;
                    }
                    panel.height += text.height;
                  }
                });
              }
              if (panel.footer && panel.footer.text) {
                let currentWidth =
                  context.measureText(panel.footer.text).width +
                  styles.borderWidth;
                if (panel.width < currentWidth) panel.width = currentWidth;
                panel.footer.height =
                  styles.padding.bottom + styles.fontSize * 1.286;
                panel.footer.x = styles.padding.left + styles.borderWidth / 2;
                panel.footer.y =
                  panel.height +
                  panel.footer.height / 2 -
                  styles.padding.bottom / 2;
                panel.height += panel.footer.height + styles.borderWidth / 2;
              }
              panel.width += styles.padding.left + styles.padding.right;
            });
          }
          let panelsWidth = panels.reduce((acc, panel) => acc + panel.width, 0);
          if (title.width > panelsWidth) {
            let panelWidth = title.width / panels.length,
              minCount = 0,
              oversizeWidth = 0;
            for (let i = 0; i <= panels.length - 1; i++) {
              if (panels[i].width >= panelWidth) {
                oversizeWidth += panels[i].width - panelWidth;
              } else {
                minCount++;
              }
            }
            for (let i = 0; i <= panels.length - 1; i++) {
              panels[i].width =
                panels[i].width < panelWidth
                  ? panelWidth - oversizeWidth / minCount
                  : panels[i].width;
              panels[i].x = (() => {
                let prevWidth = 0;
                for (let j = i - 1; j >= 0; j--) {
                  prevWidth += panels[j].width;
                }
                return prevWidth;
              })();
            }
          }
          height =
            title.height +
            (panels.length
              ? Math.max(...panels.map((panel) => panel.height))
              : 0);
          width = Math.max(title.width, panelsWidth);
          return {
            width,
            height,
          };
        })(),
        center = x,
        topOffset = 10,
        left = x - width / 2,
        invert = false,
        top = y - height - topOffset;
      if (top < styles.borderWidth) {
        invert = true;
        top = y + topOffset;
      }
      if (left + width > element.clientWidth - styles.borderWidth / 2) {
        left = element.clientWidth - width - styles.borderWidth / 2;
      }
      if (left < styles.borderWidth / 2) left = styles.borderWidth / 2;
      context.fillStyle = styles.background;
      context.strokeStyle =
        styles.borderWidth > 0 ? styles.borderColor : 'transparent';
      context.lineWidth = styles.borderWidth;
      context.beginPath();
      context.roundRect(left, top, width, height, styles.borderRadius);
      context.closePath();
      context.fill();
      context.stroke();
      if (invert) {
        context.beginPath();
        context.moveTo(center - 5, top);
        context.lineTo(center, top - 5);
        context.lineTo(center + 5, top);
        context.fill();
        context.stroke();
        context.beginPath();
        context.moveTo(
          center - 5 + styles.borderWidth / 4,
          top + styles.borderWidth / 2
        );
        context.lineTo(center, top - 5 + styles.borderWidth / 1.5);
        context.lineTo(
          center + 5 - styles.borderWidth / 4,
          top + styles.borderWidth / 2
        );
        context.fill();
      } else {
        context.beginPath();
        context.moveTo(center - 5, top + height);
        context.lineTo(center, top + height + 5);
        context.lineTo(center + 5, top + height);
        context.fill();
        context.stroke();
        context.beginPath();
        context.moveTo(
          center - 5 + styles.borderWidth / 4,
          top + height - styles.borderWidth / 2
        );
        context.lineTo(center, top + height + 5 - styles.borderWidth / 1.5);
        context.lineTo(
          center + 5 - styles.borderWidth / 4,
          top + height - styles.borderWidth / 2
        );
        context.fill();
      }

      context.fillStyle = styles.color;
      if (title && title.text) {
        context.fillText(title.text, left + title.x, top + title.y);
      }
      panels.forEach((panel) => {
        context.fillStyle = styles.color;
        if (panel.colorPanel && panel.colorPanel.color) {
          context.save();
          context.fillStyle = panel.colorPanel.color;
          context.beginPath();
          context.rect(
            left + panel.x + panel.colorPanel.x,
            top + panel.y + panel.colorPanel.y,
            panel.width - styles.borderWidth,
            panel.colorPanel.height
          );
          context.fill();
          context.restore();
        }
        if (panel.texts) {
          panel.texts.forEach((text, i) => {
            if (text.text) {
              context.fillText(
                text.text,
                left + panel.x + text.x,
                top + panel.y + text.y
              );
            }
          });
        }
        if (panel.footer && panel.footer.text) {
          context.fillStyle = colorChangeTone(styles.color, -50);
          context.fillText(
            panel.footer.text,
            left + panel.x + panel.footer.x,
            top + panel.y + panel.footer.y
          );
        }
      });
      if (render && isFunction(render)) {
        render({
          context,
          styles,
          box: {
            width,
            height,
            top: top,
            left: left,
            bottom: top + height,
            right: left + width,
          },
        });
      }
    }
  }
  drawBackground() {
    let { canvas, settings } = this,
      { view } = settings,
      { context, element } = canvas,
      { background } = view.styles;
    context.fillStyle = background;
    context.fillRect(0, 0, element.width, element.height);
  }
  hover({ item, isHovered }) {
    let { settings } = this,
      step = 1 / 20;
    if (isHovered && settings?.data?.hover?.enable) {
      if (!item.hasOwnProperty('state')) item.state = 0;
      let hoveredValue = settings?.data?.hover?.value || 0;
      if (settings.animated) {
        if (item.state < 1) {
          item.state += step;
          if (item.state > 1) item.state = 1;
          this.render({
            from: 'Animated increase state',
          });
        }
      } else {
        item.state = 1;
        this.render({
          from: 'Increase state',
        });
      }
    } else {
      if (settings.animated) {
        if (item.state > 0) {
          item.state -= step;
          if (item.state < 0) item.state = 0;
          this.render({
            from: 'Animated decrease state',
          });
        }
      } else {
        item.state = 0;
        this.render({
          from: 'Decrease state',
        });
      }
    }
  }
  baseRender() {
    this.setRatio();
    this.clearCanvas();
    this.drawBackground();
  }
}
