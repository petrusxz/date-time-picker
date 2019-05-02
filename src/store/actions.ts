export const SET_START_DATE = 'SET_START_DATE'
const setStartDate = (startDateTime: Date) => ({ type: SET_START_DATE, startDateTime });

export const SET_END_DATE = 'SET_END_DATE'
const setEndDate = (endDateTime: Date) => ({ type: SET_END_DATE, endDateTime });

export const setStartDateTime = (date: Date = new Date(), time: string = '') => {
    return dispatch => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const newDate = new Date(year, month, day);
        const [h, m = 0] = time.split(':');
        newDate.setHours(+h, +m);

        dispatch(setStartDate(newDate));
    }
};

export const setEndDateTime = (date: Date = new Date(), time: string = '') => {
    return dispatch => {
        const newDate = new Date(date);
        const [h, m = 0] = time.split(':');
        newDate.setHours(newDate.getHours() + +h, +m);

        dispatch(setEndDate(newDate));
    }
};
