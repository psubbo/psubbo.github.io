var API_KEY = "AIzaSyAnncvWgiQITGBVFd9W-zY3_GvVZDJ16fc";
var spreadsheetID = "1YCzTTvcecJdOvhLYZ-J6iCzpLBmffIHXSgaijVkPfq8";
var range = "A1:C7";
var apiUrl = "https://sheets.googleapis.com/v4/spreadsheets/" + spreadsheetID + "/values/" + range + "?key=" + API_KEY;

/* console.log(apiUrl); */

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data.values);
    })



$(function() {

    var endpoint = 'https://test-api.hermes-dpd.ru/WS/RestService.svc/rest';
    var namespace = 'https://api.hermes-dpd.ru/WS/rest';
    var ischema = 'xmlns:i="http://www.w3.org/2001/XMLSchema-instance"';
    var aschema = 'xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays"';
    //details
    var acc = { username: 'testlogin', password: 'testpassword', buCode: '1000' };
    var period = { start: '2016-09-01', end: null };
    var psCode = '901031';

    $('#title').html(endpoint + '<br/>Login : ' + acc.username + '<br/>Bucode : ' + acc.buCode + '<br/>Pscode : ' + psCode + '<br/>Period : from ' + period.start + ' to ' + period.end);


    var sampleParcelBarCode = "";

    var d = new Date(); // for now
    datetext = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    var sampleClientParcelBarCode = "TEST_1" //+ datetext -> add it or set your unique order number, 
        //pay attention to createpreadvice / updatepreadvice methods to specify order number correctly

    //var parcelBarCodesArr = ["33332000009663", "10009900010000", "99000176157939"];
    var parcelBarCodesArr = ["10009900011169"];



    //use btoa function to decode and atob to encode data to base64
    var authHeader = "Basic " + btoa(acc.username + ":" + acc.password);

    $('#ajaxJson_GetParcelShops').click(function() {

        var methodName = 'GetParcelShops';
        var url = endpoint + '/' + methodName;
        var jsonData = { businessUnitCode: acc.buCode };

        $.ajax({
            type: "POST",
            dataType: "json",
            //traditional:true,
            contentType: "application/json",
            timeout: 60000,
            //crossDomain: $.support.cors, //OPTIONAL: Cross Domain Request
            url: url,
            data: JSON.stringify(jsonData),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", authHeader);
                $('#data').empty();
                $('#result').empty();
                $('#request').text(JSON.stringify(jsonData));
            },
            success: function(response) {
                $('#result').html('success');
                $('#data').html(JSON.stringify(response));
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $('#result').html('error: ' + xhr.status + '<br/>' + thrownError);
            }
        });
    });

    $('#ajaxJson_GetStatusesByParcelBarcodes').click(function() {
        var methodName = 'GetStatusesByParcelBarcodes';
        var url = endpoint + '/' + methodName;
        var jsonData = { parcelBarCodes: parcelBarCodesArr };

        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            timeout: 60000,
            //crossDomain: $.support.cors, //OPTIONAL: Cross Domain Request
            url: url,
            data: JSON.stringify(jsonData),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", authHeader);
                $('#data').empty();
                $('#result').empty();
                $('#request').text(JSON.stringify(jsonData));
            },
            success: function(response) {
                $('#result').html('success');
                $('#data').html(JSON.stringify(response));
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $('#result').html('error: ' + xhr.status + '<br/>' + thrownError);
            }
        });
    });

    $('#ajaxJson_GetStatusesByBusinessUnit').click(function() {
        var methodName = 'GetStatusesByBusinessUnit';
        var url = endpoint + '/' + methodName;
        var jsonData = { businessUnitCode: acc.buCode, dateFrom: period.start, dateTo: period.end };

        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            timeout: 60000,
            //crossDomain: $.support.cors, //OPTIONAL: Cross Domain Request
            url: url,
            data: JSON.stringify(jsonData),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", authHeader);
                $('#data').empty();
                $('#result').empty();
                $('#request').text(JSON.stringify(jsonData));
            },
            success: function(response) {
                $('#result').html('success');
                $('#data').html(JSON.stringify(response));
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $('#result').html('error: ' + xhr.status + '<br/>' + thrownError);
            }
        });
    });

    $('#ajaxJson_GetPreadvices').click(function() {

        var methodName = 'GetPreadvices';
        var url = endpoint + '/' + methodName;
        var jsonData = { businessUnitCode: acc.buCode };

        $.ajax({
            type: "POST",
            dataType: "json",
            //traditional:true,
            contentType: "application/json",
            timeout: 60000,
            //crossDomain: $.support.cors, //OPTIONAL: Cross Domain Request
            url: url,
            data: JSON.stringify(jsonData),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", authHeader);
                $('#data').empty();
                $('#result').empty();
                $('#request').text(JSON.stringify(jsonData));
            },
            success: function(response) {
                $('#result').html('success');
                $('#data').html(JSON.stringify(response));
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $('#result').html('error: ' + xhr.status + '<br/>' + thrownError);
            }
        });
    });

    $('#ajaxJson_CreatePreadvice').click(function() {
        var methodName = 'CreatePreadvice';
        var url = endpoint + '/' + methodName;
        var jsonData = {
            preadvices: [{
                "BusinessUnitCode": acc.buCode,
                "CashOnDeliveryCurrency": "RUB",
                "CashOnDeliveryValue": 100,
                "ClientOrderNumber": sampleClientParcelBarCode,
                "ClientParcelNumber": sampleClientParcelBarCode,
                "CustomStoragePeriod": 0,
                "CustomerAdditionalAddressInfo": "test adr info",
                "CustomerAdditionalPhoneNumber": "test adr phone",
                "CustomerApartmentNumber": "0",
                "CustomerBuildingNumber": "13",
                "CustomerCity": "MOSCOW",
                "CustomerConstructionNumber": "3",
                "CustomerCountryCode": "RUS",
                "CustomerEmail": "nomail@ya.ru",
                "CustomerFarthersName": "Namegiven X",
                "CustomerFirstName": "Name X",
                "CustomerFrameNumber": "1",
                "CustomerLandlinePhoneNumber": "+7 (499) 681-12-52",
                "CustomerMobilePhoneNumber": "+7 (499) 681-12-52",
                "CustomerNumber": "21321321",
                "CustomerRegion": "noregion",
                "CustomerStreet": "dokukina",
                "CustomerStreetType": "st.",
                "CustomerSubregion": "X",
                "CustomerSurname": "Surname X",
                "CustomerZipCode": "101000",
                "DirectDistributionCenterCode": "",
                "DispatchDate": null,
                "ExtraParams": null,
                "InsuranceCurrency": "RUB",
                "InsuranceValue": 1000,
                //"OrderPlacementTimestamp" : getMSJSONDate("2015-12-22T14:35:05.000+0300") /*as local is "/Date(1450784105000+0300)/"*/,
                "OrderPlacementTimestamp": getMSJSONDate("2015-12-22T14:35:05.000") /*as utc is "/Date(1450794905000)/"*/ ,
                "ParcelBarcode": sampleParcelBarCode, //for test client ParcelBarcode should be empty for autogeneration
                "ParcelHeight": 10,
                "ParcelLength": 10,
                "ParcelWeight": 1,
                "ParcelWidth": 10,
                "ParcelshopCode": psCode,
                "ReturnDistributionCenterCode": "",
                "Services": ["DIRECT_DELIVERY"] //its important!
            }]
        }

        $.ajax({
            type: "POST",
            dataType: "json",
            traditional: true,
            contentType: "application/json",
            timeout: 60000,
            //crossDomain: $.support.cors, //OPTIONAL: Cross Domain Request
            url: url,
            data: JSON.stringify(jsonData),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", authHeader);
                $('#data').empty();
                $('#result').empty();
                $('#request').text(JSON.stringify(jsonData));
            },
            success: function(response) {
                $('#result').html('success');
                $('#data').html(JSON.stringify(response));
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $('#result').html('error: ' + xhr.status + '<br/>' + thrownError);
            }
        });
    });

    $('#ajaxJson_UpdatePreadvice').click(function() {
        var methodName = 'UpdatePreadvice';
        var url = endpoint + '/' + methodName;
        var jsonData = {
            preadvices: [{
                "BusinessUnitCode": acc.buCode,
                "CashOnDeliveryCurrency": "RUB",
                "CashOnDeliveryValue": 100,
                "ClientOrderNumber": sampleClientParcelBarCode + 'X',
                "ClientParcelNumber": sampleClientParcelBarCode + 'X',
                "CustomStoragePeriod": 0,
                "CustomerAdditionalAddressInfo": "test adr info",
                "CustomerAdditionalPhoneNumber": "test adr phone",
                "CustomerApartmentNumber": "0",
                "CustomerBuildingNumber": "13",
                "CustomerCity": "MOSCOW",
                "CustomerConstructionNumber": "3",
                "CustomerCountryCode": "RUS",
                "CustomerEmail": "nomail@ya.ru",
                "CustomerFarthersName": "Namegiven X",
                "CustomerFirstName": "Name X",
                "CustomerFrameNumber": "1",
                "CustomerLandlinePhoneNumber": "+7 (499) 681-12-52",
                "CustomerMobilePhoneNumber": "+7 (499) 681-12-52",
                "CustomerNumber": "21321321",
                "CustomerRegion": "noregion",
                "CustomerStreet": "dokukina",
                "CustomerStreetType": "st.",
                "CustomerSubregion": "X",
                "CustomerSurname": "Surname X",
                "CustomerZipCode": "101000",
                "DirectDistributionCenterCode": "",
                "DispatchDate": null,
                "ExtraParams": null,
                "InsuranceCurrency": "RUB",
                "InsuranceValue": 1000,
                "OrderPlacementTimestamp": null,
                "ParcelBarcode": sampleParcelBarCode,
                "ParcelHeight": 10,
                "ParcelLength": 10,
                "ParcelWeight": 1,
                "ParcelWidth": 10,
                "ParcelshopCode": psCode,
                "ReturnDistributionCenterCode": "",
                "Services": ["DIRECT_DELIVERY"] //its important!
            }]
        }

        $.ajax({
            type: "POST",
            dataType: "json",
            traditional: true,
            contentType: "application/json",
            timeout: 60000,
            //crossDomain: $.support.cors, //OPTIONAL: Cross Domain Request
            url: url,
            data: JSON.stringify(jsonData),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", authHeader);
                $('#data').empty();
                $('#result').empty();
                $('#request').text(JSON.stringify(jsonData));
            },
            success: function(response) {
                $('#result').html('success');
                $('#data').html(JSON.stringify(response));
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $('#result').html('error: ' + xhr.status + '<br/>' + thrownError);
            }
        });
    });

    $('#ajaxJson_SendPreadvicesToDelivery').click(function() {

        var methodName = 'SendPreadvicesToDelivery';
        var url = endpoint + '/' + methodName;
        var jsonData = { businessUnitCode: acc.buCode, parcelBarcodes: [sampleParcelBarCode] };

        $.ajax({
            type: "POST",
            dataType: "json",
            //traditional:true,
            contentType: "application/json",
            timeout: 60000,
            //crossDomain: $.support.cors, //OPTIONAL: Cross Domain Request
            url: url,
            data: JSON.stringify(jsonData),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", authHeader);
                $('#data').empty();
                $('#result').empty();
                $('#request').text(JSON.stringify(jsonData));
            },
            success: function(response) {
                $('#result').html('success');
                $('#data').html(JSON.stringify(response));
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $('#result').html('error: ' + xhr.status + '<br/>' + thrownError);
            }
        });
    });

    $('#ajaxJson_SendAllPreadvicesToDelivery').click(function() {

        var methodName = 'SendAllPreadvicesToDelivery';
        var url = endpoint + '/' + methodName;
        var jsonData = { businessUnitCode: acc.buCode };

        $.ajax({
            type: "POST",
            dataType: "json",
            //traditional:true,
            contentType: "application/json",
            timeout: 60000,
            //crossDomain: $.support.cors, //OPTIONAL: Cross Domain Request
            url: url,
            data: JSON.stringify(jsonData),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", authHeader);
                $('#data').empty();
                $('#result').empty();
                $('#request').text(JSON.stringify(jsonData));
            },
            success: function(response) {
                $('#result').html('success');
                $('#data').html(JSON.stringify(response));
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $('#result').html('error: ' + xhr.status + '<br/>' + thrownError);
            }
        });
    });

    $('#ajaxXml_GetParcelShops').click(function() {

        var methodName = 'GetParcelShops';
        var url = endpoint + '/' + methodName;

        var xmlData =
            '<?xml version="1.0" encoding="utf-8"?>' +
            '<' + methodName + ' xmlns="' + namespace + '">' +
            '<businessUnitCode>' + acc.buCode + '</businessUnitCode>' +
            '</' + methodName + '>';

        $.ajax({
            type: "POST",
            dataType: "xml",
            contentType: "application/xml",
            timeout: 60000,
            crossDomain: $.support.cors, //OPTIONAL: Cross Domain Request
            url: url,
            data: xmlData,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", authHeader);
                $('#data').empty();
                $('#result').empty();
                $('#request').text(xmlData);
            },
            success: function(response) {
                $('#result').html('success');

                $("#result").find('ParcelShop').each(function() {
                    var title = $(this).find('ParcelShopName').text();
                    var code = $(this).find('ParcelShopCode').text();
                    var address = $(this).find('Address').text();
                    var url = $(this).find('AddressUrl').text();
                    $('<p></p>').html('<a target="_blank" href="' + url + '">' + title + ' / ' + code + '</a><br/><div>' + address + '<div>').appendTo('#data');
                });
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $('#result').html('error: ' + xhr.status + '<br/>' + thrownError);
            }
        });
    });

    $('#ajaxXml_GetStatusesByParcelBarcodes').click(function() {
        var methodName = 'GetStatusesByParcelBarcodes';
        var url = endpoint + '/' + methodName;

        var xmlArr = '';
        $(parcelBarCodesArr).each(function(i, o) { xmlArr += '<a:string>' + o + '</a:string>' });

        var xmlData =
            '<?xml version="1.0" encoding="utf-8"?>' +
            '<' + methodName + ' xmlns="' + namespace + '" ' + ischema + ' ' + aschema + '>' +
            '<parcelBarCodes>' + xmlArr + '</parcelBarCodes>' +
            '</' + methodName + '>';

        $.ajax({
            type: "POST",
            dataType: "xml",
            contentType: "application/xml",
            timeout: 60000,
            crossDomain: $.support.cors, //OPTIONAL: Cross Domain Request
            url: url,
            data: xmlData,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", authHeader);
                $('#data').empty();
                $('#result').empty();
                $('#request').text(xmlData);
            },
            success: function(response) {
                $('#result').html('success');

                $(response).find('Status').each(function() {
                    var code = $(this).find('ParcelBarcode').text();
                    var status = $(this).find('StatusName').text();
                    var datestamp = $(this).find('StatusTimestamp').text();
                    $('<p></p>').html(code + '<br/>' + status + '<br/>' + datestamp).appendTo('#data');
                });
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $('#result').html('error: ' + xhr.status + '<br/>' + thrownError);
            }
        });
    });

    $('#ajaxXml_GetStatusesByBusinessUnit').click(function() {
        var methodName = 'GetStatusesByBusinessUnit';
        var url = endpoint + '/' + methodName;
        var endDateNode = '<dateTo i:nil="true" />';
        if (period.end) {
            endDateNode = '<dateTo>' + period.end + '</dateTo>';
        }

        var xmlData =
            '<?xml version="1.0" encoding="utf-8"?>' +
            '<' + methodName + ' xmlns="' + namespace + '" ' + ischema + ' ' + aschema + '>' +
            '<businessUnitCode>' + acc.buCode + '</businessUnitCode>' +
            '<dateFrom>' + period.start + '</dateFrom>' +
            endDateNode +
            '</' + methodName + '>';

        $.ajax({
            type: "POST",
            dataType: "xml",
            contentType: "application/xml",
            timeout: 60000,
            crossDomain: $.support.cors, //OPTIONAL: Cross Domain Request
            url: url,
            data: xmlData,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", authHeader);
                $('#data').empty();
                $('#result').empty();
                $('#request').text(xmlData);
            },
            success: function(response) {
                $('#result').html('success');

                $(response).find('Status').each(function() {
                    var code = $(this).find('ParcelBarcode').text();
                    var status = $(this).find('StatusName').text();
                    var datestamp = $(this).find('StatusTimestamp').text();
                    $('<p></p>').html(code + '<br/>' + status + '<br/>' + datestamp).appendTo('#data');
                });
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $('#result').html('error: ' + xhr.status + '<br/>' + thrownError);
            }
        });
    });

    $('#ajaxJson_GetReturnInfoByBusinessUnit').click(function() {
        var methodName = 'GetReturnInfoByBusinessUnit';
        var url = endpoint + '/' + methodName;
        var jsonData = { businessUnitCode: acc.buCode, dateFrom: period.start, dateTo: period.end };

        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            timeout: 60000,
            //crossDomain: $.support.cors, //OPTIONAL: Cross Domain Request
            url: url,
            data: JSON.stringify(jsonData),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", authHeader);
                $('#data').empty();
                $('#result').empty();
                $('#request').text(JSON.stringify(jsonData));
            },
            success: function(response) {
                $('#result').html('success');
                $('#data').html(JSON.stringify(response));
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $('#result').html('error: ' + xhr.status + '<br/>' + thrownError);
            }
        });
    });

    $('#ajaxXml_GetReturnInfoByBusinessUnit').click(function() {
        var methodName = 'GetReturnInfoByBusinessUnit';
        var url = endpoint + '/' + methodName;

        var endDateNode = '<dateTo i:nil="true" />';
        if (period.end) {
            endDateNode = '<dateTo>' + period.end + '</dateTo>';
        }

        var xmlData =
            '<?xml version="1.0" encoding="utf-8"?>' +
            '<' + methodName + ' xmlns="' + namespace + '" ' + ischema + ' ' + aschema + '>' +
            '<businessUnitCode>' + acc.buCode + '</businessUnitCode>' +
            '<dateFrom>' + period.start + '</dateFrom>' +
            endDateNode +
            '</' + methodName + '>';

        $.ajax({
            type: "POST",
            dataType: "xml",
            contentType: "application/xml",
            timeout: 60000,
            crossDomain: $.support.cors, //OPTIONAL: Cross Domain Request
            url: url,
            data: xmlData,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", authHeader);
                $('#data').empty();
                $('#result').empty();
                $('#request').text(xmlData);
            },
            success: function(response) {
                $('#result').html('success');

                $(response).find('ReturnInfo').each(function() {
                    var code = $(this).find('ParcelBarcode').text();
                    var claim = $(this).find('ClaimBarcode').text();
                    var datestamp = $(this).find('ReturnTimestamp').text();
                    $('<p></p>').html('ParcelBarcode ' + code + '<br/>ClaimBarcode ' + claim + '<br/>ReturnTimestamp ' + datestamp).appendTo('#data');
                });
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $('#result').html('error: ' + xhr.status + '<br/>' + thrownError);
            }
        });
    });

    $('#ajaxXml_GetPreadvices').click(function() {

        var methodName = 'GetPreadvices';
        var url = endpoint + '/' + methodName;

        var xmlData =
            '<?xml version="1.0" encoding="utf-8"?>' +
            '<' + methodName + ' xmlns="' + namespace + '">' +
            '<businessUnitCode>' + acc.buCode + '</businessUnitCode>' +
            '</' + methodName + '>';

        $.ajax({
            type: "POST",
            dataType: "xml",
            contentType: "application/xml",
            timeout: 60000,
            crossDomain: $.support.cors, //OPTIONAL: Cross Domain Request
            url: url,
            data: xmlData,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", authHeader);
                $('#data').empty();
                $('#result').empty();
                $('#request').text(xmlData);
            },
            success: function(response) {
                $('#result').html('success');

                $(response).find('Preadvice').each(function() {
                    var bu = $(this).find('BusinessUnitCode').text();
                    var cpn = $(this).find('ClientParcelNumber').text();
                    var con = $(this).find('ClientOrderNumber').text();
                    var pb = $(this).find('ParcelBarcode').text();
                    $('<p></p>').html('ParcelBarcode ' + pb + '<br/>ClientParcelNumber ' + cpn + '<br/>ClientOrderNumber ' + con + '<br/>BusinessUnitCode ' + bu).appendTo('#data');
                });
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $('#result').html('error: ' + xhr.status + '<br/>' + thrownError);
            }
        });

    });

    $('#ajaxXml_CreatePreadvice').click(function() {
        var methodName = 'CreatePreadvice';
        var url = endpoint + '/' + methodName;


        var xmlData = '<?xml version="1.0" encoding="utf-8"?>' +
            '<' + methodName + ' xmlns="' + namespace + '" ' + ischema + ' ' + aschema + '>' +
            '<preadvices>' +
            '<Preadvice xmlns="">' +
            '<BusinessUnitCode>' + acc.buCode + '</BusinessUnitCode>' +
            '<CashOnDeliveryCurrency>RUB</CashOnDeliveryCurrency>' +
            '<CashOnDeliveryValue>1500</CashOnDeliveryValue>' +
            '<ClientOrderNumber>' + sampleClientParcelBarCode + '</ClientOrderNumber>' +
            '<ClientParcelNumber>' + sampleClientParcelBarCode + '</ClientParcelNumber>' +
            '<CustomStoragePeriod>23</CustomStoragePeriod>' +
            '<CustomerAdditionalAddressInfo>1312</CustomerAdditionalAddressInfo>' +
            '<CustomerAdditionalPhoneNumber>321</CustomerAdditionalPhoneNumber>' +
            '<CustomerApartmentNumber>321</CustomerApartmentNumber>' +
            '<CustomerBuildingNumber>1312</CustomerBuildingNumber>' +
            '<CustomerCity>MOSCOW</CustomerCity>' +
            '<CustomerConstructionNumber>1</CustomerConstructionNumber>' +
            '<CustomerCountryCode>RUS</CustomerCountryCode>' +
            '<CustomerEmail>a@a.ru</CustomerEmail>' +
            '<CustomerFarthersName>a</CustomerFarthersName>' +
            '<CustomerFirstName>g</CustomerFirstName>' +
            '<CustomerFrameNumber>1</CustomerFrameNumber>' +
            '<CustomerLandlinePhoneNumber>21321321</CustomerLandlinePhoneNumber>' +
            '<CustomerMobilePhoneNumber>321321321</CustomerMobilePhoneNumber>' +
            '<CustomerNumber>21321321</CustomerNumber>' +
            '<CustomerRegion>321321 rr</CustomerRegion>' +
            '<CustomerStreet>saras</CustomerStreet>' +
            '<CustomerStreetType>ra</CustomerStreetType>' +
            '<CustomerSubregion>r2r32r32</CustomerSubregion>' +
            '<CustomerSurname>молчанова</CustomerSurname>' +
            '<BusinessUnitCode>1000</BusinessUnitCode>' +
            '<CustomerZipCode>123456</CustomerZipCode>' +
            '<DirectDistributionCenterCode>437</DirectDistributionCenterCode>' +
            '<DispatchDate i:nil="true" />' //send nullable date via ischema namespace
            +
            '<ExtraParams xmlns="" i:nil="true" />' //send nullable date via ischema namespace
            +
            '<InsuranceCurrency>RUB</InsuranceCurrency>' +
            '<InsuranceValue>1000</InsuranceValue>' +
            '<OrderPlacementTimestamp>2014-12-01T14:35:05.000</OrderPlacementTimestamp>' +
            '<ParcelBarcode></ParcelBarcode>' //for test client ParcelBarcode should be empty for autogeneration
            +
            '<ParcelHeight>21321</ParcelHeight>' +
            '<ParcelLength>1321</ParcelLength>' +
            '<ParcelWeight>321</ParcelWeight>' +
            '<ParcelWidth>1321</ParcelWidth>' +
            '<ParcelshopCode>' + psCode + '</ParcelshopCode>' +
            '<ReturnDistributionCenterCode></ReturnDistributionCenterCode>' +
            '<Services>' +
            '<a:string>DIRECT_DELIVERY</a:string>' //aschema, array type
            +
            '</Services>' +
            '</Preadvice>' +
            '</preadvices>' +
            '</' + methodName + '>';

        $.ajax({
            type: "POST",
            dataType: "xml",
            contentType: "application/xml",
            timeout: 60000,
            crossDomain: $.support.cors, //OPTIONAL: Cross Domain Request
            url: url,
            data: xmlData,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", authHeader);
                $('#data').empty();
                $('#result').empty();
                $('#request').text(xmlData);
            },
            success: function(response) {
                $('#result').html('success');

                $(response).find('PreadviceResult').each(function() {
                    var clientParcelNumber = $(this).find('ClientParcelNumber').text();
                    var parcelBarcode = $(this).find('ParcelBarcode').text();
                    var operationResult = $(this).find('OperationResult').text();
                    var errorMessage = $(this).find('ErrorMessage').text();
                    var errorCode = $(this).find('ErrorCode').text();
                    $('<p></p>').html('ClientParcelNumber : ' + clientParcelNumber +
                        '<br/>ParcelBarcode : ' + parcelBarcode +
                        '<br/>OperationResult : ' + operationResult +
                        '<br/>ErrorMessage : ' + errorMessage +
                        '<br/>ErrorCode : ' + errorCode
                    ).appendTo('#data');
                });
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $('#result').html('error: ' + xhr.status + '<br/>' + thrownError);
            }
        });
    });

    $('#ajaxXml_UpdatePreadvice').click(function() {
        var methodName = 'UpdatePreadvice';
        var url = endpoint + '/' + methodName;


        var xmlData = '<?xml version="1.0" encoding="utf-8"?>' +
            '<' + methodName + ' xmlns="' + namespace + '" ' + ischema + ' ' + aschema + '>' +
            '<preadvices>' +
            '<Preadvice xmlns="">' +
            '<BusinessUnitCode>' + acc.buCode + '</BusinessUnitCode>' +
            '<CashOnDeliveryCurrency>RUB</CashOnDeliveryCurrency>' +
            '<CashOnDeliveryValue>1500</CashOnDeliveryValue>' +
            '<ClientOrderNumber>' + sampleClientParcelBarCode + '</ClientOrderNumber>' +
            '<ClientParcelNumber>' + sampleClientParcelBarCode + '</ClientParcelNumber>' +
            '<CustomStoragePeriod>23</CustomStoragePeriod>' +
            '<CustomerAdditionalAddressInfo>1312</CustomerAdditionalAddressInfo>' +
            '<CustomerAdditionalPhoneNumber>321</CustomerAdditionalPhoneNumber>' +
            '<CustomerApartmentNumber>321</CustomerApartmentNumber>' +
            '<CustomerBuildingNumber>1312</CustomerBuildingNumber>' +
            '<CustomerCity>MOSCOW</CustomerCity>' +
            '<CustomerConstructionNumber>1</CustomerConstructionNumber>' +
            '<CustomerCountryCode>RUS</CustomerCountryCode>' +
            '<CustomerEmail>a@a.ru</CustomerEmail>' +
            '<CustomerFarthersName>a</CustomerFarthersName>' +
            '<CustomerFirstName>g</CustomerFirstName>' +
            '<CustomerFrameNumber>1</CustomerFrameNumber>' +
            '<CustomerLandlinePhoneNumber>21321321</CustomerLandlinePhoneNumber>' +
            '<CustomerMobilePhoneNumber>321321321</CustomerMobilePhoneNumber>' +
            '<CustomerNumber>21321321</CustomerNumber>' +
            '<CustomerRegion>321321 rr</CustomerRegion>' +
            '<CustomerStreet>saras</CustomerStreet>' +
            '<CustomerStreetType>ra</CustomerStreetType>' +
            '<CustomerSubregion>r2r32r32</CustomerSubregion>' +
            '<CustomerSurname>молчанова</CustomerSurname>' +
            '<BusinessUnitCode>1000</BusinessUnitCode>' +
            '<CustomerZipCode>123456</CustomerZipCode>' +
            '<DirectDistributionCenterCode>437</DirectDistributionCenterCode>' +
            '<DispatchDate i:nil="true" />' //send nullable date via ischema namespace
            +
            '<ExtraParams xmlns="" i:nil="true" />' //send nullable date via ischema namespace
            +
            '<InsuranceCurrency>RUB</InsuranceCurrency>' +
            '<InsuranceValue>1000</InsuranceValue>' +
            '<OrderPlacementTimestamp>2014-12-01T14:35:05.000</OrderPlacementTimestamp>' +
            '<ParcelBarcode></ParcelBarcode>' //for test client ParcelBarcode should be empty for autogeneration
            +
            '<ParcelHeight>2500</ParcelHeight>' +
            '<ParcelLength>1500</ParcelLength>' +
            '<ParcelWeight>400</ParcelWeight>' +
            '<ParcelWidth>2500</ParcelWidth>' +
            '<ParcelshopCode>' + psCode + '</ParcelshopCode>' +
            '<ReturnDistributionCenterCode></ReturnDistributionCenterCode>' +
            '<Services>' +
            '<a:string>DIRECT_DELIVERY</a:string>' //aschema, array type
            +
            '</Services>' +
            '</Preadvice>' +
            '</preadvices>' +
            '</' + methodName + '>';

        $.ajax({
            type: "POST",
            dataType: "xml",
            contentType: "application/xml",
            timeout: 60000,
            crossDomain: $.support.cors, //OPTIONAL: Cross Domain Request
            url: url,
            data: xmlData,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", authHeader);
                $('#data').empty();
                $('#result').empty();
                $('#request').text(xmlData);
            },
            success: function(response) {
                $('#result').html('success');

                $(response).find('PreadviceResult').each(function() {
                    var clientParcelNumber = $(this).find('ClientParcelNumber').text();
                    var parcelBarcode = $(this).find('ParcelBarcode').text();
                    var operationResult = $(this).find('OperationResult').text();
                    var errorMessage = $(this).find('ErrorMessage').text();
                    var errorCode = $(this).find('ErrorCode').text();
                    $('<p></p>').html('ClientParcelNumber : ' + clientParcelNumber +
                        '<br/>ParcelBarcode : ' + parcelBarcode +
                        '<br/>OperationResult : ' + operationResult +
                        '<br/>ErrorMessage : ' + errorMessage +
                        '<br/>ErrorCode : ' + errorCode
                    ).appendTo('#data');
                });
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $('#result').html('error: ' + xhr.status + '<br/>' + thrownError);
            }
        });
    });

    $('#ajaxXml_SendPreadvicesToDelivery').click(function() {

        var methodName = 'SendPreadvicesToDelivery';
        var url = endpoint + '/' + methodName;

        var xmlData = '<?xml version="1.0" encoding="utf-8"?>' +
            '<' + methodName + ' xmlns="' + namespace + '" ' + ischema + ' ' + aschema + '>' +
            '<parcelBarcodes><a:string>' + sampleParcelBarCode + '</a:string></parcelBarcodes>' +
            '</' + methodName + '>';

        $.ajax({
            type: "POST",
            dataType: "xml",
            contentType: "application/xml",
            timeout: 60000,
            crossDomain: $.support.cors, //OPTIONAL: Cross Domain Request
            url: url,
            data: xmlData,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", authHeader);
                $('#data').empty();
                $('#result').empty();
                $('#request').text(xmlData);
            },
            success: function(response) {
                $('#result').html('success');

                $(response).find('PreadviceResult').each(function() {
                    var clientParcelNumber = $(this).find('ClientParcelNumber').text();
                    var parcelBarcode = $(this).find('ParcelBarcode').text();
                    var operationResult = $(this).find('OperationResult').text();
                    var errorMessage = $(this).find('ErrorMessage').text();
                    var errorCode = $(this).find('ErrorCode').text();
                    $('<p></p>').html('ClientParcelNumber : ' + clientParcelNumber +
                        '<br/>ParcelBarcode : ' + parcelBarcode +
                        '<br/>OperationResult : ' + operationResult +
                        '<br/>ErrorMessage : ' + errorMessage +
                        '<br/>ErrorCode : ' + errorCode
                    ).appendTo('#data');
                });
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $('#result').html('error: ' + xhr.status + '<br/>' + thrownError);
            }
        });
    });

    $('#ajaxXml_SendAllPreadvicesToDelivery').click(function() {

        var methodName = 'SendAllPreadvicesToDelivery';
        var url = endpoint + '/' + methodName;
        var xmlData =
            '<?xml version="1.0" encoding="utf-8"?>' +
            '<' + methodName + ' xmlns="' + namespace + '" ' + ischema + ' ' + aschema + '>' +
            '<businessUnitCode>' + acc.buCode + '</businessUnitCode>' +
            '</' + methodName + '>';

        $.ajax({
            type: "POST",
            dataType: "xml",
            contentType: "application/xml",
            timeout: 60000,
            crossDomain: $.support.cors, //OPTIONAL: Cross Domain Request
            url: url,
            data: xmlData,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", authHeader);
                $('#data').empty();
                $('#result').empty();
                $('#request').text(xmlData);
            },
            success: function(response) {
                $('#result').html('success');

                $(response).find('ParcelShop').each(function() {
                    var title = $(this).find('ParcelShopName').text();
                    var address = $(this).find('Address').text();
                    var url = $(this).find('AddressUrl').text();
                    $('<p></p>').html('<a target="_blank" href="' + url + '">' + title + '</a><br/><div>' + address + '<div>').appendTo('#data');
                });
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $('#result').html('error: ' + xhr.status + '<br/>' + thrownError);
            }
        });
    });

    function getMSJSONDate(iso8601Date) {
        var date = new Date(iso8601Date);

        var utcPart = '';
        //utc
        if (iso8601Date.length > 23) {
            utcPart = iso8601Date.substring(23);
        }

        var offset = date.getTimezoneOffset() * 60 * 1000;

        var withOffset = date.getTime();
        var withoutOffset = withOffset - offset;

        return "/Date(" + withOffset + utcPart + ")/";

    }

});