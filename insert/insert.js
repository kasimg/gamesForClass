$(document).ready(() => {
  /*
   * 给每个方格一个0-100的随机值
   */
  function initSquares() {
    const squares = $('.cell');
    for (let i = 0; i < 8; i++) {
      const num = Math.floor(Math.random() * 100);
      $(squares[i]).html(num);
    }

    return squares;
  }

  /*
   * 将第一格移到第二行
   */
  function insert() {
    $('#sorted').prepend($('<button class="cell" disabled="disabled">' + $(squares[0]).html() + '</button>'));
    $(squares[0]).addClass('hide');
    count--;
  }

  /*
   *  为节点绑定事件
   *  @node: 要绑定事件的节点
   */
  function bindEvent(node) {
    node.bind('click', (e) => {
      // 把第一行第一个方格移动到这里
      $(e.target).html($(squares[8 - count]).html()).removeClass('arrow').attr('disabled', 'disabled');
      $(squares[8 - count]).addClass('hide');
      //  清除所有箭头
      $('.arrow').remove();
      count--;
      //  如果没完成，那么创建方格；否则结束排序
      if (count === 0) {
        alert('排序完成！！请检查结果是否正确');
        //  开始按钮恢复使用
        $('#btn-start').attr('disabled', null);
        squares = null;
      } else {
        createSqures();
      }

      //  显示提示信息
      $('#tips').html('请继续把第一行紫色背景的数插入到第二行合适的位置');
    });
  }

  /*
   * 在第二行方块之间创建空的方格
   */
  function createSqures() {
    //  高亮当前要插入的数字
      // console.log(count === 8 ? 8 - count + 1 : 8 - count + 2);
      console.log(8 - count);
      $(squares[8 - count]).addClass('target');
    //  获取第二行所有方格
    const squaresInSecondLine = $('#sorted>.cell');
    //  在每个方格左边添加空的方格
    for (let i = 0; i < squaresInSecondLine.length; i++) {
      const node = $('<button class="cell arrow">↓</button>');
      bindEvent(node);
      //  在前面添加空方格
      $(squaresInSecondLine[i]).before(node);
    }
    //  在最后增加一格
    const node = $('<button class="cell arrow">↓</button>');
    bindEvent(node);
    $(squaresInSecondLine[squaresInSecondLine.length - 1]).after(node);
  }

  let squares = initSquares();
  let count = 8; //  最多点7次

  // 点击开始按钮开始排序
  $('#btn-start').bind('click', (e) => {
    if (!squares) {
      squares = initSquares();
    }
    count = 8;
    squares.attr('disabled', 'disabled');
    //  删除第二行所有内容
    $('#sorted').empty();
    //  显示所有隐藏的方格
    squares.removeClass('hide target');
    insert();
    createSqures();
    $('#btn-start').attr('disabled', 'disabled');

    //  显示提示信息
    $('#tips').html('第一个数已经被移动到第二排，现在请把第一排第一个，也就是紫色背景的数字插入到第二排的合适位置');
  })

});