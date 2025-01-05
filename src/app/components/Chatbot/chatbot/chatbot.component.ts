import { Component } from '@angular/core';
import { ChatService } from '../chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  userMessage = '';
  messages: { user: string; bot: string }[] = [];

  constructor(private chatService: ChatService) {}

  sendMessage() {
    if (!this.userMessage.trim()) return;

    const message = this.userMessage;
    this.messages.push({ user: message, bot: '' });
    this.userMessage = '';

    this.chatService.sendPrompt(message).subscribe(
      (response) => {
        this.messages[this.messages.length - 1].bot = response.response;
      },
      (error) => {
        console.error('Error:', error);
        this.messages[this.messages.length - 1].bot =
          'सर्भरसँग सम्पर्क गर्दा त्रुटि भयो।';
      }
    );
  }
}
