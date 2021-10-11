import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css']
})
export class InputImgComponent implements OnInit {
  @Input() key: string = ''
  @Input() index: number | undefined = undefined
  @Input() customStyle: string = ''
  constructor() { }

  ngOnInit(): void {
  }

}
