# osu-cursor
osu!lazer Style Custom Cursor for Web

# 开始

## 引入

引入 CSS 和 JS 文件

```html
<link rel='stylesheet' href='/dist/index.css' type='text/css'/>
<script src="/dist/index.js"></script>
```

## 初始化

```js
var cursor = new osuCursor();
```

# 函数及参数

## `osuCursor(options)`

| 参数名 | 类型 | 默认值 | 备注               |
|:------:|:----:|:------:|--------------------|
| rotate | bool |  true  | 拖动时光标是否旋转 |

## `osuCursor.stop()`

停止显示自定义光标

## `osuCursor.init()`

初始化（重新显示）自定义光标