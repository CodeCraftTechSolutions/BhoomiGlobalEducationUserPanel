import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatbotComponent } from './components/Chatbot/chatbot/chatbot.component';
import { CommonModule } from '@angular/common';
import { ChatSignalService } from './signals/chatsignal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent,FooterComponent,ChatbotComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'BhoomiGlobalEducationConsultancy';

  constructor(public chatService: ChatSignalService) {}

  toggleChat() {
    this.chatService.toggleChat();
  }

}
