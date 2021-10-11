import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGraphModule } from '@swimlane/ngx-graph';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FlowChartComponent } from './components/flow-chart/flow-chart.component';
import { FlowCardNodeComponent } from './components/flow-card-node/flow-card-node.component';
import { SidebarOptionsComponent } from './components/sidebar-options/sidebar-options.component';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { TrashComponent } from './ui-icons/trash/trash.component';
import { AddComponent } from './ui-icons/add/add.component';
import { TooltipComponent } from './element/tooltip/tooltip.component';
import { ModalComponent } from './element/modal/modal.component';
import { InputImgComponent } from './components/sub-elements/input-img/input-img.component';
import { InputTextComponent } from './components/sub-elements/input-text/input-text.component';
import { StyleArrayDirective } from './directives/style-array.directive';
import { StyleArrayPipe } from './pipe/style-array.pipe';
import { FormsModule } from '@angular/forms';
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FlowChartComponent,
    FlowCardNodeComponent,
    SidebarOptionsComponent,
    InputTextComponent,
    InputImgComponent,
    TrashComponent,
    AddComponent,
    TooltipComponent,
    ModalComponent,
    StyleArrayDirective,
    StyleArrayPipe
  ],
  imports: [
    BrowserModule,
    NgxGraphModule,
    FormsModule,
    BrowserAnimationsModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
