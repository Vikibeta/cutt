var utils = {
    say: function(str) {
        var div = document.createElement('div');
        div.innerText = str;
       document.body.appendChild(div);
    },

};

module.exports = utils;