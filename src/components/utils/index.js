import numeral from 'numeral';

export const getMinuteFromSeconds = sec => {
    const minute = Math.floor(sec / 60);
    const second = sec % 60;
    return `${minute}:${numeral(second).format('00')}`;
};