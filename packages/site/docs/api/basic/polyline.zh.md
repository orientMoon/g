---
title: Polyline 折线
order: 7
---

可以参考 SVG 的 [\<polyline\>](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/polyline) 元素。

如下 [示例](/zh/examples/shape#polyline) 定义了一条折线，各个端点依次为：

```javascript
const polyline = new Polyline({
    style: {
        points: [
            [50, 50],
            [100, 50],
            [100, 100],
            [150, 100],
            [150, 150],
            [200, 150],
            [200, 200],
            [250, 200],
            [250, 250],
            [300, 250],
            [300, 300],
            [350, 300],
            [350, 350],
            [400, 350],
            [400, 400],
            [450, 400],
        ],
        stroke: '#1890FF',
        lineWidth: 2,
    },
});
```

对于折线，默认锚点定义的位置为包围盒左上角顶点，其中各个端点坐标均定义在局部坐标系下。因此如果此时获取上面折线在局部坐标系的坐标，会得到包围盒左上角的坐标，也恰巧是第一个顶点的坐标，即 `[50, 50]`：

```js
polyline.getLocalPosition(); // [50, 50]
```

# 继承自

继承了 [DisplayObject](/zh/docs/api/basic/display-object) 的 [样式属性](/zh/docs/api/basic/display-object#绘图属性)。

## anchor

默认值为 `[0, 0]`。详见 [DisplayObject anchor](/zh/docs/api/basic/display-object#anchor)

## transformOrigin

默认值为 `left top`。详见 [DisplayObject transformOrigin](/zh/docs/api/basic/display-object#transformOrigin)

## lineWidth

默认值为 `'1'`。详见 [DisplayObject lineWidth](/zh/docs/api/basic/display-object#lineWidth)

## miterLimit

默认值 `4`。详见 [DisplayObject miterLimit](/zh/docs/api/basic/display-object#miterLimit)

# 额外属性

## points

支持以下两种写法：

-   `[number, number][]` 点数组
-   `string` 点之间使用空格分隔，形如：`'100,10 250,150 200,110'`

因此以下两种写法等价：

```js
polyline.style.points = '100,10 250,150 200,110';
polyline.style.points = [
    [100, 10],
    [250, 150],
    [200, 110],
];
```

可以参考 SVG 的[同名属性](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/points)。

## markerStart

可以参考 [Line](/zh/docs/api/basic/line) 的 [markerStart](/zh/docs/api/basic/line#markerstart) 属性。

“起始点” 由 [points](/zh/docs/api/basic/polyline#points) 中的第一个点决定。

在该[示例](/zh/examples/shape#polyline)中，我们在折线的起始点上放置了一个箭头：

<img src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*jPJnTJ9VANYAAAAAAAAAAAAAARQnAQ" alt="polyline marker" width="120">

```js
const arrowMarker = new Path({
    style: {
        path: 'M 10,10 L -10,0 L 10,-10 Z',
        stroke: '#1890FF',
        anchor: '0.5 0.5',
        transformOrigin: 'center',
    },
});

polyline.style.markerStart = arrowMarker;
```

## markerEnd

可以参考 [Line](/zh/docs/api/basic/line) 的 [markerEnd](/zh/docs/api/basic/line#markerend) 属性。

“终止点” 由 [points](/zh/docs/api/basic/polyline#points) 中的最后一个点决定。

在该[示例](/zh/examples/shape#polyline)中，我们在折线的终止点上放置了一个图片：

<img src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*aXEMQIPzPVYAAAAAAAAAAAAAARQnAQ" alt="polyline marker" width="120">

```js
const imageMarker = new Image({
    style: {
        width: 50,
        height: 50,
        anchor: [0.5, 0.5],
        transformOrigin: 'center',
        transform: 'rotate(90deg)',
        img: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
    },
});

polyline.style.markerEnd = imageMarker;
```

## markerMid

可以参考 SVG 的[同名属性](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/marker-mid)。

在折线除了 “起始点” 和 “终止点” 之外的每一个顶点上放置标记图形。

例如下图中在折线上除首尾的每个顶点上都放置了一个 [Circle](/zh/docs/api/basic/circle)：

```js
const circleMarker = new Circle({
    style: {
        r: 10,
        stroke: '#1890FF',
    },
});

polyline.style.markerMid = circleMarker;
```

<img src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*Rsd9R7U4zdcAAAAAAAAAAAAAARQnAQ" alt="marker mid" width="200">

## markerStartOffset

可以参考 [Line](/zh/docs/api/basic/line) 的 [markerStartOffset](/zh/docs/api/basic/line#markerstartoffset) 属性。

沿折线的第一个线段方向移动标记图形。需要注意的是，如果偏移距离超过了原始线段的长度，会向反方向延伸：

<img src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*M8ibT6pBNjYAAAAAAAAAAAAAARQnAQ" alt="marker start offset" width="200">

| [初始值](/zh/docs/api/css/css-properties-values-api#initial-value) | 适用元素 | [是否可继承](/zh/docs/api/css/inheritance) | 是否支持动画 | [计算值](/zh/docs/api/css/css-properties-values-api#computed-value) |
| --- | --- | --- | --- | --- |
| '0' | - | 否 | 是 | [\<length\>](/zh/docs/api/css/css-properties-values-api#length) |

## markerEndOffset

可以参考 [Line](/zh/docs/api/basic/line) 的 [markerEndOffset](/zh/docs/api/basic/line#markerendoffset) 属性。

沿折线的最后一个线段方向移动标记图形。需要注意的是，如果偏移距离超过了原始线段的长度，会向反方向延伸。在该[示例](/zh/examples/shape#polyline)中，我们使用该属性移动标记图形：

<img src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*lUB7SYL6zK0AAAAAAAAAAAAAARQnAQ" alt="use offset on marker">

| [初始值](/zh/docs/api/css/css-properties-values-api#initial-value) | 适用元素 | [是否可继承](/zh/docs/api/css/inheritance) | 是否支持动画 | [计算值](/zh/docs/api/css/css-properties-values-api#computed-value) |
| --- | --- | --- | --- | --- |
| '0' | - | 否 | 是 | [\<length\>](/zh/docs/api/css/css-properties-values-api#length) |

# 方法

## getTotalLength(): number

获取折线长度。

https://developer.mozilla.org/zh-CN/docs/Web/API/SVGGeometryElement/getTotalLength

## getPoint(ratio: number): Point

根据长度比例（取值范围 `[0-1]`）获取点，其中 `Point` 的格式为:

```ts
export type Point = {
    x: number;
    y: number;
};
```

## getPointAtLength(distance: number): Point

沿路径返回给定距离的点。

https://developer.mozilla.org/en-US/docs/Web/API/SVGGeometryElement/getPointAtLength

```js
polyline.getPointAtLength(100); // Point {x: 300, y: 100}
```

## getStartTangent(): number[][]

获取起点的切向量，形如: `[[10, 10], [20, 20]]`

## getEndTangent(): number[][]

获取终点的切向量，形如: `[[10, 10], [20, 20]]`
