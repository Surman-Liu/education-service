function isEmpty(input) {
    if (typeof (input) === 'string' && input.trim() === "") {
        return true;
    }
    return false;
}

function validatemobile(mobile) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
        return false;
    }
    return true;
}

export { isEmpty, validatemobile }