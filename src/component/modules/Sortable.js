import React from 'react';
import './Sortable.css';

function Item({ children, index, onMove, listLength }) {
  const [top, setTop] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [zIndex, setZIndex] = React.useState(0);

  const ref = React.useRef();
  const indexRef = React.useRef(index);
  const onMoveRef = React.useRef(onMove);
  const listLengthRef = React.useRef(listLength);
  const prevRectRef = React.useRef(null);
  const animationRef = React.useRef(null);

  React.useEffect(() => {
    // 始终保持最新状态 Ref 引用
    indexRef.current = index;
    onMoveRef.current = onMove;
    listLengthRef.current = listLength;
  }, [index, onMove, listLength]);

  React.useEffect(() => {
    const el = ref.current;

    // 存储起始鼠标位置
    let startY = 0;

    let delayedSetZIndexTimeoutId;

    const mouseMove = (ev) => {
      ev.preventDefault();

      // 获取元素 Rect 并更新 Ref
      const rect = el.getBoundingClientRect();
      prevRectRef.current = rect;

      // 计算最新 Top 位置
      let latestTop = ev.clientY - startY;

      // 检查是否需要更新元素位置
      if (
        latestTop > rect.height &&
        indexRef.current < listLengthRef.current - 1
      ) {
        // move down
        // 通知父组件修改列表
        onMoveRef.current(indexRef.current, indexRef.current + 1);
        // 因为 DOM 位置被改变了，需要同步计算最新位置
        // 可以理解为计算出来的值就是元素发生交换后，松开鼠标再按住鼠标时相关变量的值。
        // 可以试着注释掉这行看看会发生什么，就能理解了（会闪一下）
        latestTop -= rect.height;
        // 开始位置也要更新
        startY += rect.height;
      } else if (latestTop < -rect.height && indexRef.current > 0) {
        // move up
        onMoveRef.current(indexRef.current, indexRef.current - 1);
        latestTop += rect.height;
        startY -= rect.height;
      }
      setTop(latestTop);
    };

    const mouseUp = (ev) => {
      ev.preventDefault();
      document.removeEventListener('mousemove', mouseMove);
      // 重置 Top
      setTop(0);
      // 结束拖拽
      setIsDragging(false);
      delayedSetZIndexTimeoutId = setTimeout(() => {
        // 延迟设置 zIndex，不然一结束拖拽该元素就会被盖到其他元素下面
        setZIndex(0);
      }, 200);
    };

    const mouseDown = (ev) => {
      ev.preventDefault();
      clearTimeout(delayedSetZIndexTimeoutId);
      // 注册事件
      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp, { once: true });
      // 开始拖拽
      setIsDragging(true);
      setZIndex(999);
      // 记录开始位置
      startY = ev.clientY;
    };
    el.addEventListener('mousedown', mouseDown);
  }, []);

  React.useLayoutEffect(() => {
    // FLIP animation
    // https://aerotwist.com/blog/flip-your-animations/
    const el = ref.current;
    if (isDragging) {
      // 拖拽中的元素不计算
      return;
    }

    if (prevRectRef.current === null) {
      // 元素第一次渲染
      prevRectRef.current = el.getBoundingClientRect();
      return;
    }

    // 如果有动画正在运行则取消，防止拖动速度过快有鬼畜效果
    if (animationRef.current) {
      const animation = animationRef.current;
      if (animation.playState === 'running') {
        // Cancel previous animation
        animation.cancel();
      }
    }

    // FLIP: First
    const prevRect = prevRectRef.current;

    // FLIP: Last
    const latestRect = el.getBoundingClientRect();
    const deltaY = latestRect.y - prevRect.y;

    prevRectRef.current = latestRect;

    if (deltaY === 0) {
      return;
    }

    // FLIP: Invert and Play
    animationRef.current = el.animate(
      [
        {
          top: `${-deltaY}px`,
        },
        {
          top: `0px`,
        },
      ],
      200,
    );
  }, [index, isDragging]);

  return (
    <div
      className="sortable-component"
      ref={ref}
      style={{
        padding: '10px',
        background: 'white',
        transform: isDragging ? `scale(1.01)` : `scale(1)`,
        top: `${top}px`,
        transition: 'transform .2s, box-shadow .2s',
        position: 'relative',
        width: '90%',
        boxShadow: isDragging
          ? '0 0 10px 2px rgba(0, 0, 0, 0.5)'
          : '0 0 0 0px rgba(0, 0, 0, 0.5)',
        zIndex: zIndex.toString(),
      }}
    >
      {children}
    </div>
  );
}

export default function Sortable({ list, setList }) {
  return (
    <div className="sortable-area">
      {list.map((child, i) => (
        <Item
          key={child.key}
          index={i}
          listLength={list.length}
          onMove={(prevIndex, nextIndex) => {
            // 更新列表
            const newList = [...list];
            newList.splice(nextIndex, 0, newList.splice(prevIndex, 1)[0]);
            setList(newList);
          }}
        >
          {child.children}
        </Item>
      ))}
    </div>
  );
}
