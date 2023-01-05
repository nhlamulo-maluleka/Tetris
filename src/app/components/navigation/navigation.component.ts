import { Component, OnInit } from '@angular/core';
import { ManifestService } from 'src/app/services/manifest/manifest.service';

@Component({
  selector: 'game-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  title!: any;

  constructor(private manifest: ManifestService) { }

  ngOnInit(): void {
    this.title = this.manifest.bgImage;
  }
}
