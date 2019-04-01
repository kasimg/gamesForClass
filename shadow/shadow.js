$(document).ready(() => {
  /*
   *  给按钮dom添加坐标属性,并绑定点击事件
   */
  const squares = $('.cell');

  const color = ['clickable1', 'clickable2'];
  let toggleFlag = 0;
  
  const squareArr = [];
  for (let i = 0; i < 64; i++) {
    squareArr.push(squares[i]);
  }

  //  先绑定点击事件
  squares.bind('click', (e) => {
    toggleFlag++;
    resetBackground();
    updateMoveableAera(e.target);
  });

  /*
   *  重置所有方格的背景
   */
   function resetBackground() {
    squares.removeClass('clickable1 clickable2 point');
   }

  /*
   *  判定当前可以移动的区域
   *  @pos:点击按钮的序号（0-63）
   */
  function updateMoveableAera(dom) {
    squares.attr('disabled', 'disabled');
    $(dom).addClass('point').removeClass(color[toggleFlag % 2]);
    const pos = squareArr.indexOf(dom);

    //  确定可以点击的方格，改变它们的背景
    for (let i = pos + 1; i < Math.floor(pos / 8) * 8 + 8; i++) {
        $(squares[i]).removeClass(color[(toggleFlag + 1) % 2]).addClass(color[toggleFlag % 2]).attr('disabled', null);
    }    

    for (let i = pos % 8; i < Math.floor(pos / 8) * 8; i += 8) {
      if (i !== pos) {
        $(squares[i]).removeClass(color[(toggleFlag + 1) % 2]).addClass(color[toggleFlag % 2]).attr('disabled', null);
      }
    }

    $(dom).attr('disabled', 'disabled');
  }

  // 初始化
  updateMoveableAera(squares[56]);

  //  设定胜利条件
  $('#shadow').bind('click', () => {
    alert('你赢了！！');
    resetBackground();
    updateMoveableAera(squares[56]);
  })
});