/* =============================================================
   menu.js — ハンバーガーメニュー制御
   
   動作概要:
     - .btn をクリック → #mo-nav を右からスライドイン表示
     - もう一度クリック or メニュー外をクリック → 非表示
     - ウィンドウ幅が 768px を超えたとき → 強制的に非表示
   ============================================================= */

$(function () {

  const $btn    = $('.mo_menu .btn');  // ハンバーガーボタン
  const $nav    = $('#mo-nav');         // ドロワーメニュー本体
  const BREAKPOINT = 768;              // PCメニューに切り替わる幅 (px)

  /* ----- メニューを開く / 閉じるトグル ----- */
  $btn.on('click', function () {
    const isOpen = $nav.is(':visible');
    isOpen ? closeMenu() : openMenu();
  });

  /* ----- メニュー外をクリックしたら閉じる ----- */
  $(document).on('click', function (e) {
    const clickedOutside =
      !$(e.target).closest('#mo-nav').length &&
      !$(e.target).closest('.mo_menu .btn').length;

    if (clickedOutside && $nav.is(':visible')) {
      closeMenu();
    }
  });

  /* ----- ウィンドウリサイズ時: PC幅になったら強制クローズ ----- */
  $(window).on('resize', function () {
    if ($(window).width() > BREAKPOINT && $nav.is(':visible')) {
      closeMenu();
    }
  });

  /* ----- メニュー内リンクをクリックしたら閉じる ----- */
  $nav.find('a').on('click', function () {
    closeMenu();
  });


  /* ===== ヘルパー関数 ===== */

  function openMenu() {
    $nav.stop(true).slideDown(200);
    $btn.attr('aria-expanded', 'true');
  }

  function closeMenu() {
    $nav.stop(true).slideUp(200);
    $btn.attr('aria-expanded', 'false');
  }

});
