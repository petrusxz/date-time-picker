import { Component, Prop, State } from '@stencil/core';
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
    @State() daysOfWeek: Day[];
    @State() daysOfNextWeek: Day[];
    @State() activeDate: Date = new Date();

    setActualDate: Action;

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

    /**
     * @param {number} iterator 
     * @description Generates dates for the current month on the Calendar
     */
    setCurrentMonthDates(iterator = 0): void {
        if (iterator === 0) {
            this.activeDate = new Date();
            this.setWeekDays();
        } else {
            const days = 14 * iterator;
            this.activeDate.setDate(this.activeDate.getDate() + days);
            this.setWeekDays(this.activeDate);
        }
    }

    render() {
        return (
            <div class="calendar-container">
                <div class="calendar-header">
                    <div id="active-month">{this.activeDate.toLocaleDateString('en-US', { month: 'long' })}</div>
                    <button id="next-ctrl" onClick={() => this.setCurrentMonthDates(1)}>&rang;</button>
                    <button id="today-ctrl" onClick={() => this.setCurrentMonthDates()}>Today</button>
                    <button id="previous-ctrl" onClick={() => this.setCurrentMonthDates(-1)}>&lang;</button>
                </div>

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
            </div>
        );
    }
}
