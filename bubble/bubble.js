$(document).ready(() => {
  //  获取所有方格
  const squares = $('.cell');
  const domArr = createDomArr();

  //  存放第一次点击的dom
  let dom1 = null;

  //  记录点击的次数，点击两次后清零
  let count = 0;

  // 给方格添加点击事件
  squares.bind('click', (e) => {
    resetColor();
    count++;
    //  如果count%2===1表示是第一次点击，否则是第二次
    if (count % 2 === 1) {
      dom1 = $(e.target); //  保存第一次点击的dom
      //  确定可以点击的方格，并改变它们的颜色
      updateClickableSquares(e.target);
    } else {
      //  如果是第二次点击，那么需要交换这两个dom中的数字
      const temp = $(e.target).html();
      $(e.target).html(dom1.html());
      dom1.html(temp);
      //  重置所有
      resetColor();
      //  显示提示信息
      $('#counter').html('一共交换了：' + count / 2 + '次');
    }
  });

  /*
   * 将dom列表转化成数组
   */
  function createDomArr() {
    const domArr = [];
    for (let i = 0; i < 8; i++) {
      domArr.push(squares[i]);
    }

    return domArr;
  }

  /*
   * 清空所有颜色
   */
  function resetColor() {
    squares.removeClass('clicked clickable').attr('disabled', null);
  }

  /*
   * 点击一个方格后，确认第二次可以点击的方格，并改变它们的颜色
   */
  function updateClickableSquares(dom) {
    //  判断dom索引前后的索引是否越界，把没越界的dom颜色改变，作为第二次可以点击的方块
    const index = domArr.indexOf(dom);
    for (let i = 0; i < 8; i++) {
      if (i === index - 1 || i === index + 1) {
        $(squares[i]).addClass('clickable').attr('disabled', null);
      } else {
        $(squares[i]).attr('disabled', 'disabled');
      }
    }
    // 改变第一次点击的方格的颜色
    $(dom).addClass('clicked');
  }
});