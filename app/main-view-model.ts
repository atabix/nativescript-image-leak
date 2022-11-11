import { ImageAsset, ImageSource, Observable } from '@nativescript/core'
import { GC } from '@nativescript/core/utils';
import { create as ImagePickerFactory, Options as PickerOptions } from '@nativescript/imagepicker';

export class HelloWorldModel extends Observable {
  private _counter: number
  private _message: string

  constructor() {
    super()

    // Initialize default values.
    this._counter = 42
    this.updateMessage()
  }

  get message(): string {
    return this._message
  }

  set message(value: string) {
    if (this._message !== value) {
      this._message = value
      this.notifyPropertyChange('message', value)
    }
  }

  async onTap() {
    let imagePicker = ImagePickerFactory({
      ...{
        mode: 'multiple',
        mediaType: 1,
      },
    });

    try {
      await imagePicker.authorize();
      const images = await imagePicker.present();
      this.handleImages(images);
    } catch (error) {
      return await Promise.reject();
    }
  }

  async handleImages(images: ImageAsset[]) {
    let imageSource = null;
    for (let index = 0; index < images.length; index++) {
      const image = images[index];
      imageSource = await ImageSource.fromAsset(image);
      GC()
    }

    imageSource = null;
  }

  private updateMessage() {
    if (this._counter <= 0) {
      this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!'
    } else {
      this.message = `${this._counter} taps left`
    }
  }
}
