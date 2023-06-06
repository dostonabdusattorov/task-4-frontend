import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRoutingModule } from './user-routing.module';
import { NgIconsModule } from '@ng-icons/core';
import { heroNoSymbol, heroTrash } from '@ng-icons/heroicons/outline';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    UserRoutingModule,
    CommonModule,
    NgIconsModule.withIcons({ heroNoSymbol, heroTrash }),
  ],
})
export class UserModule {}
