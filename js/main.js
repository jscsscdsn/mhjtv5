$(function () {
  $("div.lazy").lazyload({
    effect: "show"
  });
  $("img.lazy").lazyload({
    effect: "show"
  });
  var swiper = new Swiper('.banner', {
    pagination: ".swiper-pagination",
    slidesPerView: "auto",
    centeredSlides: !0,
    paginationClickable: !0,
    loop: !0,
    preloadImages: false,
    lazyLoading: true,
    lazyLoadingInPrevNext: true,
    lazyLoadingInPrevNextAmount: 1,
  });
  var videoSelectWrap = new Swiper('.videoSelectWrap', {
    freeMode: true,
    slidesPerView: 'auto',
    lazyLoading: true,
    lazyLoadingInPrevNext: true,
    lazyLoadingInPrevNextAmount: 3,
  });
  var headerTopNavIndex = 0;
  if ($("#headerTopNav li.active").index() > 0) {
    headerTopNavIndex = $("#headerTopNav li.active").index();
  }
  var headerTopNav = new Swiper('#headerTopNav', {
    freeMode: true,
    slidesPerView: 'auto',
    initialSlide: headerTopNavIndex - 1
  });
  //导航条
  var filter1 = new Swiper('#filter1', {
    freeMode: true,
    slidesPerView: 'auto',
    initialSlide: $("#filter1").find('.active').index() - 2,
  });
  var filter2 = new Swiper('#filter2', {
    freeMode: true,
    slidesPerView: 'auto',
    initialSlide: $("#filter2").find('.active').index() - 2,
  });
  var filter2 = new Swiper('#filter3', {
    freeMode: true,
    slidesPerView: 'auto',
    initialSlide: $("#filter3").find('.active').index() - 2,
  });
  var albumSource = new Swiper('.albumSource', {
    freeMode: true,
    slidesPerView: 'auto',
    initialSlide: $(".albumSource").find('.active').index() - 2,
  });
  var videoSelectWrap = new Swiper('#albumSelect', {
    freeMode: true,
    slidesPerView: 'auto',
    initialSlide: $("#albumSelect").find('.active').index() - 2
  });
  var videoSelectWrap = new Swiper('#subNav', {
    freeMode: true,
    slidesPerView: 'auto',
    initialSlide: $("#subNav").find('.active').index() - 2
  });

  var scroll = new auiScroll({
    listen: true,
    distance: 200
  }, function (ret) {
    if (ret.scrollTop > 40) {
      $('.scroll-to-top').show();
    } else {
      $('.scroll-to-top').hide();
    }
  });
  $(".scroll-to-top").click(function () {
    $("html,body").animate({
      scrollTop: 0
    }, 500);
  });
  $(".albumDetailIntroTxt").click(function () {
    $(this).text($(this).data("content"));
  });
  $(document).on('click', '.albumSelectBtn', function () {
    if ($(this).siblings(".albumSelect").hasClass("albumSelectHidden")) {
      $(this).text('收起列表').siblings(".albumSelect").removeClass("albumSelectHidden");
    } else {
      $(this).text('展开全部').siblings(".albumSelect").addClass("albumSelectHidden");
    }
  });
  $(".download-tool-box input").change(function(){
    if($(this).is(':checked')){
      MAC.CheckBox.All($(this).attr("to"));
    }else{
      MAC.CheckBox.Other($(this).attr("to"));
    }
  });
  $(".download-tool span").click(function(){
    alert('批量下载失败，请点击单个链接下载');
  });
});
