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
    @State() selectedDate: Date;

    setActualDate: Action;

    private weekdaysNames: string[];

    componentWillLoad(): void {
        this.store.mapDispatchToProps(this, {
            setActualDate
        });
        this.weekdaysNames = getWeekdayNames();
        this.setWeekDays();
        this.selectedDate = new Date();
        this.selectedDate.setHours(0, 0, 0, 0);
    }

    /**
     * @description Renders days of the week for the parameter date.
     */
    private setWeekDays(dateParam: Date = new Date()): void {
        const weekDate = new Date(dateParam);
        this.daysOfWeek = getDaysOfTheWeek(weekDate);
        const nextWeekDate = new Date(weekDate);
        nextWeekDate.setDate(weekDate.getDate() + 1);
        this.daysOfNextWeek = getDaysOfTheWeek(nextWeekDate);
    }

    /**
     * @param {number} iterator 
     * @description Generates dates for the current month on the Calendar
     */
    private setCurrentMonthDates(iterator = 0): void {
        if (iterator === 0) {
            this.activeDate = new Date();
            this.setWeekDays();
        } else {
            const days = 14 * iterator;
            this.activeDate.setDate(this.activeDate.getDate() - this.activeDate.getDay());
            this.activeDate.setDate(this.activeDate.getDate() + days);
            this.setWeekDays(this.activeDate);
        }
    }

    private setSelectedDate(date: Date): void {
        this.selectedDate = date;
        this.setActualDate(this.selectedDate);
    }

    private generateWeekRow(days: Day[]): JSX.Element[] {
        return days.map(day =>
            <td
                class={{
                    'readonly': day.isReadonly,
                    'selectedDate': day.weekDay.getTime() === this.selectedDate.getTime()
                }}
                onClick={() => { if (!day.isReadonly) this.setSelectedDate(day.weekDay) }}>
                {day.dayNumber}
            </td>
        );
    }

    render() {
        return (
            <div class="calendar-container">
                <div class="calendar-header">
                    <div id="active-month">{this.activeDate.toLocaleDateString('en-US', { month: 'long' })}</div>
                    <button id="next-ctrl" onClick={() => this.setCurrentMonthDates(1)}>&rang;</button>
                    <button id="today-ctrl" onClick={() => this.setCurrentMonthDates()}>Today</button>
                    <button
                        id="previous-ctrl"
                        disabled={this.daysOfWeek[0].isReadonly}
                        onClick={() => this.setCurrentMonthDates(-1)}>
                        &lang;
                    </button>
                </div>

                <table>
                    <tr>
                        {this.weekdaysNames.map(dayName =>
                            <th>{dayName}</th>
                        )}
                    </tr>
                    <tr>
                        {this.generateWeekRow(this.daysOfWeek)}
                    </tr>
                    <tr>
                        {this.generateWeekRow(this.daysOfNextWeek)}
                    </tr>
                </table>
            </div>
        );
    }
}
