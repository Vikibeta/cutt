var utils = {
    print: function(str) {
        var div = document.createElement('div');
        div.innerText = str;
       document.getElementsByClassName('main')[0].appendChild(div);
    },

};

module.exports = utils;