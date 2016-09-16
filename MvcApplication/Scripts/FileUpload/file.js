
$(document).ready(function() {

    $(document.body).on("click", '#upload', function(e) {

        // check for size of file not greater than 1MB
        if ($("#uploadFile").val()) {
            var iSize = ($("#uploadFile")[0].files[0].size / 1024);
            iSize = (Math.round((iSize / 1024) * 100) / 100);

            if (iSize > 4) {
                alert("File must be less than 4MB");
                $('span#validityMessages').html("File must be less than 4MB");
                return;

            } else {
                // on form post showing Busy Indicator
                $('#uploadLoader').show();
                $("#ImgForm").submit(); // post form
                console.log(iSize + "Mb");
            }
        } else {
            $('span#validityMessages').html("Please select a File of size less than 4MB!");
            return;
        }
    });

    $("#UploadTarget").on("load",function (e) {


        $('#uploadLoader').hide();


        //Reset the image form so the file won't get uploaded again
        //$("#ImgForm").reset();

        // this call will get uploads if any exists on server against this id and after successfull upload refreshing partial view to get the latest uploads
        //GetFiles();
        var url = $(this).data('action-url');
        $.get(url, function (response) {
            $('#uploadsContainer').html(response);
        });

    });

    function GetFiles() {
        var url = $this.data('action-url');
        $.get(url, function(response) {
            $('#uploadsContainer').html(response);
        });

    }
    
});