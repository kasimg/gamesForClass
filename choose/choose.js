$(document).ready(() => {

  /*
   * 给每个方格一个0-100的随机值
   */
  function initSquares() {
    const squares = $('.cell');
    const numArr = [];  //  方便找最小值
    for (let i = 0; i < 8; i++) {
      const num = Math.floor(Math.random() * 100);
      $(squares[i]).html(num);
      numArr.push(num);
    }

    return { squares, numArr };
  }

  /*
   * 重置
   */
  function reset() {

  }

  const { squares, numArr } = initSquares();
  let domTemp = null;

  //  一共7次点击完成排序
  let count = 7;

  squares.bind('click', (e) => {
    //  判断点击的数是不是最小的
    if ($(e.target).html() - Math.min(...numArr) !== 0) {
      alert('请点击最小的数字！！');
    } else {
      //  如果是最小的，那么就交换最小的数和第一个方格里的数
      const temp = $(squares[7 - count]).html();
      $(squares[7 - count]).html($(e.target).html());
      $(e.target).html(temp);

      //  更新数组
      numArr[numArr.indexOf(Math.min(...numArr))] = numArr[0];
      numArr.shift();

      //  把第一个方格置为不可用，并改变颜色
      $(squares[7 - count])
        .attr('disabled', 'disabled')
        .addClass('settled')
        .removeClass('target');

      //  把后面一个方格作为target
      $(squares[7 - count + 1]).addClass('target');

      count--;

      //  更改提示信息
      switch(count) {
        case 6: {
          $('#tips').html('你成功地交换了两个数！（也许紫色的数就是最小的，不过这并不重要）现在最小的数被放到了第一格，它的颜色变成了灰黑色，因为它是最小的，所以就应该放在第一格，以后就可以不管他了！接下来请从剩下的7个数字里找到最小的');
          break;
        }
        case 5: {
          $('#tips').html('你又做对了！现在前面两个数已经不用管了！从剩下的数里再找一个最小的数！');
          break;
        }
        case 0: {
          $('#tips').html('给你32个赞！！');
          break;
        }
        default: {
          $('#tips').html('再接再厉！！');
        }
      }
    }
    //  7次一定会结束
    if (count === 0) {
      //  更改最后一个方格的状态
      $(squares[7 - count])
        .removeClass('target')
        .addClass('settled')
        .attr('disabled', 'disabled');

      alert('完成了！！');
    }
  });

  //  一开始将第一个作为目标
  $(squares[0]).addClass('target');

  //  给出第一个提示
  $('#tips').html('请选择数列中最小的数，和粉红色方块中的数字互换');

});