
exports.passwordIsGood = function (password){
    if(password.length > 5, password.legnth < 55){
        return true;
    }
    return false;
};