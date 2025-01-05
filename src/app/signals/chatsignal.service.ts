import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatSignalService {
  // Define a Signal for chat state
  isChatOpen = signal(false);

  // Function to toggle chat
  toggleChat() {
    this.isChatOpen.update((currentValue) => !currentValue);
  }

  // Function to explicitly open the chat
  openChat() {
    this.isChatOpen.set(true);
  }

  // Function to explicitly close the chat
  closeChat() {
    this.isChatOpen.set(false);
  }
}
