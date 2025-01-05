import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AcademicsComponent } from './components/academics/academics.component';
import { ContactComponent } from './components/contact/contact.component';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { BhoomiserviceComponent } from './components/bhoomiservice/bhoomiservice.component';
import { TermsPrivacyComponent } from './components/terms&conditions/terms-privacy.component';
import { PrivacypolicyComponent } from './components/privacypolicy/privacypolicy.component';
import { FaqsComponent } from './components/faqs/faqs.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'about', component: AboutComponent },
    { path: 'academics/:academicType', component: AcademicsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard/userdashboard', component: UserDashboardComponent },
    { path: 'dashboard/useraccount', component: UserAccountComponent },
    { path: 'service/:serviceName', component: BhoomiserviceComponent },
    { path: 'termsofservices', component: TermsPrivacyComponent },
    { path: 'privacypolicy', component: PrivacypolicyComponent },
    { path: 'faq', component: FaqsComponent }
];
