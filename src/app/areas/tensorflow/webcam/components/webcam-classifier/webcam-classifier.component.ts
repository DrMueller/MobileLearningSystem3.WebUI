import { Component, OnInit } from '@angular/core';
import { load, MobileNet } from '@tensorflow-models/mobilenet';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { BusyIndicatorService } from 'src/app/core/loading-indication/services';

import { Prediction } from '../../models';

@Component({
  selector: 'app-webcam-classifier',
  templateUrl: './webcam-classifier.component.html',
  styleUrls: ['./webcam-classifier.component.scss']
})
export class WebcamClassifierComponent implements OnInit {
  public get trigger$(): Observable<void> {
    return this._trigger.asObservable();
  }

  public get mediaTrackConstraints(): MediaTrackConstraints {
    return <MediaTrackConstraints>{
      width: {
        ideal: 640
      },
      height: {
        ideal: 480
      }
    };
  }

  public predictions: Prediction[] = [];
  private _model: MobileNet;
  private _trigger: Subject<void> = new Subject<void>();

  constructor(private busyIndicator: BusyIndicatorService) {
  }

  public async handleImageAsync(webcamImage: WebcamImage): Promise<void> {
    const nativePredictions = await this._model.classify(webcamImage.imageData);
    this.predictions = nativePredictions.map(f => new Prediction(f.className, f.probability));
  }

  public takeImage(): void {
    this._trigger.next();
  }

  public handleInitError(error: WebcamInitError): void {
    throw new Error(error.message);
  }

  public async ngOnInit(): Promise<void> {
    await this.busyIndicator.withBusyIndicator(async () => {
      this._model = await load();
    });
  }

}
