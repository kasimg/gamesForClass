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

  const squares = initSquares();

});