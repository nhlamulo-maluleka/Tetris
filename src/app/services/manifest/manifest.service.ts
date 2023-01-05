import { Injectable } from '@angular/core';

@Injectable()
export class ManifestService {
  // rootpath: string = "../../../assets";

  props: any = {
    // bgImage: require(`${this.rootpath}/background.gif`)
  };

  constructor() { }

  get bgImage(){
    return this.props.bgImage;
  }

  get manifest() {
    return this.props;
  }
}
