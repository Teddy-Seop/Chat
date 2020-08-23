const AjaxUtil = async (url, type, data) => {
    let result;

    await $.ajax({
        url: url,
        type: type,
        data: data,
        dataType: 'json'
    }).done((res) => {
        result = res;
    })

    return result;
}
