(function($) {
  'use strict';

  $(function() {
    var $fullText = $('.admin-fullText');
    $('#admin-fullscreen').on('click', function() {
      $.AMUI.fullscreen.toggle();
    });

    $(document).on($.AMUI.fullscreen.raw.fullscreenchange, function() {
      $fullText.text($.AMUI.fullscreen.isFullscreen ? '退出全屏' : '开启全屏');
    });
  });
})(jQuery);


$(function() {
    $('#doc-modal-list').find('.am-icon-close').add('#doc-confirm-toggle').
    on('click', function() {
        $('#my-confirm').modal({
            relatedTarget: this,
            onConfirm: function(options) {
                var $link = $(this.relatedTarget).prev('a');
                var msg = $link.length ? '你要删除的链接 ID 为 ' + $link.data('id') :
                    '确定了，但不知道要整哪样';
                alert(msg);
            },
            // closeOnConfirm: false,
            onCancel: function() {
                // alert('算求，不弄了');
            }
        });
    });
});