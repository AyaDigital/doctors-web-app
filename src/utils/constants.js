export const maskedPhone = (number, mask) => {
    if (!mask) return number;

    const numeric = number.replaceAll(/[^\d]/g, '');

    let idx = 0;

    const formated = mask.split('').map(el => {
        if (el === '#') {
            el = numeric[idx];
            idx++;
        }
        return el;
    });

    return formated.join('');
}
