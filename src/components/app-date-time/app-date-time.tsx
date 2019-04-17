import { Component, State, Prop, Watch } from '@stencil/core';
import { Store } from '@stencil/redux';
import { configureStore } from '../../store/store';

@Component({
  tag: 'app-date-time',
  styleUrl: 'app-date-time.css',
  shadow: true
})
export class AppDateTime {

  @Prop({ context: 'store' }) store: Store;
  @State() dateTime: Date = new Date();

  @Watch('dateTime')
  updateList() {
    console.log(this.dateTime);
  }

  componentWillLoad() {
    this.store.setStore(configureStore({}));

    const { mapStateToProps } = this.store;

    mapStateToProps(this, state => {
      return {
        dateTime: state.selectedDate.date
      }
    });
  }

  render() {
    return (
      <div>
        <date-picker></date-picker>
      </div>
    );
  }
}
