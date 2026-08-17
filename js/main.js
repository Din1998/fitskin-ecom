$(document).ready(function() {
  // 1. Welcome Modal Logic
  setTimeout(function() {
    $('#welcome-modal').removeClass('opacity-0 pointer-events-none').addClass('opacity-100');
    $('#welcome-modal-content').removeClass('scale-95 translate-y-4').addClass('scale-100 translate-y-0');
  }, 2000);

  function closeModal() {
    $('#welcome-modal').removeClass('opacity-100').addClass('opacity-0 pointer-events-none');
    $('#welcome-modal-content').removeClass('scale-100 translate-y-0').addClass('scale-95 translate-y-4');
  }

  $('#close-modal, #claim-fit').on('click', closeModal);
  $('#welcome-modal').on('click', function(e) {
    if (e.target === this) closeModal();
  });

  // 2. Shade Selection in Modal
  $('.modal-swatch').on('click', function() {
    $('.modal-swatch').removeClass('ring-2 ring-espresso ring-offset-2 scale-110').addClass('scale-100');
    $(this).addClass('ring-2 ring-espresso ring-offset-2 scale-110').removeClass('scale-100');
  });

  // 3. Silhouette Matrix Tabs
  $('.tab-btn').on('click', function() {
    const target = $(this).data('target');
    
    // Update active state
    $('.tab-btn').removeClass('bg-espresso text-porcelain shadow-md').addClass('text-espresso/70 hover:bg-sand');
    $(this).addClass('bg-espresso text-porcelain shadow-md').removeClass('text-espresso/70 hover:bg-sand');
    
    // Animate transition
    $('.tab-content').fadeOut(200, function() {
      $('#' + target).fadeIn(300).css({display: 'grid'});
      // Staggered slide-up for cards inside target
      $('#' + target + ' .product-card').each(function(index) {
        $(this).css({opacity: 0, transform: 'translateY(20px)'});
        setTimeout(() => {
          $(this).animate({opacity: 1}, {
            duration: 400,
            step: function(now, fx) {
              if (fx.prop === 'opacity') {
                $(this).css('transform', `translateY(${(1 - now) * 20}px)`);
              }
            }
          });
        }, index * 100);
      });
    });
  });

  // Trigger initial animation for first tab
  $('.tab-btn').first().trigger('click');

  // 4. Product Card Interactions (Swatches & Hover Images)
  $('.product-swatch').on('mouseover click', function() {
    const card = $(this).closest('.product-card');
    const color = $(this).data('color');
    const newImageSrc = $(this).data('img');
    const backImageSrc = $(this).data('back-img');
    
    // Update swatches visually
    card.find('.product-swatch').removeClass('ring-2 ring-espresso ring-offset-1 scale-110').addClass('scale-100');
    $(this).addClass('ring-2 ring-espresso ring-offset-1 scale-110').removeClass('scale-100');
    
    // Update images
    const frontImg = card.find('.front-img');
    const backImg = card.find('.back-img');
    
    // Smooth fade crossfade effect
    frontImg.css('opacity', 0);
    setTimeout(() => {
      frontImg.attr('src', newImageSrc).css('opacity', 1);
      backImg.attr('src', backImageSrc);
    }, 150);
  });

  // 5. Size Selection
  $('.size-pill').on('click', function() {
    const container = $(this).closest('.size-container');
    container.find('.size-pill').removeClass('bg-espresso text-porcelain').addClass('bg-sand text-espresso');
    $(this).addClass('bg-espresso text-porcelain').removeClass('bg-sand text-espresso');
  });

  // 6. Cart Drawer
  $('#cart-trigger').on('click', function() {
    $('#cart-drawer-overlay').removeClass('opacity-0 pointer-events-none').addClass('opacity-100');
    $('#cart-drawer').removeClass('translate-x-full').addClass('translate-x-0');
  });

  $('#close-cart, #cart-drawer-overlay').on('click', function() {
    $('#cart-drawer-overlay').removeClass('opacity-100').addClass('opacity-0 pointer-events-none');
    $('#cart-drawer').removeClass('translate-x-0').addClass('translate-x-full');
  });
});
