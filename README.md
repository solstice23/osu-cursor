# osu-cursor

osu!lazer 样式的前端自定义光标

## Demo

[Demo](https://solstice23.github.io/osu-cursor/demo/)

![screenrecord](demo/preview.gif)

## 开始

### 引入

```html
<script src="/dist/main.js"></script>
```

所有资源文件已打包于 JS 中，只需要引入 JS。

### 初始化

```js
var cursor = new osuCursor();
```

## 函数及参数

### `osuCursor(options)`

| 参数名 | 类型 | 默认值 | 备注               |
|:------:|:----:|:------:|--------------------|
| rotate | bool |  true  | 拖动时光标是否旋转 |

### `osuCursor.stop()`

停止显示自定义光标。

### `osuCursor.init()`

初始化（重新显示）自定义光标。

## 版权

光标图片来自 [ppy/osu-resources](https://github.com/ppy/osu-resources)。