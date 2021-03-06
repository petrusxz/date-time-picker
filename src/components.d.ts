/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';

import '@stencil/redux';
import {
  TimeRange,
} from './components/time-picker/time-picker';


export namespace Components {

  interface AppDateTime {}
  interface AppDateTimeAttributes extends StencilHTMLAttributes {}

  interface DatePicker {}
  interface DatePickerAttributes extends StencilHTMLAttributes {}

  interface TimePicker {
    'hourRange': TimeRange;
    'minutes': Array<number>;
  }
  interface TimePickerAttributes extends StencilHTMLAttributes {
    'hourRange'?: TimeRange;
    'minutes'?: Array<number>;
  }
}

declare global {
  interface StencilElementInterfaces {
    'AppDateTime': Components.AppDateTime;
    'DatePicker': Components.DatePicker;
    'TimePicker': Components.TimePicker;
  }

  interface StencilIntrinsicElements {
    'app-date-time': Components.AppDateTimeAttributes;
    'date-picker': Components.DatePickerAttributes;
    'time-picker': Components.TimePickerAttributes;
  }


  interface HTMLAppDateTimeElement extends Components.AppDateTime, HTMLStencilElement {}
  var HTMLAppDateTimeElement: {
    prototype: HTMLAppDateTimeElement;
    new (): HTMLAppDateTimeElement;
  };

  interface HTMLDatePickerElement extends Components.DatePicker, HTMLStencilElement {}
  var HTMLDatePickerElement: {
    prototype: HTMLDatePickerElement;
    new (): HTMLDatePickerElement;
  };

  interface HTMLTimePickerElement extends Components.TimePicker, HTMLStencilElement {}
  var HTMLTimePickerElement: {
    prototype: HTMLTimePickerElement;
    new (): HTMLTimePickerElement;
  };

  interface HTMLElementTagNameMap {
    'app-date-time': HTMLAppDateTimeElement
    'date-picker': HTMLDatePickerElement
    'time-picker': HTMLTimePickerElement
  }

  interface ElementTagNameMap {
    'app-date-time': HTMLAppDateTimeElement;
    'date-picker': HTMLDatePickerElement;
    'time-picker': HTMLTimePickerElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
