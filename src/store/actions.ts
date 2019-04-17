export const SET_DATE = 'SET_DATE'
const setDate = (date: Date) => ({ type: SET_DATE, date });
// export const SET_TIME = 'SET_TIME'
// const setTime = (hour: string, minutes: string) => ({ type: SET_DATE, hour, minutes });

export const setActualDate = (date: Date = new Date()) => {
    return dispatch => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const newDate = new Date(year, month, day);

        dispatch(setDate(newDate));
    }
};
