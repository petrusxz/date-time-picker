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
  @State() startDateTime: Date = new Date();
  @State() endDateTime: Date = new Date();
  @State() activeTab: number = 0;

  @Watch('startDateTime')
  updateStart() {
    console.log('Start at =>', this.startDateTime);
  }

  @Watch('endDateTime')
  updateEnd() {
    console.log('End at =>', this.endDateTime);
  }

  componentWillLoad() {
    this.store.setStore(configureStore({}));

    const { mapStateToProps } = this.store;

    mapStateToProps(this, state => {
      return {
        startDateTime: state.selectedDate.startDateTime,
        endDateTime: state.selectedDate.endDateTime
      }
    });
  }

  private setActiveTab(idx: number) {
    this.activeTab = idx;
  }

  private getFormatSelectedDateTime(): string {
    const date = this.startDateTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    return date;
  }

  render() {
    return (
      <div class="app-container">
        <div class="segments">
          <button type="button" class={{ 'active': this.activeTab === 0 }} onClick={() => this.setActiveTab(0)}>DATE</button>
          <button type="button" class={{ 'active': this.activeTab === 1 }} onClick={() => this.setActiveTab(1)}>TIME</button>
        </div>

        <div class="picker-container">

          {this.activeTab === 0
            ? <date-picker></date-picker>
            : <time-picker></time-picker>
          }
        </div>

        <footer>
          {this.getFormatSelectedDateTime()}
        </footer>
      </div>
    );
  }
}
