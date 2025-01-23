import { Routes } from '@angular/router';
import { ExecuteScriptComponent } from './pages/execute-script/execute-script.component';

export const routes: Routes = [
    {path:"execute",component: ExecuteScriptComponent},
    {path:"",redirectTo:'execute'},
];
