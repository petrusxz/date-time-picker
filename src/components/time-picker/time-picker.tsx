import { Component, Prop, State } from '@stencil/core';
import { Action, Store } from '@stencil/redux';
import { setStartDateTime, setEndDateTime } from '../../store/actions';

@Component({
  tag: 'time-picker',
  styleUrl: 'time-picker.css',
  shadow: true
})
export class TimePicker {
  @Prop({ context: 'store' }) store: Store;
  @Prop() hourRange: TimeRange = {
    startTime: 6,
    endTime: 20
  };
  @Prop() minutes: Array<number> = [
    30,
    60,
    120,
    180
  ];
  @State() startDateTime: Date = new Date();

  setStartDateTime: Action;
  setEndDateTime: Action;

  componentWillLoad(): void {
    const { mapStateToProps } = this.store;

    mapStateToProps(this, state => {
      return {
        startDateTime: state.selectedDate.startDateTime
      }
    });
    
    this.store.mapDispatchToProps(this, {
      setStartDateTime,
      setEndDateTime
    });
  }

  private getHours(): JSX.Element[] {
    const range = this.hourRange.endTime - this.hourRange.startTime;
    const hours = Array.from(Array(range).keys(), x => x + this.hourRange.startTime);
    const morningHours = (
      <tr>
        {hours.filter(e => e < 13).map(hour =>
          <td onClick={() => this.setStartDateTime(this.startDateTime, `${hour}`)}>
            <span>{hour}</span>
          </td>
        )}
      </tr>
    );
    const afternoonHours = (
      <tr>
        {hours.filter(e => e > 12).map(hour =>
          <td onClick={() => this.setStartDateTime(this.startDateTime, `${hour}`)}>
            <span>{hour}</span>
          </td>
        )}
      </tr>
    );

    return [morningHours, afternoonHours];
  }

  private getDuration(): JSX.Element {
    const minArray = this.minutes.map(min => {
      const mod = (min / 60) % 1;
      const h = Math.floor(min / 60);
      const m = (mod * 60) || '00';

      return h !== 0 ? `${h}:${m}` : `0:30`;
    });

    return minArray.map(min =>
      <td onClick={() => this.setEndDateTime(this.startDateTime, `${min}`)}>
        {min}
      </td>
    );
  }

  render(): JSX.Element {
    return (
      <div>
        <table>
          {this.getHours()}
          <tr>
            {this.getDuration()}
          </tr>
        </table>
      </div>
    );
  }
}

export interface TimeRange {
  startTime: number;
  endTime: number;
}