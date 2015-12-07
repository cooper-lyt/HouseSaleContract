(function (BannerModule, $, undefined) {
    BannerModule.addImpression = function(slideshow, nextSlide) {
        var count = parseInt(slideshow.data('slide-count'));

        if (count != 0) {
            slideshow.data('slide-count', --count);
            var options = nextSlide.data('banner-options');

            if (!options.isAdmin) {
                var lookupurl = globalSiteSubDirectory + "/ajax/banners/ajax.aspx?F=AddImpression&BannerId=" + options.bannerId;
                $.get(lookupurl, function(o) { return false; });
            }
        }
    }

    BannerModule.trackClick = function (bannerId) {
        if (bannerId)
            $.ajax('/ajax/banners/tracking.aspx?BannerId=' + bannerId);
    }

    BannerModule.init = function () {
        $('.cycle-slideshow').cycle();
        BannerModule.initTracking();
    }

    BannerModule.initTracking = function () {
        $('.cycle-slideshow').on('cycle-before', function (event, opts) {
            BannerModule.addImpression($(event.target), $(opts.slides[opts.nextSlide]));
        });

        $("a.banner-tracking").on("click", function (e) {
            BannerModule.trackClick($(this).data('banner-id'));
        });
    }
}(window.BannerModule = window.BannerModule || {}, jQuery));

$(document).on('cycle-initialized', function (event, opts) {
    if (opts.slides.length > 0)
        BannerModule.addImpression($(event.target), $(opts.slides[0]));
});

jQuery(function ($) {
    //EP - cycle auto-initializes, so we can skip that.
    BannerModule.initTracking();
    BaseModule.addModuleRebindFunction("BannerModule", BannerModule.init);
});