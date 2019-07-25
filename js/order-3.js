(function ($) {

    "use strict";

    var currency = '$'; // Set your currency here e.g.: 'EUR'

    var itemName = '';
    var price = '';
    var discount = '';
    var extraOption = '';
    var extraOptionIsChecked = '';
    var quantity = '';
    var subSum = '';
    var total = '';

    // Helper function to format the summary
    function numberWithSpaces(x) {
        var parts = x.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        return parts.join('.');
    }

    // Helper function to extract the numbers from a string
    function getTheNumbersOnly(str) {
        var i = 0;
        var strArray = str.match(/(\d+)/g);
        var result = '';
        for (i = 0; i < strArray.length; i++) { result += strArray[i]; }
        return result;
    }

    // Function to iterate on table rows and place the currency after prices
    function placeCurrency() {

        $('.to-calc').each(function () {

            price = getTheNumbersOnly($('.price', this).val());
            $('.price', this).val(price + ' ' + currency);

            subSum = getTheNumbersOnly($('.sub-sum', this).val());
            $('.sub-sum', this).val(subSum + ' ' + currency);

            total = getTheNumbersOnly($('.total-sum').val());
            $('.total-sum').val(total + ' ' + currency);

        });
    }

    // Function to set every toggle 'disabled' initially
    function disableToggles() {

        // Set every discount toggle to 'disabled' initially
        $('.discount').prop('disabled', true);

        // Set every extra option toggle 'disabled' initially
        $('.extra-option', this).prop('disabled', true);
    }

    // Function to manage toggles in order to show notifications when a disabled toggle is clicked
    function manageToggles() {

        // Enabled toggles should not have popup notification on click
        $('.toggle-content').filter(function () {

            return $(this).find('input[type="checkbox"]').length > 0;

        }).off('click');

        // Disabled Discount toggles should have popup notification on click
        $('.toggle-content').filter(function () {

            return $(this).find('.discount[disabled]').length > 0;

        }).on('click', function () {

            // Show notification popup                  
            $("#discountInfoModal").modal();

        });

        // Disabled Extra Option toggles should have popup notification on click
        $('.toggle-content').filter(function () {

            return $(this).find('.extra-option[disabled]').length > 0;

        }).on('click', function () {

            // Show notification popup
            $("#extraOptionInfoModal").modal();

        });

    }

    // Function to manage the main calculations
    function calc() {

        var total = 0;

        // Iterate on table rows
        $('.to-calc').each(function () {

            price = getTheNumbersOnly($('.price', this).val());
            discount = getTheNumbersOnly($('.discount', this).val());
            extraOption = getTheNumbersOnly($('.extra-option', this).val());
            extraOptionIsChecked = $('.extra-option', this).is(':checked');
            quantity = $('.quantity', this).val();
            subSum = $('.sub-sum', this).val();

            // Calculating Sub Sum if discount is not set
            if (discount === '0') {

                subSum = (price * 1) * (quantity * 1);

            } else {

                discount = (discount / 100) * 1;
                subSum = (price * 1) * (quantity * 1);
                subSum = subSum - (subSum * discount);

            }

            // Calculating Sub Sum if extra option is on
            if (extraOptionIsChecked) {

                subSum += (extraOption * 1);

            } else {

                extraOption = 0;
                subSum += (extraOption * 1);

            }


            // If input is given
            if (quantity.length > 0) {

                // Enable extra option
                $('.extra-option', this).prop('disabled', false);

                // Update Sub Sum
                $('.sub-sum', this).val(numberWithSpaces(subSum) + ' ' + currency);

                // Update Total Sum
                total += subSum;

            } else { // If there is no input given

                // Reset extra option
                $('.extra-option', this).prop('disabled', true);
                $('.extra-option', this).prop('checked', false); // Unchecks it

                // Reset Sub Sum                
                $('.sub-sum', this).val('0' + ' ' + currency);

            }

            // Inspect and manage all toggles accordingly 
            // (in order to show popup notification on disabled toggle click)
            manageToggles();

        });

        // Display total sum        
        $('.total-sum').val(numberWithSpaces(total) + ' ' + currency);

    }

    // Call initial functions
    placeCurrency();
    disableToggles();
    manageToggles();

    // Calculator table input validation
    $('.to-calc input').keypress(function (event) {
        if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
            event.preventDefault();
        }
    });

    // Update Sub Sums and Total Sum on toggle switch    
    $('.to-calc .extra-option').click(calc);

    // Update Sub Sums and Total Sum on keyup
    $('.to-calc input').keyup(calc);

    // Generate Order List if the Generate button is clicked
    $('.btn-generate').click(function () {

        // Empty Order List before generating the new list
        $('#inputOrderList').empty();

        // For each table row
        $('.to-calc').each(function () {

            itemName = $('.item-name', this).val();
            price = getTheNumbersOnly($('.price', this).val()) + ' ' + currency;
            quantity = $('.quantity', this).val();
            discount = getTheNumbersOnly($('.discount', this).val());
            extraOption = 'NO'; // Extra option is not set
            extraOptionIsChecked = $('.extra-option', this).is(':checked');
            subSum = $('.sub-sum', this).val();

            // If discount is not set write 'NO' into Order List's discount line 
            if (discount === '0') {

                discount = 'NO';

            } else { // If discount is set write '%' after its value

                discount += ' %';
            }

            // If extra option is checked consider its value
            if (extraOptionIsChecked) {

                extraOption = $('.extra-option', this).val() + ' ' + currency;
            }

            // Fill the Order List only if input is given
            if (quantity.length > 0) {

                $('#inputOrderList').append(itemName + '\n'),
                    $('#inputOrderList').append('Price: ' + price + '\n'),
                    $('#inputOrderList').append('Quantity: ' + quantity + '\n'),
                    $('#inputOrderList').append('Discount: ' + discount + '\n'),
                    $('#inputOrderList').append('Extra Need: ' + extraOption + '\n'),
                    $('#inputOrderList').append('Sub Sum: ' + subSum + '\n'),
                    $('#inputOrderList').append('--\n');
            }


        });

        // Append the TOTAL value to the Order List
        $('#inputOrderList').append('TOTAL : ' + $('.total-sum').val());

    });

    // Reset Order List
    $('.btn-reset').click(function () {
        $('#inputOrderList').empty();
    });

    // Form input validation
    $('#orderForm').parsley();

    // Pass data to the order script
    $('#orderForm').attr('action', 'order_send.php');

    // Smooth scroll
    $('a[href^="#"]').click(function (e) {
        e.preventDefault();

        var position = $($(this).attr('href')).offset().top - 150;

        $('body, html').animate({
            scrollTop: position
        } /* speed */);
    });

})(window.jQuery);