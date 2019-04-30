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

  @State() activeTab: number = 0;

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

  private setActiveTab(idx: number) {
    this.activeTab = idx;
  }

  render() {
    return (
      <div class="calendar-container">

        <div class="segments">
          <button type="button" class={{ 'active': this.activeTab === 0 }} onClick={() => this.setActiveTab(0)}>DATE</button>
          <button type="button" class={{ 'active': this.activeTab === 1 }} onClick={() => this.setActiveTab(1)}>TIME</button>
        </div>

        {this.activeTab === 0 
          ? <date-picker></date-picker>
          : <time-picker></time-picker>
        }
        <footer>
          {this.dateTime.toLocaleDateString()}
        </footer>
      </div>
    );
  }
}
