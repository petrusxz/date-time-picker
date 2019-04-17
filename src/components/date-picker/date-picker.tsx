import { Component, Prop } from '@stencil/core';
import { getDaysOfTheWeek, getWeekdayNames } from '../../utils/utils';
import { Day } from '../../models/day.model';
import { Store, Action } from '@stencil/redux';
import { setActualDate } from '../../store/actions';

@Component({
    tag: 'date-picker',
    styleUrl: 'date-picker.css',
    shadow: true
})
export class DatePicker {
    @Prop({ context: 'store' }) store: Store;

    setActualDate: Action;

    private daysOfWeek: Day[];
    private daysOfNextWeek: Day[];
    private weekdaysNames: string[];

    componentWillLoad(): void {
        this.weekdaysNames = getWeekdayNames();
        this.setWeekDays();

        const { mapDispatchToProps } = this.store;

        mapDispatchToProps(this, {
            setActualDate
        });
    }

    /**
     * @description Renders days of the week for the parameter date.
     */
    private setWeekDays(dateParam: Date = new Date()): void {
        this.daysOfWeek = getDaysOfTheWeek(dateParam);
        const nextWeekDate = new Date();
        nextWeekDate.setDate(dateParam.getDate() + 1);

        this.daysOfNextWeek = getDaysOfTheWeek(nextWeekDate);
    }

    render() {
        return (
            <table>
                <tr>
                    {
                        this.weekdaysNames.map(dayName =>
                            <th>
                                {dayName}
                            </th>
                        )
                    }
                </tr>
                <tr>
                    {
                        this.daysOfWeek.map(day =>
                            <td onClick={() => this.setActualDate(day.weekDay)}>
                                {day.dayNumber}
                            </td>
                        )
                    }
                </tr>
                <tr>
                    {
                        this.daysOfNextWeek.map(day =>
                            <td onClick={() => this.setActualDate(day.weekDay)}>
                                {day.dayNumber}
                            </td>
                        )
                    }
                </tr>
            </table>
        );
    }
}
