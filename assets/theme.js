/*=================================================================
  Utilities
==================================================================*/
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/*=================================================================
  Header > Mega Menu
==================================================================*/
$(document).ready(function() {
  $(".header-nav .nav-item .dropdown-menu").hover(function() { 
    $(this).addClass('hovered');
  }, function() {
    $(this).removeClass('hovered');
  });
  $(".sub-menu-item").on( "mouseover", function() {
    $(".sub-menu-item").removeClass("active");
    $(this).addClass("active");
  });
});

$(".header-nav .nav-link.dropdown-toggle").on("mouseover", function() {
  if ( $(".dropdown-toggle-active").length ) {
    $(".dropdown-toggle-active").removeClass("dropdown-toggle-active");
  }
  var $this = $(this);
  $this.addClass('dropdown-toggle-active');
  $(".header-nav .nav-item .dropdown-menu").removeClass("dropdown-menu-active");
  var dropdown_menu = $(this).next();
  dropdown_menu.addClass("dropdown-menu-active");
}).on("mouseleave", function() {
  setTimeout(function() {
    if ( ! $(".header-nav .nav-item .dropdown-menu").hasClass("hovered") ) {
      hide_Mega_Menu();      
    }
  }, 3500);
});

$("body").on("click", function(e) {
  if ( $(".dropdown-toggle-active").length ) {
    hide_Mega_Menu()
  }
})

function hide_Mega_Menu() {  
  $(".dropdown-toggle-active").removeClass("dropdown-toggle-active");
  $(".header-nav .nav-item .dropdown-menu").removeClass("dropdown-menu-active");
}

/*=================================================================
  Header > Search
==================================================================*/

$(document).ready(function($) {
  Header.onLoad()
})

const Header = {
  onLoad: function() {
    this.onSetBodyMarginTop()
    this.onShowSearchForm()
    this.onHideSearchForm()
  },
  onSetBodyMarginTop: function() {
    const $header = $('#shopify-section-header header.fixed-top')
    if (!$header.length) {
      return
    }
    this.setBodyMarginTop($header)
    $(window).on('resize', function () {
      Header.setBodyMarginTop($header)
    })
  },
  setBodyMarginTop: function($header) {
    const height = $header.height()
    const body = $('body')
    body.css('margin-top', `${height}px`)
  },
  onShowSearchForm: function() {
    $('.header-nav .icon-search-wrap').on('click', function() {
      Header.showSearchForm()
    })
  },
  showSearchForm: function() {
    $('.header-nav .icon-search-wrap').hide()
    $('.header-nav .angle-up-wrap').show()
    // hide all shopify sections
    $('.shopify-section, .page').hide()
    // show the header and search only
    $('#shopify-section-header, #shopify-section-search-form').show()
    $('#shopify-section-search-form input[name="q"]').focus()
  },
  onHideSearchForm: function() {
    $('.header-nav .angle-up-wrap, .btn-close-search-form').on('click', function() {
      Header.hideSearchForm()
    })
  },
  hideSearchForm: function() {
    $(".header-nav .angle-up-wrap").hide()
    $(".header-nav .icon-search-wrap").show()
    $(".shopify-section, .page").show()
    $("#shopify-section-search-form").hide()
  },
}

/*=================================================================
  Homepage
==================================================================*/

const Homepage = {
  onLoad: function() {
    this.threeVideos()
  },
  // autoplay=1
  threeVideos: function() {
    if ( !$('.homepage-video').length ) {
      return
    }
    $('.homepage-video-thumbnail-wrap').on('click', function() {
      $(this).hide()
      let video_number = $(this).attr('video-number')
      let this_video_wrap = $(`.homepage-video-iframe-wrap-${video_number}`)
      this_video_wrap.show()
      let src = this_video_wrap.find('iframe').attr( 'src' )
      this_video_wrap.find('iframe').attr( 'src', `${src}?autoplay=1` )
    })
  },
}

$(document).ready(function($) {
  Homepage.onLoad()
})

/*=================================================================
  Contact
==================================================================*/

$('.btn.edit-address').click(function() {
  $(this).hide();
  $(this).parents('td').siblings('.address-edit').show();
  $(this).siblings('.btn.edit-address-cancel').show();
  $(this).siblings('.btn.edit-address-submit').show();
  $(this).siblings('.btn.delete-address').hide();
  $(this).parents('td').siblings('.address-record').hide()
});

$('.btn.edit-address-submit').click(function() {
  $(this).hide();
  $(this).parents('td').siblings('.address-edit').hide();
  $(this).siblings('.btn.edit-address-cancel').hide();
  $(this).siblings('.btn.edit-address').show();
  $(this).siblings('.btn.delete-address').show();
  $(this).parents('td').siblings('.address-record').show()
});

$('.btn.edit-address-cancel').click(function() {
  $(this).hide();
  $(this).parents('td').siblings('.address-edit').hide();
  $(this).siblings('.btn.edit-address-submit').hide();
  $(this).siblings('.btn.edit-address').show();
  $(this).siblings('.btn.delete-address').show();
  $(this).parents('td').siblings('.address-record').show()
});


/*=================================================================
  Product Single
==================================================================*/

if ( $('.single-product').length ) {

  let window_width = window.innerWidth;
  let is_desktop = ( window_width >= 992 ) ? true : false;

  $(document).ready(function(){
    $('.open-share-window').on( 'click', function(e) {
        e.preventDefault();
        window.open($(this).attr('href'), 'share_window', 'left=20, top=20, width=500, height=500, toolbar=1, resizable=0');
        return false;
    });
  });

  $('.carousel').carousel()

  let carousel_arrows = ( is_desktop ) ? false : true;
  $('.single-product-images').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: carousel_arrows,
    dots: true,
    customPaging : function(slider, i) {
        var thumb = slider.$slides[i].firstElementChild.firstElementChild.dataset.thumb;
        var id = slider.$slides[i].firstElementChild.firstElementChild.dataset.id;
        return `<a class="d-block" ><img class="img-fluid" src="${thumb}" data-id="${id}" /></a>`;
    },
    /*responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]*/
  });
  $('.single-product-images').show();


// 

  if ( is_desktop ) {
    $('.single-product-images .slick-slide, .single-product-images-wrap .zoom-in-out-wrap').on('click', function(){
      if ( $('.single-product-images .slick-current.slick-active').hasClass('zoom-active') ) {
        // Reset
        $('.single-product-images ul.slick-dots').show();
        $('.single-product-images .slick-current.slick-active .zoom').trigger('zoom.destroy');
        $('.single-product-images-wrap .zoom-in-out-wrap').removeClass('zoom-active').html('<i class="fa fa-expand"></i>');
        $('.single-product-images .slick-current.slick-active').removeClass('zoom-active');

        $('.single-product-images').removeClass('d-flex justify-content-end');
        console.log('zoom destroyed');
      } else {
        // Hide Dots
        $('.single-product-images ul.slick-dots').hide();
        // Enable Zoom
        $('.single-product-images .slick-current.slick-active .zoom').zoom();
        // Enable Zoom
        $('.single-product-images-wrap .zoom-in-out-wrap').addClass('zoom-active').html('<i class="fa fa-times"></i>');
        $('.single-product-images .slick-current.slick-active').addClass('zoom-active');

        // Move Zoom Image to the End
        $('.single-product-images').addClass('d-flex justify-content-end');
        console.log('zoom active');
      }
    });    
  }

  function getVariantFromOptions() {
    let variantArr = []
    $(".product-variants select").map(function(i, el) {
      variant = {value: $(el).val(), index: $(el).data('index')};
      variantArr.push(variant)
    });
    return variantArr;
  }

  function updateHistoryState(variant) {
    if (!history.replaceState || !variant) {
      return;
    }

    var newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      '?variant=' +
      variant.id;
    
    window.history.replaceState({ path: newurl }, '', newurl);
  }

  $('.product-variants select').on('change', function() {
    var selectedValues = getVariantFromOptions();
    var variants = window.product.variants;
    
    var selected_variant = window.product.variants[0];
    variants.forEach(function(variant) {
      selectedValues.forEach( function(selectedValue) {
        if ( variant.title.toLowerCase() == selectedValue.value.toLowerCase() ) {
          selected_variant = variant;
        }
      });
    });

    updateHistoryState(selected_variant);
    $('#variant-id').val(selected_variant.id);
  });

  function selectVariant( selectedVariantColEl ) {
    $('.product-variants .product-variant-wrap').removeClass('selected');
    selectedVariantColEl.addClass('selected');

    // Cart Form Select Variant Option
      let selected_variant_label = selectedVariantColEl.find('.variant-label').text();
      $('form .product-variants select option').prop('selected', false); // deselect all
      $('form .product-variants select option[value="' + selected_variant_label + '"]').prop('selected', true);
      $('form .product-variants select').trigger('change');
    // Update Add to Cart Button Price
      let selected_variant_price = selectedVariantColEl.find('.variant-price').text();
      $('.desktop-single-product-details .price').text(selected_variant_price);
      $('form .btn-add-to-cart .add-to-cart-price').text(selected_variant_price);
    // Update Compare At Price
      let selected_variant_strike_price = selectedVariantColEl.find('.variant-strike-price').text();
      console.log("selected_variant_strike_price", selected_variant_strike_price);
      $('.desktop-single-product-details .strike-price').text(selected_variant_strike_price);
  }

  $('.product-variants .product-variant-wrap').on('click', function() {

    let data_variant_id = $(this).attr('data-variant-id');
    let data_featured_image_id = $(this).attr('data-featured-image-id');
    // console.log( data_variant_id, data_featured_image_id );
    selectVariant( $(this) );

  });

  function countdown() {
    var today = new Date();
    today.setHours(0,0,0,0);
    var countDownDate = new Date(today.getTime() + (24 * 60 * 60 * 1000));

    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get todays date and time
        var now = new Date().getTime();
        
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var hoursText = (hours == 1) ? 'hour': 'hours';
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var minutesText = (minutes == 1) ? 'minute': 'minutes';
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Output the result in an element with id="demo"
        $('.add-to-cart-countdown-wrap').show();
        $('.add-to-cart-countdown').html( 'Order in the next ' + hours + ' ' + hoursText + ' ' + minutes + ' ' + minutesText + '<br/>for FREE Next Day Shipment!').show();
        
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            $('.add-to-cart-countdown-wrap').show();
            $('.add-to-cart-countdown').html( 'EXPIRED!').show();
        }
    }, 1000);
  }

  function liveCounter( ) {
    let today = new Date();
    let todayHours = today.getHours();
    let inc = parseInt( $('.live-counter').attr('data-inc') );
    let count = (todayHours * inc) + inc;
    $('.live-counter-count').text(count);
    $('.live-counter').show();
  }  

  function vidRescale(e){
    /* aspectRatio = 16:9 */
    var aspectRatioW = 16;
    var aspectRatioH = 9;
    jQuery(e).attr('width', '100%');
    var w = jQuery(e).width();
    var h = (w*aspectRatioH)/aspectRatioW;
    jQuery(e).height(h);
  }

  $(document).ready(function($){

    // Select Variant
    if ( $('.product-variants').length ) {
      let selectedOption = $('.product-variants select').val().toLowerCase();
      $('.product-variant-wrap').each(function() {
        let variantLabelText = $(this).find('.variant-label').text().toLowerCase();
        if ( selectedOption == variantLabelText ) {
          selectVariant( $(this) );

        }
      });
    }

    countdown();
    liveCounter();
    vidRescale();
  });

  $(window).on('load resize', function(){
    vidRescale('.responsive-video');
  });

}


/*=================================================================
  Cart
  // *NOTE: Could of just got all the cart data with: GET /cart.js
==================================================================*/  
$(document).ready(function() {
  // on load
  load_Cart_Listeners();
  update_Dynamic_Shipping_Announcement();
});

function load_Cart_Listeners() {
  // On click
  $('#form-cart input[name="updates[]"]').off();
  $('#form-cart input[name="updates[]"]').on('change', function() {
    // Update Cart
    update_Cart();
  });
  $('#form-cart .cart-item-minus').off();
  $('#form-cart .cart-item-minus').on('click', function() {
    minus_Cart_Quantity( $(this) );
  });
  $('#form-cart .cart-item-plus').off();
  $('#form-cart .cart-item-plus').on('click', function() {
    plus_Cart_Quantity( $(this) );
  });
  $('#form-cart .cart-item-remove').off();
  $('#form-cart .cart-item-remove').on('click', function() {
    remove_Cart_Item( $(this).attr('remove-cart-line'), $(this).attr('rel') );
  });
}

let new_cart_item_thumb_img_url = "";

// On collection product add to cart
$("#shopify-section-collection-template .product-item-add-to-cart-form").on("submit", function(e) {
    e.preventDefault();
    $form = $(this);

    new_cart_item_thumb_img_url = $form.attr('product-img-src');

    // console.log($form.serialize());
    set_Btn_Add_To_Cart_Loading( $form );
    $.post( $form.attr('action'), $form.serialize(), function(product_data) {
        // console.log("Data returned form server", product_data);
        update_Frontend_Cart( product_data );
        set_Btn_Add_To_Cart_To_Default( $form );
    }, 'json');
});

// On single product add to cart
$('.single-product-details form#product-cart').on('submit', function(e) {
    e.preventDefault();
    $form = $(this);

    new_cart_item_thumb_img_url = $('.single-product-images img').attr('src');

    // console.log($form.serializeArray());
    // console.log($form.serialize());
    set_Btn_Add_To_Cart_Loading( $form );
    $.post( $form.attr('action'), $form.serializeArray(), function(product_data) {
        // console.log("Data returned form server", product_data);
        update_Frontend_Cart( product_data );
        set_Btn_Add_To_Cart_To_Default( $form );
    }, 'json');

});

function set_Btn_Add_To_Cart_Loading( $form ) {
    $form.find('.btn-add-to-cart').prop('disabled', true);
    $form.find('.btn-add-to-cart-inner-text').hide();
    $form.find('.btn-add-to-cart-inner-loading').show();
}

function set_Btn_Add_To_Cart_To_Default( $form ) {
  setTimeout(function() {
    $form.find('.btn-add-to-cart').prop('disabled', false);
    $form.find('.btn-add-to-cart-inner-text').show();
    $form.find('.btn-add-to-cart-inner-loading').hide();
  }, 500);
}

function update_Frontend_Cart( product_data ) {
  console.log("product_data", product_data);

  let found_in_cart_list = false;
  let product_price = $('.reviews-row .price').text();
      product_price = parseFloat( product_price.replace('$', '') );

  // check if product already exists in cart
  let cart_item_count = $('#form-cart .cart-item-list .cart-item-row').length;
  let cart_total = 0;
  if (  cart_item_count ) {
    $('#form-cart .cart-item-list .cart-item-row').each(function() {
      let product_id = parseInt( $(this).attr('product-id') );
      // if found
      if ( product_data.id === product_id ) {
        found_in_cart_list = true;
        // then increment the quantity number
        // update line_price
        $(this).find('.cart-item-price').text( '$' + product_data.original_price );
        // update quantity
        // let this_value = parseInt( $(this).find('input[type="number"]').val() );
        $(this).find('input[type="number"]').val( product_data.quantity );
      }
      let cart_item_line_price = parseInt( $(this).find('.cart-item-price').text().replace('$', '') );
      let cart_item_line_quantity = parseInt( $(this).find('input[type="number"]').val() );
      cart_total += cart_item_line_price * cart_item_line_quantity;
      // console.log(cart_total);
    });
  }
  // if cart does not have items yet
  if ( ! cart_item_count && ! $('.header-nav__menu-wrap__cart').length ) {
    // then add the cart icon to header
      add_Cart_Icon_To_Header();
  }  

  let new_cart_item_index = 1;

  let product_url = window.location.href; // TODO make this dynamic for collections

  let product_title = product_data.title;

  let new_cart_item_quantity = 1;

  // if on single product
  if ( $("#shopify-section-product-details").length ) {
    //   let product_title = product.title;
    //       product_title += ( $('.single-product-details .variant-label').length ) ? '<br/>' + $('.single-product-details .product-variant-wrap.selected variant-label').text() : '';    
  
    new_cart_item_quantity = $("#product-cart #quantity").val();
  }
  
  // if not found in cart list
  if ( ! found_in_cart_list ) {
    // then add
    // product_data.id, product_data.product_id,  product_data.variant_id 
    let new_cart_item = '<div class="cart-item-row row py-3" product-id="' + product_data.id + '" >';
          new_cart_item += '<div class="col-auto px-0">';
            new_cart_item += '<img class="cart-item-thumbnail" src="' + new_cart_item_thumb_img_url + '" alt="' + product_title + '" />';               
          new_cart_item += '</div>';
          new_cart_item += '<div class="col">';
            new_cart_item += '<div class="row">';
              new_cart_item += '<div class="col">';
                new_cart_item += '<a class="d-block text-black text-uppercase" href="' + product_url +  '" title="' + product_title + '" >' + product_title + '</a>';
              new_cart_item += '</div>';
            new_cart_item += '</div>';
            new_cart_item += '<div class="row">';

              new_cart_item += '<div class="col">';
                // let line_price = Utilities.formatCurrency( Utilities.insertDecimal( product_data.line_price ) );
                // console.log( "line_price", line_price );
                new_cart_item += '<p class="cart-item-price d-block mb-1" >$' + product_data.original_price + '</p>';
                new_cart_item += '<a class="cart-item-remove d-inline-block text-red mb-1" href="javascript:void(0);" remove-cart-line="' + new_cart_item_index + '" rel="' + product_data.id + '" >Remove</a>';
              new_cart_item += '</div>';
              new_cart_item += '<div class="col pl-0 d-flex justify-content-center align-items-center">';
                new_cart_item += '<div class="row">';
                  new_cart_item += '<div class="col text-center pt-2 px-0 text-gray cart-item-minus" remove-cart-line="' + new_cart_item_index + '" rel="' + product_data.id + '" >-</div>';
                  new_cart_item += '<div class="col px-1">';
                    new_cart_item += '<input type="number" name="updates[]" class="d-block mx-auto p-2 text-center w-100" value="' + new_cart_item_quantity + '" min="0" pattern="[0-9]*" />';
                  new_cart_item += '</div>';
                  new_cart_item += '<div class="col text-center pt-2 px-0 text-gray cart-item-plus">+</div>';
                new_cart_item += '</div>';
              new_cart_item += '</div>';

            new_cart_item += '</div>';

          new_cart_item += '</div>';
        new_cart_item += '</div>';
    $('#form-cart .cart-item-list').prepend(new_cart_item);

    cart_total += product_data.original_price * product_data.quantity;

    set_Remove_Cart_Line_Number();

    // load cart listeners
    load_Cart_Listeners();
  }

  if ( cart_item_count ) {
    console.log("cart_total", cart_total);
    $('#form-cart .cart-total-price').text( '$' + cart_total );
  } else {
    $('#form-cart .cart-total-price').text( product_data.line_price );
  }

  $('#form-cart').show(); $('.empty-cart-wrap').hide();

  // Update Dynamic Shipping Announcement
  update_Dynamic_Shipping_Announcement();
  $('#offCanvasRightSidebarCartModal').modal('show');
}

function set_Remove_Cart_Line_Number() {
    // increment the remove-cart-line for other cart-items
    if ( $('#form-cart .cart-item-list .cart-item-row').length >= 2  ) {
      let inc = 1;
      $('#form-cart .cart-item-list .cart-item-row').each(function() {
        $(this).find('.cart-item-remove').attr( 'remove-cart-line', inc );
        $(this).find('.cart-item-minus').attr( 'remove-cart-line', inc );
        inc++;
      });
    }  
}

function add_Cart_Icon_To_Header() {

    let cart_icon = '<svg width="17" height="15" viewBox="0 0 17 15" xmlns="http://www.w3.org/2000/svg"><path d="M4.751 14.928c.746 0 1.352-.59 1.352-1.315 0-.726-.606-1.316-1.352-1.316-.745 0-1.352.59-1.352 1.316 0 .725.607 1.315 1.352 1.315zM13.2 14.928h.1c.358-.03.686-.184.924-.455.239-.26.348-.6.328-.957-.05-.716-.696-1.267-1.441-1.219-.746.049-1.302.687-1.253 1.403a1.34 1.34 0 0 0 1.342 1.228zM.596 1.853h1.71l2.435 8.568c.07.252.309.426.577.426h7.485a.598.598 0 0 0 .546-.348l2.724-6.093a.573.573 0 0 0-.05-.551.596.596 0 0 0-.497-.262h-8.27a.59.59 0 0 0-.596.58c0 .32.268.58.596.58h7.356l-2.207 4.933h-6.64L3.33 1.118a.594.594 0 0 0-.577-.426H.596a.59.59 0 0 0-.596.58c0 .32.268.58.596.58z"></path></svg>';
    let cart_menu_item = '<div class="col header-nav__menu-wrap__cart text-center">';
          cart_menu_item += '<a class="header-nav__menu-link d-block text-uppercase text-black" href="javascript:void(0);" data-toggle="modal" data-target="#offCanvasRightSidebarCartModal" title="Cart">' + cart_icon + '</a>';
        cart_menu_item += '</div>';
    $('.header-mobile-nav').append(cart_menu_item);
    let desktop_cart_menu_item = '<li class="header-nav__menu-wrap__cart" >';
          desktop_cart_menu_item += '<a class="header-nav__menu-link d-block py-3 text-uppercase text-black" href="javascript:void(0);" data-toggle="modal" data-target="#offCanvasRightSidebarCartModal" title="Cart">' + cart_icon + '</a>';
        desktop_cart_menu_item += '</li>';
    $('.header-desktop-menu').append(desktop_cart_menu_item);

}

function minus_Cart_Quantity( minusEl ) {
  // Update Quantity
  let quantity = parseInt( minusEl.parent().find('input[type="number"]').val() );
  if ( quantity == 1 ) {
    let remove_cart_line = minusEl.attr('remove-cart-line');
    // console.log('remove_cart_line', remove_cart_line);
    // if not on template-cart
    if ( ! $('.template-cart').length ) {
      console.log( "here", remove_cart_line, minusEl.attr('rel') );
      remove_Cart_Item( remove_cart_line, minusEl.attr('rel') );
      return true;
    }
    window.location = '/cart/change?line=' + remove_cart_line + '&quantity=0';
    return true;
  }
  minusEl.parent().find('input[type="number"]').val( quantity - 1 );
  // Update Cart
  update_Cart();
}

function plus_Cart_Quantity( minusEl ) {
  // Update Quantity
  let quantity = parseInt( minusEl.parent().find('input[type="number"]').val() );
  minusEl.parent().find('input[type="number"]').val( quantity + 1 );
  // Update Cart
  update_Cart();
}

function update_Cart() {

  if ( ! $('#form-cart input[name="update"]').length ) {
    $('#form-cart').append('<input type="hidden" name="update" value="Update" >');    
  }

  $form = $('#form-cart');

  $.post( "/cart", $form.serialize(), function(cart_data) {
      // console.log("Data returned form server", cart_data);
      cart_data.items.forEach(function(cart_item) {
        $('.cart-item-list [product-id="' + cart_item.id + '"] .cart-item-thumbnail').attr( 'src', cart_item.image );
        // console.log( Utilities.formatCurrency( Utilities.insertDecimal( cart_item.line_price ) ) );
        $('.cart-item-list [product-id="' + cart_item.id + '"] .cart-item-price').text( Utilities.formatCurrency( Utilities.insertDecimal( cart_item.original_price ) ) );
      });
      // update cart total
      $('#form-cart .cart-total-price').text( Utilities.formatCurrency( Utilities.insertDecimal( cart_data.original_total_price ) ) );

      // update dynamic shipping announcement
      update_Dynamic_Shipping_Announcement();
  }, 'json');

}

function remove_Cart_Item( cart_line_item_index, product_id ) {
      
  let data_to_send = {
    line: cart_line_item_index,
    id: product_id,
    quantity: 0,
  };
  // console.log(data_to_send);
  $.post('/cart/change.js', data_to_send, function(cart_data) {
      // console.log("Data returned form server", cart_data);
      $('.cart-item-list [product-id="' + product_id + '"]').remove();
      // if cart has items
      if ( $('.cart-item-list .cart-item-row').length ) {
        // then update the total
        $('#form-cart .cart-total-price').text( Utilities.formatCurrency( Utilities.insertDecimal( cart_data.total_price ) ) );

        // set the remove-cart-line value
        let inc = 1;
        $('#form-cart .cart-item-list .cart-item-row').each(function() {
          $(this).find('.cart-item-remove').attr( 'remove-cart-line', inc );
          $(this).find('.cart-item-minus').attr( 'remove-cart-line', inc );
          inc++;
        });

      } else {
        // else hide form
        $('.header-nav__menu-wrap__cart').remove();
        $('#form-cart').hide();
        $('.empty-cart-wrap').show(); 
      }

      // update dynamic shipping announcement
      update_Dynamic_Shipping_Announcement();      
  }, 'json');

}


function update_Dynamic_Shipping_Announcement() {
  if ( $("#form-cart .cart-item-list .cart-item-row").length ) {
    let free_shipping_threshold = 420;
    
    // get cart sub_total
    let cart_total_price = parseInt( $("#form-cart .cart-total-price").text().replace('$', '') );

    let text_dynamic_shipping = "";

    // if free_shipping_threshold is greater than cart_total_price
    if ( free_shipping_threshold > cart_total_price ) {
      let price_diff = ( free_shipping_threshold - cart_total_price );
      console.log( free_shipping_threshold, cart_total_price, price_diff );
      // then
      text_dynamic_shipping = "Only $" + price_diff + " away from free shipping.";
    } else {
      // else then cart_total_price is greater than or equal to free_shipping_threshold
      text_dynamic_shipping = "Congratulations you've achieved free shipping.";
    }
    $(".text-dynamic-shipping").html( '<i class="fa fa-check-circle"></i> ' + text_dynamic_shipping );

  }  
}

/* =================================================================
 * Collection
================================================================== */
const Collection = {
  onLoad: function() {
    if ( !$("#shopify-section-collection-template").length ) {
      return
    }
    this.load()
  },
  load: function() {
    const this_location = Collection.stripQueryStringAndHashFromPath( location.pathname )
    $('.sub_collectionAccordion .card').each( function() {
      const link_href = $(this).find('.card-header-link').attr('href').trim().toLowerCase().replace(/ /g, '-')
      const data_parent_target = $(this).attr('data-parent-target')
      if ( this_location === link_href ) {
        $(this).addClass('selected')
        Collection.triggerAccordion( data_parent_target )
      } else {
        if ( $(this).find(".card-body").length ) {
          let data_target = $(this).find('.card-header-link').attr('data-target')
          // console.log("data_target", data_target)
          // check card-body ul
          $(this).find('.card-body ul li a').each(function() {
            let sub_link_href = $(this).attr('href').trim().toLowerCase().replace(/ /g, '-')
            if ( this_location == sub_link_href ) {
              $(this).addClass('selected')
              Collection.triggerAccordion( data_parent_target )
              // trigger the sub accordion too
              Collection.triggerAccordion( data_target )
            }
          })
        }    
      }
    })
  },
  stripQueryStringAndHashFromPath: function(url) {
    return url.split("?")[0].split("#")[0]
  },
  triggerAccordion: function( data_target ) {
    console.log("selected data_target", data_target)
    $('a[data-target="' + data_target + '"]').trigger("click")
  },
}

$(document).ready(function() {
  Collection.onLoad()
})

const Utilities = {
  insertDecimal: function(num) {
    return (num / 100).toFixed(2)
  },
  formatCurrency: function(value) {
    value = parseFloat(value)
    return '$' + value.toFixed(2)
  }
}

/* =================================================================
 * Account
================================================================== */
const Account = {
  onLoad: function() {
    if ( $("#shopify-section-account-login").length ) {
      $(".show-forgot-password").on("click", function() {
        $(".customer-login-wrap").hide()
        $(".forgot-password-wrap").show()
      })
      $(".show-log-in").on("click", function() {
        $(".forgot-password-wrap").hide()
        $(".customer-login-wrap").show()
      })
    }
    if ( $("#shopify-section-account-template").length ) {
      const view = getParameterByName( 'view' )
      if ( view === 'orders' ) {
        $('.account-tabs a[href="#orders"]').tab('show')
      } else if ( view === 'giveaways' ) {
        $('.account-tabs a[href="#giveaways"]').tab('show')
      }
    }
  },
}

$(document).ready(function() {
  Account.onLoad()
  customerAddressForm()
})

/**
 *
 *  Show/hide customer address forms
 *
 */
function customerAddressForm() {
  var $newAddressForm = $('#AddressNewForm');
  var $newAddressFormButton = $('#AddressNewButton');

  if (!$newAddressForm.length) {
    return;
  }

  // Initialize observers on address selectors, defined in shopify_common.js
  if (Shopify) {
    // eslint-disable-next-line no-new
    new Shopify.CountryProvinceSelector(
      'AddressCountryNew',
      'AddressProvinceNew',
      {
        hideElement: 'AddressProvinceContainerNew'
      }
    );
  }

  // Initialize each edit form's country/province selector
  $('.address-country-option').each(function() {
    var formId = $(this).data('form-id');
    var countrySelector = 'AddressCountry_' + formId;
    var provinceSelector = 'AddressProvince_' + formId;
    var containerSelector = 'AddressProvinceContainer_' + formId;

    // eslint-disable-next-line no-new
    new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
      hideElement: containerSelector
    });
  });

  // Toggle new/edit address forms
  $('.address-new-toggle').on('click', function() {
    var isExpanded = $newAddressFormButton.attr('aria-expanded') === 'true';

    $newAddressForm.toggleClass('hide');
    $newAddressFormButton.attr('aria-expanded', !isExpanded).focus();
  });

  $('.address-edit-toggle').on('click', function() {
    var formId = $(this).data('form-id');
    var $editButton = $('#EditFormButton_' + formId);
    var $editAddress = $('#EditAddress_' + formId);
    var isExpanded = $editButton.attr('aria-expanded') === 'true';

    $editAddress.toggleClass('hide');
    $editButton.attr('aria-expanded', !isExpanded).focus();
  });

  $('.address-delete').on('click', function() {
    var $el = $(this);
    var formId = $el.data('form-id');
    var confirmMessage = $el.data('confirm-message');

    // eslint-disable-next-line no-alert
    if (
      confirm(
        confirmMessage || 'Are you sure you wish to delete this address?'
      )
    ) {
      Shopify.postLink('/account/addresses/' + formId, {
        parameters: { _method: 'delete' }
      });
    }
  });
}
