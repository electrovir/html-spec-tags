const {baseConfig} = require('virmator/base-configs/base-cspell.js');

module.exports = {
    ...baseConfig,
    ignorePaths: [
        ...baseConfig.ignorePaths,
    ],
    words: [
        ...baseConfig.words,
        'maction',
        'mathml',
        'merror',
        'mfrac',
        'mmultiscripts',
        'mpadded',
        'mphantom',
        'mprescripts',
        'mroot',
        'mrow',
        'mspace',
        'msqrt',
        'mstyle',
        'msub',
        'msubsup',
        'msup',
        'mtable',
        'mtext',
        'munder',
        'munderover',
        'svgm',
    ],
};
